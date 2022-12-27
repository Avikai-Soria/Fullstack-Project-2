// variables
const GAMESIZE = 30
const EASYDIFF = 150;
const NORMALDIFF = 100;
const HARDDIFF = 50;
const DIFFLEVEL = [EASYDIFF, NORMALDIFF, HARDDIFF]
let currentDiff = NORMALDIFF;
const snakeSize = 5
const gameZone = document.getElementById('game-zone')
var leftToWin = 0
var gameGrid = []
var playInteraval;
var snake = []
var state = "Left"

// constract the area
for (let i = 0; i < GAMESIZE; i++) {
    let column = document.createElement('tr')
    for (let j = 0; j < GAMESIZE; j++) {
        let area = document.createElement('td')
        column.appendChild(area)
    }
    gameGrid.push(column.children)
    gameZone.appendChild(column);
}

updateLeftToWin()
reset()
addEventListener('keydown', changeState);

// help functions

function updateLeftToWin(value = GAMESIZE * GAMESIZE - snakeSize) {
    document.getElementById('left-to-win').innerHTML = value
    leftToWin = value
}

function addToSnake(point) {
    let x = point[0], y = point[1];
    gameGrid[y][x].className = 'snake'
    snake.push([x, y])
}

function removefromSnake() {
    point = snake.shift()
    gameGrid[point[1]][point[0]].className = 'area'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function addApple() {
    gameGrid[getRandomInt(GAMESIZE)][getRandomInt(GAMESIZE)].className = 'apple'
}

function applyState(point) {
    return_point = [point[0], point[1]]

    switch (state) {
        case 'Right':
            return_point[0] += 1
            break;
        case 'Left':
            return_point[0] -= 1
            break;
        case 'Up':
            return_point[1] -= 1
            break;
        case 'Down':
            return_point[1] += 1
            break;
    }

    return return_point
}

// prepare game functions

function changeState(e) {
    if (!playInteraval) {
        start()
    }
    if (e.keyCode === 37 || e.keyCode === 65) // Going left
        if (state !== 'Right') {
            state = 'Left';
            return;
        }


    if (e.keyCode === 38 || e.keyCode === 87) // Going up
        if (state !== 'Down') {
            state = 'Up';
            return;
        }

    if (e.keyCode === 39 || e.keyCode === 68) // Going right
        if (state !== 'Left') {
            state = 'Right';
            return;
        }

    if (e.keyCode === 40 || e.keyCode === 83) // Going down
        if (state !== 'Up') 
            state = "Down";
}

function reset() {

    stop()

    for (let tr of gameGrid) {
        for (let td of tr) {
            td.className = 'area'
        }
    }

    // constract the snake
    const startSnakeY = 25
    const startSnakeX = 25
    for (let i = 0; i < snakeSize; i++) {
        addToSnake([startSnakeX - i, startSnakeY])
    }

    // constract the apple
    gameGrid[getRandomInt(7, startSnakeY)][getRandomInt(7, startSnakeX)].className = 'apple'
}


// game functions

function move() {
    let head = snake[snake.length - 1]
    let newHead = applyState(head)

    if (newHead.some(function (element) { return element >= GAMESIZE || element < 0 })) {
        // YOU LOSE!
        reset()
        return
    }
    if (gameGrid[newHead[1]][newHead[0]].className === 'snake') {
        // YOU LOSE!
        reset()
        return
    }
    if (leftToWin === 0) {
        // YOU WIN!
        reset()
        return
    }
    if (gameGrid[newHead[1]][newHead[0]].className === 'apple') {
        addToSnake(newHead)
        addApple()
        updateLeftToWin(leftToWin - 1)
        return; // No need to remove the tail
    }

    addToSnake(newHead)
    removefromSnake()

}

function start() {
    currentDiff = getDifficulty();
    if (!playInteraval)
        playInteraval = setInterval(move, currentDiff)
}

function getDifficulty() {
    // Get the selected difficulty level
    const difficultyRadioButtons = document.getElementsByName("difficulty"); // This one might not be relevant
    for (let i = 0; i < difficultyRadioButtons.length; i++) {
        if (difficultyRadioButtons[i].checked) {
            return DIFFLEVEL[i];
        }
    }

}


function stop() {
    if (playInteraval)
        clearInterval(playInteraval)
    playInteraval = undefined
    snake = []
    state = "Left"
    updateLeftToWin()
}