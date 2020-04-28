document.querySelector('.board').style.cursor = "url(images/x.png), auto";

let player1 = true;

let winner = false;

let cellsWithValue = [];

const CELLS = document.querySelectorAll('.cell');

let inputCounter = 0;

CELLS.forEach(eventListener);

function eventListener(item){
    item.addEventListener('click', addInput, {once: true})
}

function addInput(event){
    

    let clickedId = (parseInt(event.target.id) - 1);    
    
    // document.getElementById()
    
    if (player1){
        CELLS[clickedId].textContent = 'X';
        changeCursor('o');
        player1 = false
    } else {
        CELLS[clickedId].textContent = 'O';
        CELLS[clickedId].style.color = 'red';
        changeCursor('x');
        player1 = true
    }

    inputCounter++
    
    cellsWithValue[clickedId] = CELLS[clickedId].innerHTML;

    if (inputCounter >= 5){
        getWinner(cellsWithValue);
    } 
}

// GET WINNER

function getWinner(cellsWithValue){
    console.log('Ya ha ha, you found me!!');
    console.log(cellsWithValue);


    if ((cellsWithValue[0] == 'X' && cellsWithValue[1] == 'X' && cellsWithValue[2] == 'X') || 
    (cellsWithValue[3] == 'X' && cellsWithValue[4] == 'X' && cellsWithValue[5] == 'X') ||
    (cellsWithValue[6] == 'X' && cellsWithValue[7] == 'X' && cellsWithValue[8] == 'X')){
        
        document.querySelector('.winner').innerHTML = 'Winner is X';

        CELLS.forEach((item) => item.removeEventListener('click', addInput));

        document.querySelector('.board').style.cursor = "not-allowed";

       // FILL EMPTY CELLS WITH SOMETHING

    }
}


// CHANGE CURSOR

function changeCursor(player){
    if (player == 'x') {
        document.querySelector('.board').style.cursor = "url(images/x.png), auto";
    } else if (player == 'o') {
        document.querySelector('.board').style.cursor = "url(images/o.png), auto";
    } 
}


    // cellsWithValue[3]
    // cellsWithValue[4]
    // cellsWithValue[5]

    // cellsWithValue[6]
    // cellsWithValue[7]
    // cellsWithValue[8]

    // cellsWithValue[0]
    // cellsWithValue[3]
    // cellsWithValue[6]

    // cellsWithValue[1]
    // cellsWithValue[4]
    // cellsWithValue[7]

    // cellsWithValue[2]
    // cellsWithValue[5]
    // cellsWithValue[8]

    // cellsWithValue[0]
    // cellsWithValue[4]
    // cellsWithValue[8]

    // cellsWithValue[2]
    // cellsWithValue[4]
    // cellsWithValue[6]
    
    
    

    // if (cellsWithValue[]) {
        
    //     [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    //     [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //     [0, 4, 8], [2, 4, 6] 



    // }




// // GET WINNER
// function getWinner(){
    
//     if ( (c1.innerText =='X' && c2.innerText == 'X' && c3.innerText == 'X') || 
//          (c4.innerText =='X' && c5.innerText == 'X' && c6.innerText == 'X') || 
//          (c7.innerText =='X' && c8.innerText == 'X' && c9.innerText == 'X') || 

//          (c1.innerText =='X' && c4.innerText == 'X' && c7.innerText == 'X') ||
//          (c2.innerText =='X' && c5.innerText == 'X' && c8.innerText == 'X') ||
//          (c3.innerText =='X' && c6.innerText == 'X' && c9.innerText == 'X') ||

//          (c1.innerText =='X' && c5.innerText == 'X' && c9.innerText == 'X') ||
//          (c3.innerText =='X' && c5.innerText == 'X' && c7.innerText == 'X') ) {
            
//         winner = 'X';
        
//         document.querySelector('#cell1').removeEventListener('click', addInput1);

//         document.querySelector('#cell2').removeEventListener('click', addInput2);

//         document.querySelector('#cell3').removeEventListener('click', addInput3);

//         document.querySelector('#cell4').removeEventListener('click', addInput4);

//         document.querySelector('#cell5').removeEventListener('click', addInput5);

//         document.querySelector('#cell6').removeEventListener('click', addInput6);

//         document.querySelector('#cell7').removeEventListener('click', addInput7);

//         document.querySelector('#cell8').removeEventListener('click', addInput8);

//         document.querySelector('#cell9').removeEventListener('click', addInput9);

//         console.log('X wins');
        
        
        

//     } else if ( (c1.innerText =='O' && c2.innerText == 'O' && c3.innerText == 'O') || 
//                 (c4.innerText =='O' && c5.innerText == 'O' && c6.innerText == 'O') || 
//                 (c7.innerText =='O' && c8.innerText == 'O' && c9.innerText == 'O') || 

//                 (c1.innerText =='O' && c4.innerText == 'O' && c7.innerText == 'O') ||
//                 (c2.innerText =='O' && c5.innerText == 'O' && c8.innerText == 'O') ||
//                 (c3.innerText =='O' && c6.innerText == 'O' && c9.innerText == 'O') ||

//                 (c1.innerText =='O' && c5.innerText == 'O' && c9.innerText == 'O') ||
//                 (c3.innerText =='O' && c5.innerText == 'O' && c7.innerText == 'O')) {
        
//         winner = 'O';

//         document.querySelector('#cell1').removeEventListener('click', addInput1);

//         document.querySelector('#cell2').removeEventListener('click', addInput2);

//         document.querySelector('#cell3').removeEventListener('click', addInput3);

//         document.querySelector('#cell4').removeEventListener('click', addInput4);

//         document.querySelector('#cell5').removeEventListener('click', addInput5);

//         document.querySelector('#cell6').removeEventListener('click', addInput6);

//         document.querySelector('#cell7').removeEventListener('click', addInput7);

//         document.querySelector('#cell8').removeEventListener('click', addInput8);

//         document.querySelector('#cell9').removeEventListener('click', addInput9);

//         console.log('Zero wins');
        
        
//     } 

//     if (winner == 'X' || winner == 'O'){
//         document.querySelector('.winner').textContent = (`Winner is: ${winner}`);
//         document.querySelector('.board').style.cursor = "not-allowed";
//     } else {
//         document.querySelector('.winner').textContent = (`It's a draw`);
//     }
   
// }



// console.log(winner);







