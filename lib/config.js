const { pathResolve, pathJoin } = require('./utils')

const config = {
  src: 'src',
  dist: 'miniprogram',
  current: 'src',
  script: 'js',
  style: 'wxss',
  page: null,
  css: []
}

try {
  // 读取用户配置
  const { page, script, style, css } = require(pathResolve('weapp.config.js'))

  if (page) {
    config.current = pathJoin(config.src, 'pages', page)
    config.page = true
  }

  if (script) {
    config.script = script
  }

  if (style) {
    config.style = style
  }

  if (css) {
    if (!Array.isArray(css) || css.length === 0) {
      throw new Error('weapp.config.js 的 css 属性必须为绝对路径数组')
    }
    // 向每个样式文件中注入公共样式文件，主要为 scss/lees 变量
    config.css = css.map(path => `@import "${path}";`)
  }
} catch (error) {
  throw new Error(error)
}

module.exports = config
