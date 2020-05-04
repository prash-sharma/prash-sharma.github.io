let playerType = location.search.substring(1);

console.log(playerType);

gameType(playerType);

function gameType(playerType){
    if (playerType === 'one'){
        onePlayer();
        console.log('Clicked one player');

    } else if(playerType === 'two') {
        twoPlayers();
        console.log('Clicked two players');
    }
}
    
document.querySelector('.board').style.cursor = "url(images/x.png), auto";

let player1 = true;

let cellsWithValue = [];

let inputCounter = 0;

let winCounterX = 0;
let winCounterO = 0;
let winCounterD = 0;


/* ---------------------------------- ONE PLAYER ---------------------------- */

function onePlayer(){
    const CELLS = document.querySelectorAll('.cell');

    CELLS.forEach(eventListener);

    function eventListener(item){
        item.addEventListener('click', addInput, {once: true})
    }


    function addInput(event){

        let clickedId = (parseInt(event.target.id) - 1);
        
        if (player1){
            CELLS[clickedId].textContent = 'X';
            changeCursor('o');
            player1 = false;
            inputCounter++;
            console.log(`Input counter after player: ${inputCounter}`);
            
            aiTurn(); // call AI turn funtion
        } 
        
        function aiTurn() {
            
            // Get unused cellId
            for (let index = 0; index < 9; index++) {
                clickedId = Math.floor(Math.random() * 9);
                if (CELLS[clickedId].textContent == false){
                    break;
                }
            }       
            console.log(`AI cell value is ${clickedId}`);
            
            aiInput(clickedId)

            function aiInput(clickedId){
                console.log(`text content is false: ${clickedId}`);
                CELLS[clickedId].textContent = 'O';
                CELLS[clickedId].style.color = 'red';
                changeCursor('x');
                player1 = true;
                inputCounter++;
                console.log(`Input counter after AI: ${inputCounter}`); 
            } 
        }

        // console.log(`Input counter: ${inputCounter++}`);
        
        cellsWithValue[clickedId] = CELLS[clickedId].textContent;

        if (inputCounter >= 5){
            getWinner(cellsWithValue);
        } 
    }

    // GET WINNER

    function getWinner(cellsWithValue){
        
        if (cellsWithValue[0] === 'X' && cellsWithValue[1] === 'X' && cellsWithValue[2] === 'X' || 
            cellsWithValue[3] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[5] === 'X' ||
            cellsWithValue[6] === 'X' && cellsWithValue[7] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[0] === 'X' && cellsWithValue[3] === 'X' && cellsWithValue[6] === 'X' ||
            cellsWithValue[1] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[7] === 'X' ||
            cellsWithValue[2] === 'X' && cellsWithValue[5] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[0] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[2] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[6] === 'X') {
            
            displayWinner('X') 

            winnerCounter('X');



        // FILL EMPTY CELLS WITH SOMETHING

        } else if (cellsWithValue[0] === 'O' && cellsWithValue[1] === 'O' && cellsWithValue[2] === 'O' || 
                cellsWithValue[3] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[5] === 'O' ||
                cellsWithValue[6] === 'O' && cellsWithValue[7] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[0] === 'O' && cellsWithValue[3] === 'O' && cellsWithValue[6] === 'O' ||
                cellsWithValue[1] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[7] === 'O' ||
                cellsWithValue[2] === 'O' && cellsWithValue[5] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[0] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[2] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[6] === 'O') {
        
                displayWinner('O', 'red');
                
                winnerCounter('O');
            
        } else {
                if (inputCounter === 9){
                    displayWinner('Draw')

                    winnerCounter('Draw');
                }
        }
    }

    // DECIDE WINNER & DISABLE USER CLICK
    function displayWinner(winner, color){
        document.querySelector('.result').innerHTML = `${winner}`;

        CELLS.forEach((item) => item.removeEventListener('click', addInput));

        document.querySelector('.board').style.cursor = "not-allowed";

        document.querySelector('.result').style.color = color;

        // TO DO - FILL EMPTY CELLS WITH SOMETHING
    }

    // CHANGE CURSOR

    function changeCursor(player){
        if (player == 'x') {
            document.querySelector('.board').style.cursor = "url(images/x.png), auto";
        } else if (player == 'o') {
            document.querySelector('.board').style.cursor = "url(images/o.png), auto";
        } 
    }

    // WINNER COUNTER
    function winnerCounter(xoCounter){
        
        if (xoCounter === 'X'){
            winCounterX++;
            document.querySelector('#xCounter').textContent = winCounterX;
        } else if (xoCounter === 'O'){
            winCounterO++;
            document.querySelector('#oCounter').textContent = winCounterO;
        } else if (xoCounter === 'Draw'){
            winCounterD++;
            document.querySelector('#drawCounter').textContent = winCounterD;
        }
    }

    // RESTART BUTTON

    document.getElementById('rematch').addEventListener('click', resetBoard)

    function resetBoard(e){
    // e.preventDefault();

    CELLS.forEach(function(item){
        item.textContent = '';
        item.style.color = '';

        eventListener(item);
    });

    changeCursor('x');

    inputCounter = 0;

    player1 = true;

    cellsWithValue = [];

    document.querySelector('.result').textContent = '-';
    document.querySelector('.result').style.color = '';

    }

    // REMATCH

    document.getElementById('restart').addEventListener('click', restartGame)

    function restartGame(){
        // document.getElementsByTagName('body').reload() = true;
        location.reload();
        return false;
    }
}





