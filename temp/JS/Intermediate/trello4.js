const myToDos = ['Go to shops', 'Buy milk', 'Pick up Aan', 'Barber'];

// console.log(myToDos.indexOf('Pick up Aan'));

const newToDos = [{
    title: 'Buy Bread',
    isDone: false,
}, {
    title: 'Go to Gym',
    isDone: false,
}, {
    title: 'Watch YouTube videos',
    isDone: false,
}]


const index = newToDos.findIndex(function(item, index){
    return item.title === 'Go to Gym'
})

console.log(index);
