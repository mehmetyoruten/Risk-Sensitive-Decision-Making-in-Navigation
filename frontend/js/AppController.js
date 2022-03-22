import { load_config, load_grid, saveSession, saveSessionResult, loadSessionInfo } from './utils/module.js' ;

import { Start_New_Trial, Start_New_Move } from './utils/grid.js';


/*
================================================================================
Global Variables
================================================================================
*/

/*
$(document).ready(function() {

})
*/


const API_URL = "http://134.76.24.103/node"

// Initialize variables
load_config();
saveSession();
loadSessionInfo();
/*
================================================================================
jQuery Flow
================================================================================
*/  


//document.removeEventListener('keydown', movePlayer);

$("#welcome__button").click(function() {
  $(".welcome").slideUp();    
  $(".consent").slideDown();    
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
  $(".instructions-1").slideDown();
});

$("#consent__button__disagree").click(function() {
  $(".consent").slideUp();    
  $(".return-hit").slideDown()
});

$("#return-hit__button").click(function() {
  $(".return-hit").slideUp();    
  $(".consent").slideDown();
  });



$("#next-button-instructions-1").click(function() {
    $(".instructions-1").slideUp();    
    $(".instructions-2").slideDown();                    
});


$("#next-button-instructions-2").click(function() {
    $(".instructions-2").slideUp();    
    $(".instructions-3").slideDown();                    
});

$("#next-button-instructions-3").click(function() {
  $(".instructions-3").slideUp();    
  $(".grids").slideDown();              
  Start_New_Trial();  
  Start_New_Move(max_trials, number_of_moves, max_moves);        
});

$("#next-button-instructions-4").click(function() {
  $(".instructions-4").slideUp();    
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


/* KEYBOARD CONTROL
*/

window.onload = function() {
  // Count number of enters
  let delay = 500;

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.welcome').is(":visible") )) {
      setTimeout( function() {
        $("#welcome__button").click();
      }, delay)            
    }
  });  

  $(document).keyup(function (e) {
    if (($('.consent').is(":visible")) ) {
      if (e.keyCode == 13) {
        setTimeout( function(){
          $("#consent__button__agree").click();
        }, delay)
                             
      } else if (e.keyCode == 8) {
        setTimeout( function() {
          $("#consent__button__disagree").click();
        }, delay)        
      }
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.return-hit').is(":visible"))) {  
      setTimeout( function() {
        $("#return-hit__button").click();
      }, delay)          
    }    
  });  


  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.instructions-1').is(":visible"))) {  
      setTimeout(function() {
        $("#next-button-instructions-1").click();
      },delay)          
    }    
  });  


  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.instructions-2').is(":visible"))) {      
      setTimeout(function() {
        $("#next-button-instructions-2").click();
      }, delay)      
    }    
  });  


  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.instructions-3').is(":visible"))) {      
      setTimeout(function(){
        $("#next-button-instructions-3").click();
      }, delay)      
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.instructions-4').is(":visible")) &&  (results.length == max_practice) ) {      
      $("#next-button-instructions-4").click();      
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.inter-trial').is(":visible")) ) {      
      $("#next-button-trials").click();      
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.lost-page').is(":visible")) ) {      
      // When the participant loses the trial due to the obstacle
      $("#next-button-lost-trials").click();  
    }    
  });  


  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.number-of-moves').is(":visible")) ) {      
      // When the maximum number of moves is reached
      $("#next-button-max-moves").click();
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.practice-end').is(":visible")) ) {      
      // Practice session ends
      $("#start-button").click();
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.session-end').is(":visible")) ) {            
      $("#session-end-button").click();
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.debriefing').is(":visible")) ) {            
      $("#finish-button").click();
    }    
  });  

}

