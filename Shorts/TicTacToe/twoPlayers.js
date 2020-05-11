let player1 = true;

let cellsWithValue = [];

let inputCounter = 0;

// let result = false;

let winCounterX = 0;
let winCounterO = 0;
let winCounterD = 0;

function twoPlayers(){
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
        
        let [c1, c2, c3, c4, c5, c6, c7, c8, c9] = cellsWithValue;

        if (c1 === 'X' && c2 === 'X' && c3 === 'X' || 
            c4 === 'X' && c5 === 'X' && c6 === 'X' ||
            c7 === 'X' && c8 === 'X' && c9 === 'X' ||
            c1 === 'X' && c4 === 'X' && c7 === 'X' ||
            c2 === 'X' && c5 === 'X' && c8 === 'X' ||
            c3 === 'X' && c6 === 'X' && c9 === 'X' ||
            c1 === 'X' && c5 === 'X' && c9 === 'X' ||
            c3 === 'X' && c5 === 'X' && c7 === 'X') {
            
            displayWinner('X') 

            winnerCounter('X');

        } else if (c1 === 'O' && c2 === 'O' && c3 === 'O' || 
                c4 === 'O' && c5 === 'O' && c6 === 'O' ||
                c7 === 'O' && c8 === 'O' && c9 === 'O' ||
                c1 === 'O' && c4 === 'O' && c7 === 'O' ||
                c2 === 'O' && c5 === 'O' && c8 === 'O' ||
                c3 === 'O' && c6 === 'O' && c9 === 'O' ||
                c1 === 'O' && c5 === 'O' && c9 === 'O' ||
                c3 === 'O' && c5 === 'O' && c7 === 'O') {
        
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

export default twoPlayers;