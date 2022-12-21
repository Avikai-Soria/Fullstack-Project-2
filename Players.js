// Importing functions from fs to write and read files
const fs = require('fs');


class Player {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.winCount = 0;
        this.timePlayed = 0;
        this.totalScore = 0;
    }
}

class Players {
    arrayOfPlayers;
    constructor() {
        const data = fs.readFileSync('players.json', 'utf8');
        this.arrayOfPlayers = JSON.parse(data);
    }

    addPlayer(newPlayer) {
        for (const player of this.arrayOfPlayers) {
            if (player.username === newPlayer.getUsername)
                // A player with this username already exists.
                return false;
        }
        this.arrayOfPlayers.push(newPlayer);
    }

    deletePlayer(toDeletePlayer) {
        for (const player of this.arrayOfPlayers) {
            if (player.username === toDeletePlayer.username) {
                if (player.password === toDeletePlayer.password) { // This check is not necessery, but it's better for safety.
                    this.arrayOfPlayers = this.arrayOfPlayers.filter(removePlayer => removePlayer.username != toDeletePlayer.username);
                    return true;
                }
                // The password inserted was incorrect.
                return false;
            }
        }
        // A user with this username was not found.
        return false;
    }

    getPlayerByName(username) {
        return this.arrayOfPlayers.find(obj => { return obj.username === username })
    }

    getPlayer(player) {
        return this.arrayOfPlayers.find(obj => { return obj.username === player.username })
    }

    erasePlayers() {
        this.arrayOfPlayers = [];
    }

    displayPlayers() {
        for (const player of this.arrayOfPlayers) {
            console.log(player);
        }
    }

    saveChanges() {
        fs.writeFileSync('players.json', JSON.stringify(players));
    }

    initializeListForTesting() {
        this.erasePlayers();

        // Create new players for testing
        const playerOne = new Player("Avikaielef", "avikaianddaniel@gmail.com");
        const playerTwo = new Player("Avishay", "avishayelihay@gmail.com");
        const playerThree = new Player("jsLover", "JS@JS.COM");


        // Add a student to the list
        players.push(playerOne);
        players.push(playerTwo);
        players.push(playerThree);
    }

}

const players = new Players();
console.log("This is the current list of players:");
players.displayPlayers();

console.log("Looking for user with the username Avikaielef");
const user = players.getPlayerByName("Avikaielef");
console.log(user);

console.log("Adding a new player named cssgo. List now looks like this:")
players.addPlayer(new Player("cssgo", 1234, "g@g.gg"));

console.log("Deleting the username with name Avikaielef. List now looks like this:");
players.deletePlayer(user);
players.displayPlayers();
players.saveChanges();
console.log("Check the JSON file now, it should be updated.");

/*console.log("Deleting all users. The list now looks like this:")
players.erasePlayers();
console.log(players);*/

/*function createJsonAndInitialize() {
    // Create an empty array to store the list of students
    players = [];

    // Create new players for testing
    const playerOne = new Player("Avikaielef", "avikaianddaniel@gmail.com");
    const playerTwo = new Player("Avishay", "avishayelihay@gmail.com");
    const playerThree = new Player("jsLover", "JS@JS.COM");


    // Add a student to the list
    players.push(playerOne);
    players.push(playerTwo);
    players.push(playerThree);

    // Display current players
    console.log(players);
    return players;
}

function addPlayer(newPlayer) {
    // Reading the list of players from file
    const data = fs.readFileSync('players.json', 'utf8');
    const players = JSON.parse(data);
    for (const player of players) {
        if (player.getUsername() === newPlayer.getUsername)
            // A player with this username already exists.
            return false;
    }
    players.push(newPlayer);
    fs.writeFileSync('players.json', JSON.stringify(players));
    // Player was added successfully.
    return true;
}

function deletePlayer(toDeletePlayer) {
    const data = fs.readFileSync('players.json', 'utf8');
    const players = JSON.parse(data);
    const index = players.indexOf(toDeletePlayer);
    if (index > -1) {
        players.splice(index, 1);
        // Player was found and deleted
        return true;
    }
    return false;
}

// Delete a student from the list
const index = players.indexOf("Bob");
if (index > -1) {
    players.splice(index, 1);
}

// Print the list of players to the console
console.log(players);


// Write the list of players to a file
fs.writeFileSync('players.json', JSON.stringify(players));

// Reading the list of players from file
const data = fs.readFileSync('players.json', 'utf8');
const playersFromJson = JSON.parse(data);

// Seeing that players remain the same after saving to file and reading from file
console.log(playersFromJson);*/