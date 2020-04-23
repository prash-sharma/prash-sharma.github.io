// prompt('Hello world');

let player1 = 'YOU';
let player2 = 'AI';

const allCells = document.querySelectorAll('.cell');
console.log(allCells);

// allCells.forEach(cell => {
//     cell.addEventListener('click', addInput, {once: true})
// });





document.querySelector('#cell1').addEventListener('click', addInput1, {once: true})
document.querySelector('#cell2').addEventListener('click', addInput2, {once: true})

function addInput1(){
    console.log('clicked on' );

    document.querySelector('#cell1').textContent = 'X';
}

function addInput2(){
    console.log('clicked on' );

    document.querySelector('#cell2').textContent = 'X';
}