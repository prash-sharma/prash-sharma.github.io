function ageInDays(){
    var birthYear = prompt("Year of born?");
    var ageInDayz = (2020 - birthYear) * 365;

    document.getElementById('flex-box-result').innerHTML = ('Days in number is:' + ageInDayz);

    // var h1 = document.createElement('p');
    // var textAnswer = document.createTextNode(ageInDayz);
    // //h1.setAttribute('id', 'ageInDays');
    // h1.appendChild(textAnswer);
    // document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('flex-box-result').remove();
}