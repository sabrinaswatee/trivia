exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  var players          = new Array();
  var places           = new Array(6);
  var purses           = new Array(6);
  var inPenaltyBox     = new Array(6);

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  this.didPlayerWin = function(player) {
    return !(player == 6)
  };

  this.currentCategory = function(place) {
    if (place == 0 || place == 4 || place == 8)
      return 'Pop';
    if (place == 1 || place == 5 || place == 9)
      return 'Science';
    if (place == 2 || place == 6 || place == 10)
      return 'Sports';
    return 'Rock';
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  };

  this.add = function(playerName) {
    players.push(playerName);
    places[this.howManyPlayers(players) - 1] = 0;
    purses[this.howManyPlayers(players) - 1] = 0;
    inPenaltyBox[this.howManyPlayers(players) - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(players) {
    return players.length;
  };

  this.askQuestion = function(place) {
    if(this.currentCategory(place) == 'Pop')
      console.log(popQuestions.shift());
    if(this.currentCategory(place) == 'Science')
      console.log(scienceQuestions.shift());
    if(this.currentCategory(place) == 'Sports')
      console.log(sportsQuestions.shift());
    if(this.currentCategory(place) == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.movePlayer = function(roll) {
    places[currentPlayer] = places[currentPlayer] + roll;
    if(places[currentPlayer] > 11){
      places[currentPlayer] = places[currentPlayer] - 12;
    }
  };

  this.reportStatus = function() {
    console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
    console.log("The category is " + this.currentCategory(places[currentPlayer]));
    this.askQuestion(places[currentPlayer]);
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        this.movePlayer(roll);
        this.reportStatus();
      } else {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      this.movePlayer(roll);
      this.reportStatus();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if(inPenaltyBox[currentPlayer]) {
      if(isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = this.didPlayerWin((purses[currentPlayer]));
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = this.didPlayerWin((purses[currentPlayer]));

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function() {
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

let seed = 0;
Math.random = () => {
  seed += 0.001;
  if (seed >= 1) {
    seed = 0;
  }
  return seed;
}

do {
  game.roll(Math.floor(Math.random()*6) + 1);

  if (Math.floor(Math.random()*10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }
} while(notAWinner);