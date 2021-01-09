const gulp = require('gulp')
const pathAlias = require('gulp-path-alias')
const config = require('../config')

/**
 * 编译 json wxml 中的路径别名并输出到 .temp
 */
function compileAlias () {
  return new Promise((resolve, reject) => {
    gulp
      .src([`${config.current}/**/*.{json,wxml}`], {
        base: config.src
      })
      .pipe(
        pathAlias({
          paths: {
            '@': config.src,
            '~': config.src
          }
        }).on('error', reject)
      )
      .pipe(gulp.dest('.temp'))
      .on('error', reject)
      .on('finish', resolve)
  })
}

/**
 * 将静态资源拷贝到 dist 目录
 */
function copyStaticToDist () {
  return new Promise((resolve, reject) => {
    gulp
      .src([`${config.current}/**/*.{jpg,jpeg,png,apng,gif,webp,svg,bmp,tif}`], {
        base: config.src
      })
      .pipe(gulp.dest(config.dist))
      .on('error', reject)
      .on('finish', resolve)
  })
}

/**
 * 将 .temp 目录的文件拷贝到 dist
 */
function copyTempToDist () {
  return new Promise((resolve, reject) => {
    gulp
      .src('.temp/**/*', { base: '.temp' })
      .pipe(gulp.dest(config.dist))
      .on('error', reject)
      .on('finish', resolve)
  })
}

module.exports = {
  compileAlias,
  copyTempToDist,
  copyStaticToDist
}
