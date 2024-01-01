var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = []
var audios = {
  "red" : "./sounds/red.mp3", 
  "blue" : "./sounds/blue.mp3",
  "green" : "./sounds/green.mp3",
  "yellow" : "./sounds/yellow.mp3",
  "wrong" : "./sounds/wrong.mp3"
}
var started = false;
var level = 0;
$(document).ready(function () {
  
    $(document).keydown(function (e) {
      if (!started) {
        
        $('h1').text("Level " + level);
        started = true
        setTimeout(() => {
          nextSequence()
        }, 500);
      }
    });

    $("[type='button']").click(function (e) {
      if (started) {

        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour)
        playSound(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length-1);
      }
    });
  
}); 

function nextSequence() {
  userClickedPattern = [];
  level += 1
  $('h1').text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)

}

function playSound(color) {
  var audio = new Audio(audios[color]);
  audio.play();
} 

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    
    playSound('wrong')
    $('body').attr('class', 'game-over')
    setTimeout(() => {
      $('body').removeClass('game-over') 
    }, 200);
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver()
    started = false
  }
}

function startOver() {
  level = 0
  userClickedPattern = []
  gamePattern = []
}