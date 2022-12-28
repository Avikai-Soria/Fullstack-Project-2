// Getting relevant elements for login
const signupUsernameEl = document.getElementById('signup-username');
const signupEmailEl = document.getElementById('signup-email');
const signupPasswordEl = document.getElementById('signup-password');
const signupConfirPasswordEl = document.getElementById('signup-confirm-password');
const errorUsername = document.getElementById("signup-username-error");
const errorEmail = document.getElementById("signup-email-error");
const errorPassword = document.getElementById("signup-password-error");
const errorConfirmPassword = document.getElementById("signup-confirm-password-error");

const signupBtn = document.getElementById('signup-button');

signupBtn.onclick = function () { confirmSignup() };

function confirmSignup() {
    // confirm username
    let flag = true;
    if (signupUsernameEl.value === "") {
        errorUsername.textContent = "שם משתמש חייב להכיל תווים.";
        signupUsernameEl.style.border = "2px solid red";
        flag = false;
    }
    else {
        errorUsername.textContent = "";
        signupUsernameEl.style.border = "2px solid green";
    }

    if (!isEmailValid(signupEmailEl.value)) {
        errorEmail.textContent = "כתובת אימייל לא חוקית";
        signupEmailEl.style.border = "2px solid red";
        flag = false;
    }
    else {
        errorEmail.textContent = "";
        signupEmailEl.style.border = "2px solid green";
    }

    if (!isPasswordSecure(signupPasswordEl.value)) {
        errorPassword.textContent = "הסיסמה חייבת להיות באורך 8 תווים באנגלית לפחות, ולכלול לפחות אות קטנה אחת, אות גדולה אחת, מספר אחד ותו מיוחד אחד.";
        signupPasswordEl.style.border = "2px solid red";
        flag = false;
    }
    else {
        errorPassword.textContent = "";
        signupPasswordEl.style.border = "2px solid green";
    }

    if (signupPasswordEl.value === signupConfirPasswordEl.value) {
        errorConfirmPassword.textContent = "";
        signupConfirPasswordEl.style.border = "2px solid green";
    }
    else {
        errorConfirmPassword.textContent = "אימות הסיסמה לא תקין.";
        signupConfirPasswordEl.style.border = "2px solid red";
    }

    if (flag === false) return flag;

    let players = JSON.parse(localStorage.getItem("Players"));
    if (players === null) {
        players = [];
    }
    console.log(players);

    // This line is very problematic, need to check it later
    const player = new Player(signupUsernameEl.value, signupPasswordEl.value, signupEmailEl.value);
    console.log(typeof players);
    if (addPlayer(players, player)) {
        localStorage.setItem("Players", JSON.stringify(players))
        window.alert("נרשמת בהצלחה!");
        sessionStorage.setItem("Username", signupUsernameEl.value);
        document.location.href = "./index.html";
    }
    else {
        signupUsernameEl.style.border = "2px solid red";
        window.alert("קיים משתמש עם השם הזה. אנא בחר שם אחר.");
    }
}

function addPlayer(arrayOfPlayers, newPlayer) {
    for (const player of arrayOfPlayers) {
        if (player.username === newPlayer.username)
            // A player with this username already exists.
            return false;
    }
    arrayOfPlayers.push(newPlayer);
    return true;
}


// Util functions
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}