/* ---------------------------------- TWO PLAYERS ---------------------------- */

function twoPlayers(){

    CELLS.forEach(eventListener);

    function eventListener(item){
        item.addEventListener('click', addInput, {once: true})
    }

    function addInput(event){

        let clickedId = (parseInt(event.target.id) - 1);
        
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
        
        cellsWithValue[clickedId] = CELLS[clickedId].textContent;

        if (inputCounter >= 5){
            getWinner(cellsWithValue);
        } 
    }

    // GET WINNER

    function getWinner(cellsWithValue){
        
        if ( cellsWithValue[0] === 'X' && cellsWithValue[1] === 'X' && cellsWithValue[2] === 'X' || 
            cellsWithValue[3] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[5] === 'X' ||
            cellsWithValue[6] === 'X' && cellsWithValue[7] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[0] === 'X' && cellsWithValue[3] === 'X' && cellsWithValue[6] === 'X' ||
            cellsWithValue[1] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[7] === 'X' ||
            cellsWithValue[2] === 'X' && cellsWithValue[5] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[0] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[8] === 'X' ||
            cellsWithValue[2] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[6] === 'X') {
            
            displayWinner('X') 

            winnerCounter('X');



        // FILL EMPTY CELLS WITH SOMETHING

        } else if(
                cellsWithValue[0] === 'O' && cellsWithValue[1] === 'O' && cellsWithValue[2] === 'O' || 
                cellsWithValue[3] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[5] === 'O' ||
                cellsWithValue[6] === 'O' && cellsWithValue[7] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[0] === 'O' && cellsWithValue[3] === 'O' && cellsWithValue[6] === 'O' ||
                cellsWithValue[1] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[7] === 'O' ||
                cellsWithValue[2] === 'O' && cellsWithValue[5] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[0] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[8] === 'O' ||
                cellsWithValue[2] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[6] === 'O') {
        
                displayWinner('O', 'red');
                
                winnerCounter('O');
            
        } else {
                if (inputCounter === 9){
                    displayWinner('Draw')

                    winnerCounter('Draw');
                }
        }
    }

    // DECIDE WINNER & DISABLE USER CLICK
    function displayWinner(winner, color){
        document.querySelector('.result').innerHTML = `${winner}`;

        CELLS.forEach((item) => item.removeEventListener('click', addInput));

        document.querySelector('.board').style.cursor = "not-allowed";

        document.querySelector('.result').style.color = color;

        // TO DO - FILL EMPTY CELLS WITH SOMETHING
    }

    // CHANGE CURSOR

    function changeCursor(player){
        if (player == 'x') {
            document.querySelector('.board').style.cursor = "url(images/x.png), auto";
        } else if (player == 'o') {
            document.querySelector('.board').style.cursor = "url(images/o.png), auto";
        } 
    }

    // WINNER COUNTER
    function winnerCounter(xoCounter){
        
        if (xoCounter === 'X'){
            winCounterX++;
            document.querySelector('#xCounter').textContent = winCounterX;
        } else if (xoCounter === 'O'){
            winCounterO++;
            document.querySelector('#oCounter').textContent = winCounterO;
        } else if (xoCounter === 'Draw'){
            winCounterD++;
            document.querySelector('#drawCounter').textContent = winCounterD;
        }
    }

    // RESTART BUTTON

    document.getElementById('rematch').addEventListener('click', resetBoard)

    function resetBoard(e){
    // e.preventDefault();

    CELLS.forEach(function(item){
        item.textContent = '';
        item.style.color = '';

        eventListener(item);
    });

    changeCursor('x');

    inputCounter = 0;

    player1 = true;

    cellsWithValue = [];

    document.querySelector('.result').textContent = '-';
    document.querySelector('.result').style.color = '';

    }

    // REMATCH

    document.getElementById('restart').addEventListener('click', restartGame)

    function restartGame(){
        // document.getElementsByTagName('body').reload() = true;
        location.reload();
        return false;
    }
}



// -------------------------------- THIS WORKS FOR 2 PLAYERS ON A SINGLE PAGE APP -------------------------

