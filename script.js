setInterval(timer, 1000);
function timer(){
    var d = new Date();
    document.getElementById('time').innerHTML = d.toLocaleTimeString();
}
