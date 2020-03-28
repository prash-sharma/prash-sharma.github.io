function imageGenerator(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-image-gen');
    image.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=random";
    div.appendChild(image);

}