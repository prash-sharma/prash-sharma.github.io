// ASSIGNMENT - 1: Return all item & index of an array using array.foreach() method.
/*
const cLTeams = [];

cLTeams.push('Man Utd')
cLTeams.push('AC Milan')
cLTeams.push('PSG')
cLTeams.push('Juventus')
cLTeams.push('Arsenal')
cLTeams.push('Man City')
cLTeams.push('Spurs')
cLTeams.push('Dortmund')
cLTeams.push('Barca')
cLTeams.push('Ajax')

cLTeams.forEach((clubName, index) => {console.log(clubName, index);})
*/


// ASSIGNMENT - 2: Update todo list object and display results
/*
let taskListMon = {
    day: 'Monday',
    tasks: 0,
    completed: 0,
}

let taskListTue = {
    day: 'Tuesday',
    tasks: 0,
    completed: 0,
}

let updateTasks = (obj, tasksValue = 0, completedvalue = 0) => {
    obj.tasks = obj.tasks + tasksValue;
    obj.completed = obj.completed + completedvalue;
}

updateTasks (taskListMon, 10, 4)
updateTasks (taskListTue, 10, 10)

console.log(taskListMon);
console.log(taskListTue);

let taskRemaining = (obj) => {
    remainingCount = obj.tasks - obj.completed;
    console.log(`${obj.day} Remaining tasks = ${remainingCount}`);
    if (remainingCount == 0){
        console.log('Well done')
    } else {
        console.log('Keep focussed')
    }
}

let reset = (obj) => {
    obj.tasks = 0;
    obj.completed = 0;
}

taskRemaining (taskListMon);
taskRemaining (taskListTue);
*/

// ASSIGNMENT - 3: TO DO - https://www.youtube.com/watch?v=0wN-L9CG3y0&list=PLRAV69dS1uWTSu9cVg8jjXW8jndOYYJPP&index=21&pbjreload=10


let taskListMon = {
    day: 'Mon',
    tasks: 0,
    completed: 0,
    myFunction: function(){
        console.log(this);
    },
}

let taskListTue = {
    day: 'Tue',
    tasks: 0,
    completed: 0,
    myFunction: () =>{

    },
}

taskListMon.myFunction();