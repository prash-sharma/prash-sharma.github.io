// --------------MY METHOD------------- //

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
        // `Tied`
        let msgAndCol = {
            msg: `Draw`,
            color: 'yellow'
        }
        return msgAndCol
    } else if (human === 'rock' && ai === 'paper'){
        // `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'rock' && ai === 'scissors'){
        // `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'rock') {
        // `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'paper') {
        // `It's a draw`
        let msgAndCol = {
            msg: `Draw`,
            color: 'yellow'
        }
        return msgAndCol
    } else if (human === 'paper' && ai === 'scissors') {
        // `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'scissors' && ai === 'rock') {
        // `I lost`
        let msgAndCol = {
            msg: `You lost`,
            color: 'red'
        }
        return msgAndCol
    } else if (human === 'scissors' && ai === 'paper') {
        // `I win`
        let msgAndCol = {
            msg: `You win`,
            color: 'green'
        }
        return msgAndCol
    } else {
        // `It's a draw`
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
    
    // My Input - Image & Text
    let humanInputDiv = document.createElement('div');
    humanInputDiv.id = 'humanInputDiv';
    document.getElementById('flex-box-rps-div').appendChild(humanInputDiv);

    let humanImageElement = document.createElement('img');
    humanImageElement.src = imageList[humanChoice];
    humanImageElement.className = 'result-image-1';
    document.getElementById('humanInputDiv').appendChild(humanImageElement);

    let humanTextElement = document.createElement('p');
    humanTextElement.textContent = 'My pick';
    document.getElementById('humanInputDiv').appendChild(humanTextElement);
    
    // Result 
    var resultDiv = document.createElement('div');
    resultDiv.id = 'resultDiv';
    resultDiv.style.marginBottom = '35px'
    resultDiv.style.width = '150px'
    document.getElementById('flex-box-rps-div').appendChild(resultDiv)

    let resultElement = document.createElement('h3');
    resultElement.className = 'result-text'
    resultElement.style.backgroundColor = message.color;
    resultElement.textContent = message.msg;
    document.getElementById('resultDiv').appendChild(resultElement)
    
    // AI input - Image & Text
    let botInputDiv = document.createElement('div');
    botInputDiv.id = 'botInputDiv';
    document.getElementById('flex-box-rps-div').appendChild(botInputDiv);

    let botImageElement = document.createElement('img');
    botImageElement.src = imageList[botChoice];
    botImageElement.className = 'result-image-2'
    document.getElementById('botInputDiv').appendChild(botImageElement);

    let botTextElement = document.createElement('p');
    botTextElement.textContent = 'AI pick';
    document.getElementById('botInputDiv').appendChild(botTextElement);

    console.log(humanChoice);
    console.log(botChoice);
    console.log(message.msg);
    console.log(message.color);
}

function reload(){
    document.getElementById("form").reset();
}

// Tutorial method (only a partial solution)

/* function rpsGame(yourChoice){
    var humanChoice = yourChoice.id;
    // console.log(`My choice is: ${humanChoice}`);
    var botChoice = numberToChoice(randomToRpsInt());
    // console.log(`Comp choice is: ${botChoice}`);

    results = decideWinner(humanChoice, botChoice);
    // console.log(results);
    
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
*/