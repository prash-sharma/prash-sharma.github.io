const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const data = fs.readFileSync('animals.json', 'utf-8')

    if (req.url == '/') {
        res.end('This is homepage')
    } else if (req.url == '/api') {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(data)
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end('404 - Page not found')
    }
})

server.listen(8001, '127.0.0.1', () => {
    console.log('Listening to port number 8001')
})
