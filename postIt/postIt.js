console.log('PostIt');
document.querySelector(`.cus-par`).hidden = true;


let getType = document.querySelector(`#getType`);
getType.addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = true;
    document.querySelector(`#json`).checked = true;
})

let postType = document.querySelector(`#postType`);
postType.addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = false;
})


let loader = document.querySelector('.loader');
    loader.hidden = true;

    


// let url = document.querySelector('.url');
let url = 'https://randomuser.me/api/?results=5';
let submitBtn = document.querySelector('.btn');
let result = document.querySelector('#res');


submitBtn.addEventListener('click', () => {
    let reqTypeValue = document.querySelector(`input[name='reqType']:checked`).value;
    // console.log(url.value);

    console.log(reqTypeValue);
    
   

    getData(url, reqTypeValue).then((data) => {
        displayData(data);
         console.log(reqTypeValue);
    }).catch((err) => {
        console.log(err.message);
        console.log(reqTypeValue);
        loader.hidden = true;
    })
    
});


async function getData(url, reqTypeValue){

    loader.hidden = false;


    let response = await fetch(url, {
        method: reqTypeValue
    });

    let data = await response.json();
    return data;
}


function displayData(data){
    console.log(data);
        loader.hidden = true;
        result.value = JSON.stringify(data);
        console.log(result);
    }
    



