console.log('PostIt');

let url = document.querySelector('.url');
let submitBtn = document.querySelector('.submit');


// let requestType = document.querySelector('#get');
// let postRequest = document.querySelector('#post');


submitBtn.addEventListener('click', () => {
    let reqType = document.querySelector(`input[name='reqType']:checked`);
    console.log(url.value);
    console.log(reqType.value);
    
});


