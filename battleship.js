var model={coordinatesGuesses:[],boardSize:7,numShips:3,shipLength:3,shipsSunk:0,ships:[{locations:[0,0,0],hits:["","",""]},{locations:[0,0,0],hits:["","",""]},{locations:[0,0,0],hits:["","",""]}],fire:function(a){for(var b=0;b<this.numShips;b++){var c=this.ships[b],d=c.locations.indexOf(a);if(0<=d)return c.hits[d]="hit",view.displayHit(a),view.displayMessage("HIT!"),shot.play(),this.isSunk(c)&&(view.displayMessage("You sank my battleship!"),this.shipsSunk++),!0}view.displayMiss(a);view.displayMessage("You missed.");
fail.play();return!1},isSunk:function(a){for(var b=0;b<this.shipLength;b++)if("hit"!==a.hits[b])return!1;return!0},generateShipLocations:function(){for(var a,b=0;b<this.numShips;b++){do a=this.generateShip();while(this.collision(a));this.ships[b].locations=a}},generateShip:function(){var a=Math.floor(2*Math.random());if(1===a){var b=Math.floor(Math.random()*this.boardSize);var c=Math.floor(Math.random()*(this.boardSize-this.shipLength+1))}else b=Math.floor(Math.random()*(this.boardSize-this.shipLength+
1)),c=Math.floor(Math.random()*this.boardSize);for(var d=[],e=0;e<this.shipLength;e++)1===a?d.push(b+""+(c+e)):d.push(b+e+""+c);return d},collision:function(a){for(var b=0;b<this.numShips;b++)for(var c=this.ships[b],d=0;d<a.length;d++)if(0<=c.locations.indexOf(a[d]))return!0;return!1}},view={displayMessage:function(a){document.getElementById("messageArea").innerHTML=a},displayHit:function(a){document.getElementById(a).setAttribute("class","hit")},displayMiss:function(a){document.getElementById(a).setAttribute("class",
"miss")}},controller={guesses:0,processGuess:function(a){if(a=guessCalculate.parseGuess(a))this.guesses++,model.fire(a)&&model.shipsSunk===model.numShips?view.displayMessage("You sank all my battleships in "+this.guesses+" guesses!"):model.numShips===model.shipsSunk&&view.displayMessage("You already sank all my battleships, in "+this.guesses+" guesses, return to home, captain!")}},guessCalculate={parseGuess:function(a){var b="ABCDEFG".split("");if(null===a||2!=a.length)view.displayMessage("Oops, please enter a letter and a number on the board.");
else if(!1===this.contains(model.coordinatesGuesses,a)&&model.numShips!=model.shipsSunk)view.displayMessage("You already shot there!");else if(model.numShips===model.shipsSunk)view.displayMessage("You already sank all my battleships, in "+controller.guesses+" guesses, return to home, captain!");else{var c=a.charAt(0);b=b.indexOf(c);c=a.charAt(1);if(isNaN(b)||isNaN(c))view.displayMessage("Oops, that isn't on the board.");else if(0>b||b>=model.boardSize||0>c||c>=model.boardSize)view.displayMessage("Oops, that's off the board!");
else return model.coordinatesGuesses.push(a),b+c}return null},contains:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!1;return!0}},buttonHandle={init:function(){document.getElementById("fireButton").onclick=buttonHandle.handleFireButton;document.getElementById("guessInput").onkeypress=buttonHandle.handleKeyPress;model.generateShipLocations()},handleKeyPress:function(a){var b=document.getElementById("fireButton");if(13===a.keyCode)return b.click(),!1},handleFireButton:function(){var a=
document.getElementById("guessInput");controller.processGuess(a.value);a.value=""}},shot=new Audio("explosion.wav");shot.volume=.5;var fail=new Audio("fail.wav");fail.volume=.5;model.__proto__=view;view.__proto__=controller;controller.__proto__=guessCalculate;guessCalculate.__proto__=buttonHandle;window.onload=buttonHandle.init;
