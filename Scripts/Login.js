class Player {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.winCount = 0;
        this.timePlayed = 0;
        this.totalScore = 0;
        this.profilePicture = "";
    }
}

// Getting relevant elements for login
const loginUsernameEl = document.getElementById('log-username');
const loginPasswordEl = document.getElementById('log-password');
const loginUsernameError = document.getElementById('log-username-error');
const loginPasswordError = document.getElementById('log-password-error');


const loginBtn = document.getElementById('login-button');
loginBtn.onclick = function () { confirmLogin() };

function confirmLogin() {
    let flag = true;
    if (loginUsernameEl.value === "") {
        loginUsernameError.textContent = "שם משתמש חייב להכיל תווים.";
        loginUsernameEl.style.border = "2px solid red";
        flag = false;
    }
    else {
        loginUsernameError.textContent = "";
        loginUsernameEl.style.border = "2px solid green";
    }

    if (loginPasswordEl.value === "") {
        loginPasswordEl.style.border = "2px solid red";
        loginPasswordError.textContent = "הסיסמה חייבת להיות באורך 8 תווים באנגלית לפחות, ולכלול לפחות אות קטנה אחת, אות גדולה אחת, מספר אחד ותו מיוחד אחד.";
        flag = false;
    }
    else {
        loginPasswordEl.style.border = "2px solid green";
        loginPasswordError.textContent = "";
    }
    if (flag === false) return false;

    // If input is valid, we can check password

    let players = JSON.parse(localStorage.getItem("Players"));
    if (players === null) {
        players = [];
    }
    console.log(players);

    let username = loginUsernameEl.value;
    let password = loginPasswordEl.value;
    for (const player of players) {
        if (player.username === username)
            if (player.password === password) {
                window.alert("התחברת בהצלחה!");
                sessionStorage.setItem("Username", username);
                sessionStorage.setItem("Score", player.totalScore);
                sessionStorage.setItem("TimePlayed", player.timePlayed);
                sessionStorage.setItem("ProfilePicture", player.profilePicture);
                document.location.href = "./index.html";
                return true;
            }
            else {
                window.alert("שם משתמש או סיסמה לא נכונים.");
                return false;
            }
    }
    window.alert("שם משתמש או סיסמה לא נכונים.");
    return false;
}


