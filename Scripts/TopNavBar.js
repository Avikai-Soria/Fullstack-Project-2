const players = JSON.parse(localStorage.getItem("Players"));

let username;
let profilePicture;
let score;
let timePlayed;

window.onload = loadUserInformation;


function loadUserInformation() {
    username = sessionStorage.getItem("Username");
    if (username === null) {
        document.getElementById("login-menu").style.display = "flex";
        return;
    }
    const player = getPlayerByName(username);
    profilePicture = player.profilePicture;
    score = player.totalScore;
    timePlayed = player.timePlayed;

    document.getElementById("username").innerHTML = username;
    document.getElementById("scoreDisplay").innerHTML ="צברת " + score + " נקודות";
    document.getElementById("timeDisplay").innerHTML = "שיחקת " + (timePlayed/60).toFixed(2) + " דקות";
    if (profilePicture === '') {
        document.getElementById("profile-picture").src = "./Images/no-profile-picture-icon.png";
    }
    else {
        document.getElementById("profile-picture").src = profilePicture;
    }
    document.getElementById("user-menu").style.display = "flex";
}

function updateUserInformation(moreScore, moreTime) {
    if (username === null) {
        return;
    }
    const player = getPlayerByName(username);
    player.totalScore += moreScore;
    player.timePlayed += moreTime;
    updatePlayers();
    loadUserInformation();
}

function updatePlayers() {
    localStorage.setItem("Players", JSON.stringify(players))
}

function getPlayerByName(username) {
    if (players === null) {
        return null;
    }
    return players.find(obj => { return obj.username === username })
}

function userMenuDisplay() {
    const userMenuOptions = document.getElementById('user-menu-options');
    if (userMenuOptions.style.display === 'block') {
        userMenuOptions.style.display = 'none';
    }
    else {
        userMenuOptions.style.display = 'block';
    }
}

function userDisconnect() {
    sessionStorage.removeItem("Username");
    document.location.reload(true);
}