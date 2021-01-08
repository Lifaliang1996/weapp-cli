const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpTS = require('gulp-typescript')
const pathAlias = require('gulp-path-alias')
const { pathResolve } = require('../utils')

const config = require('../config')

function compileScript () {
  let tsConfig = {}
  try {
    tsConfig = require(pathResolve('tsconfig.json'))
  } catch {}

  return new Promise((resolve, reject) => {
    gulp
      .src(
        [`${config.current}/**/*.{j,t}s`, `!${config.current}/typings/**/*`],
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
      .pipe(
        gulpIf(
          /.ts$/,
          gulpTS({
            ...tsConfig.compilerOptions,
            typeRoots: [pathResolve('src/typings')]
          })
        ).on('error', reject)
      )
      .pipe(gulp.dest('.temp'))
      .on('error', reject)
      .on('finish', resolve)
  })
}

module.exports = compileScript
