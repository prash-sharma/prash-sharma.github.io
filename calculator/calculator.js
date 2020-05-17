const inputButtons = document.querySelectorAll('.inputValues');
const operatorButtons = document.querySelectorAll('.operator');
const delButton = document.querySelector('.del');
const acButton = document.querySelector('.ac');
const equalsButton = document.querySelector('.equals');
const input = document.querySelector('#input');
const answer = document.querySelector('#answer')
const lastChar = input.textContent.length-1;



// NUMBER BUTTONS
inputButtons.forEach(numberEventListener);

function numberEventListener(item){
    item.addEventListener('click', (e) => {
        
        let inputVal = e.target.innerText;
        console.log(inputVal);
        if (inputVal === '.' && input.textContent.includes('.')){
            return
        } else {
            input.textContent = input.textContent + inputVal;
        }
        console.log(input.textContent);
    })
};



function addInput(e){
    let inputVal = e.target.innerText;
        console.log(inputVal);
        if (inputVal === '.' && input.textContent.includes('.')){
            return
        } else {
            input.textContent = input.textContent + inputVal;
        }
        console.log(input.textContent);
}


// OPERATORS

operatorButtons.forEach(operatorEventListener);

console.log(operatorButtons);

function operatorEventListener(item){
    item.addEventListener('click', addOperator);

    function addOperator(e){
        
        // if (input.textContent.endsWith(e.target.textContent)){
        if (input.textContent.endsWith('+') ||
         input.textContent.endsWith('-') || 
         input.textContent.endsWith('/') ||
         input.textContent.endsWith('*')){    
            return
        } else{
            input.textContent += e.target.textContent;
        }

    }
};

// EQUALS

equalsButton.addEventListener('click', calculate);

function calculate(){
    console.log(input.textContent);
    
    let total = eval(input.textContent);
   
    answer.textContent = total;
}


// DELETE BUTTON
delButton.addEventListener('click', () => input.textContent = input.textContent.slice(0, -1));

// AC BUTTON
acButton.addEventListener('click', () => {
    input.textContent = '';
    answer.textContent = '';
});