// function twoPlayers(){
//     console.log('Ya ha ha, you called me successfully!!');
    
//     document.querySelector('.board').style.cursor = "url(images/x.png), auto";

//     let player1 = true;

//     let cellsWithValue = [];

//     const CELLS = document.querySelectorAll('.cell');

//     let inputCounter = 0;

//     let winCounterX = 0;
//     let winCounterO = 0;
//     let winCounterD = 0;

//     CELLS.forEach(eventListener);

//     function eventListener(item){
//         item.addEventListener('click', addInput, {once: true})
//     }

//     function addInput(event){

//         let clickedId = (parseInt(event.target.id) - 1);
        
//         if (player1){
//             CELLS[clickedId].textContent = 'X';
//             changeCursor('o');
//             player1 = false
//         } else {
//             CELLS[clickedId].textContent = 'O';
//             CELLS[clickedId].style.color = 'red';
//             changeCursor('x');
//             player1 = true
//         }

//         inputCounter++
        
//         cellsWithValue[clickedId] = CELLS[clickedId].textContent;

//         if (inputCounter >= 5){
//             getWinner(cellsWithValue);
//         } 
//     }

//     // GET WINNER

//     function getWinner(cellsWithValue){
        
//         if ( cellsWithValue[0] === 'X' && cellsWithValue[1] === 'X' && cellsWithValue[2] === 'X' || 
//             cellsWithValue[3] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[5] === 'X' ||
//             cellsWithValue[6] === 'X' && cellsWithValue[7] === 'X' && cellsWithValue[8] === 'X' ||
//             cellsWithValue[0] === 'X' && cellsWithValue[3] === 'X' && cellsWithValue[6] === 'X' ||
//             cellsWithValue[1] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[7] === 'X' ||
//             cellsWithValue[2] === 'X' && cellsWithValue[5] === 'X' && cellsWithValue[8] === 'X' ||
//             cellsWithValue[0] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[8] === 'X' ||
//             cellsWithValue[2] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[6] === 'X') {
            
//             displayWinner('X') 

//             winnerCounter('X');



//         // FILL EMPTY CELLS WITH SOMETHING

//         } else if(
//                 cellsWithValue[0] === 'O' && cellsWithValue[1] === 'O' && cellsWithValue[2] === 'O' || 
//                 cellsWithValue[3] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[5] === 'O' ||
//                 cellsWithValue[6] === 'O' && cellsWithValue[7] === 'O' && cellsWithValue[8] === 'O' ||
//                 cellsWithValue[0] === 'O' && cellsWithValue[3] === 'O' && cellsWithValue[6] === 'O' ||
//                 cellsWithValue[1] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[7] === 'O' ||
//                 cellsWithValue[2] === 'O' && cellsWithValue[5] === 'O' && cellsWithValue[8] === 'O' ||
//                 cellsWithValue[0] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[8] === 'O' ||
//                 cellsWithValue[2] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[6] === 'O') {
        
//                 displayWinner('O', 'red');
                
//                 winnerCounter('O');
            
//         } else {
//                 if (inputCounter === 9){
//                     displayWinner('Draw')

//                     winnerCounter('Draw');
//                 }
//         }
//     }

//     // DECIDE WINNER & DISABLE USER CLICK
//     function displayWinner(winner, color){
//         document.querySelector('.result').innerHTML = `${winner}`;

//         CELLS.forEach((item) => item.removeEventListener('click', addInput));

//         document.querySelector('.board').style.cursor = "not-allowed";

//         document.querySelector('.result').style.color = color;

//         // TO DO - FILL EMPTY CELLS WITH SOMETHING
//     }

//     // CHANGE CURSOR

//     function changeCursor(player){
//         if (player == 'x') {
//             document.querySelector('.board').style.cursor = "url(images/x.png), auto";
//         } else if (player == 'o') {
//             document.querySelector('.board').style.cursor = "url(images/o.png), auto";
//         } 
//     }

//     // WINNER COUNTER
//     function winnerCounter(xoCounter){
        
//         if (xoCounter === 'X'){
//             winCounterX++;
//             document.querySelector('#xCounter').textContent = winCounterX;
//         } else if (xoCounter === 'O'){
//             winCounterO++;
//             document.querySelector('#oCounter').textContent = winCounterO;
//         } else if (xoCounter === 'Draw'){
//             winCounterD++;
//             document.querySelector('#drawCounter').textContent = winCounterD;
//         }
//     }

//     // RESTART BUTTON

//     document.getElementById('rematch').addEventListener('click', resetBoard)

//     function resetBoard(e){
//     // e.preventDefault();

//     CELLS.forEach(function(item){
//         item.textContent = '';
//         item.style.color = '';

//         eventListener(item);
//     });

