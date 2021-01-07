const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const gulpRename = require('gulp-rename')

const cwd = process.cwd()

function createPageOrComponent (name, type = 'page') {
  const config = require('../config')
  console.log(config)

  const templatePath = path.join(__dirname, '../../templates/', type)
  const destPath = `${config.src}/${type}s/${name}`

  const isExists = fs.existsSync(path.join(cwd, destPath))
  if (isExists) {
    throw new Error(`${type} ${name} 已存在，若要重新创建，请先删除原文件夹`)
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
      console.error('app.json 添加 page 路径失败，请尝试手动添加！')
    }
  }

  console.log('创建成功！')
}

module.exports = createPageOrComponent
