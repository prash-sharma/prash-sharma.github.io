const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url == '/') {
        res.end('This is the homepage')
    } else if (req.url == `/about`) {
        res.end('This is an About page')
    } else if (req.url == '/contact') {
        res.end('This is a Contact page')
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })

        res.end('<h1>404 - Page not found</h1>')
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to the port number 8000')
})
