const del = require('del')
const config = require('../config')

/**
 * 删除旧的编译结果
 */
async function cleanDist () {
  const cleanDir = config.current.replace(config.src, config.dist)
  await del([`${cleanDir}/*`, `!${cleanDir}/miniprogram_npm`])
}

/**
 * 删除 .temp
 */
async function cleanTemp () {
  await del('.temp')
}

module.exports = { cleanDist, cleanTemp }
