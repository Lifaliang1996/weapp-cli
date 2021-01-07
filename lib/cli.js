const cac = require('cac')
const { version } = require('../package')

const cli = cac('weapp')

cli
  .command('create <app-name>', 'Create a new project')
  .action(name => {
    require('./create')(name)
  })

cli
  .command('build', 'Compile project or page')
  .action(() => {
    require('./build')()
  })

cli
  .command('page <page-name>', 'Create a page')
  .alias('p')
  .action(name => {
    require('./page-component')(name, 'page')
  })

cli
  .command('component <component-name>', 'Create a component')
  .alias('cpt')
  .action(name => {
    require('./page-component')(name, 'component')
  })

cli
  .help()
  .version(version)
  .parse()

// Unified error handling
const onError = err => {
  console.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)
