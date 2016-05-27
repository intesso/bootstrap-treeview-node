var tree = require('../lib/directory-tree')
var cwd = tree('./', null, /^\./)

console.log(JSON.stringify(cwd, null, 2))
