
var buttonColours = ["red","yellow","blue","white","orange","green"];

var gamePattern =[];

var userClickedPattern =[];

function nextSequence() {

    userClickedPattern= [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 6);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    console.log("worked");
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}


        $(".btn").click(function(){
            var userChosenColour = $(this).attr("id");
            
            userClickedPattern.push(userChosenColour);
            console.log(userClickedPattern);

            var audio = new Audio("sounds/" +  $(this).attr("id") + ".mp3");
             audio.play();

             animatePress($(this).attr("id"));
          checkAnswer(userClickedPattern.length-1);
        });


       //1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      $("body").addClass("game-over");
     setTimeout(function(){
        $("body").removeClass("game-over");
     }, 200);
     var audio = new Audio("sounds/wrong.mp3");
     audio.play();
     $("h1").text(" Game-OVER  Press Any key");
     reset();
    }
    

}
        
        function animatePress(currentColor) {

           
            $("#" + currentColor).addClass("pressed");
          
           
            setTimeout(function () {
              $("#" + currentColor).removeClass("pressed");
            }, 100);
          }

          var started = false;
          var level = 0;
          $(document).on("keydown",function(){
          if(!started){
            // $("h1").text("Level " + level);
            nextSequence();
            started= true;
          }
          });
          $(".start").click(function(){
            if(!started){
                // $("h1").text("Level " + level);
                nextSequence();
                started= true;
              }
          })

         function reset(){
            level = 0;
            gamePattern =[];
            started = false;
         }