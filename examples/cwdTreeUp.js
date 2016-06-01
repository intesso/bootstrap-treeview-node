var tree = require('../lib/directory-tree')
var relPath = '../node_modules'
var cwdTree = tree(relPath, {
  ignore: /^\./,
  href: function (path) { return path.replace(relPath, '') },
  root: '/'
})

console.log(JSON.stringify(cwdTree, null, 2))
