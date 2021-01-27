const os = require('os')

console.log(os.platform())

console.log(os.hostname())

console.log(os.arch())

const mst = os.cpus()

console.log(mst[0].model)

console.log(os.uptime() / 60 / 60 / 12)
