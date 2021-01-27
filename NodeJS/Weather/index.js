// https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=4a85ac04ee96dc62d0394ee4ace36752

// const https = require('https')
// const fs = require('fs')

// const homePage = fs.readFileSync('home.html', 'utf-8')

// const server = https.createServer((req, res) => {})

// server.listen('8500', '127.0.0.1')

// server.on('request', (req, res) => {
//     const rstream = fs.createReadStream('text.md')
//     rstream.pipe(res)
// })

const http = require('http')
const fs = require('fs')
const axios = require('axios')

const weatherapi =
    'http://api.openweathermap.org/data/2.5/weather?q=sydney&appid=4a85ac04ee96dc62d0394ee4ace36752'

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        axios
            .get(`${weatherapi}`)
            .then((res) => {
                const arrData = [res]
                const realTimeData = arrData.map((value) => {
                    console.log(value)
                    return value
                })
                // console.log(realTimeData)
                return realTimeData
            })
            .then((realTimeData) => {
                res.write(`${realTimeData[0].data.name}`, 'utf-8')
                res.end()
            })
            .catch((err) => {
                console.log(err)
            })
    }
})

server.listen('8500', '127.0.0.1', () => {
    console.log('listening to port 8500')
})
