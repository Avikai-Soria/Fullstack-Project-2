// variables
const GAMESIZE = 30
const EASYDIFF = 150;
const NORMALDIFF = 100;
const HARDDIFF = 50;
const DIFFLEVEL = [EASYDIFF, NORMALDIFF, HARDDIFF]
let currentDiff = NORMALDIFF;
const snakeSize = 5
const maxApples = GAMESIZE * GAMESIZE - snakeSize;
const gameZone = document.getElementById('game-zone')
var currentScore = -1;
let scoreBonus = 100;
var gameGrid = []
var playInteraval;
var timerInterval;
var snake = []
var state = "Left"
var nextState = "Left"
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

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

function startTimer(){
    if (!timerInterval){
        timerInterval = setInterval(updateTimer,1000)
    }
}

function stopTimer(){
    if (timerInterval){
        clearInterval(timerInterval)
        timerInterval = undefined
    }
}

function resetTimer(){
    stopTimer()
    secondsLabel.innerHTML = '00'
    minutesLabel.innerHTML= '00'
    totalSeconds = 0;
}


function updateTimer()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}



function updateScore() {
    currentScore += 1;
    const leftApples = maxApples - currentScore;

    const userMSG = document.getElementById('userMSG');
    userMSG.innerText = "נותרו עוד " + leftApples + " תפוחים";
    userMSG.innerText += '\n';
    userMSG.innerText += "הרווחת עד כה " + currentScore * scoreBonus + " נקודות!";
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
      
    resetTimer()
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
        gameEnd('LOSS');
        return
    }
    if (gameGrid[(newHead[1]*GAMESIZE)+newHead[0]].className === 'snake') {
        // YOU LOSE!
        gameEnd('LOSS');
        return
    }
    if (currentScore === maxApples){
        //Victory
        gameEnd('VICTORY');
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
    document.getElementById('instructions').className = 'hidden'
    if (document.getElementById('small-screen').style.visibility === 'visible'){
        return;
    }
    startTimer()
    currentDiff = getDifficulty();
    scoreBonus = 200 - currentDiff;
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

function gameEnd(state){
    stopTimer()
    clearInterval(playInteraval)
    const userMSG = document.getElementById("userMSG");
    if (state === 'LOSS'){
        userMSG.innerText = "המשחק נגמר! הרווחת " + currentScore * scoreBonus + " נקודות!";
        userMSG.innerText += "\n";
        userMSG.innerText += "לחידוש המשחק לחץ על המקש R."
    }
    else{
        userMSG.innerHTML = 'עשית את הלא יאומן! ניצחת!'

    }
    updateUserInformation(currentScore * scoreBonus, totalSeconds);
}
