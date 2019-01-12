var view = {
  displayMessage: function(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};

var model = {
  coordinatesGuesses: [],
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [ { locations: ["06", "16", "26"], hits: ["", "", ""] },
           { locations: ["24", "34", "44"], hits: ["", "", ""] },
           { locations: ["10", "11", "12"], hits: ["", "", ""] } ],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
        let ship = this.ships[i];
        let index = ship.locations.indexOf(guess);
        if (index >= 0) {
          ship.hits[index] = "hit";
          view.displayHit(guess);
          view.displayMessage("HIT!");
          if (this.isSunk(ship)) {
            view.displayMessage("You sank my battleship!");
            this.shipsSunk++;
          }
          return true;

          }
      }
      view.displayMiss(guess);
      view.displayMessage("You missed.");
      return false;
    },
    isSunk: function(ship) {
      for (let i = 0; i < this.shipLength; i++) {
        if (ship.hits[i] !== "hit") {
            return false;
        }
      }
      return true;
    }
};

var controller = {
  guesses: 0,
  processGuess: function(guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      } else if (model.numShips === model.shipsSunk) {
        view.displayMessage("You already sank all my battleships, in " + this.guesses + " guesses, return to home, captain!");
      }
    }
  }
};

function parseGuess(guess) {
  let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
  if (guess === null || guess.length != 2) {
    view.displayMessage("Oops, please enter a letter and a number on the board.");
    } else if (contains(model.coordinatesGuesses, guess) === false && model.numShips != model.shipsSunk) {
        view.displayMessage("You already shot there!");
        } else if (model.numShips === model.shipsSunk) {
          view.displayMessage("You already sank all my battleships, in " + controller.guesses + " guesses, return to home, captain!");
          } else {
            let firstChar = guess.charAt(0);
            let row = alphabet.indexOf(firstChar);
            let column = guess.charAt(1);
            model.coordinatesGuesses.push(guess);

  if (isNaN(row) || isNaN(column)) {
    view.displayMessage("Oops, that isn't on the board.");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        view.displayMessage("Oops, that's off the board!");
        } else {
          /*model.coordinatesGuesses.push(guess);*/
          return row + column;
        }
  }
  return null;
};

function contains(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return false;
        }
    }
    return true;
}

/*
var randomLoc = Math.floor(Math.random() * 5);

var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;

while (isSunk == false) {
    guess = prompt("Ready, aim, fire! (Enter a number 0-6:");
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {
            hits = hits + 1;
            alert("HIT!");
            } else {
                alert("MISS");
        }
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }
    } //else
} //while
var stats = "You took " + guesses + " guesses to sink the battleship, " + "which means your shooting accuracy was " +
    (3/guesses);
alert(stats);*/
