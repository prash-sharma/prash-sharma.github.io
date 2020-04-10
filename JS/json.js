// Create an object
let student = {
    name: 'Aaron',
    age: 6,
    isEnrolled: true,
}

localStorage.clear()

// Convert object to JSON string
let objectToString = JSON.stringify(student)
console.log(typeof objectToString);

// Add JSON into localstorage
localStorage.setItem('student', objectToString)

// Retrieve a value from localstorage
let x = localStorage.getItem('student')
console.log(x);

// Convert retrieved localstorage value into an object
let y = JSON.parse(objectToString)
console.log(typeof y);
console.log(y.name);


