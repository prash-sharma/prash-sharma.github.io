// ASSIGNMENT - 1: Return all item & index of an array using array.foreach() method.
/*
let arr = [];

arr.push('Man Utd')
arr.push('AC Milan')
arr.push('PSG')
arr.push('Juventus')
arr.push('Arsenal')
arr.push('Man City')

console.log(arr);

let x = arr.indexOf('Arsenal')

console.log(x);


arr.forEach((itemvalue, index) => console.log(index+1, itemvalue))

*/

// ASSIGNMENT - 2: Update todo list object via an external function and display results
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
// 1. Object with Methods
// 2. Update Object element with `this` keyword
/*
let taskListMon = {
    day: 'Mon',
    tasks: 0,
    completed: 0,
    updateTasks: function(tasks, completed){
        this.tasks = this.tasks + tasks;
        this.completed = this.completed + completed;
    },
    taskRemaining: function(){
        result = this.tasks - this.completed;
        return (`Tasks remaining is ${result}`);
    }   
}

reset = (obj) => {
    obj.tasks = 0;
    obj.completed = 0;
    obj.day = ''
}

taskListMon.updateTasks (10, 4);
console.log(taskListMon.taskRemaining ());
reset(taskListMon);
console.log(taskListMon);

*/

// ASSIGNMENT - 4: Search an array


// const cLTeams = ['Man Utd', 'Arsenal', 'Spurs', 'Chelsea', 'Wolves']

// console.log(cLTeams.indexOf('Man Utd'));


const cLWinners = [{
    clubName: 'Man Utd',
    cLWin: true,
}, {
    clubName: 'Arsenal',
    cLWin: false,
}, {
    clubName: 'Spurs',
    cLWin: false,
}, {
    clubName: 'Chelsea',
    cLWin: true,
}]
 
// Return the Object element which matches user's clubName string


const indexOfObject1 = cLWinners.findIndex(
    function (item){
       return item.clubName === 'Spurs'
    }
)
console.log(indexOfObject1);

const indexOfObject2 = cLWinners.findIndex((item)=> item.clubName === "Chelsea")

console.log(indexOfObject2);

// cLWinners.splice(2, 0, {clubName: 'Liverpool', cLWin : true})
// console.log(cLWinners);

// const findIndexOfAnObj = cLWinners.findIndex(
//     function(item){
//         console.log(item);
        
//         return item.cLWin == true
//     }
// )

// console.log(findIndexOfAnObj);



