// Start yhe game
var gameStarted = false;
if (!gameStarted) {
  $("body").keypress(function() {
    if (!gameStarted) {
      startGame();
      gameStarted = true;
  }
  });
}

// Randomization

let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
var userPattern = [];
let level = 0;

function generateSequence() {
  userPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour  = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("h1").text("Level " + level);
  level++;

  makeSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
}

// Sound and Animation

function makeSound(clickedButtonID) {
  switch (clickedButtonID) {
    case "green":
      const green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "red":
      const red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      const yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      const blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    default:  console.log(clickedButtonID);
  }
}

function makeAnimation (clickedButtonID) {

  var activeButton = "#" + clickedButtonID;
  $(activeButton).addClass("pressed");

  setTimeout(function() {
    $(activeButton).removeClass("pressed");
  }, 100);

}

// Check user Input

$(".btn").on("click", function() {
    let userClick = $(this).attr("id");
    userPattern.push(userClick);
    makeSound(userClick);
    makeAnimation(userClick);
    checkAnswer();
});

function checkAnswer() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      gameOver();
      return;
    }
  }

    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        generateSequence();
      }, 500);
    }
}

// Game over

function gameOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  new Audio("./sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  restartGame();
}

// Restart the game

function restartGame() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

// Start the game

function startGame() {
  generateSequence();
}
