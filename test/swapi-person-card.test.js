import { html, fixture, expect } from '@open-wc/testing';

import '../swapi-person-card.js';

describe('SwapiPersonCard', () => {
  it('show not found', async () => {
    const el = await fixture(html`<swapi-person-card></swapi-person-card>`);
    expect(el.shadowRoot.querySelector('#container div').innerHTML).to.equal(
      'person not found'
    );
    expect(el.idPerson).to.equal(0);
    expect(el.data).to.equal(null);
  });

  it('load data to property', async () => {
    const data = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/6/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/7/',
      ],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
    const el = await fixture(
      html`<swapi-person-card .data=${data}></swapi-person-card>`
    );
    expect(el.data).to.not.be.null;
  });

  it('load data from id', async () => {
    const el = await fixture(
      html`<swapi-person-card id-person="2"></swapi-person-card>`
    );
    expect(el.idPerson).to.equal(2);
    await el.__loadPerson();
    expect(el.data).to.not.be.null;
  });

  it('load data from url', async () => {
    const el = await fixture(html` <swapi-person-card
      url="https://swapi.dev/api/people/3/"
    >
    </swapi-person-card>`);
    expect(el.idPerson).to.equal(3);
    await el.__loadPerson();
    expect(el.data).to.not.be.null;
  });

  it('load homeworld', async () => {
    const data = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/6/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/7/',
      ],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
    const el = await fixture(
      html`<swapi-person-card .data=${data}></swapi-person-card>`
    );
    expect(el.data).to.not.be.null;
    await el.__render('homeworld');
    expect(el.homeworld).to.not.be.null;
  });

  it('load data from url', async () => {
    const el = await fixture(html` <swapi-person-card
      url="https://swapi.dev/api/people/3/"
    >
    </swapi-person-card>`);
    expect(el.idPerson).to.equal(3);
    await el.__loadPerson();
    expect(el.data).to.not.be.null;
  });

  it('load vehicles', async () => {
    const data = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/6/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/7/',
      ],
      species: ['https://swapi.dev/api/species/1/'],
      vehicles: [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/30/',
      ],
      starships: [
        'https://swapi.dev/api/starships/12/',
        'https://swapi.dev/api/starships/22/',
      ],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };
    const el = await fixture(
      html`<swapi-person-card .data=${data}></swapi-person-card>`
    );
    expect(el.data).to.not.be.null;
    await el.__render('vehicles');
    expect(el.vehiclesTable).to.not.be.null;
  });

  it('return null at rendern attribute not found', async () => {
    const el = await fixture(html`<swapi-person-card></swapi-person-card>`);
    expect(el.__render('hi')).to.equal(null);
  });
});
