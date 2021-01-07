const gulp = require('gulp')
const config = require('../config')

function copyFile () {
  return gulp
    .src(
      [
        `${config.current}/**/*.json`,
        `${config.current}/**/*.wxml`,
        `${config.current}/**/*.wxss`,
        `${config.current}/**/*.js`
      ],
      { base: config.src }
    )
    .pipe(gulp.dest(config.dist))
}

module.exports = copyFile
