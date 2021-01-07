const fs = require('fs')
const path = require('path')
const download = require('download')
const decompress = require('decompress')
const ora = require('ora')
const gulp = require('gulp')
const gulpEjs = require('gulp-ejs')
const inquire = require('./inquire')

async function createProject (name) {
  const isExists = fs.existsSync(path.join(process.cwd(), name))
  if (isExists) {
    throw new Error(`${name} 在当前文件夹下已存在!`)
  }

  try {
    const input = await inquire()
    input.projectName = name

    const downloading = ora('正在下载模板文件...').start()
    const templateUrl = `https://github.com/Lifaliang1996/weapp-templates-${input.script}/archive/main.zip`
    // 下载模板文件
    await download(
      templateUrl,
      name,
      { filename: 'template.zip' }
    )
    downloading.stop()

    const initializing = ora('正在初始化...').start()
    const filePath = `${name}/template.zip`
    // 解压模板文件
    await decompress(filePath, name, { strip: 1 })

    // 编译 ejs 语法
    gulp
      .src(['package.json', 'project.config.json', 'weapp.config.js'], {
        cwd: name
      })
      .pipe(gulpEjs(input))
      .pipe(gulp.dest(name))

    // 删除源文件
    fs.rmSync(filePath)
    initializing.stop()

    console.log('项目创建完成！\n')
    console.log(`cd ${name}`)
    console.log('npm run build\n')
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = createProject
