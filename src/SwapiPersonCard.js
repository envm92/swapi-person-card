import { html, css, LitElement } from 'lit-element';
import { until } from 'lit-html/directives/until.js';
import 'swapi-provider';

export class SwapiPersonCard extends LitElement {
  static get styles() {
    return css`
      :host {
        --swapi-yellow: #fee122;
        --swapi-green: #3cbfaf;
        --swapi-blue: #211751;
        --swapi-red: #ce0f2c;
        --swapi-brown: #f4dbb3;
        display: block;
        padding: 10px;
      }

      #container {
        background-color: black;
        padding: 25px;
        color: var(--swapi-yellow);
        font: 1.3rem Inconsolata, monospace;
        text-shadow: 0 0 5px #c8c8c8;
        max-width: 599px;
        border-radius: 10px;
      }

      p {
        margin: 0px;
      }
      .console-table {
        display: grid;
        grid-template-columns: 1fr 1fr;
        text-align: right;
        font-size: 15px;
      }
      #homeworld {
        display: flex;
      }

      ::selection {
        background: var(--swapi-green);
        text-shadow: none;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Object },
      idPerson: { type: Number, attribute: 'id-person' },
      url: { type: String },
    };
  }

  constructor() {
    super();
    this.data = null;
    this.idPerson = 0;
  }

  __loadPerson() {
    if (this.idPerson <= 0) {
      return new Promise(r => r());
    }
    return this.__loadFromProvider('people', this.idPerson).then(res => {
      this.data = res;
    });
  }

  __loadData() {
    if (!this.data) {
      if (this.url) {
        this.idPerson = +this.url.split('/')[5];
      }
      return this.__loadPerson().then(() => this.__renderData());
    }
    return this.__renderData();
  }

  __loadFromProvider(resourse, idResourse) {
    const shadow = this.shadowRoot;
    const provider = document.createElement('swapi-provider');
    provider.setAttribute('resourse', resourse);
    provider.setAttribute('id-resourse', idResourse);
    shadow.appendChild(provider);
    return new Promise(res => {
      provider.addEventListener('swapi-response', resProv => {
        res(resProv.detail);
      });
      provider.addEventListener('swapi-error', () => {
        res();
      });
    });
  }

  __loadTable(name) {
    this[name] = [];
    const promArry = [];
    for (const item of this.data[name]) {
      const splitUrl = item.split('/');
      promArry.push(this.__loadFromProvider(splitUrl[4], splitUrl[5]));
    }
    return Promise.all(promArry).then(res => {
      this[name] = res.filter(i => i);
      return this[name];
    });
  }

  __render(attribute) {
    let loader;
    const buildTable = (header, rows) => {
      return html` <div class="console-table">${header} ${rows}</div> `;
    };
    switch (attribute) {
      case 'homeworld':
        loader = () => {
          const splitUrl = this.data.homeworld.split('/');
          return this.__loadFromProvider(splitUrl[4], splitUrl[5]).then(
            homeworld => {
              this.homeworld = homeworld;
              return homeworld.name;
            }
          );
        };
        break;
      case 'films':
        loader = () => {
          return this.__loadTable(attribute).then(res => {
            const dic = [
              'I',
              'II',
              'III',
              'IV',
              'V',
              'VI',
              'VII',
              'VIII',
              'IX',
            ];
            this.films = res.sort((a, b) => a.episode_id - b.episode_id);
            this.filmsTable = buildTable(
              html`<div>EPISODE</div>
                <div>TITLE</div>
                <div>-------</div>
                <div>-------</div>`,
              this.films.map(
                v =>
                  html`<div>${dic[v.episode_id - 1]}</div>
                    <div>${v.title}</div>`
              )
            );
            return this.filmsTable;
          });
        };
        break;
      case 'species':
        loader = () => {
          return this.__loadTable(attribute).then(() => {
            this.speciesTable = buildTable(
              '',
              this.species.map(v => html`<div>${v.name}</div>`)
            );
            return this.speciesTable;
          });
        };
        break;
      case 'vehicles':
        loader = () => {
          if (this.data[attribute].length === 0) {
            return buildTable('', html`<div>none</div>`);
          }
          return this.__loadTable(attribute).then(() => {
            this.vehiclesTable = buildTable(
              html`
                <div>NAME</div>
                <div>MODEL</div>
                <div>-------</div>
                <div>-------</div>
              `,
              this.vehicles.map(
                v =>
                  html`<div>${v.name}</div>
                    <div>${v.model}</div>`
              )
            );
            return this.vehiclesTable;
          });
        };
        break;
      case 'starships':
        loader = () => {
          if (this.data[attribute].length === 0) {
            return buildTable('', html`<div>none</div>`);
          }
          return this.__loadTable(attribute).then(() => {
            this.starshipsTable = buildTable(
              html`
                <div>NAME</div>
                <div>MODEL</div>
                <div>-------</div>
                <div>-------</div>
              `,
              this.starships.map(
                v =>
                  html`<div>${v.name}</div>
                    <div>${v.model}</div>`
              )
            );
            return this.starshipsTable;
          });
        };
        break;
      default:
        return null;
    }
    return this.__renderAttribute(attribute, loader);
  }

  __renderAttribute(name, loader) {
    const title = html`<p>${name}: ${this.data[name]}</p>`;
    let body = '';
    if (this.data[name]) {
      body = html` ${until(loader(), html`<span>Loading...</span>`)} `;
    }
    return html` <div id="${name}">${title} ${body}</div> `;
  }

  __renderGeneralData() {
    return html`
      <div id="general">
        <p>general-data:</p>
        <div class="console-table">
          <div>ATTRIBUTE</div>
          <div>VALUE</div>
          <div>-------</div>
          <div>-------</div>
          <div>Height</div>
          <div>${this.data.height}</div>
          <div>Mass</div>
          <div>${this.data.mass}</div>
          <div>Skin Color</div>
          <div>${this.data.skin_color}</div>
          <div>Eye Color</div>
          <div>${this.data.eye_color}</div>
          <div>EyHaire Color</div>
          <div>${this.data.hair_color}</div>
          <div>Birth Year</div>
          <div>${this.data.birth_year}</div>
          <div>Gender</div>
          <div>${this.data.gender}</div>
        </div>
      </div>
    `;
  }

  __renderData() {
    if (!this.data) {
      return html`<div>person not found</div>`;
    }
    return html`
      <div id="main">
        <p>person:${this.data.name}</p>
      </div>
      ${this.__render('homeworld')} ${this.__renderGeneralData()}
      ${this.__render('films')} ${this.__render('species')}
      ${this.__render('vehicles')} ${this.__render('starships')}
    `;
  }

  render() {
    return html`
      <div id="container">
        ${until(this.__loadData(), html`<span>Loading...</span>`)}
      </div>
    `;
  }
}
