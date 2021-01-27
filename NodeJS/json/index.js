const fs = require('fs')

const details = {
    squad: 'DevX',
    members: 10,
}

// Convert to JSON

const jsonData = JSON.stringify(details)

fs.writeFile('jsonData.json', jsonData, (err) => {
    console.log(err)
})

fs.readFile('jsonData.json', 'utf-8', (err, data) => {
    console.log(err)
    const obj = JSON.parse(data)
    console.log(obj)
})
