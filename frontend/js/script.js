
/*
================================================================================
 Global Variables
================================================================================
*/

var nclicks = 0
var trial_count = 1
var num_trials = 5
var time_limit = 10
var experimentState = {
  completedScreenCounter : 0
}
var timer = null; 
var background_color = "#FFFFFF";  // set the default background color for animations

var last_tile = {
  "trial_n": 0,                 
  "response_time": 0,
  "submitted_x": 1,
  "submitted_y": 1  
};

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

  $("#consent__button__disagree").click(function() {
    $(".consent").slideUp();    
    $(".return-hit").slideDown()
    });

  $("#return-hit__button").click(function() {
    $(".return-hit").slideUp();    
    $(".consent").slideDown()
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

  
  $(".square").mouseover(function() {
    var target_tile_x = $(this).data('x');
    var target_tile_y = $(this).data('y');
    var last_tile_x = last_tile.submitted_x;
    var last_tile_y = last_tile.submitted_y;
    
    var target_resp = calc_range(last_tile_x, last_tile_y, target_tile_x, target_tile_y);
    console.log(target_resp)    
  });


  $(".trial-content__submit-button").click( function() {    
    // Grab the submission data.
    responseMs = new Date().getTime();        

    if ($('.square.active').length == 0) {
      Flash_Background_Incorrect()
      $(".grids").slideUp();    
      $(".warning-no-cell-selected").slideDown()
    }

    else if (($('.square.active').length + $('.square.processed').length)==trial_count+1) {
        // Get data about the trial
        trialEndTimeMs = new Date().getTime();     
        var response_time = (trialEndTimeMs-trialStartTimeMs)/1000
        var submittedX = $('.active').data('x');
        var submittedY = $('.active').data('y');        
        var last_tile = saveTrial(trial_count, response_time, submittedX, submittedY);
        window.last_tile = last_tile;
        console.log(last_tile);
        Flash_Background_Correct();   
        
        // Start the next trial.
        trial_count += 1;    
        $('.square.active').addClass("processed")
        $('.square.processed').removeClass("active")              
        Start_New_Trial()      
    }
  });



  /*
  ================================================================================
   Functions
  ================================================================================
  */

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

  // Calculate the movement range
  function calc_range(last_tile_x, last_tile_y, target_tile_x, target_tile_y){        
    var x_diff = Math.abs(last_tile_x - target_tile_x);
    var y_diff = Math.abs(last_tile_y - target_tile_y);
    
    if ((x_diff < 2) && (y_diff < 2)) {
      return true
    } else {
      return false
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


  function saveTrial(trial_count, response_time, submittedX, submittedY){  
    saved_response = {
      "trial_n": trial_count,                 
      "response_time": response_time,
      "submitted_x": submittedX,
      "submitted_y": submittedY
    };    
    return saved_response    
  }

  // Count the number of trials
  $("#trial_count").html("Trial "+(trial_count)+" / "+num_trials);
  
  /*
  ================================================================================
   Flash Animations
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
