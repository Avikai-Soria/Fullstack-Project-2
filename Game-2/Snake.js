
gameGrid = []

function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

function doSome(){
    gameGrid[3][7].className = 'snake'
}

function constractGame(){
    const GAMESIZE = 30
    const gameZone = document.getElementById('game-zone')

    for (let i =0;i<GAMESIZE;i++){
        let column = document.createElement('tr')
        for (let j =0;j<GAMESIZE;j++){
            let area = document.createElement('td')
            area.className = 'area'
            column.appendChild(area)
        }
        gameGrid.push(column.children)
        gameZone.appendChild(column);
    }

}


