function imageGenerator(){
    let div = document.createElement('div');
    div.className = "container-item-1"
    div.id = "flex-image-gen"
    document.querySelector('.container').appendChild(div)
    
// <div class="container-item-1" id="flex-image-gen">

    var imageSrc = document.createElement('img');
    var abc = document.getElementById('flex-image-gen');
    imageSrc.src = "https://api.thecatapi.com/api/images/get?format=src&type=gif&size=random";
    abc.appendChild(imageSrc);

    var image = document.createElement('img');
    image.src = "lynel.jpg";
    var newDiv = document.getElementById('flex-image-gen');
    newDiv.appendChild(image);

    let video = document.createElement('iFrame');
    video.src = '/aanya.mp4';
    document.getElementById('flex-image-gen').appendChild(video);
}

function reset(){
    document.getElementById('flex-image-gen').remove()
}