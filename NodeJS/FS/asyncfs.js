const fs = require('fs')

fs.writeFile('asyncwrite.md', '', (err) => {
    console.log(err)
    return
})

fs.appendFile('asyncwrite.md', 'Hello, I am an async file', (err) => {
    console.log(err)
})

fs.readFile('asyncwrite.md', 'utf-8', (err, res) => {
    console.log(err)
    console.log(res)
})
