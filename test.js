// get the form element
import Player from "./Player";
import Players from "./Players";

var form = document.getElementById('registration-form');

form.addEventListener('submit', function (event) {
    // prevent the form from being submitted
    event.preventDefault();
    window.alert(5 + 6);
});