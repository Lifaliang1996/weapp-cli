const gulp = require('gulp')
const gulpClean = require('gulp-clean')
const config = require('../config')

function clean () {
  const cleanDir = config.current.replace(config.src, config.dist)
  return gulp
    .src([cleanDir, `!${config.src}/miniprogram_npm/`], { read: false, allowEmpty: true })
    .pipe(gulpClean())
}

module.exports = clean
