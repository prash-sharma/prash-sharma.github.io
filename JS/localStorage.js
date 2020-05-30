localStorage.setItem('game1', 'kratos')
localStorage.setItem('game2', 'link')

localStorage.removeItem('hero')

let x = localStorage.getItem('game1')
console.log(x);

// localStorage.clear()
localStorage.setItem('game2', 'Batman')

let y = localStorage.getItem('game2')
console.log(y);
