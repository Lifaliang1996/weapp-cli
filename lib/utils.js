/**
 * 将路径拼接到 cwd
 * @param  {...string} paths 路径
 */
function pathResolve (...paths) {
  return pathJoin(process.cwd(), ...paths)
}

/**
 * 将路径拼接
 * @param  {...string} paths 路径
 */
function pathJoin (...paths) {
  return paths.join('/')
}

module.exports = {
  pathResolve,
  pathJoin
}
