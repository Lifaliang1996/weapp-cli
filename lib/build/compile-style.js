const gulp = require('gulp')
const pathAlias = require('gulp-path-alias')
const gap = require('gulp-append-prepend')
const gulpIf = require('gulp-if')
const gulpLess = require('gulp-less')
const gulpSass = require('gulp-sass')
const gulpRename = require('gulp-rename')
const config = require('../config')

/**
 * 编译 wxss/less/scss 并输出到 .temp
 */
function compileStyle () {
  return new Promise((resolve, reject) => {
    gulp
      .src([`${config.current}/**/*.{wx,le,sc}ss`], {
        base: config.src
      })
      .pipe(
        gulpIf(
          file => file.path.includes('pages'),
          gap.prependText(config.css).on('error', reject)
        )
      )
      .pipe(
        pathAlias({
          paths: {
            '@': config.src,
            '~': config.src
          }
        }).on('error', reject)
      )
      .pipe(gulpIf(/.less$/, gulpLess()).on('error', reject))
      .pipe(gulpIf(/\.scss$/, gulpSass()).on('error', reject))
      .pipe(gulpRename({ extname: '.wxss' }).on('error', reject))
      .pipe(gulp.dest('.temp'))
      .on('error', reject)
      .on('finish', resolve)
  })
}

module.exports = compileStyle
