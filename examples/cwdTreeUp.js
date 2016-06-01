var tree = require('../lib/directory-tree')
var cwdTree = tree('../', {
  ignore: /^\./,
  root: '/'
})

console.log(JSON.stringify(cwdTree, null, 2))