//     changeCursor('x');

//     inputCounter = 0;

//     player1 = true;

//     cellsWithValue = [];

//     document.querySelector('.result').textContent = '-';
//     document.querySelector('.result').style.color = '';

//     }

//     // REMATCH

//     document.getElementById('restart').addEventListener('click', restartGame)

//     function restartGame(){
//         // document.getElementsByTagName('body').reload() = true;
//         location.reload();
//         return false;
//     }
// }





/*
document.querySelector('.board').style.cursor = "url(images/x.png), auto";

let player1 = true;


let cellsWithValue = [];

const CELLS = document.querySelectorAll('.cell');

let inputCounter = 0;


let winCounterX = 0;
let winCounterO = 0;
let winCounterD = 0;

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
    
    cellsWithValue[clickedId] = CELLS[clickedId].textContent;

    if (inputCounter >= 5){
        getWinner(cellsWithValue);
    } 
}

// GET WINNER

function getWinner(cellsWithValue){
    
    if ( cellsWithValue[0] === 'X' && cellsWithValue[1] === 'X' && cellsWithValue[2] === 'X' || 
         cellsWithValue[3] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[5] === 'X' ||
         cellsWithValue[6] === 'X' && cellsWithValue[7] === 'X' && cellsWithValue[8] === 'X' ||
         cellsWithValue[0] === 'X' && cellsWithValue[3] === 'X' && cellsWithValue[6] === 'X' ||
         cellsWithValue[1] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[7] === 'X' ||
         cellsWithValue[2] === 'X' && cellsWithValue[5] === 'X' && cellsWithValue[8] === 'X' ||
         cellsWithValue[0] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[8] === 'X' ||
         cellsWithValue[2] === 'X' && cellsWithValue[4] === 'X' && cellsWithValue[6] === 'X') {
        
        displayWinner('X') 

        winnerCounter('X');



       // FILL EMPTY CELLS WITH SOMETHING

    } else if(
             cellsWithValue[0] === 'O' && cellsWithValue[1] === 'O' && cellsWithValue[2] === 'O' || 
             cellsWithValue[3] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[5] === 'O' ||
             cellsWithValue[6] === 'O' && cellsWithValue[7] === 'O' && cellsWithValue[8] === 'O' ||
             cellsWithValue[0] === 'O' && cellsWithValue[3] === 'O' && cellsWithValue[6] === 'O' ||
             cellsWithValue[1] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[7] === 'O' ||
             cellsWithValue[2] === 'O' && cellsWithValue[5] === 'O' && cellsWithValue[8] === 'O' ||
             cellsWithValue[0] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[8] === 'O' ||
             cellsWithValue[2] === 'O' && cellsWithValue[4] === 'O' && cellsWithValue[6] === 'O') {
    
            displayWinner('O', 'red');
            
            winnerCounter('O');
        
    } else {
            if (inputCounter === 9){
                displayWinner('Draw')

                winnerCounter('Draw');
            }
    }
}

// DECIDE WINNER & DISABLE USER CLICK
function displayWinner(winner, color){
    document.querySelector('.result').innerHTML = `${winner}`;

    CELLS.forEach((item) => item.removeEventListener('click', addInput));

    document.querySelector('.board').style.cursor = "not-allowed";

    document.querySelector('.result').style.color = color;

    // TO DO - FILL EMPTY CELLS WITH SOMETHING
}

// CHANGE CURSOR

function changeCursor(player){
    if (player == 'x') {
        document.querySelector('.board').style.cursor = "url(images/x.png), auto";
    } else if (player == 'o') {
        document.querySelector('.board').style.cursor = "url(images/o.png), auto";
    } 
}

// WINNER COUNTER
function winnerCounter(xoCounter){
    
    if (xoCounter === 'X'){
        winCounterX++;
        document.querySelector('#xCounter').textContent = winCounterX;
    } else if (xoCounter === 'O'){
        winCounterO++;
        document.querySelector('#oCounter').textContent = winCounterO;
    } else if (xoCounter === 'Draw'){
        winCounterD++;
        document.querySelector('#drawCounter').textContent = winCounterD;
    }
}

// RESTART BUTTON

document.getElementById('rematch').addEventListener('click', resetBoard)

function resetBoard(e){
// e.preventDefault();

CELLS.forEach(function(item){
    item.textContent = '';
    item.style.color = '';

    eventListener(item);
});

changeCursor('x');

inputCounter = 0;

player1 = true;

cellsWithValue = [];

document.querySelector('.result').textContent = '-';
document.querySelector('.result').style.color = '';

}

// REMATCH

document.getElementById('restart').addEventListener('click', restartGame)

function restartGame(){
    // document.getElementsByTagName('body').reload() = true;
    location.reload();
    return false;
}

*/