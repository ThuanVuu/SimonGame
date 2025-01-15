
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


$(".btn").each(function() {
    $(this).click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        buildAnimate(this);

        makeSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    })
})



$(document).keypress(function() {
    
    nextSequence();
});


function buildAnimate(object) {
    
    $(object).addClass("pressed");

    setTimeout(function(){
        $(object).removeClass("pressed");
    }, 50);
}

function makeSound(object) {
    var audio = new Audio("./sounds/" + object + ".mp3");
    audio.play();
}

function nextSequence() {

    userClickedPattern.length = 0;

    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    makeSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("sucess");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);
        };
    } else {
        console.log("wrong");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}   

function startOver() {
    level = 0;
    gamePattern.length = 0;
}