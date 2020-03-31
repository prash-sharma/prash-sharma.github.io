let myToDos = {
    day: "Mon",
    totalTasks: 0,
    completedTasks: 0,
    updateDay: function(newDay) {
        this.day = newDay;        
    },

    summaryDay: function(){
        return this.day;
    },
    
    summaryTotal: function(){
        return this.totalTasks;
    },

    summaryCompleted: function () {
        return this.completedTasks;
    },

    reset: function () {
        this.day = 'Mon'
        this.totalTasks = 0;
        this.completedTasks = 0;
    }



}

myToDos.updateDay('Sat');
console.log(`Updated day is: ${myToDos.summaryDay()}`);
console.log(`Updated total task is: ${myToDos.summaryTotal()}`)
console.log(`Updated total task is: ${myToDos.summaryCompleted()}`)


