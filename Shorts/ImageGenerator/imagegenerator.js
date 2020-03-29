function imageGenerator(){
    var image = document.createElement('img');
    var abc = document.getElementById('flex-image-gen');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=random";
    abc.appendChild(image);
}

function myFunction(){
    var image = document.createElement('img');
    image.src = "pp.jpg";
    var newDiv = document.getElementById('flex-image-gen');
    newDiv.appendChild(image);
}