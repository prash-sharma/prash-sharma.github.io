// Get all buttons' initial values
let btnDefaultColor = document.getElementsByTagName('button');
// console.log(btnDefaultColor);
// console.log(btnDefaultColor.length);


// Store all buttons' initial values into an Array 
let copiedBtnDefaultColor = [];
for (let index = 0; index < btnDefaultColor.length; index++) {
    copiedBtnDefaultColor.push(btnDefaultColor[index].classList[1]);
}
// console.log(copiedBtnDefaultColor);

function updateColor(selectedProps){
    if (selectedProps.value === 'select') {
        return null
    } else if (selectedProps.value === 'green') {
        setNewColor('green')
    } else if (selectedProps.value === 'blue') {
        setNewColor('blue')
    } else if (selectedProps.value === 'yellow') {
        setNewColor('yellow')
    } else if (selectedProps.value === 'red') {
        setNewColor('red')
    } else if (selectedProps.value === 'orange') {
        setNewColor('orange')
    } else if (selectedProps.value === 'random') {
        setRandom()
    } else {
        setReset()
    }
}

function setNewColor(newColor){
    for (let index = 0; index < btnDefaultColor.length; index++) {
        btnDefaultColor[index].classList.remove(btnDefaultColor[index].classList[1])
        btnDefaultColor[index].classList.add(newColor)
    }
}

function setRandom(){
    let randomColors = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red']
    // let i = Math.floor( Math.random() * 7)
    // console.log(randomColors[i]);
    
    for (let index = 0; index < btnDefaultColor.length; index++) {
        btnDefaultColor[index].classList.remove(btnDefaultColor[index].classList[1])
        btnDefaultColor[index].classList.add(randomColors[Math.floor( Math.random() * 7)])
    }
}

function setReset(){
    for (let index = 0; index < btnDefaultColor.length; index++) {
        btnDefaultColor[index].classList.remove(btnDefaultColor[index].classList[1]);
        btnDefaultColor[index].classList.add(copiedBtnDefaultColor[index])
    }
}