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






if (
    (cellsWithValue[0] && cellsWithValue[1] && cellsWithValue[2]) === 'X' || 
    (cellsWithValue[3] && cellsWithValue[4] && cellsWithValue[5]) === 'X' ||
    (cellsWithValue[6] && cellsWithValue[7] && cellsWithValue[8]) === 'X' ||
    (cellsWithValue[0] && cellsWithValue[3] && cellsWithValue[6]) === 'X' ||
    (cellsWithValue[1] && cellsWithValue[4] && cellsWithValue[7]) === 'X' ||
    (cellsWithValue[2] && cellsWithValue[5] && cellsWithValue[8]) === 'X' ||
    (cellsWithValue[0] && cellsWithValue[4] && cellsWithValue[8]) === 'X' ||
    (cellsWithValue[2] && cellsWithValue[4] && cellsWithValue[6]) === 'X'){
    
    document.querySelector('.winner').textContent = 'Winner is X';

    CELLS.forEach((item) => item.removeEventListener('click', addInput));

    document.querySelector('.board').style.cursor = "not-allowed";

   // FILL EMPTY CELLS WITH SOMETHING

} else if((
        (cellsWithValue[0] && cellsWithValue[1] && cellsWithValue[2]) || 
        (cellsWithValue[3] && cellsWithValue[4] && cellsWithValue[5]) ||
        (cellsWithValue[6] && cellsWithValue[7] && cellsWithValue[8]) ||
        (cellsWithValue[0] && cellsWithValue[3] && cellsWithValue[6]) ||
        (cellsWithValue[1] && cellsWithValue[4] && cellsWithValue[7]) ||
        (cellsWithValue[2] && cellsWithValue[5] && cellsWithValue[8]) ||
        (cellsWithValue[0] && cellsWithValue[4] && cellsWithValue[8]) ||
        (cellsWithValue[2] && cellsWithValue[4] && cellsWithValue[6])) == 'O'){

    document.querySelector('.winner').innerHTML = 'Winner is O';

    CELLS.forEach((item) => item.removeEventListener('click', addInput));

    document.querySelector('.board').style.cursor = "not-allowed";

    // FILL EMPTY CELLS WITH SOMETHING
}