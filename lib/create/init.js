const gulp = require('gulp')
const gulpEjs = require('gulp-ejs')
const gulpRename = require('gulp-rename')

async function compileEjs (projectName, input) {
  return new Promise((resolve, reject) => {
    gulp
      .src(['package.json', 'project.config.json', 'weapp.config.js'], {
        cwd: projectName
      })
      .pipe(gulpEjs(input).on('error', reject))
      .pipe(gulp.dest(projectName))
      .on('finish', resolve)
  })
}

async function rename (projectName, style) {
  return new Promise((resolve, reject) => {
    gulp
      .src('src/**/*.style', {
        cwd: projectName,
        base: 'src'
      })
      .pipe(gulpRename({ extname: '.' + style }).on('error', reject))
      .pipe(gulp.dest('src'))
      .on('finish', resolve)
  })
}

module.exports = {
  compileEjs,
  rename
}
