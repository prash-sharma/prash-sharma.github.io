document.querySelector('.myform').addEventListener('submit',(event)=>{
    
    event.preventDefault()
    console.log(event.target.username.value);
    console.log(event.target.fullname.value);
    event.target.username.value =''
    event.target.fullname.value = ''
}  )