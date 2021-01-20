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
        background-color: black;
        display: block;
        padding: 25px;
        color: #fee122;
        font: 1.3rem Inconsolata, monospace;
        text-shadow: 0 0 5px #c8c8c8;
        max-width: 599px;
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
        background: #3cbfaf;
        text-shadow: none;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
    this.data = {};
  }

  __loadFromProvider(url) {
    const shadow = this.shadowRoot;
    const provider = document.createElement('swapi-provider');
    provider.setAttribute('resourse', url[4]);
    provider.setAttribute('id-resourse', url[5]);
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
    if (this[`${name}Table`]) {
      return this[`${name}Table`];
    }
    this[name] = [];
    const promArry = [];
    for (const item of this.data[name]) {
      promArry.push(this.__loadFromProvider(item.split('/')));
    }
    return Promise.all(promArry).then(res => {
      this[name] = res.filter(i => i);
      return this[name];
    });
  }

  __render(attribute) {
    let loader = () => {};
    const buildTable = (header, rows) => {
      return html` <div class="console-table">${header} ${rows}</div> `;
    };
    switch (attribute) {
      case 'homeworld':
        loader = () => {
          if (this.homeworld) {
            return this.homeworld.name;
          }
          return this.__loadFromProvider(this.data.homeworld.split('/')).then(
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
        loader = () => {};
    }
    return this.__renderAttribute(attribute, loader);
  }

  __renderAttribute(name, loader) {
    const title = html`<p>${name}: ${this.data[name] ? '' : 'unkown'}</p>`;
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
          <div>${this.data.birth_year || 'unkown'}</div>
          <div>Gender</div>
          <div>${this.data.gender}</div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div id="container">
        <div id="main">
          <p>person:${this.data.name}</p>
        </div>
        ${this.__render('homeworld')} ${this.__renderGeneralData()}
        ${this.__render('films')} ${this.__render('species')}
        ${this.__render('vehicles')} ${this.__render('starships')}
      </div>
    `;
  }
}
