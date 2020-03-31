let myToDos = {
    day: 'Mon',
    meetings: 0,
    meetDone: 0,
}

function addMeeting(todo, meet1 = 0, meet2 = 0){
    todo.meetings = meet1;
    todo.meetDone = meet2;
    
}


addMeeting(myToDos, 7, 3);

console.log(myToDos);

let results = myToDos.meetings - myToDos.meetDone;
console.log(results)


addMeeting(myToDos, 5); //meetings: 5, meetDone: 0
console.log(` Test ${myToDos.meetings}`);


function meetDone(todo, meet = 0){
    todo.meetDone = meet;
}

meetDone(myToDos, 3)

console.log(myToDos);

let result = myToDos.meetings - myToDos.meetDone;
console.log(`Meetings left for ${myToDos.day} is ${result}`);



// function resetDay(todo) {
//     todo.meetings = 0;
//     todo.meetDone = 0;
// }

// function getSummaryOfDay(todo) {
//     let meetLeft = todo.meetings + todo.meetDone;
//     return `You've ${meetLeft} meetings left today`;
// }

// addMeeting(myToDos, 4);
// addMeeting(myToDos, 2)
// meetDone(myToDos, 5);

// console.log(myToDos);

// console.log(getSummaryOfDay(myToDos));