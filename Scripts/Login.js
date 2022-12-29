class Player {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
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

loginUsernameEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        confirmLogin();
    }
});

loginPasswordEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        confirmLogin();
    }
});

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
        loginPasswordError.textContent = "הסיסמה לא יכולה להיות ריקה";
        flag = false;
    }
    else {
        loginPasswordEl.style.border = "2px solid green";
        loginPasswordError.textContent = "";
    }
    if (flag === false) return false;

    // If input is valid, we can check password

    const players = JSON.parse(localStorage.getItem("Players"));
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


