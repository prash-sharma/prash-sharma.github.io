const fs = require('fs')
const http = require('http')
const path = require('path')

const server = http.createServer((req, res) => {
    const stream = fs.createReadStream('../../NodeJSHome/SampleMDs/Android.md')
    stream.pipe(res)
})

server.listen('3000', () => {
    console.log('Localhost at 3000')
})

file = path.basename('NodeJSHome/SampleMDs/Android.md')
console.log(file)
