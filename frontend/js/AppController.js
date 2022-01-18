import {
    display_grid, 
    load_config, 
    saveSession, 
    saveSessionResult, 
    saveTrial, 
    saveMoveResult,
    Start_New_Move, 
    Start_New_Trial,
    Get_Position,
    Submit_Response} from './module.js' ;


/*
================================================================================
Global Variables
================================================================================
*/

var n_keypress = 0;
var number_of_moves = 0;
window.number_of_moves = number_of_moves;

var trial_n = 1;
window.trial_n = trial_n;

var session = 1;

var reward = 0;     // 1 if the target is reached. 
var last_move = {
  "trial_n": 0,
  "move_n": 0,                 
  "response_time": 0,
  "submitted_x": 1,
  "submitted_y": 1,
  "key"  : 0
};


$(document).ready(function(){   

  // Start session and load config
  saveSession();
  load_config();
      
 
  /*
  ================================================================================
  jQuery Flow
  ================================================================================
  */

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
    display_grid();
    Start_New_Move(max_trials, number_of_moves, max_moves);
  });


  $("#return-hit__button").click(function() {
    $(".return-hit").slideUp();    
    $(".consent").slideDown();
    });

  $("#next-button-trials").click(function() {
    $(".inter-trial").slideUp();
    $(".grids").slideDown();    
    Start_New_Trial();  
    display_grid();
    Start_New_Move(max_trials, number_of_moves, max_moves);    
  });


  $("#start-button").click(function() {
    $(".practice-end").slideUp();
    $(".grids").slideDown();      
    Start_New_Trial();
    display_grid();
    Start_New_Move(max_trials, number_of_moves, max_moves);    
  });


  $("#warning-button").click(function() {
    $(".warning-no-cell-selected").slideUp();    
    $(".grids").slideDown()
  });
  
  $("#session-end-button").click(function() {
    $(".session-end").slideUp();    
    $(".debriefing").slideDown()
  });
     
  $("#finish-button").click(function() {
    $(".debriefing").slideUp();        
  });
  


  /*
  ================================================================================
   Keyboard Control
  ================================================================================
  */
 
  
   

  $(document).keydown(function(e){           
    switch (true){    
      case ((e.which == 37) && n_keypress == 0):    //left arrow key            
        n_keypress += 1;  
        // Update the coordinates in the map
        if (x_pos == 1) {
          x_pos += 0;
        } else {
          x_pos -= 1;
        }       
        
        // Visualize the position
        setTimeout(function(){      
          $('.active').removeClass('active')
          $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active')                
        },100);
                
        // Submit the response
        Submit_Response('left')

        // Highlight the keyboard symbol
        $('#left').addClass('navigate')                                 
        setTimeout(function(){
          $('.navigate').removeClass('navigate')
        },200);

        // Disable moving for a second
        setTimeout(function(){
          n_keypress = 0
          window.n_keypress = n_keypress;
        },1000);       
                
        break;
                        
      case ((e.which == 38) && n_keypress == 0):    //up arrow key    
        n_keypress += 1;     
        if (y_pos == 4) {
          y_pos += 0;
        } else {
          y_pos += 1;
        }          

        // Visualize the position
        setTimeout(function(){
          $('.active').removeClass('active')
          $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');
        },100);
        
        // Submit the response        
        Submit_Response('up')

        // Highlight the keyboard symbol
        $('#up').addClass('navigate')
        setTimeout(function(){
          $('.navigate').removeClass('navigate')
        },200);         

        // Disable moving for a second
        setTimeout(function(){
          n_keypress = 0
          window.n_keypress = n_keypress;
        },1000);
        
        break;        
            
      case ((e.which == 39) && n_keypress == 0):    //right arrow key              
        n_keypress += 1;
        if (x_pos == 7) {
          x_pos += 0;
        } else {
          x_pos += 1;
        }                

        // Visualize the position
        setTimeout(function(){
          $('.active').removeClass('active')
          $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');
        }, 100); 

        // Submit the response
        Submit_Response('right')

        // Highlight the keyboard symbol
        $('#right').addClass('navigate')        
        setTimeout(function(){
          $('.navigate').removeClass('navigate');
        },200);

        // Disable moving for a second
        setTimeout(function(){
          n_keypress = 0
          window.n_keypress = n_keypress;
        },1000);
        break;

      case ((e.which == 40) && n_keypress == 0):    //down arrow key        
        n_keypress += 1;     
        if (y_pos == 1) {
          y_pos += 0;
        } else {
          y_pos -= 1;
        }  
        
        // Visualize the position
        setTimeout(function(){  
          $('.active').removeClass('active')
          $('[data-x=' + x_pos + '][data-y='+y_pos +']').addClass('active');                
        },100);

        // Submit the response
        Submit_Response('down')

        // Highlight the keyboard symbol
        $('#down').addClass('navigate')                                   
        setTimeout(function(){
          $('.navigate').removeClass('navigate');
        },200);

        // Disable moving for a second
        setTimeout(function(){
          n_keypress = 0
          window.n_keypress = n_keypress;
        },1000);
        break;      

      default:
        alert("Please use the arrow keys and wait until your movement is processed!")          
    }
  }
  );    
});