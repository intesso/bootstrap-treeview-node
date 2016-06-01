'use strict'

const FS = require('fs')
const PATH = require('path')

function directoryTree (path, opts) {
  opts = opts || {}
  let href, stats
  const text = PATH.basename(path)
  href = opts.href ? opts.href(path) : path
  href = opts.root ? PATH.resolve(opts.root, href) : href
  const item = { href, text }

  try { stats = FS.statSync(path) } catch (e) { return null }

  if (stats.isFile()) {
    const ext = PATH.extname(path).toLowerCase()
    if (opts.ignore && opts.include instanceof RegExp && !opts.include.test(text)) return null
    if (opts.include && Array.isArray(opts.include) && opts.include.indexOf(ext) === -1) return null
    if (opts.ignore && opts.ignore instanceof RegExp && opts.ignore.test(text)) return null
    if (opts.ignore && opts.ignore.length && opts.ignore.indexOf(ext) !== -1) return null
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
