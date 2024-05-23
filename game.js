var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress( function () {
    if (started == false) {
        gamePattern = [];
        level = 0;
        started = true;
        $("h1").text("Level 0");
        nextSequence();
    }
})



$(".btn").click( function (event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(level);
    console.log("User" + userClickedPattern)
    console.log("Game" + gamePattern);
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var ranNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[ranNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout( function () {
        $("#" + color).removeClass("pressed");
    }, 100)
}

function checkAnswer(level) {
    var numClicked = userClickedPattern.length -1;
    if (gamePattern[numClicked] != userClickedPattern[numClicked])
    {
        $("h1").text("Game Over, Press Any Key to Restart")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout( function (){
            $("body").removeClass("game-over");
        }, 200)
        started = false;
    }
    if ( numClicked == level -1 && started == true)
    {
        setTimeout( function () {
            nextSequence();
        }, 1000);
    }
}
   


