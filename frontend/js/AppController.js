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
const ENTRY_CORRECT_ANSWERS_NEEDED = 3;

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
  $(".entry-quiz").slideDown();              
});

$("#next-button-instructions-4").click(function() {
  $(".instructions-4").slideUp();    
  $(".grids").slideDown();              
  Start_New_Trial();  
  Start_New_Move(max_trials, number_of_moves, max_moves);        
});

$("#entry_quiz_submit").click(function () {
  var inputs = document.getElementsByTagName('input');
  var num_correct = 0; 
  var num_checked = 0; 

  for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].name.startsWith("entry")){
          if (inputs[i].value === "correct" && inputs[i].checked){
              num_correct++; 
          }
          if(inputs[i].type === "radio" && inputs[i].checked){
             num_checked++; 
          }
      }
  }

  // check if all questions are answered
  if (num_checked < 3 ) {
      alert("Please answer all of the questions");
      return;
  }
  else{
      for (var i = 0; i < inputs.length; i++) {
          inputs[i].checked = false;
      }
  }

  // check if passed
  if (num_correct >= ENTRY_CORRECT_ANSWERS_NEEDED){
      //passed!      
      $(".entry-quiz").slideUp();
      $(".grids").slideDown();              
      Start_New_Trial();  
      Start_New_Move(max_trials, number_of_moves, max_moves);                  
  }
  else{
      //not passed
      alert("Quiz failed"); 
      $(".entry-quiz").slideUp();
      $(".begin-content").slideDown();
  }
})


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
  $(".personality-quiz").slideDown();
});


$("#personality_quiz_submit").click(function() {  

  var pers_answers = [];

  for (var i=1, iLen=21; i<iLen; i++) {
    var answer = $('input:radio[name=q' + String(i) + ']:checked').val();    
    pers_answers.push(answer);    
  } 

  if (pers_answers.indexOf(undefined) !== -1) {
    alert('Please answer all the questions!')
  } else {
    $(".personality-quiz").slideUp();   
    $(".comment").slideDown();
  }

  window.questionnaire = pers_answers;
    

  
});

// Add commment section
$("#submit-button").click(function() {
  var comment = document.getElementById("userComments").value;
  $('#userComments').prop('disabled', true);
  $('#submit-button').removeClass('custom-button_enabled');
  $('#submit-button').addClass('custom-button_disabled');
  $('#submit-button').off('click');
  
  saveSessionResult(comment, questionnaire);
});


/* 
================================================================================
Keyboard Control
================================================================================
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
    if ((e.keyCode == 13) && ($('.entry-quiz').is(":visible"))) {      
      setTimeout(function(){
        $("#entry_quiz_submit").click();
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
      setTimeout(function(){      
        $("#session-end-button").click();
      }, delay);
    }    
  });  

  $(document).keyup(function (e) {
    if ((e.keyCode == 13) && ($('.debriefing').is(":visible")) ) {            
      setTimeout(function(){
        $("#finish-button").click();
      }, delay);
    }    
  });    
}

