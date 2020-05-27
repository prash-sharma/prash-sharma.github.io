console.log('PostIt');
document.querySelector(`.cus-par`).hidden = true;
document.querySelector('.cusPar-container').style.display = 'none';


document.querySelector(`#getType`).addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = true;
    document.querySelector(`#json`).checked = true;
    document.querySelector('.cusPar-container').style.display = 'none';
})

document.querySelector(`#postType`).addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = false; 
})

document.querySelector('#cus-par').addEventListener('click', () => {
    document.querySelector('.cusPar-container').style.display = 'flex';
})

document.querySelector('#json').addEventListener('click', () => {
    document.querySelector('.cusPar-container').style.display = 'none';
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
    



