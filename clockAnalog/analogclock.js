setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock(){
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds()/60
    const minutesRatio = (secondsRatio + currentDate.getMinutes())/60
    const hourRatio = (minutesRatio + currentDate.getHours())/12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hourRatio)
}

function setRotation(element, ratationRatio){
    element.style.setProperty('--rotation', ratationRatio*360)
}

setInterval(numbertime, 1000)

function numbertime(){
    var nt = new Date()
    document.getElementById('digitaltime').innerHTML = nt.toLocaleTimeString()
}

setClock()