let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result:', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result:', 'div': '#dealer-box', 'score': 0},
    'cardValues': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardTypes': ['C', 'D', 'H', 'S'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A': [1, 11]},
};

const YOU = blackjackGame['you']; // const YOU = blackjackGame.you; - Another way, might work, check later
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/hit1.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit(){
    let cardValue = randomCardValue();
    let cardType = randomCardType();
    showCard(cardValue, cardType, YOU);
}

function randomCardValue(){
    let randomValueIndex = Math.floor(Math.random() * 13);
    return blackjackGame.cardValues[randomValueIndex];
}

function randomCardType(){
    let randomTypeIndex = Math.floor(Math.random() * 4);
    return blackjackGame.cardTypes[randomTypeIndex];
}


function showCard(cardValue, cardType, activePlayer){
    let cardImage = document.createElement('img');
    cardImage.src = `images/${cardValue}${cardType}.png`;
    cardImage.style.height = '105px';
    cardImage.style.width = '70px';
    cardImage.style.padding = '8px';
    document.querySelector(activePlayer['div']).appendChild(cardImage) //  document.querySelector(YOU.div).appendChild(cardImage);  - Another way, might work, check later
    hitSound.play();
}




// DEAL BUTTON

function blackjackDeal(){
    removeCard(YOU)
    removeCard(DEALER)
}


function removeCard(remCard){
   let yourImages = document.querySelector(remCard.div).querySelectorAll('img');
   for (let index = 0; index < yourImages.length; index++) {
       yourImages[index].remove();
   }
}




let a = {
    b: 2,
    c: 3,
    d: ['x', 'y', 'z']
}

console.log(a.b, a.c);

console.log(a.d[2]);

console.log(a['d'][2]);

