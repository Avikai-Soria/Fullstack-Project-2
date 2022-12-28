let username;
let profilePicture;
let score;
let timePlayed;

window.onload = loadUserInformation;
window.onbeforeunload = updateUserInformation;


function loadUserInformation() {
    username = sessionStorage.getItem("Username");
    profilePicture = sessionStorage.getItem("ProfilePicture");
    score = sessionStorage.getItem("Score");
    timePlayed = sessionStorage.getItem("TimePlayed");
    if (username === null) {
        document.getElementById("login-menu").style.display = "flex";
        return;
    }
    document.getElementById("username").innerHTML = username;
    document.getElementById("scoreDisplay").innerHTML ="צברת " + score + " נקודות";
    document.getElementById("timeDisplay").innerHTML = "שיחקת " + timePlayed + " דקות";
    document.getElementById("profile-picture").src = profilePicture;
    document.getElementById("user-menu").style.display = "flex";
}

function updateUserInformation() {
    const players = localStorage.getItem("Players");
    let currentPlayer;
    for (plauer of players) {
    }
    return null;
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