let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cardValues': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardTypes': ['C', 'D', 'H', 'S'],
    'cardsMap': {'2': 2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A': [1, 11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
};

const YOU = blackjackGame['you']; // const YOU = blackjackGame.you; - Another way, might work, check later
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/hit.mp3');
// const bustSound = new Audio('sounds/hit1.mp3');
const winSound = new Audio('sounds/win.mp3');
const lossSound = new Audio('sounds/loss.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', standButton);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


// HIT BUTTON
function blackjackHit(){
    let cardValue = randomCardValue();
    let cardType = randomCardType(); 
    showCard(cardValue, cardType, YOU); // DISPLAYS CARDS
    updateScore(cardValue, YOU);    // UPDATES CARD POINTS
    showScore(YOU);
}

// STAND BUTTON
function standButton(){
    hitButtonDisabled();
    let winner;

    if (YOU.score <= 21) {
        do {
            let cardValue = randomCardValue();
            let cardType = randomCardType(); 
            showCard(cardValue, cardType, DEALER); // Put this into an auto loop
            updateScore(cardValue, DEALER);      
        } while (DEALER.score <= YOU.score);
    }
        
    showScore(DEALER);

    winner = computeWinner(); 

    updateMessage(winner);

    standButtonDisabled();
}


// DEAL BUTTON
function blackjackDeal(){
    removeCard(YOU);
    removeCard(DEALER);
    document.querySelector('#blackjack-result').textContent = `Let's play`
    document.querySelector('#blackjack-result').style.color = 'whitesmoke'
}


function randomCardValue(){
    let randomValueIndex = Math.floor(Math.random() * 13);
    return blackjackGame.cardValues[randomValueIndex];
}

function randomCardType(){
    let randomTypeIndex = Math.floor(Math.random() * 4);
    return blackjackGame.cardTypes[randomTypeIndex];
}


// DISPLAY GENERATED CARD/S ON THE ACTIVE PLAYER'S BOX
function showCard(cardValue, cardType, activePlayer){
    if (activePlayer.score <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${cardValue}${cardType}.png`;
        cardImage.style.height = '105px';
        cardImage.style.width = '70px';
        cardImage.style.padding = '8px';
        document.querySelector(activePlayer['div']).appendChild(cardImage) //  document.querySelector(activePlayer.div).appendChild(cardImage);  - Another way, might work, check later
        hitSound.play();
    }
}

// GET & UPDATE CARD POINTS FOR THE ACTIVE PLAYER
function updateScore(cardValue, activePlayer){
    if (cardValue === 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][cardValue][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][cardValue][1]
        } else{
            activePlayer['score'] += blackjackGame['cardsMap'][cardValue][0]
        }
    } else {
        activePlayer['score'] += blackjackGame.cardsMap[cardValue];
    }   
}

// DISPLAY CARD POINTS / BLACKJACK / BUST MESSAGE ON ACTIVE PLAYER'S BOX

function showScore(activePlayer){    
    if (activePlayer.score > 21){
        document.querySelector(activePlayer.scoreSpan).textContent = 'BUST!!';
        document.querySelector(activePlayer.scoreSpan).style.color = 'red';
        
        hitButtonDisabled();
        
    } else if (activePlayer == YOU && activePlayer.score === 21) {
        document.querySelector(activePlayer.scoreSpan).textContent = 'Blackjack, hooray!!';
        
        hitButtonDisabled();
        
        standButton();

    } else if (activePlayer.score === 21) {
        document.querySelector(activePlayer.scoreSpan).textContent = 'Blackjack, hooray!!';
        
        hitButtonDisabled();
       
    } else {
        document.querySelector(activePlayer.scoreSpan).textContent = activePlayer['score'];
    }
}    


// RESET THE PLAYER & DEALER BOX, ENABLE DISABLED BUTTONS
function removeCard(remCard){
   let yourImages = document.querySelector(remCard.div).querySelectorAll('img');
   for (let index = 0; index < yourImages.length; index++) {
       yourImages[index].remove();
   }

   YOU.score = 0;
   DEALER.score = 0;

   document.querySelector('#your-blackjack-result').textContent = YOU.score;
   document.querySelector('#dealer-blackjack-result').textContent = DEALER.score;

   document.querySelector('#your-blackjack-result').style.color = '#ffffff';
   document.querySelector('#dealer-blackjack-result').style.color = '#ffffff'

   document.querySelector('#blackjack-hit-button').disabled = false;
   document.querySelector('#blackjack-stand-button').disabled = false;
}

// BUTTONS DISABLED
function hitButtonDisabled(){
    document.querySelector('#blackjack-hit-button').disabled = true;
}

function standButtonDisabled() {
    document.querySelector('#blackjack-stand-button').disabled = true;
}


// COMPUTE & RETURN WINNER 
// UPDATE THE SCORECARD FOR EACH WIN / DRAW / LOSS
function computeWinner(){
    let winner;

    if (YOU.score <= 21 && DEALER.score <= 21){
        if (YOU.score > DEALER.score){
            winner = YOU;

        } else if (YOU.score < DEALER.score) {
            winner = DEALER;

        } else if (YOU.score === DEALER.score) {
            console.log(`It's a draw`);
        }
        
    } else if (YOU.score >21 && DEALER.score <= 21) {
        winner = DEALER;

    } else if (YOU.score > 21 && DEALER.score > 21) {
        console.log(`It's a draw`);
    } else if (YOU.score <= 21 && DEALER.score > 21) {
        winner = YOU;
    }               

   if (winner === YOU){
        blackjackGame.wins += 1;
        document.querySelector('#wins').textContent = blackjackGame.wins;
        
   } else if (winner === DEALER){
       blackjackGame.losses += 1;
       document.querySelector('#losses').textContent = blackjackGame.losses;
   } else {
       blackjackGame.draws += 1;
       document.querySelector('#draws').textContent = blackjackGame.draws;
   }
   
   return winner;
}


