console.log('I am first');

const promise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        resolve({fname: 'Prashant', lname: 'Sharma'});
    }, 2000)    
})

promise.then((message) => {
    console.log(message.fname, message.lname);
})

console.log('I am 3rd or last');

















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




