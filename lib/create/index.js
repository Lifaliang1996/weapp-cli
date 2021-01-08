const fs = require('fs')
const del = require('del')
const { pathResolve, pathJoin } = require('../utils')
const download = require('download')
const decompress = require('decompress')
const Ora = require('ora')()
const inquire = require('./inquire')
const { compileEjs, rename } = require('./init')

async function createProject (projectName) {
  const isExists = fs.existsSync(pathResolve(projectName))
  if (isExists) {
    throw new Error(`${projectName} 在当前文件夹下已存在!`)
  }

  try {
    const input = await inquire()
    input.projectName = projectName

    Ora.start('正在下载模板文件...')
    const templateUrl = `https://github.com/Lifaliang1996/weapp-templates-${input.script}/archive/main.zip`
    // 下载模板文件
    await download(templateUrl, projectName, { filename: 'template.zip' })
    Ora.succeed('模板下载完成！')

    Ora.start('正在初始化项目...')
    const templateFilePath = `${projectName}/template.zip`
    // 解压模板文件
    await decompress(templateFilePath, projectName, { strip: 1 })
    // 编译 ejs 语法
    await compileEjs(projectName, input)
    // 修改文件扩展名
    await rename(projectName, input.style)
    // 删除源文件
    await del([templateFilePath, pathJoin(projectName, 'src/**/*.style')])

    Ora.succeed('项目创建成功！\n')
    console.log(`cd ${projectName}`)
    console.log('npm run build\n')
  } catch (error) {
    Ora.fail('项目创建失败，请重试！')
    del(projectName)
    throw new Error(error.message)
  }
}

module.exports = createProject
