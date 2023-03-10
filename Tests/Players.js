class Players {
    constructor() {
        this.arrayOfPlayers = [];
    }

    addPlayer(newPlayer) {
        for (const player of this.arrayOfPlayers) {
            if (player.username === newPlayer.username)
                // A player with this username already exists.
                return false;
        }
        this.arrayOfPlayers.push(newPlayer);
        return true;
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

    initializeListForTesting() {
        this.erasePlayers();

        // Create new players for testing
        const playerOne = new Player("Avikaielef", 1234, "avikaianddaniel@gmail.com");
        const playerTwo = new Player("Avishay", 1234, "avishayelihay@gmail.com");
        const playerThree = new Player("jsLover", 1234, "JS@JS.COM");


        // Add a student to the list
        this.arrayOfPlayers.push(playerOne);
        this.arrayOfPlayers.push(playerTwo);
        this.arrayOfPlayers.push(playerThree);
    }

}

/*
const players = new Players();
players.initializeListForTesting();
players.displayPlayers();


const players = new Players();
players.initializeListForTesting();
console.log("This is the current list of players:");
players.displayPlayers();

console.log("Looking for user with the username Avikaielef");
const user = players.getPlayerByName("Avikaielef");
console.log(user);

console.log("Adding a new player named cssgo. List now looks like this:")
let newPlayer = new Player("cssgo", 1234, "g@g.gg")
players.addPlayer(newPlayer);
console.log("Changing this player's values");
newPlayer.timePlayed = 1500;
newPlayer.totalScore = 100;
newPlayer.winCount = 3;

console.log("Deleting the username with name Avikaielef. List now looks like this:");
players.deletePlayer(user);
players.displayPlayers();
players.saveChanges();
console.log("Check the JSON file now, it should be updated.");
*/
