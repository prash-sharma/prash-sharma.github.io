let animalContainer = document.getElementById('animal-info');

let btnRef = document.querySelector('#btnRef');
btnRef.addEventListener('click', () => {
    location.reload();
})


let btnRes = document.getElementById('btnRes');
btnRes.addEventListener('click', clickFuncSuccess);

let btnRej = document.getElementById('btnRej');
btnRej.addEventListener('click', clickFuncFail);

let source;
let method;

function clickFuncSuccess() {
    source = 'https://learnwebcode.github.io/json-example/animals-1.json';
    method = 'GET';
    makeAjaxCall(method, source);
}


function clickFuncFail() {
    source = 'https://learnwebcode.github.io/json-example/animals-11.json';
    method = 'GET';
    makeAjaxCall(method, source);
}

function makeAjaxCall(methodType, source){
    let promiseObj = new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(methodType, source);
        xhr.send();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status === 200){
                    // console.log('XHR successfully completed - ' + xhr.status);
                    document.querySelector('#threeS').textContent = '\u270C';
                    document.querySelector('#threeM').textContent = 'XHR successfully completed with code - ' + xhr.status;
                    
                    let resp = xhr.responseText;
                    let respJson = JSON.parse(resp);
                    resolve (respJson)
                } else {
                    reject (xhr.status);
                    // console.log('XHR failed - ' + xhr.status);
                    document.querySelector('#threeS').textContent = '\u274C';
                    document.querySelector('#threeM').textContent = 'XHR failed with - ' + xhr.status;
                }
            } else {
                console.log('XHR is processing');
                document.querySelector('#twoM').textContent = 'In progress';
            }
        }
        // console.log('Request sent successfully');
        document.querySelector('#oneS').textContent = '\u270C';
        document.querySelector('#oneM').textContent = 'Request sent successfully'
    });
    // return promiseObj;
    promiseObj.then(displayData).catch(handleError);
}

function displayData(data){
    // document.querySelector('.json').textContent = data;
    btnRej.addEventListener('click', clickFuncFail);
    btnRej.style.cursor = 'pointer';

    btnRes.removeEventListener('click', clickFuncSuccess);
    btnRes.style.cursor = 'not-allowed';

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
};


function handleError() {
    let errorMsg = 'Failed to execute the request.';
    animalContainer.insertAdjacentHTML('beforeend', errorMsg);

    btnRej.removeEventListener('click', clickFuncFail);
    btnRej.style.cursor = 'not-allowed';

    btnRes.addEventListener('click', clickFuncSuccess);
    btnRes.style.cursor = 'pointer';
}




// let animalContainer = document.getElementById('animal-info');
// let btn = document.getElementById('btn');
// let urlCounter = 1;

// btn.addEventListener('click', function dataRequest(){
//     let jsonRequest = new XMLHttpRequest();
//     jsonRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + urlCounter + '.json')
//     jsonRequest.onload = function(){
//         if (jsonRequest.status >= 200 && jsonRequest.status <400){
//            let ourData = JSON.parse(jsonRequest.responseText);
//            renderHTML(ourData)
//         } else {
//             console.log(`Server failed to return data.`);
//         }
//     };

//     jsonRequest.onerror = function(){
//         console.log('Connection lost');
//     }

//     jsonRequest.send();
//     urlCounter++;
//     console.log(urlCounter);
//     if (urlCounter > 3){
//         btn.removeEventListener('click', dataRequest)
//         btn.style.cursor = 'not-allowed'
//     };
// });

// function renderHTML(data){
//     console.log(data);
//     let animalRow = '';

//     for (let i = 0; i < data.length; i++) {
//         animalRow += '<p>' + data[i].name + ' is a ' + data[i].species + ` that likes to eat`
//         for (let ii = 0; ii < data[i].foods.likes.length; ii++) {  
//             if(ii === 0){
//                 animalRow += ' ' + data[i].foods.likes[ii];
//             } else {
//                 animalRow += ' and ' + data[i].foods.likes[ii];
//             }            
//         }

//         animalRow += ` and dislikes `

//         for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {  
//             if(ii === 0){
//                 animalRow += ' ' + data[i].foods.dislikes[ii];
//             } else {
//                 animalRow += ' and ' + data[i].foods.dislikes[ii];
//             }            
//         }

//         animalRow += '.</p>';   
//     }
    
//     animalContainer.insertAdjacentHTML('beforeend', animalRow)
// }



