/*
================================================================================
 Experiment Settings
================================================================================
*/

var time_limit = 1000 // in ms
var max_practice = 2
var max_moves = 20
var max_trials = 3

/*
================================================================================
 Global Variables
================================================================================
*/
var number_of_moves = 0
var experimentState = {
  completedScreenCounter : 0
}
var n_keypress = 0
var trial_n = 1
var timer = null; 
var background_color = "#FFFFFF";  // set the default background color for animations
var last_tile = {
  "trial_n": 0,
  "move_n": 0,                 
  "response_time": 0,
  "submitted_x": 1,
  "submitted_y": 1,
  "key"  : 0
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
    $(".instructions").slideDown();
    });

  $("#consent__button__disagree").click(function() {
    $(".consent").slideUp();    
    $(".return-hit").slideDown()
    });


  $("#next-button-instructions").click(function() {
    $(".instructions").slideUp();    
    $(".grids").slideDown();
    Start_New_Move()
    });
  

  $("#return-hit__button").click(function() {
    $(".return-hit").slideUp();    
    $(".consent").slideDown();
    });

  $("#next-button-trials").click(function() {
    $(".inter-trial").slideUp();
    $(".grids").slideDown();    
    Start_New_Trial();
    Start_New_Move();    
    });


  $("#start-button").click(function() {
    $(".practice-end").slideUp();
    $(".grids").slideDown();    
    Start_New_Trial();
    Start_New_Move();    
    });

        
 /*
  ================================================================================
   Mouse Control
  ================================================================================
  */

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

    else if (($('.square.active').length + $('.square.processed').length)==number_of_moves+1) {
        // Get data about the trial
        trialEndTimeMs = new Date().getTime();     
        var response_time = (trialEndTimeMs-trialStartTimeMs)/1000
        var submittedX = $('.active').data('x');
        var submittedY = $('.active').data('y');        
        var last_tile = saveTrial(number_of_moves, response_time, submittedX, submittedY);
        window.last_tile = last_tile;
        console.log(last_tile);
        Flash_Background_Correct();   
        
        // Start the next trial.
        number_of_moves += 1;    
        $('.square.active').addClass("processed")
        $('.square.processed').removeClass("active")              
        Start_New_Move()      
    }
  });



  /*
  ================================================================================
   Functions
  ================================================================================
  */

  function Start_New_Move(experimentState) {
    correct_Sol = [];
    chosen_Sol = [];
    // Count the number of moves
    $("#progress").html(" &nbsp;&nbsp; Trial: "+ trial_n + "<br>" + " &nbsp;&nbsp; Number of moves: " +number_of_moves);
    
    
    //stop current timer
    if (timer){
        clearTimeout(timer);
    }
    //start new timer
    // start_timer(); 
    trialStartTimeMs = new Date().getTime();    

    if (trial_n > max_trials) {
        // The experimet is done, conclude the experiment.
        //clearTimeout(timer);
        //load_next_debriefing_silhouettes();
        $(".grids").slideUp();
        $(".debriefing-instructions").slideDown();              

    } else if (number_of_moves <= max_moves){
        // The experiment is not done, display next stimulus.
        // id = load_next_silhouette(); 
        // saveTrial(trialStartTimeMs, id)
        $(".trial-content__submit-button").slideDown();
    }
    number_of_moves += 1;
    var [x_pos, y_pos] = Get_Position();
    window.x_pos = x_pos
    window.y_pos = y_pos
  }

  // Calculate the movement range -for mouse control-
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
    console.log("Start timer");
    timer = new Date().getTime();  
  }

  function time_limit_exeeded(){    
    number_of_moves += 1;
    $(".grids").slideUp();
    $(".time_limit").slideDown()
  }


  function saveTrial(number_of_moves, response_time, submittedX, submittedY, key){  
    saved_response = {
      "move_n": number_of_moves,                 
      "response_time": response_time,
      "submitted_x": submittedX,
      "submitted_y": submittedY,
      "key": key
    };    
    return saved_response    
  }

 
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


  /*
  ================================================================================
   Keyboard Control
  ================================================================================
  */
  function Start_New_Trial() {
    $('.active').removeClass('active');
    $('.processed').removeClass('processed');
    $('#start__square').addClass('processed');
    $('#start__square').addClass('active');
    window.number_of_moves = 0;

  }
  
  function Get_Position() {      
    n_keypress += 1;
    var x_pos = $(".active").data('x');
    var y_pos = $(".active").data('y');    
    return [x_pos, y_pos]
  }


  function Submit_Response(key) {    
      // Save the response      
      
      trialEndTimeMs = new Date().getTime();           
      var n_keypress = 0
      var response_time = (trialEndTimeMs-trialStartTimeMs)/1000
      var submittedX = $('.active').data('x');
      var submittedY = $('.active').data('y');        
      var last_tile = saveTrial(number_of_moves, response_time, submittedX, submittedY, key);
      window.last_tile = last_tile;
      console.log(last_tile);      

      // Check if the target is reached
      if (($(".active").data('x')=== $('#end__square').data('x') && ($(".active").data('y') === $('#end__square').data('y')))) {   
        
        Flash_Background_Correct();                                                     
        trial_n +=1;
        $(".grids").slideUp();    
        
        if (trial_n === (max_practice+1)) {
          $(".practice-end").slideDown();             
          Start_New_Trial();
        } else {
          $(".inter-trial").slideDown();             
          Start_New_Trial();
        }                

      } else {
        // Start the next move, if it is not reached               
        setTimeout(function(){
          Flash_Background_Correct();            
          $('.processed').removeClass('processed')
          $('.active').addClass('processed')      
          Start_New_Move(); 
        }, time_limit);
      }      
  }

  $(document).keydown(function(e){   
    switch (e.which){    
    case 37:    //left arrow key      
      //var [x_pos, y_pos] = Get_Position();
      if (x_pos == 1) {
        x_pos += 0;
      } else {
        x_pos -= 1;
      }       
      setTimeout(function(){      
        $('.active').removeClass('active')
        $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active')                
      },100);

      var [new_x_pos, new_y_pos] = Get_Position();      

      if ((Math.abs(new_x_pos - x_pos)) < 2){
        Submit_Response('left');        
      }; 
      break;
                 
      

    case 38:    //up arrow key    
      if (y_pos == 4) {
        y_pos += 0;
      } else {
        y_pos += 1;
      }          
      setTimeout(function(){
        $('.active').removeClass('active')
        $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');
      },100);

      var [new_x_pos, new_y_pos] = Get_Position();

      if ((Math.abs(new_y_pos - y_pos)) < 2){
        Submit_Response('up');        
      };  
      break;
           
    case 39:    //right arrow key              
      if (x_pos == 7) {
        x_pos += 0;
      } else {
        x_pos += 1;
      }        
      setTimeout(function(){
        $('.active').removeClass('active')
        $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');
      }, 100);      
      
      var [new_x_pos, new_y_pos] = Get_Position();
      if ((Math.abs(new_x_pos - x_pos)) < 2){
        Submit_Response('right');
      };
      break;

    case 40:    //down arrow key      
      if (y_pos == 1) {
        y_pos += 0;
      } else {
        y_pos -= 1;
      }  
      setTimeout(function(){  
        $('.active').removeClass('active')
        $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');                
      },100);

      var [new_x_pos, new_y_pos] = Get_Position();
      if ((Math.abs(new_y_pos - y_pos)) < 2){
        Submit_Response('down');        
      };  
      break;
    }
  });
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
