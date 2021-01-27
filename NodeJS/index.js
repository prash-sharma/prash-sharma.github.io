const fs = require('fs')

fs.writeFileSync('asyncfs.js', 'const fs = require()')
fs.appendFileSync('readwrite.md', '---')
fs.appendFileSync('readwrite.md', '\n')
fs.appendFileSync('readwrite.md', `id: ${__filename}`)
fs.appendFileSync('readwrite.md', '\n')
fs.appendFileSync('readwrite.md', '---')

fs.appendFileSync('readwrite.md', '\n')
fs.appendFileSync('readwrite.md', '\n')

fs.appendFileSync('readwrite.md', '## An example file')
