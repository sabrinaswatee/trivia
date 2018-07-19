var goldenMaster = `Chet was added
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
var capture = [];

console.oldLog = console.log;
console.log = function(value)
{
    console.oldLog(value);
    capture.push(value);
};

require('./game.js');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toBeDefined();
  });
});

describe("Capture should match the golden master", function() {
  it ("should have same number of lines", function() {
    expect(goldenMaster.length).toBe(capture.length);
  });

  it("should have the same content", function() {
    var result = true;
    for (var i = 0; i < goldenMaster.length; i++) {
      if (goldenMaster[i] !== capture[i]) {
        result = false;
      }
    }
    expect(result).toBe(true);
  });
});

describe("Test DidPlayerWin Function", function() {
  it ("Should return true if not 6", function() {
    var game = new Game();
    expect(game.didPlayerWin(4)).toBe(true);
  });

  it ("Should return false if 6", function() {
    var game = new Game();
    expect(game.didPlayerWin(6)).toBe(false);
  });
});

describe("Test CurrentCategory Function", function() {
  it ("Should return pop if 4", function() {
    var game = new Game();
    expect(game.currentCategory(4)).toBe("Pop");
  });

  it ("Should return science if 5", function() {
    var game = new Game();
    expect(game.currentCategory(5)).toBe("Science");
  });

  it ("Should return sports if 6", function() {
    var game = new Game();
    expect(game.currentCategory(6)).toBe("Sports");
  });

  it ("Should return rock if 7", function() {
    var game = new Game();
    expect(game.currentCategory(7)).toBe("Rock");
  });
});

describe("Adding more than 6 players", function() {
  it("Should be able to add more than 6 players without error", function() {
    var game = new Game();
    game.add("Player1");
    game.add("Player2");
    game.add("Player3");
    game.add("Player4");
    game.add("Player5");
    game.add("Player6");
    game.add("Player7");
    expect(game.noOfPlayers(), 7);
  });

  it("Should be able to play game with more than 6 players", function() {
    var game = new Game();
    game.add("Player1");
    game.add("Player2");
    game.add("Player3");
    game.add("Player4");
    game.add("Player5");
    game.add("Player6");
    game.add("Player7");
    game.add("Player8");
    
    for(let i = 0; i < 8; i++) {
      expect(game.getCurrentPlayer()).toBe(i);
      game.roll(1);
      game.wasCorrectlyAnswered();
    }
  });
});