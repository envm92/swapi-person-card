[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/swapi-person-card)

# \<swapi-person-card>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i swapi-person-card
```

## Usage
```html
  <script type="module">
    import 'swapi-person-card/swapi-person-card.js';
  </script>

  <swapi-person-card></swapi-person-card>

  <swapi-person-card id-person="2">
  </swapi-person-card>

  <swapi-person-card url="https://swapi.dev/api/people/3/">
  </swapi-person-card>
```

### Attributes

|Name  	|Type  	|Example| Note  |
|---	|---	|---	|---	|
|data|Object| {} 	|   Only accepts schema for SWAPI	|
|id-person|Number | 1 , 2 | |
|url | String|  https://swapi.dev/api/people/3/ 	|If you use url and id-person, url has priority|



## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
npm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`

## History

Hey! I love StarWars and I'm learning to code web components and share with the world!


### Original documentation
Original documentation of [Star Wars API](https://swapi.dev/) by [Paul Hallet](http://phalt.co/)

at [https://swapi.co/documentation](https://swapi.co/documentation)

Star Wars and all associated names are copyright Lucasfilm ltd.

## Credits

*   Erika Valdes 

## License

[MIT Licensed](LICENSE)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)