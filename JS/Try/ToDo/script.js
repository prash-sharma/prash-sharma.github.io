
var ul = document.getElementById('list');
var li = ul.children;

document.getElementById('remove').addEventListener('click', removeItem);
document.getElementById('add').addEventListener('click', addItem);


function addItem(){
    var input = document.getElementById('input');
    var value = input.value;
    
    
    if (value == '') { 
        let pErr = document.createElement('p');
        pErr.textContent = 'Enter some value plz'
        pErr.setAttribute('id', 'errmsg')
        document.querySelector("#input").before(pErr);
    } else {

        // create list
        let newLi = document.createElement('li')
        newLi.className = 'mycheck'
        let newLiNode = document.create

        // create input type checkbox
        var newCheckBox = document.createElement('input');
        newCheckBox.type = 'checkbox'
        newCheckBox.id = 'check'

        // create label
        var newLabel = document.createElement('label');
        // add the value from 'input' into label
        newLabel.textContent = value;
        
        // append checkbox + label into 'ul' at the top
    }
}





function removeItem(){
    for (let index = 0; index < li.length; index++) {        

        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index])
        }
    }
}



/* solution

var ul = document.getElementById('list')
var li = ul.children //Returns ul's li as an array li = [li, li, li, li]

document.getElementById('remove').addEventListener('click', removeItem)

document.getElementById('add').addEventListener('click', addItem)

function removeItem() {
    for (let index = 0; index < li.length; index++) { 
        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index])
        }
    }
}

function addItem() {
    console.log('Add button clicked');
    
}
*/


/* EXAMPLES
var p = document.createElement('p')
p.textContent = "Hello world"
document.querySelector('div').appendChild(p)

var p = document.createElement('p')
var myValue = document.createTextNode("Hello world again")
p.appendChild(myValue)
document.querySelector('div').appendChild(p)


document.querySelector('form').addEventListener('submit', (event)=>{
    let a = event.target.inputbox1.value
    let b = event.target.inputbox2.value

    function myValidation(){
    if (a===b) {
        return 'Welcome'
    } else{
        return 'Try again'
    }}

    // This one 
    let p = document.createElement('p')
    let value = document.createTextNode('Hey')
    p.appendChild(value)
    document.getElementById('someElementId').appendChild(p)

    // Or this one
    let p = document.createElement('p')
    p.textContent = myValidation()
    document.querySelector('body').appendChild(p)
})
*/

