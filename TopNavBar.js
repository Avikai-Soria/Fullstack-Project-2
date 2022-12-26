function changeTopNavBarIcon() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

window.onload = function () {
    checkUser();
}

function checkUser() {
    if (sessionStorage.getItem("username === null"))
        return;
    
}
