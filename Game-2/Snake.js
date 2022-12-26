// variables
const GAMESIZE = 30
const snakeSize = 5
var leftToWin = 0
const gameZone = document.getElementById('game-zone')
var gameGrid = []
var playInteraval;
var snake = []
var state = "KeyA"

// constract the area
for (let i =0;i<GAMESIZE;i++){
    let column = document.createElement('tr')
    for (let j =0;j<GAMESIZE;j++){
        let area = document.createElement('td')
        column.appendChild(area)
    }
    gameGrid.push(column.children)
    gameZone.appendChild(column);
}

updateLeftToWin()
reset()
addEventListener('keypress', changeState)

// help functions

function updateLeftToWin(value = GAMESIZE * GAMESIZE - snakeSize){
    document.getElementById('left-to-win').innerHTML = value
    leftToWin = value
}

function addToSnake(point){
    let x = point[0] ,y = point[1];
    gameGrid[y][x].className = 'snake'
    snake.push([x,y])
}

function removefromSnake(){
    point = snake.shift()
    gameGrid[point[1]][point[0]].className = 'area'
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

function addApple(){
    gameGrid[getRandomInt(GAMESIZE)][getRandomInt(GAMESIZE)].className = 'apple'
}

function applyState(point){
    return_point = [point[0],point[1]]

    switch(state){
        case 'KeyD':
            return_point[0] -= 1
            break;
        case 'KeyA':
            return_point[0] += 1
            break;
        case 'KeyW':
            return_point[1] -= 1
            break;
        case 'KeyS':
            return_point[1] += 1
            break;
    }
    
    return return_point
}

// prepare game functions


function get_level(){
    return 100
}

function changeState(e){
    if (!playInteraval){
        start()
    }
    if (e.code === 'KeyW' || e.code === 'KeyS' || e.code === 'KeyA' || e.code === 'KeyD'){
        if ((state === 'KeyA' && e.code !== 'KeyD') ||
            (state === 'KeyD' && e.code !== 'KeyA') ||
            (state === 'KeyW' && e.code !== 'KeyS') ||
            (state === 'KeyS' && e.code !== 'KeyW') 
        ) {state = e.code}
    }
}

function reset(){
    
    stop()

    for (let tr of gameGrid){
        for (let td of tr){
            td.className = 'area'
        } 
    }

    // constract the snake
    const startSnakeY = 25
    const startSnakeX = 5
    for (let i=0;i<snakeSize;i++){
        addToSnake([startSnakeX+i,startSnakeY])
    }

    // constract the apple
    gameGrid[getRandomInt(7,startSnakeY)][getRandomInt(7,startSnakeX)].className = 'apple'
}


// game functions

function move(){
    let head = snake[snake.length - 1]
    let newHead = applyState(head)

    if (newHead.some(function (element) {return element >= GAMESIZE || element < 0})){
        // YOU LOSE!
        reset()
        return
    }
    if (gameGrid[newHead[1]][newHead[0]].className === 'snake'){
        // YOU LOSE!
        reset()
        return
    }
    if (leftToWin === 0){
        // YOU WIN!
        reset()
        return
    }
    if (gameGrid[newHead[1]][newHead[0]].className === 'apple'){
        addToSnake(newHead)
        addApple()
        updateLeftToWin(leftToWin-1)
    }

    addToSnake(newHead)
    removefromSnake()

}

function start(){
    if (!playInteraval)
        playInteraval = setInterval(move, get_level())
}


function stop(){
    if (playInteraval)
        clearInterval(playInteraval)
        playInteraval = undefined
        snake = []
        state = "KeyA"
        updateLeftToWin()
}