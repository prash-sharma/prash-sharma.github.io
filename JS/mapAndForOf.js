var ManUtd = {
    name: 'Manchester United',
    league: 'EPL',
    cl: false
}

var Chelsea = {
    name: 'Chelsea',
    league: 'EPL',
    cl: true
}

var Barca ={
    name: 'Barcelona',
    league: 'La Liga',
    cl: true
}

let clubs = new Map();

clubs.set('Manchester United', ManUtd)
clubs.set('Chelsea FC', Chelsea)
clubs.set('Barcelona FC', Barca)

// console.log(clubs.keys());

// console.log(clubs.size);

// console.log(clubs.get('Barcelona FC'));

// console.log(clubs.values());

// for (const values of clubs.values()) {
//     console.log(values.name);
// }


