exports = typeof window !== "undefined" && window !== null ? window : global;

var capture = [];
// console.oldLog = console.log;
// console.log = function(value)
// {
//     console.oldLog(value);
//     capture += value;
// };

exports.Game = function() {
  console.oldLog = console.log;
  console.log = function(value)
  {
      console.oldLog(value);
      capture.push(value);
  };
console.log("hi");
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

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
    if(places[currentPlayer] == 0)
      return 'Pop';
    if(places[currentPlayer] == 4)
      return 'Pop';
    if(places[currentPlayer] == 8)
      return 'Pop';
    if(places[currentPlayer] == 1)
      return 'Science';
    if(places[currentPlayer] == 5)
      return 'Science';
    if(places[currentPlayer] == 9)
      return 'Science';
    if(places[currentPlayer] == 2)
      return 'Sports';
    if(places[currentPlayer] == 6)
      return 'Sports';
    if(places[currentPlayer] == 10)
      return 'Sports';
    return 'Rock';
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.isPlayable = function(howManyPlayers){
    return howManyPlayers >= 2;
  };

  this.add = function(playerName){
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function(){
    return players.length;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.roll = function(roll){
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      }else{
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    if(inPenaltyBox[currentPlayer]){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if(currentPlayer == players.length)
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

do{
  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7){
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }
} while(notAWinner);

var goldenMaster = `hi
Chet was added
They are player number 1
Pat was added
They are player number 2
Sue was added
They are player number 3
Chet is the current player
They have rolled a 1
Chet's new location is 1
The category is Science
Science Question 0
Answer was correct!!!!
Chet now has 1 Gold Coins.
Pat is the current player
They have rolled a 1
Pat's new location is 1
The category is Science
Science Question 1
Answer was correct!!!!
Pat now has 1 Gold Coins.
Sue is the current player
They have rolled a 1
Sue's new location is 1
The category is Science
Science Question 2
Answer was correct!!!!
Sue now has 1 Gold Coins.
Chet is the current player
They have rolled a 1
Chet's new location is 2
The category is Sports
Sports Question 0
Answer was correct!!!!
Chet now has 2 Gold Coins.
Pat is the current player
They have rolled a 1
Pat's new location is 2
The category is Sports
Sports Question 1
Answer was correct!!!!
Pat now has 2 Gold Coins.
Sue is the current player
They have rolled a 1
Sue's new location is 2
The category is Sports
Sports Question 2
Answer was correct!!!!
Sue now has 2 Gold Coins.
Chet is the current player
They have rolled a 1
Chet's new location is 3
The category is Rock
Rock Question 0
Answer was correct!!!!
Chet now has 3 Gold Coins.
Pat is the current player
They have rolled a 1
Pat's new location is 3
The category is Rock
Rock Question 1
Answer was correct!!!!
Pat now has 3 Gold Coins.
Sue is the current player
They have rolled a 1
Sue's new location is 3
The category is Rock
Rock Question 2
Answer was correct!!!!
Sue now has 3 Gold Coins.
Chet is the current player
They have rolled a 1
Chet's new location is 4
The category is Pop
Pop Question 0
Answer was correct!!!!
Chet now has 4 Gold Coins.
Pat is the current player
They have rolled a 1
Pat's new location is 4
The category is Pop
Pop Question 1
Answer was correct!!!!
Pat now has 4 Gold Coins.
Sue is the current player
They have rolled a 1
Sue's new location is 4
The category is Pop
Pop Question 2
Answer was correct!!!!
Sue now has 4 Gold Coins.
Chet is the current player
They have rolled a 1
Chet's new location is 5
The category is Science
Science Question 3
Answer was correct!!!!
Chet now has 5 Gold Coins.
Pat is the current player
They have rolled a 1
Pat's new location is 5
The category is Science
Science Question 4
Answer was correct!!!!
Pat now has 5 Gold Coins.
Sue is the current player
They have rolled a 1
Sue's new location is 5
The category is Science
Science Question 5
Answer was correct!!!!
Sue now has 5 Gold Coins.
Chet is the current player
They have rolled a 1
Chet's new location is 6
The category is Sports
Sports Question 3
Answer was correct!!!!
Chet now has 6 Gold Coins.`.split('\n');
console.oldLog(goldenMaster.length);
console.oldLog(capture.length);
if (capture.length == goldenMaster.length) {
  console.oldLog("GM Test Passed");
} else {
  console.oldLog("GM Test Failed");
}