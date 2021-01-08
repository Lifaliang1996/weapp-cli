const gulp = require('gulp')
const pathAlias = require('gulp-path-alias')
const config = require('../config')

function copySrcToTemp () {
  return new Promise((resolve, reject) => {
    gulp
      .src(
        [
          `${config.current}/**/*.json`,
          `${config.current}/**/*.wxml`
        ],
        { base: config.src }
      )
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
  copySrcToTemp,
  copyTempToDist
}
