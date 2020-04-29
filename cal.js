let arr = ['a', 'n', 'a', 'b', 'a', 'm']

if ( (arr[0] && arr[1] && arr[2]) === 'a') {
    console.log('Value is a');
}

// ------------------------------

if ( arr[0] === 'a' && arr[1] === 'a' && arr[2] === 'a') {
    console.log('Value is a');
}

// let previousInputs = {};

// let answer;


// let x = 5;
// let y = 10;
// let z = 20;
// let a = 5;
// let b = 6;

// calculateSquare(x);
// calculateSquare(y);
// calculateSquare(z);
// calculateSquare(a);
// calculateSquare(b);


// function calculateSquare(input){
    
//     if (previousInputs[input]){
    
//         answer = previousInputs[input];
        
//         console.log(`I'm from exiting object: ${answer}`);
        
//         return answer;
//     } else {
//         let key = input;
//         answer = input * input;
//         previousInputs[key] = answer;
        
//         console.log(`I'm just calculated: ${answer}`);
        
        
//         return answer;
//     }    
// };

// let h = document.createElement('p');
// h.textContent = answer;


// document.body.appendChild(h);


// previousInputs.new = 800;

// previousInputs['new'] = 70000;


// console.log(previousInputs);



