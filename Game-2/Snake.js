
const gameZone = document.getElementById('game-zone')


function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

function drawPoint(i,j,className){
    gameZone.getElementsByTagName('tr')[i].getElementsByTagName('td')[j].className = className
}

function constractGame(){
    const GAMESIZE = 30

    for (let i =0;i<GAMESIZE;i++){
        let column = document.createElement('tr')
        for (let i =0;i<GAMESIZE;i++){
            let area = document.createElement('td')
            area.className = 'area'
            column.appendChild(area)
        }
        gameZone.appendChild(column);
    }

}


