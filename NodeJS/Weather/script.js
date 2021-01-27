const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
]

const d = new Date()
const date = d.getDate()
const month = d.getMonth()
const day = d.getDay()

document.querySelector(
    '#date'
).innerHTML = `${days[day]}, ${date} ${months[month]}`

setInterval(timer, 1000)

function timer() {
    var t = new Date()
    document.getElementById('time').innerHTML = t.toLocaleTimeString()
}

let weatherCon = document.querySelector('#weathercon')
