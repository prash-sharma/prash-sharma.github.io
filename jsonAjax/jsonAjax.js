let animalContainer = document.getElementById('animal-info');
let btn = document.getElementById('btn');
let urlCounter = 1;

btn.addEventListener('click', function dataRequest(){
    let jsonRequest = new XMLHttpRequest();
    jsonRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + urlCounter + '.json')
    jsonRequest.onload = function(){
        if (jsonRequest.status >= 200 && jsonRequest.status <400){
           let ourData = JSON.parse(jsonRequest.responseText);
           renderHTML(ourData)
        } else {
            console.log(`Server failed to return data.`);
        }
    };

    jsonRequest.onerror = function(){
        console.log('Connection lost');
    }

    jsonRequest.send();
    urlCounter++;
    console.log(urlCounter);
    if (urlCounter > 3){
        btn.removeEventListener('click', dataRequest)
        btn.style.cursor = 'not-allowed'
    };
});

function renderHTML(data){
    console.log(data);
    let animalRow = '';

    for (let i = 0; i < data.length; i++) {
        animalRow += '<p>' + data[i].name + ' is a ' + data[i].species + ` that likes to eat`
        for (let ii = 0; ii < data[i].foods.likes.length; ii++) {  
            if(ii === 0){
                animalRow += ' ' + data[i].foods.likes[ii];
            } else {
                animalRow += ' and ' + data[i].foods.likes[ii];
            }            
        }

        animalRow += ` and dislikes `

        for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {  
            if(ii === 0){
                animalRow += ' ' + data[i].foods.dislikes[ii];
            } else {
                animalRow += ' and ' + data[i].foods.dislikes[ii];
            }            
        }

        animalRow += '.</p>';   
    }
    
    animalContainer.insertAdjacentHTML('beforeend', animalRow)
}