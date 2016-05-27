'use strict'

const FS = require('fs')
const PATH = require('path')

function directoryTree (path, opts) {
  opts = opts || {}
  const include = opts.include
  const ignore = opts.ignore
  const root = opts.root
  const text = PATH.basename(path)
  const href = root ? PATH.resolve(root, path) : path
  const item = { href, text }
  let stats

  try { stats = FS.statSync(path) } catch (e) { return null }

  if (stats.isFile()) {
    const ext = PATH.extname(path).toLowerCase()
    if (include && include instanceof RegExp && !include.test(text)) return null
    if (include && Array.isArray(include) && include.indexOf(ext) === -1) return null
    if (ignore && ignore instanceof RegExp && ignore.test(text)) return null
    if (ignore && ignore.length && ignore.indexOf(ext) !== -1) return null
    item.size = stats.size // File size in bytes
  } else {
    item.nodes = FS.readdirSync(path)
      .map(child => directoryTree(PATH.join(path, child), opts))
      .filter(e => !!e)
    if (!item.nodes.length) return null
    item.size = item.nodes.reduce((prev, cur) => prev + cur.size, 0)
  }
  return item
}

module.exports = directoryTree
