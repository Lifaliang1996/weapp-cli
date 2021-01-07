const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const gulpRename = require('gulp-rename')
const config = require('../config')

function compileSass () {
  return gulp
    .src([`${config.current}/**/*.scss`, `${config.src}/**/*.sass`], {
      base: config.src
    })
    .pipe(gulpSass({ outputStyle: 'expanded' }).on('error', gulpSass.logError))
    .pipe(
      gulpRename(function (path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(config.dist))
}

module.exports = compileSass
