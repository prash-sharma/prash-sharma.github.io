import onePlayer from './onePlayer.js';
import twoPlayers from './twoPlayers.js';


let playerType = location.search.substring(1);

// console.log(playerType);

gameType(playerType);

function gameType(playerType){
    if (playerType === 'one'){
        onePlayer();
        // console.log('Clicked one player');

    } else if(playerType === 'two') {
        twoPlayers();
        console.log('Clicked two players');
    }
}
    
document.querySelector('.board').style.cursor = "url(images/x.png), auto";
