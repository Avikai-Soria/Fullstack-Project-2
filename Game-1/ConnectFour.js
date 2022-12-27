const playerRed = ["R", "red"];
const playerYellow = ["Y", "yellow"];
let playerHuman = playerRed;
let playerAI = playerYellow
const rows = 6;
const columns = 7;

let gameOver;
let currentBoard;
let currentColumns; //keeps track of which row each column is at.

/*window.onload = function () {
    setGame();
}*/

const startButton = document.getElementById("start-game-button");
startButton.addEventListener("click", setGame);

function setGame() {
    // Get the selected difficulty level
    const difficultyRadioButtons = document.getElementsByName("difficulty"); // This one might not be relevant
    let difficulty;
    for (let i = 0; i < difficultyRadioButtons.length; i++) {
        if (difficultyRadioButtons[i].checked) {
            difficulty = difficultyRadioButtons[i].value;
            break;
        }
    }

    // Get the selected color
    const colorRadioButtons = document.getElementsByName("color");
    if (colorRadioButtons[0].checked) {
        playerHuman =playerRed;
        playerAI = playerYellow;
    } // This mean the player choose red
    else {
        playerHuman = playerYellow;
        playerAI = playerRed;
    }

    let color;
    for (let i = 0; i < colorRadioButtons.length; i++) {
        if (colorRadioButtons[i].checked) {
            color = colorRadioButtons[i].value;
            break;
        }
    }

    let winner = document.getElementById("winner");
    winner.innerText = "";



    currentBoard = [];
    gameOver = false;
    currentColumns = [5, 5, 5, 5, 5, 5, 5];
    const boardEl = document.getElementById("board");
    boardEl.textContent = '';

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPieceFromElement);
            boardEl.append(tile);
        }
        currentBoard.push(row);
    }
}

function setPieceFromElement() {
    if (gameOver) {
        return;
    }

    //get coords of that tile clicked
    const coords = this.id.split("-");
    const row = parseInt(coords[0]);
    const col = parseInt(coords[1]);
    setPiece(col, playerHuman);
    if (gameOver === false) {
        easyPCMove();
    }
    if (currentColumns === [0, 0, 0, 0, 0, 0, 0]) {
        gameOver = true;
        let winner = document.getElementById("winner");
        winner.innerText = "זה תיקו!";
    }
}

function setPiece(col, player) {
    // figure out which row the current column should be on
    let row = currentColumns[col];

    if (row < 0) { // This column is already full
        return;
    }

    currentBoard[row][col] = player[0]; //update JS board
    const tile = document.getElementById(row.toString() + "-" + col.toString());
    tile.classList.add(player[1])
    currentColumns[col] -= 1;
    if (checkWinner(currentBoard)) {
        setWinner(player);
    }
}

function setWinner(player) {
    let winner = document.getElementById("winner");
    if (player === playerHuman) {
        winner.innerText = "ברכות! ניצחת!"
    }
    else {
        winner.innerText = "המחשב ניצח אותך! בהצלחה בפעם הבאה!"
    }
    gameOver = true;
}

function easyPCMove() {
    for (let col = 0; col < columns; col++) {
        const testBoard = currentBoard.map(function (arr) {
            return arr.slice();
        });
        let row = currentColumns[col];
        if (row < 0) {
            continue;
        }
        testBoard[row][col] = playerHuman[0]; //update JS board
        if (checkWinner(testBoard)) {
            setPiece(col, playerAI, currentBoard);
            return;
        }
    }

    // Returns a random integer from 0 to 9:
    let row = -1;
    let randCol;
    while (row < 0) {
        randCol = Math.floor(Math.random() * columns);
        row = currentColumns[randCol];
    }

    setPiece(randCol, playerAI, currentBoard);

}


function checkWinner(board) {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    return true;
                }
            }
        }
    }

    // vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    return true;
                }
            }
        }
    }

    // anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    return true;
                }
            }
        }
    }

    // diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    return true;
                }
            }
        }
    }
    return false;
}