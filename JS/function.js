function sayHello(name, city){
    console.log(`Greetings my friend ${name} from ${city}`);
    console.log(`Hey ${name}`);
    
}

sayHello('John', 'Syd');


let fullNameMaker = function(firstName, lastName){
    console.log("Welcome bud");
    console.log(`Hey ${firstName} ${lastName}`)
}

fullNameMaker('Ye', 'Honda');

let myAdder = function (num1, num2) {
    let result = num1 + num2;
    return result;
}

myAdder(2, 5);
let total = myAdder(2, 2);
console.log(myAdder(1, 2));
console.log(total);