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
