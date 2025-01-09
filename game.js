
var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function (e) {
  if(!started){
    $("#level-title").text("Level"+level)
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (e) {
  var userChosenColour = e.target.id; // or you can use "this.id"
  // var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1); 
});

//it will compare user pattern with computer generated pattern

function checkAnswer(currentlevel){
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } 
  else {
    console.log("wrong");
    playSound("wrong")

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
} 

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(() => {
    $("#"+currentColour).removeClass("pressed")
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
