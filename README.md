# mp-cli

[![License][license-img]][license-url]
[![NPM Downloads][downloads-img]][downloads-url]
[![NPM Version][version-img]][version-url]
[![Dependency Status][dependency-img]][dependency-url]
[![devDependency Status][devdependency-img]][devdependency-url]
[![Code Style][style-img]][style-url]

> Awesome node modules.

## Installation

```shell
$ npm install mp-cli

# or yarn
$ yarn add mp-cli
```

## Usage

<!-- TODO: Introduction of Usage -->

```javascript
const mpCli = require('mp-cli')
const result = mpCli('w')
// result => 'w@zce.me'
```

## API

<!-- TODO: Introduction of API -->

### mpCli(input, options?)

#### input

- Type: `string`
- Details: name string

#### options

##### host

- Type: `string`
- Details: host string
- Default: `'zce.me'`

## CLI Usage

<!-- TODO: Introduction of CLI -->

Use npx:

```shell
$ npx mp-cli <input> [options]
```

Globally install:

```shell
$ npm install mp-cli -g
# or yarn
$ yarn global add mp-cli
```

```shell
$ mp-cli --help
demo v0.1.0

Usage:
  $ mp-cli <input>

Commands:
  <input>  Sample cli program

For more info, run any command with the `--help` flag:
  $ mp-cli --help

Options:
  --host <host>  Sample options
  -h, --help     Display this message
  -v, --version  Display version number

Examples:
  $ mp-cli w --host zce.me
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [LI_FA_LIANG](https://github.com/Lifaliang1996)



[license-img]: https://img.shields.io/github/license/lfl/mp-cli
[license-url]: https://github.com/lfl/mp-cli/blob/master/LICENSE
[downloads-img]: https://img.shields.io/npm/dm/mp-cli
[downloads-url]: https://npmjs.org/package/mp-cli
[version-img]: https://img.shields.io/npm/v/mp-cli
[version-url]: https://npmjs.org/package/mp-cli
[dependency-img]: https://img.shields.io/david/lfl/mp-cli
[dependency-url]: https://david-dm.org/lfl/mp-cli
[devdependency-img]: https://img.shields.io/david/dev/lfl/mp-cli
[devdependency-url]: https://david-dm.org/lfl/mp-cli?type=dev
[style-img]: https://img.shields.io/badge/code_style-standard-brightgreen
[style-url]: https://standardjs.com
