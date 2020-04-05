const newElement = document.createElement('p')

newElement.textContent = `I'm from JS file`

document.querySelector('body').appendChild(newElement)


document.querySelectorAll('p').forEach(function(p){
    p.textContent = `I'm changed by the JS file`
})


document.querySelector('button').addEventListener('click', (event)=>{
    event.target.textContent = 'Button clicked'
    
})

document.querySelector('#inp').addEventListener('input', (event)=>{
    console.log(event.target.value);
    
})