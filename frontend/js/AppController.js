import { load_config, load_grid, saveSession, saveSessionResult} from './utils/module.js' ;

import { Start_New_Trial, Start_New_Move } from './utils/grid.js';


/*
================================================================================
Global Variables
================================================================================
*/


$(document).ready(function() {
  const API_URL = "http://134.76.24.103/node"
  //const API_URL = "http://127.0.0.1:5502/backend"
  
  // Initialize variables
  load_config();
  saveSession();
  //load_grid('1');

  var background_color = "white";  



  /*
  ================================================================================
  jQuery Flow
  ================================================================================
  */  
  
  
  $(".class").keydown(function(event) { 
    return false;
  });
  

  // Count number of enters
  //var i = 0;
  //window.i = i;
  
  //document.removeEventListener('keydown', movePlayer);
  
  $("#welcome__button").click(function() {
    $(".welcome").slideUp();
    $(".consent").slideDown();    
  });
  
  $("#welcome").keyup(function (e) {
    if(e.keyCode == 13) {
      $('#welcome__button').click()
    };
  });

  
  $(document).keyup(function (e) {
    if (e.keyCode == 37) {
        $('#prev').click();
        return false;
    }
    if (e.keyCode == 13) {
        $('#consent__button__agree').click();
    }
  });


  var consent_disagree_slide = function() {
    $(".consent").slideUp();    
    $(".return-hit").slideDown();
  }

  var return_hit_slide = function () {
    $(".return-hit").slideUp();    
    $(".consent").slideDown();
  }

  $("#consent__button__agree").click(function() {
    $(".consent").slideUp();    
    $(".instructions").slideDown();
  });

  $("#consent__button__disagree").click(function() {
    $(".consent").slideUp();    
    $(".return-hit").slideDown()
  });

  $("#return-hit__button").click(function() {
    $(".return-hit").slideUp();    
    $(".consent").slideDown();
    });


  $("#next-button-instructions").click(function() {
    $(".instructions").slideUp();    
    $(".grids").slideDown();              
    Start_New_Trial();  
    Start_New_Move(max_trials, number_of_moves, max_moves);        
  });

  $("#next-button-instructions-2").click(function() {
    $(".instructions-obstacle").slideUp();    
    $(".grids").slideDown();              
    Start_New_Trial();  
    Start_New_Move(max_trials, number_of_moves, max_moves);        
  });

  
  $("#next-button-trials").click(function() {
    $(".inter-trial").slideUp();
    $(".lost-page").slideUp();        
    $(".grids").slideDown();   
    Start_New_Trial();  
    Start_New_Move(max_trials, number_of_moves, max_moves);
  });

  // When the participant loses the trial due to the obstacle
  $("#next-button-lost-trials").click(function() {    
    $(".lost-page").slideUp();        
    $(".grids").slideDown();   
    Start_New_Trial();  
    Start_New_Move(max_trials, number_of_moves, max_moves);
  });

  // When the maximum number of moves is reached
  $("#next-button-max-moves").click(function() {    
    $(".number-of-moves").slideUp();        
    $(".grids").slideDown();   
    Start_New_Trial();  
    Start_New_Move(max_trials, number_of_moves, max_moves);
  });

  // Practice session ends
  $("#start-button").click(function() {    
    $(".practice-end").slideUp();
    $(".grids").slideDown();   
    Start_New_Trial();
    Start_New_Move(max_trials, number_of_moves, max_moves);
  });

  $("#session-end-button").click(function() {
    $(".session-end").slideUp();    
    $(".debriefing").slideDown()
  });
      
  $("#finish-button").click(function() {
    $(".debriefing").slideUp();   
    $(".comment").slideDown();
  });

  // Add commment section
  $("#submit-button").click(function() {
    var comment = document.getElementById("userComments").value;
    $('#userComments').prop('disabled', true);
    $('#submit-button').removeClass('custom-button_enabled');
    $('#submit-button').addClass('custom-button_disabled');
    $('#submit-button').off('click');
    
    saveSessionResult(comment);
  });


})
  

