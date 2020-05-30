const anObject = {
    league: 'EPL',
    team: 'Man Utd',
    position: 5,
    myFunc: function(){
        return `${this.team} is in ${this.league}`
    }
}

console.log(anObject.myFunc());

// Avoid using => funtion within an Object with `this`

const anObject2 = {
    league: 'EPL',
    team: 'Man Utd',
    position: 5,
    myFunc: function(){
        return this.team 
    } 
}

console.log(anObject2.myFunc());
