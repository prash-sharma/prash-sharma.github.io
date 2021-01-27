const fs = require('fs')

fs.mkdir('Ch2', (err) => {
    console.log(err)
})

fs.writeFile('Ch2/ch2.md', 'Sample text', (err) => {
    console.log(err)
})

fs.appendFile('Ch2/ch2.md', `\nThis is an added sentence`, (err) => {
    console.log(err)
})

fs.readFile('Ch2/ch2.md', 'utf-8', (err, res) => {
    console.log(err)
    console.log(res)
})

// fs.rename('Ch2/ch2.md', 'Ch2/ch.md', (err) => {
//     console.log(err)
//     fs.unlink('Ch2/ch.md', (err) => {
//         console.log(err)
//     })

//     fs.rmdir('Ch2', (err) => {
//         console.log(err)
//     })
// })
