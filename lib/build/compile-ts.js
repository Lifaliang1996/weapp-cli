const gulp = require('gulp')
const gulpTS = require('gulp-typescript')
const config = require('../config')

function compileTS () {
  let tsConfig = {}
  try {
    tsConfig = require(`${process.cwd()}/tsconfig.json`)
  } catch (error) {
  }

  return gulp
    .src(`${config.current}/**/*.ts`, { base: config.src })
    .pipe(
      gulpTS({
        ...tsConfig.compilerOptions,
        typeRoots: [`${process.cwd()}/src/typings`]
      })
    )
    .pipe(gulp.dest(config.dist))
}

module.exports = compileTS
