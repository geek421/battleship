var model = {
  coordinatesGuesses: [],
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] }
  ],
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
    },
    generateShipLocations: function() {
      var locations;
      for (let i = 0; i < this.numShips; i++) {
        do {
          locations = this.generateShip();
        } while (this.collision(locations));
        this.ships[i].locations = locations;
      }
      /*console.log("Ships array: ");
  		console.log(this.ships);*/
    },

    generateShip: function() {
      var direction = Math.floor(Math.random() * 2);
      var row, col;

      if (direction === 1) {
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      } else {
        row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        col = Math.floor(Math.random() * this.boardSize);
      }

      var newShipLocations = [];
      for (var i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
          newShipLocations.push(row + "" + (col + i));
        } else {
          newShipLocations.push((row + i) + "" + col);
        }
      }
      return newShipLocations;
    },

    collision: function(locations) {
      for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        for (var j = 0; j < locations.length; j++) {
          if (ship.locations.indexOf(locations[j]) >= 0) {
            return true;
        }
      }
    }
    return false;
  }
};

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

var controller = {
  guesses: 0,

  processGuess: function(guess) {
    let location = guessCanculate.parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships in " + this.guesses + " guesses!");
      } else if (model.numShips === model.shipsSunk) {
        view.displayMessage("You already sank all my battleships, in " + this.guesses + " guesses, return to home, captain!");
      }
    }
  }
};

var guessCanculate = {
    parseGuess: function(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    let alphabetLow = ["a", "b", "c", "d", "e", "f", "g"];
    if (guess === null || guess.length != 2) {
      view.displayMessage("Oops, please enter a letter and a number on the board.");
    } else if (this.contains(model.coordinatesGuesses, guess) === false && model.numShips != model.shipsSunk) {
          view.displayMessage("You already shot there!");
          } else if (model.numShips === model.shipsSunk) {
            view.displayMessage("You already sank all my battleships, in " + controller.guesses + " guesses, return to home, captain!");
          } else {
              let firstChar = guess.charAt(0);
              let row = alphabet.indexOf(firstChar);
              let column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      view.displayMessage("Oops, that isn't on the board.");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
          view.displayMessage("Oops, that's off the board!");
        } else {
            model.coordinatesGuesses.push(guess);
            return row + column;
          }
    }
    return null;
  },

  contains: function(arr, elem) {
      for (let i = 0; i < arr.length; i++) {
          if (arr[i] === elem) {
              return false;
          }
      }
      return true;
  }
};

var buttonHandle = {
    init: function() {
      let fireButton = document.getElementById("fireButton");
      fireButton.onclick = buttonHandle.handleFireButton;
      let guessInput = document.getElementById("guessInput");
      guessInput.onkeypress = buttonHandle.handleKeyPress;

      model.generateShipLocations();
    },

    handleKeyPress: function(e) {
        let fireButton = document.getElementById("fireButton");
        if (e.keyCode === 13) {
          fireButton.click();
          return false;
        }
    },

    handleFireButton: function() {
        let guessInput = document.getElementById("guessInput");
        let guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
  };

window.onload = buttonHandle.init;
