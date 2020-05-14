const inputButtons = document.querySelectorAll('.inputValues');
const operatorButtons = document.querySelectorAll('.operator');
const delButton = document.querySelector('.del');
const acButton = document.querySelector('.ac');
const equalsButton = document.querySelector('.equals');
const results = document.querySelector('.results');



// NUMBER BUTTONS
inputButtons.forEach(numberEventListener);

function numberEventListener(item){
    item.addEventListener('click', (e) => {
        
        let inputVal = e.target.innerText;
        console.log(inputVal);
        if (inputVal === '.' && results.textContent.includes('.')){
            return
        } else {
            results.textContent = results.textContent + inputVal;
        }
    })
};


// DELETE BUTTON
// delButton.addEventListener('click', () => results.textContent = results.textContent.substring(0, results.textContent.length-1));

delButton.addEventListener('click', () => results.textContent = results.textContent.slice(0, -1));


// AC BUTTON
acButton.addEventListener('click', () => results.textContent = '');


// OPERATORS

operatorButtons.forEach(operatorEventListener);

console.log(operatorButtons);


function operatorEventListener(item){
    item.addEventListener('click', addOperator);

    function addOperator(e){
        

        if (results.textContent.includes(e.operator)){
            return
        } else{
            results.textContent += e.target.textContent;
        }

    }
}


// EQUALS

equalsButton.addEventListener('click', calculate);

function calculate(){
    console.log(results.textContent);
    
    let answer = eval(results.textContent);
    console.log(answer);
    
}