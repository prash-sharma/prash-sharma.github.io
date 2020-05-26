console.log('PostIt');

// let url = document.querySelector('.url');
let url = 'https://randomuser.me/api/?results=5';
let submitBtn = document.querySelector('.submit');
let result = document.querySelector('#res');


// let requestType = document.querySelector('#get');
// let postRequest = document.querySelector('#post');


submitBtn.addEventListener('click', () => {
    let reqType = document.querySelector(`input[name='reqType']:checked`);
    // console.log(url.value);
   

    getData(url, reqType).then((data) => {
        displayData(data);
         console.log(reqType.value);
    }).catch((err) => {
        console.log(err.message);
        console.log(reqType.value);
    })
    
});


async function getData(url, method){
    let response = await fetch(url, method);
    let data = await response.json();
    return data;
}


function displayData(data){
    console.log(data);
        result.value = JSON.stringify(data);
        console.log(result);
    }
    



