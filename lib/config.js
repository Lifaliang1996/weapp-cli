const config = {
  script: 'js',
  style: 'wxss',
  src: 'src',
  dist: 'miniprogram',
  current: 'src'
}

// 读取用户配置
try {
  const { page, script, style } = require(`${process.cwd()}/weapp.config.js`)

  if (page) {
    config.current = `${config.src}/pages/${page}`
  }
  if (script) {
    config.script = script
  }
  if (style) {
    config.style = style
  }
} catch {
  throw new Error('根目录下不存在 weapp.config.js 文件')
}

module.exports = config
