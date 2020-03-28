let iAmGlobal = "iAmGlobal";

console.log(iAmGlobal)

if (true) {
    console.log(iAmGlobal)
    
    iAmGlobal = "Modified iAmGlobal"
    var iAmLocal = "someMoreValue";
   
    console.log(iAmGlobal);
    console.log(iAmLocal);
}

console.log(iAmGlobal)
console.log(iAmLocal);


 