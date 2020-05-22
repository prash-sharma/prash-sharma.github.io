
// ************ fetch api - https://www.youtube.com/watch?v=38uPRscJXfo
console.log(`Hello I've started..`);

let myBtn = document.getElementById('myBtn');
let myDiv = document.getElementById('container');

myBtn.addEventListener('click', trigGetData);



// async function getData(){
    
//     let url = 'animals.json'

//     let response = await fetch(url);
//     let data = await response.json();

//     return data;
// }

// let a = getData();

// updateDiv(a);

// function updateDiv(data){
//     let something = document.createTextNode(data)
//     myDiv.appendChild(something);
// }

async function getData(){
    const url = 'http://newsapi.org/v2/top-headlines?country=us&apiKey=e9d3a9efed9545d486a9367a64d54173';
    
    let response = await fetch(url);
    
    let data = await response.json();
    
    console.log(data);
    
    return data;  
}

function trigGetData(){
    getData().then((data) => {
        updateDiv(data);
    }).catch((err)=> {
        console.log(err.message);
    });

    function updateDiv(data){
        let something = document.createTextNode(`Cat's name is: ${data[0].name} & likes to eat: ${data[0].foods.likes[0]}`)
        myDiv.appendChild(something);
    }
}



// ******************* ASYNC AWAIT
// async function myFunction(){
//     console.log(`myFunction has been called.`);
    
//     let response = await fetch('https://api.github.com/users');
//     let users = await response.json();

//     console.log(`I'm waiting...`);
    
//     return users;
// }

// console.log('Before calling myFunction');

// let a = myFunction();

// console.log('After calling myFunction');

// a.then((data) => console.log(data));






// ********************************** PROMISE
// function timer(ms){
//     let newProm = new Promise((resolve, reject) => {
//         // setTimeout(reject, ms);
//         setTimeout(() => resolve(5), ms);
        
//     });
//     newProm.then(myFunc).then(myFunc2)
// }

// async function myFunc(a){
//     return (a*a);
// }



// async function myFunc2(b){
//         console.log(b+b);
// }

// timer(2000);

// ****************************

// console.log('I am first');

// const promise = new Promise((resolve, reject) => {
    
//     setTimeout(() => {
//         resolve({fname: 'Prashant', lname: 'Sharma'});
//     }, 2000)    
// })

// promise.then((message) => {
//     console.log(message.fname, message.lname);
// })

// console.log('I am 3rd or last');






// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(`It's resolved bud, cheers..`)
//     }, 3000)
// })


// promise2.then((message) => {
//     console.log(message.length);
    
// })







// PROMISES 
// let buyBall = function(){
//     return new Promise((resolve, reject) => {
//         resolve('Purchased a football.')
//     })
// }

// let goToPark = function(param){
//     return new Promise((resolve, reject) => {
//         resolve(param + 'Went to park.')
//     })
// }

// let playFootball = function(param){
//     return new Promise((resolve, reject) => {
//         resolve (param + 'Had a great game.')
//     })
// }

// Promise.all([buyBall(), goToPark(), playFootball()]).then(()=>console.log('All jobs done'))






// let name = () => {
//     console.log('Hey hey');
    
// }

// name();

// console.log(`OH: ${window.outerHeight}`);
// console.log(`IH: ${window.innerHeight}`);

// console.log(`**************`);

// console.log(`OW: ${window.outerWidth}`);
// console.log(`IW: ${window.innerWidth}`);

// confirm('Are you sure?')





// let arr = ['a', 'n', 'a', 'b', 'a', 'm']

// if ( (arr[0] && arr[1] && arr[2]) === 'a') {
//     console.log('Value is a');
// }

// // ------------------------------

// if ( arr[0] === 'a' && arr[1] === 'a' && arr[2] === 'a') {
//     console.log('Value is a');
// }



// let previousInputs = {};

// let answer;


// let x = 5;
// let y = 10;
// let z = 20;
// let a = 5;
// let b = 6;

// calculateSquare(x);
// calculateSquare(y);
// calculateSquare(z);
// calculateSquare(a);
// calculateSquare(b);


// function calculateSquare(input){
    
//     if (previousInputs[input]){
    
//         answer = previousInputs[input];
        
//         console.log(`I'm from exiting object: ${answer}`);
        
//         return answer;
//     } else {
//         let key = input;
//         answer = input * input;
//         previousInputs[key] = answer;
        
//         console.log(`I'm just calculated: ${answer}`);
        
        
//         return answer;
//     }    
// };

// let h = document.createElement('p');
// h.textContent = answer;


// document.body.appendChild(h);


// previousInputs.new = 800;

// previousInputs['new'] = 70000;


// console.log(previousInputs);




