const path = require('path')
const fs = require('fs')
const Ora = require('ora')()
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpRename = require('gulp-rename')

const cwd = process.cwd()

function createPageOrComponent (name, type = 'page') {
  const config = require('../config')

  const templatePath = path.join(__dirname, './templates', type)
  const destPath = `${config.src}/${type}s/${name}`

  const isExists = fs.existsSync(path.join(cwd, destPath))
  if (isExists) {
    Ora.fail(`${type} ${name} 已存在，若要重新创建，请先删除原文件夹`)
    return
  }

  // 创建 page/component
  gulp
    .src(`${templatePath}/**`, { base: templatePath })
    .pipe(gulpIf(/\.script$/, gulpRename({ extname: '.' + config.script })))
    .pipe(gulpIf(/\.style$/, gulpRename({ extname: '.' + config.style })))
    .pipe(gulp.dest(destPath))

  if (type === 'page') {
    // 更新 app.json 中的 pages
    try {
      const appJsonPath = path.join(cwd, `${config.src}/app.json`)
      const appJson = fs.readFileSync(appJsonPath, { encoding: 'utf-8' })
      const appConfig = JSON.parse(appJson)
      appConfig.pages.push(`pages/${name}/index`)
      fs.writeFileSync(appJsonPath, JSON.stringify(appConfig, null, 2))
    } catch (error) {
      Ora.fail(`app.json 添加 ${name} 路径失败，请尝试手动添加！`)
    }
  }

  Ora.succeed(`创建 ${type} ${name} 成功！`)
}

module.exports = createPageOrComponent
