const { series, parallel } = require('gulp')
const ora = require('ora')
const compileSass = require('./compile-sass')
const compileTS = require('./compile-ts')
const copyFile = require('./copyfile')
const clean = require('./clean')

function build () {
  const loading = ora('正在编译...').start()
  const tasks = series(clean, parallel(compileSass, compileTS, copyFile))
  tasks()
  loading.stop()
  console.log('编译完成！')
}

module.exports = build
