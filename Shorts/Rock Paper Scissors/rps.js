/* function rpsGame(yourChoice){
    var humanChoice = yourChoice.id;
    // console.log(`My choice is: ${humanChoice}`);
    var botChoice = numberToChoice(randomToRpsInt());
    // console.log(`Comp choice is: ${botChoice}`);

    results = decideWinner(humanChoice, botChoice);
    // console.log(results);

    // My way with if/else
    // var messageh1 = document.createElement('h1');
    // messageh1.textContent = results;
    // document.querySelector('.container').appendChild(messageh1)
    
    
    message = finalMessage(results[0], results[1])
    console.log(message);
    
    rpsFrontEnd (humanChoice, botChoice, message)  // (string, string, obj {msg:, .color})
} 
    
function randomToRpsInt(){
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return (['rock', 'paper', 'scissors'] [number])
}


// Qazi's formula :) 

function decideWinner(yourChoice, aiChoice){
    var rpsDB = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper':0},
        'paper': {'scissors': 0, 'rock': 1, 'paper':0.5},
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper':1}
    };

    var yourScore = rpsDB [yourChoice] [aiChoice];
    var aiScore = rpsDB [aiChoice] [yourChoice];

    return [yourScore, aiScore]
    
}

function finalMessage(yourScore, aiScore){
    if (yourScore === 0){
        return {'message': 'You lost', 'color': 'red'};
    } else if(yourScore === 0.5){
        return {'message': 'You tied', 'color': 'yellow'};
    } else {
        return {'message': 'You win', 'color': 'green'};
    }
} 


// Who is the winner
// My way with if/else
// function decideWinner(human, ai){
//     if (human === 'rock' && ai === 'rock'){
//         return `It's a draw, we both picked the same one`
//     } else if (human === 'rock' && ai === 'paper'){
//         return `I lost, computer wins`
//     } else if (human === 'rock' && ai === 'scissors'){
//         return `I win, computer lost`
//     } else if (human === 'paper' && ai === 'rock') {
//         return `I win, computer lost`
//     } else if (human === 'paper' && ai === 'paper') {
//         return `It's a draw, we both picked the same one`
//     } else if (human === 'paper' && ai === 'scissors') {
//         return `I lost, computer wins`
//     } else if (human === 'scissors' && ai === 'rock') {
//         return `I lost, computer wins`
//     } else if (human === 'scissors' && ai === 'paper') {
//         return `I win, computer lost`
//     } else {
//         return `It's a draw, we both picked the same one`
//     }
// }

*/












function rpsGame(yourChoice){
    var humanChoice = yourChoice.id;
    var botChoice = numberToChoice(randomToRpsInt());
    message = decideWinner(humanChoice, botChoice);

    rpsFrontEnd (humanChoice, botChoice, message);  // (string, string, obj {msg:, .color})
    // console.log(rpsFrontEnd());
}
    
function randomToRpsInt(){
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number){
    return (['rock', 'paper', 'scissors'] [number])
}

function decideWinner(human, ai){
    if (human === 'rock' && ai === 'rock'){
        //return `Tied`
        let msgAndCol = {
            msg: `Draw`,
            color: 'yellow'
        }
        return msgAndCol
    } else if (human === 'rock' && ai === 'paper'){
        //return `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'rock' && ai === 'scissors'){
        // return `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'rock') {
        // return `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'paper') {
        // return `It's a draw`
        let msgAndCol = {
            msg: `Draw`,
            color: 'yellow'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'scissors') {
        // return `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'scissors' && ai === 'rock') {
        // return `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'scissors' && ai === 'paper') {
        // return `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else {
        // return `It's a draw`
        let msgAndCol = {
            msg: `Draw`,
            color: 'yellow'
        }
        return msgAndCol
    }
}


function rpsFrontEnd(humanChoice, botChoice, message){
    let imageList = {
        rock: document.getElementById('rock').src,
        paper: document.getElementById('paper').src,
        scissors: document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    let humanImageElement = document.createElement('img');
    humanImageElement.src = imageList[humanChoice];
    humanImageElement.className = 'image';
    document.getElementById('flex-box-rps-div').appendChild(humanImageElement);
    
    let resultElement = document.createElement('p');
    resultElement.className = 'image'
    resultElement.textContent = message.msg;
    document.getElementById('flex-box-rps-div').appendChild(resultElement)
    
    let botImageElement = document.createElement('img');
    botImageElement.src = imageList[botChoice];
    botImageElement.className = 'image'
    document.getElementById('flex-box-rps-div').appendChild(botImageElement);

    console.log(humanChoice);
    console.log(botChoice);
    console.log(message.msg);
    console.log(message.color);
    
}