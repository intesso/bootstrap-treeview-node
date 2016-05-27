'use strict'

const FS = require('fs')
const PATH = require('path')

function directoryTree (path, includes, ignores) {
  const text = PATH.basename(path)
  const item = { href: path, text }
  let stats

  try { stats = FS.statSync(path) } catch (e) { return null }

  if (stats.isFile()) {
    const ext = PATH.extname(path).toLowerCase()
    if (includes && includes instanceof RegExp && !includes.test(text)) return null
    if (includes && Array.isArray(includes) && includes.indexOf(ext) === -1) return null
    if (ignores && ignores instanceof RegExp && ignores.test(text)) return null
    if (ignores && ignores.length && ignores.indexOf(ext) !== -1) return null
    item.size = stats.size // File size in bytes
  } else {
    item.nodes = FS.readdirSync(path)
      .map(child => directoryTree(PATH.join(path, child), includes, ignores))
      .filter(e => !!e)
    if (!item.nodes.length) return null
    item.size = item.nodes.reduce((prev, cur) => prev + cur.size, 0)
  }
  return item
}

module.exports = directoryTree
