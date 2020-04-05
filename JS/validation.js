result = function(){

    let myValidation = ()=> {
        let myValue = document.getElementById('inp').value;

        if (isNaN(myValue) || myValue <1 || myValue >20 || myValue == ''){
        return `It's not a number or is less than 1 or greater than 20`
        } else{
        return `Welcome to my site`
        }
    }
    const output = document.createElement('p')
    output.textContent = myValidation()
    document.querySelector('body').appendChild(output)
    //document.getElementById('pone').innerHTML = myValidation()
    document.querySelector('p').innerHTML = myValidation()
} 






