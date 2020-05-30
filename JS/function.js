// function sayHello(name, city){
//     console.log(`Greetings my friend ${name} from ${city}`);
//     console.log(`Hey ${name}`);
    
// }

// sayHello('John', 'Syd');


// let fullNameMaker = function(firstName, lastName){
//     console.log("Welcome bud");
//     console.log(`Hey ${firstName} ${lastName}`)
// }

// fullNameMaker('Ye', 'Honda');

// let myAdder = function (num1, num2) {
//     let result = num1 + num2;
//     return result;
// }

// myAdder(2, 5);
// let total = myAdder(2, 2);
// console.log(myAdder(1, 2));
// console.log(total);

let multiplier = function (num1, num2) {
    return num1 * num2;
}

console.log(multiplier(5, 5));


let guestUser = function (name = 'Guest', courseCount = 0) {
    return 'Hello ' + name +', your course count is: ' + courseCount;
}

console.log(guestUser('Ye', 10));

console.log(guestUser());
