const cac = require('cac')
const { version } = require('../package')

const cli = cac('weapp')

cli
  .command('create <app-name>', '创建一个项目')
  .action(name => {
    require('./create')(name)
  })

cli
  .command('build', '编译整个项目或某个页面')
  .option('--watch', '是否启用监听', { default: false })
  .action(input => {
    require('./build')(input.watch)
  })

cli
  .command('page <page-name>', '创建一个页面')
  .alias('p')
  .action(name => {
    require('./page-component')(name, 'page')
  })

cli
  .command('component <component-name>', '创建一个组件')
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
