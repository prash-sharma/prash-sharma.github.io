const fs = require('fs')
const http = require('http')

fs.writeFile('text.md', 'Hello everybody, welcome!!', (err) => {
    console.log(err)
})

// fs.unlink('text.mt', (err) => {
//     console.log(err)
// })

const server = http.createServer((req, res) => {
    console.log(req)
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Port: 8000')
})

/* Streaming with Pipe */

server.on('request', (req, res) => {
    const rstream = fs.createReadStream('text.md')
    rstream.pipe(res)
})

/* Stream way - withou pipe*/

// server.on('request', (req, res) => {
//     const readstream = fs.createReadStream('text.md')

//     readstream.on('data', (chunkdata) => {
//         res.write(chunkdata)
//     })
//     readstream.on('end', () => {
//         res.end()
//     })
//     readstream.on('error', (err) => {
//         console.log(err)
//         res.end('File not found')
//     })
// })

/* Traditional way */
// server.on('request', (req, res) => {
//     fs.readFile('text.md', 'utf-8', (err, data) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.end(data)
//         }
//     })
// })
