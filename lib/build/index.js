const Ora = require('ora')()
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

module.exports = build
