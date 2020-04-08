let ul = document.getElementById('list');
let li = ul.children;

document.getElementById('remove').addEventListener('click', removeItem);
document.getElementById('add').addEventListener('click', addItem);


function addItem(){
    let input = document.getElementById('input')
    let inputValue = input.value;
    let textNode = document.createTextNode(inputValue);
    
    
    // console.log(textNode);
    
    if (input.value == '') {
        let pErr = document.createElement('p');
        let errNode = document.createTextNode('Enter some value above');
        pErr.appendChild(errNode);
        document.getElementById('input').after(pErr);
        pErr.setAttribute('id', 'errmsg');
    } else {
        // create li 
        let newLi = document.createElement('li');
        newLi.className = 'mycheck'

        // create input type checkbox
        let newCheckBox = document.createElement('input');
        newCheckBox.type = 'checkbox'
        newCheckBox.id = 'check'

        // create label
        let newLabel = document.createElement('label');
        newLabel.setAttribute('id', 'newLabel')
        //add the value from the 'textNode' into label
        newLabel.appendChild(textNode)

        // append checkbox + label into 'ul' at the top
        newLi.appendChild(newCheckBox)
        newLi.appendChild(newLabel)
        ul.insertBefore(newLi, ul.childNodes[0])
        input.value = ''
    }
}

function removeItem(){
    for (let index = 0; index < li.length; index++) {        

        while (li[index] && li[index].children[0].checked) {
            ul.removeChild(li[index])
        }
    }
}


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

