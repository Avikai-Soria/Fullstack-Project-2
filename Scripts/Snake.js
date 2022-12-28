// variables
const GAMESIZE = 30
const EASYDIFF = 150;
const NORMALDIFF = 100;
const HARDDIFF = 50;
const DIFFLEVEL = [EASYDIFF, NORMALDIFF, HARDDIFF]
let currentDiff = NORMALDIFF;
const snakeSize = 5
const gameZone = document.getElementById('game-zone')
var currentScore = -1;
var gameGrid = []
var playInteraval;
var snake = []
var state = "Left"
var nextState = "Left"

// constract the area
for (let i = 0; i < GAMESIZE; i++) {
    let column = document.createElement('tr')
    for (let j = 0; j < GAMESIZE; j++) {
        let area = document.createElement('td')
        gameGrid.push(area)
        column.appendChild(area)
    }
    gameZone.appendChild(column);
}

reset()
addEventListener('keydown', changeState);

// help functions

function updateScore() {
    const maxApples = GAMESIZE * GAMESIZE - snakeSize;
    currentScore += 1;
    const leftApples = maxApples - currentScore;

    const userMSG = document.getElementById('userMSG');
    userMSG.innerText = "נותרו עוד " + leftApples + " תפוחים";
    userMSG.innerText += '\n';
    userMSG.innerText += "הרווחת עד כה " + currentScore * 100 + " נקודות!";
}

function addToSnake(point) {
    let x = point[0], y = point[1];
    gameGrid[(y*GAMESIZE)+x].className = 'snake'
    snake.push([x, y])
}

function removefromSnake() {
    point = snake.shift()
    gameGrid[(point[1]*GAMESIZE)+point[0]].className = 'area'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function addApple() {
    potentialApplePlaces = gameGrid.filter(function (element) {return element.className === 'area'})
    potentialApplePlaces[getRandomInt(potentialApplePlaces.length-1)].className = 'apple'
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
    if (e.keyCode === 82) {
        reset();
    }

    if (e.keyCode === 37 || e.keyCode === 65){ // Going left
        nextState = 'Left';
        return
    } 
        

    if (e.keyCode === 38 || e.keyCode === 87){ // Going up
        nextState = 'Up';
        return
    } 
        

    if (e.keyCode === 39 || e.keyCode === 68){ // Going right
        nextState = 'Right';
        return
    } 
        

    if (e.keyCode === 40 || e.keyCode === 83){
        nextState = "Down";// Going down
    } 
       
}

function updateState(){
    if ((state === 'Left' && nextState !== 'Right')||
        (state === 'Right' && nextState !== 'Left')||
        (state === 'Up' && nextState !== 'Down')||
        (state === 'Down' && nextState !== 'Up')
    ) // Update the state
    {
        state = nextState
    }
}


function reset() {

    stop()

    currentScore = -1;
    updateScore();

    for (let td of gameGrid){
        td.className = 'area'
    }

    // constract the snake
    const startSnakeY = 25
    const startSnakeX = 25
    for (let i = 0; i < snakeSize; i++) {
        addToSnake([startSnakeX - i, startSnakeY])
    }

    // constract the apple
    addApple()
}


// game functions

function move() {
    updateState()
    let head = snake[snake.length - 1]
    let newHead = applyState(head)

    if (newHead.some(function (element) { return element >= GAMESIZE || element < 0 })) {
        // YOU LOSE!
        gameOver();
        return
    }
    if (gameGrid[(newHead[1]*GAMESIZE)+newHead[0]].className === 'snake') {
        // YOU LOSE!
        gameOver();
        return
    }

    if (gameGrid[(newHead[1]*GAMESIZE)+newHead[0]].className === 'apple') {
        addToSnake(newHead)
        addApple()
        updateScore()
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
    const difficultyRadioButtons = document.getElementsByName("difficulty");
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
}

function gameOver() {
    clearInterval(playInteraval);
    const scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerText = "המשחק נגמר! הרווחת " + currentScore * 100 + " נקודות!";
    scoreDisplay.innerText += "\n";
    scoreDisplay.innerText += "לחידוש המשחק לחץ על המקש R."
}