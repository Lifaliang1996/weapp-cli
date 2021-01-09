const Ora = require('ora')()
const { watch } = require('gulp')
const compileScript = require('./compile-script')
const compileStyle = require('./compile-style')
const { copySrcToTemp, copyTempToDist } = require('./copy')
const { cleanDist, cleanTemp } = require('./clean')

async function build () {
  try {
    Ora.start('正在编译...\n')

    await Promise.all([compileScript(), compileStyle(), copySrcToTemp()])
    await cleanDist()
    await copyTempToDist()

    Ora.succeed('编译成功!\n')
  } catch (error) {
    Ora.fail('编译失败!\n')
    throw new Error(error.message)
  } finally {
    await cleanTemp()
  }
}

function buildWatch () {
  watch('src/**/*', { events: 'all', ignoreInitial: false, delay: 500 }, async () => {
    await build()
    console.log('监听文件改变...')
    return Promise.resolve()
  })
}

function buildBase (watch) {
  watch ? buildWatch() : build()
}

module.exports = buildBase
