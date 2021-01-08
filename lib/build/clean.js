const del = require('del')
const config = require('../config')

async function cleanDist () {
  const cleanDir = config.current.replace(config.src, config.dist)
  await del([`${cleanDir}/*`, `!${cleanDir}/miniprogram_npm`])
}

async function cleanTemp () {
  await del('.temp')
}

module.exports = { cleanDist, cleanTemp }
