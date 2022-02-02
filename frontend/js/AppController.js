import { load_config, saveSession} from './utils/module.js' ;

import { Start_New_Trial, Start_New_Move } from './utils/grid.js';


/*
================================================================================
Global Variables
================================================================================
*/



$(document).ready(function() {
     
  load_config();
  saveSession();
  /*
  ================================================================================
  jQuery Flow
  ================================================================================
  */  
  
  $(".class").keydown(function(event) { 
    return false;
  });

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

  $("#next-button-trials").click(function() {
    $(".inter-trial").slideUp();
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
  });

})
  

