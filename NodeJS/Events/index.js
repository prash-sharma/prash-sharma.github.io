const EventEmitter = require('events')

const event = new EventEmitter()

event.on('Hello', (sc, sm) => {
    console.log('Hello DevX')
    console.log(`Status Code: ${sc}. Status message: ${sm} `)
})

event.on('Hello', () => {
    console.log('DevX is the best.')
})

event.emit('Hello', 200, 'ok')
