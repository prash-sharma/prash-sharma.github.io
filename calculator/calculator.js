const inputButtons = document.querySelectorAll('.inputValues');
const operatorButtons = document.querySelectorAll('.operator');
const delButton = document.querySelector('.del');
const acButton = document.querySelector('.ac');
const equalsButton = document.querySelector('.equals');
const results = document.querySelector('.results');


inputButtons.forEach(eventListener);

function eventListener(item){
    item.addEventListener('click', (e) => {
        
        let inputVal = e.target.innerText;
        console.log(inputVal);
        
        results.textContent = results.textContent + inputVal;
    })
};
