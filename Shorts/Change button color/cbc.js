// Get all buttons' initial values
let btnDefaultColor = document.getElementsByTagName('button');
// console.log(btnDefaultColor);
// console.log(btnDefaultColor.length);


// Store all buttons' initial values into an Array 
let copiedBtnDefaultColor = [];
for (let index = 0; index < btnDefaultColor.length; index++) {
    copiedBtnDefaultColor.push(btnDefaultColor[index]);
}
// console.log(copiedBtnDefaultColor);

function updateColor(selectProps){
    if (selectProps.value === 'select') {
        return null
    } else if (selectProps.value == 'green') {
        btnGreen();
    }
    
}
