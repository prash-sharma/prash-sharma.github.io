console.log('PostIt');
document.querySelector(`.cus-par`).hidden = true;
document.querySelector('.cusParValues').style.display = 'none';


document.querySelector(`#getType`).addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = true;
    document.querySelector(`#json`).checked = true;
    document.querySelector('.cusParValues').style.display = 'none';
})

document.querySelector(`#postType`).addEventListener('click', () => {
    document.querySelector(`.cus-par`).hidden = false; 
})

document.querySelector('#cus-par').addEventListener('click', () => {
    document.querySelector('.cusParValues').style.display = 'flex';
    document.querySelector('.jsonValue').style.display = 'none';
})

document.querySelector('#json').addEventListener('click', () => {
    document.querySelector('.cusParValues').style.display = 'none';
    document.querySelector('.jsonValue').style.display = 'flex';
})

let loader = document.querySelector('.loader');
    loader.hidden = true;


let inputUrl = document.querySelector('.url');
let submitBtn = document.querySelector('.btn');
let result = document.querySelector('#resultPrism');
let jsonInput = document.querySelector('#jsonInput');


submitBtn.addEventListener ('click', () => {
    let reqTypeValue = document.querySelector(`input[name='reqType']:checked`).value;
    let url = inputUrl.value;
    console.log(url);
    if(url && url.trim().length){
        console.log(reqTypeValue);
        if (reqTypeValue === 'GET'){
            let getParam = {
                method: reqTypeValue
            }
            getData(url, getParam).then((data) => {
                displayData(data);
                console.log(reqTypeValue);
            }).catch((err) => {
                console.log(err.message);
                console.log(reqTypeValue);
                loader.hidden = true;
            })
        } else {
            let postParam = {
                method: 'POST',
                body: jsonInput.value,
                headers: {
                    "Content-type": 'application/json'
                }
            }
            getData(url, postParam).then((data) => {
                displayData(data);
                console.log(reqTypeValue);
            }).catch((err) => {
                console.log(err.message);
                console.log(reqTypeValue);
                loader.hidden = true;
            })
        }
    }
    
      
});


async function getData(url, fetchParam){

    loader.hidden = false;

    let response = await fetch(url, fetchParam);

    let data = await response.text();
    return data;
}


function displayData(data){
    // console.log(data.results[0].email);
    console.log(data);
        loader.hidden = true;
        result.innerHTML = data;
        console.log(result.textContent);
    }
    


// Add new input boxes for custom values 

document.querySelector('.btn-add').addEventListener('click', () => {
    console.log('Plus btn clicked');
    
    let div = document.createElement('div');
    div.className = 'cusParDiv'

    let input1 = document.createElement('input');
    input1.className = 'cusParEntry';
    input1.type = 'text';

    let input2 = document.createElement('input');
    input2.className = 'cusParEntry';
    input2.type = 'text';

    let minusBtn = document.createElement('button');
    minusBtn.className = "btn-remove";
    minusBtn.textContent = '-';

    let br = document.createElement('br');

    div.appendChild(input1);
    div.appendChild(input2);
    div.appendChild(minusBtn);
    
    // document.querySelector('.cusParValues').style.display = 'flex';
    document.querySelector('.cusParValues').appendChild(div);
    document.querySelector('.cusParValues').appendChild(br);


    document.querySelector('.btn-remove').addEventListener('click', (e) => {
        console.log('Remove btn clicked');
        console.log(e.currentTarget.parentNode.className);
        e.currentTarget.parentNode.className.remove;
    })
})

 // Remove existing corresponding custom value boxes

 






// let url = 'https://randomuser.me/api/?results=5';
// let url = 'https://prash-sharma.github.io/animals.json';
// let url = 'http://www.json-generator.com/api/json/get/coYoFCTehu?indent=2';


// let jsonObjEx = {
//     "title": "foo",
//     "body": "bar",
//     "id": 1
// }
