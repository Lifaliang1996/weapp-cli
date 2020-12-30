#!/usr/bin/env node

const cac = require('cac')
const mpCli = require('..')
const { name, version } = require('../package')

// Unified error handling
/* istanbul ignore next */
const onError = err => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)

const cli = cac(name)

// TODO: Implement module cli

cli
  .command('<input>', 'Sample cli program')
  .option('--host <host>', 'Sample options')
  .example(`  $ mp-cli w --host zce.me`)
  .action((input, options) => {
    console.log(mpCli(input, options))
  })

cli.help().version(version).parse()
