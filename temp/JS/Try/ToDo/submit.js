document.querySelector('.form').addEventListener('submit', (event)=>{
    v1 = event.target.pass1.value;
    v2 = event.target.pass2.value;
    
    myFunc = () => {
        if (v1 === v2) {
            return 'get in'
        } else {
        return 'incorrect pws'
        } }
    
    var p = document.createElement('p')
    p.textContent = myFunc()
    document.querySelector('body').appendChild('p')
    }
)

/* SAMPLE

document.querySelector('.signup').addEventListener('submit', (event)=>{
    event.preventDefault()
    let p1 = event.target.password1.value
    let p2 = event.target.password2.value
    
    validation = ()=>{
    if (p1 != p2) {
        return 'Passwords do not match'
    } else {
        return 'Welcome in!!'
    }}
    
    let output = document.createElement('p')
    output.textContent = validation()
    document.querySelector('body').appendChild(output)
    
    event.target.name.value = ''
    event.target.email.value = ''
    event.target.password1.value = ''
    event.target.password2.value = ''
}
)

*/