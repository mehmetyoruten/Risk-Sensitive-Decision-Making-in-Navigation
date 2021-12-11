
/*
================================================================================
Functions
================================================================================
*/

// Global Variables
var nclicks = 0
var trial_count = 1
var num_trials = 5
var time_limit = 10
var experimentState = {
  completedScreenCounter : 0
}
var timer = null; 
var background_color = "#FFFFFF";  // set the default background color for animations


/*
================================================================================
jQuery Flow
================================================================================
*/

$(document).ready(function(){
  $("#welcome__button").click(function() {
      $(".welcome").slideUp();
      $(".consent").slideDown()
  });

  $("#consent__button__agree").click(function() {
    $(".consent").slideUp();    
    $(".grids").slideDown()
    Start_New_Trial()
    });


  $(".square").click(function() {
    if ($('.square.active').length == 0) {
      $(this).addClass("active");      
    } else if ($('.square.active').length == 1) {
      $(".square.active").removeClass("active")
    }
  })


  $("#warning-button").click(function() {
    $(".warning-no-cell-selected").slideUp();    
    $(".grids").slideDown()
    });



  $(".trial-content__submit-button").click( function() {    
    // Grab the submission data.
    responseMs = new Date().getTime();
    var submittedResponse = $(this).data("submit-button");
    
    if ($('.square.active').length == 0) {
      Flash_Background_Incorrect()
      $(".grids").slideUp();    
      $(".warning-no-cell-selected").slideDown()
    }

    else if (($('.square.active').length + $('.square.processed').length)==trial_count+1) {
        trialEndTimeMs = new Date().getTime();     
        Flash_Background_Correct()   
        console.log(trialEndTimeMs)
        // Start the next trial.
        trial_count += 1;    
        $('.square.active').addClass("processed")
        $('.square.processed').removeClass("active")              
        Start_New_Trial()      
    }

  });

  function Start_New_Trial(experimentState) {
    correct_Sol = [];
    chosen_Sol = [];
    $("#trial_count").html("Trial "+(trial_count)+" / "+num_trials);
    //stop current timer
    if (timer){
        clearTimeout(timer);
    }
    //start new timer
    // start_timer(); 
    trialStartTimeMs = new Date().getTime();
    timestamp = trialStartTimeMs; 
    
    if (trial_count > num_trials) {
        // The experimet is done, conclude the experiment.
        //clearTimeout(timer);
        //load_next_debriefing_silhouettes();
        $(".grids").slideUp();
        $(".debriefing-instructions").slideDown();              

    } else if (trial_count <= num_trials){
        // The experiment is not done, display next stimulus.
        // id = load_next_silhouette(); 
        // saveTrial(trialStartTimeMs, id)
        $(".trial-content__submit-button").slideDown();
    }
  }

  function start_timer(){
    console.log("Start timer with " +  time_limit +" s");
    timer = setTimeout(time_limit_exeeded, time_limit * 1000)
  }

  function time_limit_exeeded(){    
    trial_count += 1;
    $(".grids").slideUp();
    $(".time_limit").slideDown()
  }

  // Count the number of trials
  $("#trial_count").html("Trial "+(trial_count)+" / "+num_trials);
  
  /*
  ================================================================================
  Animations
  ================================================================================
  */

  function Flash_Background_Correct() {
    // Note: jquery-ui necessary to animate colors.
    $('body').stop().animate({backgroundColor:'#006622'}, 10);
    //$('body').animate({backgroundColor:'#333333'}, 1000);
    $('body').animate({backgroundColor:background_color}, 1000);
  }

  function Flash_Background_Incorrect() {
    // Note: jquery-ui necessary to animate colors.
    $('body').stop().animate({backgroundColor:'#800000'}, 10);
    //$('body').animate({backgroundColor:'#333333'}, 1000);
    $('body').animate({backgroundColor:background_color}, 1000);
  }


});

/*
$(function (){
  var nclicks = 0
  $(".square").click(function(){
    $(this).html(nclicks++);
    document.getElementById("myText").innerHTML = nclicks;
});
})

else if ($('#end__square').hasClass('active') == true) {
  $(".grids").slideUp();          
  $(".win-page").slideDown()              
}
*/
