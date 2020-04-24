// prompt('Hello world');

const WIN = []


let player1 = true
let winner

const allCells = document.querySelectorAll('.cell');

console.log(allCells);


let c1 = document.getElementById('cell1')
let c2 = document.getElementById('cell2')
let c3 = document.getElementById('cell3')
let c4 = document.getElementById('cell4')
let c5 = document.getElementById('cell5')
let c6 = document.getElementById('cell6')
let c7 = document.getElementById('cell7')
let c8 = document.getElementById('cell8')
let c9 = document.getElementById('cell9')


document.querySelector('#cell1').addEventListener('click', addInput1, {once: true})
document.querySelector('#cell2').addEventListener('click', addInput2, {once: true})
document.querySelector('#cell3').addEventListener('click', addInput3, {once: true})
document.querySelector('#cell4').addEventListener('click', addInput4, {once: true})
document.querySelector('#cell5').addEventListener('click', addInput5, {once: true})
document.querySelector('#cell6').addEventListener('click', addInput6, {once: true})
document.querySelector('#cell7').addEventListener('click', addInput7, {once: true})
document.querySelector('#cell8').addEventListener('click', addInput8, {once: true})
document.querySelector('#cell9').addEventListener('click', addInput9, {once: true})


function addInput1(){
    
    if (player1){
        c1.textContent = 'X';
        player1 = false
    } else {
        c1.textContent = 'O';
        c1.style.color = 'red';

        player1 = true
    }
    
    getWinner();
}


function addInput2(){
    
    if (player1){
        c2.textContent = 'X';
        player1 = false
    } else {
        c2.textContent = 'O';
        c2.style.color = 'red';

        player1 = true
    }

    getWinner();
}


function addInput3(){
    
    if (player1){
        c3.textContent = 'X';
        player1 = false
    } else {
        c3.textContent = 'O';
        c3.style.color = 'red';

        player1 = true
    }

    getWinner();
}

function addInput4(){
    
    if (player1){
        c4.textContent = 'X';
        player1 = false
    } else {
        c4.textContent = 'O';
        c4.style.color = 'red';

        player1 = true
    }

    getWinner();
}

function addInput5(){
    
    if (player1){
        c5.textContent = 'X';
        player1 = false
    } else {
        c5.textContent = 'O';
        c5.style.color = 'red';

        player1 = true
    }

    getWinner();
}

function addInput6(){
    
    if (player1){
        c6.textContent = 'X';
        player1 = false
    } else {
        c6.textContent = 'O';
        c6.style.color = 'red';

        player1 = true
    }

    getWinner();
}

function addInput7(){
    
    if (player1){
        c7.textContent = 'X';
        player1 = false
    } else {
        c7.textContent = 'O';
        c7.style.color = 'red';

        player1 = true
    }
    
    getWinner();
}

function addInput8(){
    
    if (player1){
        c8.textContent = 'X';
        player1 = false
    } else {
        c8.textContent = 'O';
        c8.style.color = 'red';

        player1 = true
    }

    getWinner();
}

function addInput9(){
    
    if (player1){
        c9.textContent = 'X';
        player1 = false
    } else {
        c9.textContent = 'O';
        c9.style.color = 'red';

        player1 = true
    }

    getWinner();
}


// GET WINNER
function getWinner(){
    
    if ( (c1.innerText =='X' && c2.innerText == 'X' && c3.innerText == 'X') || 
         (c4.innerText =='X' && c5.innerText == 'X' && c6.innerText == 'X') || 
         (c7.innerText =='X' && c8.innerText == 'X' && c9.innerText == 'X') || 

         (c1.innerText =='X' && c4.innerText == 'X' && c7.innerText == 'X') ||
         (c2.innerText =='X' && c5.innerText == 'X' && c8.innerText == 'X') ||
         (c3.innerText =='X' && c6.innerText == 'X' && c9.innerText == 'X') ||

         (c1.innerText =='X' && c5.innerText == 'X' && c9.innerText == 'X') ||
         (c3.innerText =='X' && c5.innerText == 'X' && c7.innerText == 'X') ) {
            
        winner = 'X';
        
        document.querySelectorAll('.cell').disabled = true;
        
        

    } else if ( (c1.innerText =='O' && c2.innerText == 'O' && c3.innerText == 'O') || 
                (c4.innerText =='O' && c5.innerText == 'O' && c6.innerText == 'O') || 
                (c7.innerText =='O' && c8.innerText == 'O' && c9.innerText == 'O') || 

                (c1.innerText =='O' && c4.innerText == 'O' && c7.innerText == 'O') ||
                (c2.innerText =='O' && c5.innerText == 'O' && c8.innerText == 'O') ||
                (c3.innerText =='O' && c6.innerText == 'O' && c9.innerText == 'O') ||

                (c1.innerText =='O' && c5.innerText == 'O' && c9.innerText == 'O') ||
                (c3.innerText =='O' && c5.innerText == 'O' && c7.innerText == 'X')) {
        
        winner = 'O';
        // document.querySelectorAll('.cell').classList.add('disable');
        
    } 

    if (winner == 'X' || winner == 'O'){
        document.querySelector('.winner').textContent = (`And the winner is: ${winner}`);
    } else {
        document.querySelector('.winner').textContent = (`It's a draw`);
    }
   
}



console.log(winner);


