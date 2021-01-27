const fs = require('fs')

// fs.mkdir('Abc', (err) => {
//     console.log(err)
// })

// fs.copyFile('readwrite.md', 'Abc/xyz.md', (err) => {
//     console.log(err)
// })

const copiedcontent = fs.readFileSync('readwrite.md', 'utf-8', (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res)
    }
})

fs.appendFileSync('Abc/xyz.md', '---\nid: xyz\n---\n')

fs.appendFileSync('Abc/xyz.md', `${copiedcontent}`, (err) => {
    console.log(err)
})