// ANNOUNCE RESULT (WIN, LOSS, DRAW) ON <H3>
function updateMessage(winner){
    if (winner === YOU){
        document.querySelector('#blackjack-result').textContent = 'You win';
        document.querySelector('#blackjack-result').style.color = 'green';
        winSound.play();
    } else if (winner === DEALER) {
        document.querySelector('#blackjack-result').textContent = 'You lost';
        document.querySelector('#blackjack-result').style.color = 'red';
        lossSound.play();
    } else {
        document.querySelector('#blackjack-result').textContent = `It's a draw`;
        document.querySelector('#blackjack-result').style.color = 'black';
    }
}


/*
let a = {
    b: 2,
    c: 3,
    d: ['x', 'y', 'z'],
    e: {man: 'united', norwich: 'city'},
    f: {'serie': 'A', 'La': 'Liga', 'Bundesliga': 1, '2':3}
}

console.log(a['f'][2]);


function updateLeague(){
    a.f.Bundesliga += a.f.Bundesliga + 1
    console.log(a.f.Bundesliga);
}

console.log(a.f.Bundesliga);
console.log(a.f[2]);  // access 'number':number key/value of an object


let league = 'serie'
let aboveleague = 'f'
// let getvalue = value(league) // serie


// function value(leaguetype){
//     return leaguetype;
// }

// console.log(a['f'][getvalue]);



// console.log(a.f.serie);

// console.log(a.f.La);


console.log(a[aboveleague][league]);




// console.log(a.b); // 2

// console.log(a.d[2]); // z

// console.log(a['d'][1]); // y

// console.log(a.e.man); // united

// console.log(a.f.La); // Liga



// let apple = 5;
// let ball = 7;
// let cat = add(apple, ball);

// // add = (x,y) => x += y;

// function add(x,y){
//     x += y;
//     return x
// }

// console.log(apple);
// console.log(cat);

*/