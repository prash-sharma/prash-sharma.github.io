let userEmail = 'BBlco12';
let password = '1234';

let userChecker = function (myString) {
    if ((myString.includes(123)) && myString.length >6 ){
        return true;
    } else {
        return false;
    }
}

let passwordChecker = function (pass){
    if (pass.length > 8 && pass.includes(123)){
        return true
    } else {
        return false;
    }
} 

console.log(passwordChecker('Howdy123'));


