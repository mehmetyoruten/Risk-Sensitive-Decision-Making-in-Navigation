
$(document).ready(function(){ 
/* var AppController = function(cfg) { */
  
  /*
  ================================================================================
  Experiment Settings
  ================================================================================
  */

  // const API_URL = "http://134.76.24.103/node"
  const API_URL = "http://127.0.0.1:5501/node"

  // var time_limit = 1000 // in ms
  // var max_practice = 2
  // var max_moves = 20
  // var max_trials = 3
  // var max_grids = 1


  /*
  ================================================================================
  Global Variables
  ================================================================================
  */
  var number_of_moves = 0;
  var n_keypress = 0;
  var trial_n = 1;
  
  var id = 1;
  var session = 1;

  var timer = null; 
  var background_color = "#FFFFFF";  // set the default background color for animations
  var reward = 0;     // 1 if the target is reached. 
  var last_move = {
    "trial_n": 0,
    "move_n": 0,                 
    "response_time": 0,
    "submitted_x": 1,
    "submitted_y": 1,
    "key"  : 0
  };

  /*
  ================================================================================
   API Interaction
  ================================================================================
  */
  
  // Start session and load config
  saveSession();
  load_config();
  display_grid();

  function display_grid(){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            grid = JSON.parse(xmlHttp.responseText);
            console.log(grid);

            obstacle_x = grid["obstacle_x"];
            obstacle_y = grid["obstacle_y"];            

            $('#obstacle__square').removeClass('obstacle');
            $('[data-x=' + obstacle_x + '][data-y='+ obstacle_y +']').addClass('obstacle');    
        }
    }
    console.log("Loading grid " + id)
    xmlHttp.open("GET", API_URL+"/grids/"+id, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  function load_config(){      
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
              config = JSON.parse(xmlHttp.responseText);
              console.log(config);

              // set number of trials 
              time_limit = config["time_limit"];

              // set number of practice trials
              max_practice = config["max_practice"];

              // set number of practice trials
              max_moves = config["max_moves"];

              // set number of trials 
              max_trials = config["num_trials"];                                          
              
              // set number of different grids
              max_grids = config["max_grids"];       
          }
      }
      console.log("Loading config..")
      xmlHttp.open("GET", API_URL+"/config", true); // true for asynchronous 
      xmlHttp.send(null);
  }

  function saveSession(){
    var participant = 1337;
    var code_version = 1; 

    // create API call to create new session 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status == 201){
                var resp = xhr.responseText;
                id = parseInt(resp);
                console.log("Received Session Id: "+id); 
                session = id;  
            }
        }
    }
    // send Post request to API
    xhr.open("POST", API_URL+"/session");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        participant: participant,
        code_version: code_version
    }));    
  }

  function saveSessionResult(comment){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", API_URL+"/session");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        id: session, 
        comment: comment
    }));
  }

  function saveTrial(timestamp, grid_id){
    var reward = 0;  

    // create API call to create new trial 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status == 201){
                // After successful post, receive id of the created trial 
                var resp = xhr.responseText;
                id = parseInt(resp);
                console.log("Received Trial Id: "+id); 
                trial_id = id;  
            }
        }
    }
    // send Post request to API
    xhr.open("POST", API_URL+"/trial");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        session: session, 
        grid_id: grid_id,
        timestamp: timestamp,
        reward: reward
    }));
  }

  
  function saveMoveResult(number_of_moves, response_time, submittedX, submittedY, key){          
    // create API call to save building block choice
    var xhr = new XMLHttpRequest();
    console.log("Sending API Call to save building block choice")

    saved_response = {
      "move_n": number_of_moves,                 
      "response_time": response_time,
      "submitted_x": submittedX,
      "submitted_y": submittedY,
      "key": key
    };            
  

    xhr.open("POST", API_URL+"/move");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(saved_response));

    return saved_response    
  }
  

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
            
    trialStartTimeMs = new Date().getTime();    

    if (trial_n > max_trials) {
        // The experimet is done, conclude the experiment.
        $(".grids").slideUp();
        $(".session-end").slideDown();        
        // Send session info to server        
        saveSessionResult("0");      

    } else if (number_of_moves <= max_moves){
        // The experiment is not done, display next stimulus.
        $(".trial-content__submit-button").slideDown();
    }
    number_of_moves += 1;
    var [x_pos, y_pos] = Get_Position();
    window.x_pos = x_pos
    window.y_pos = y_pos
  }

  // Calculate the movement range -for mouse control-
  function calc_range(last_move_x, last_move_y, target_tile_x, target_tile_y){        
    var x_diff = Math.abs(last_move_x - target_tile_x);
    var y_diff = Math.abs(last_move_y - target_tile_y);
    
    if ((x_diff < 2) && (y_diff < 2)) {
      return true
    } else {
      return false
    }
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


  $(".square").mouseover(function() {
    var target_tile_x = $(this).data('x');
    var target_tile_y = $(this).data('y');
    var last_move_x = last_move.submitted_x;
    var last_move_y = last_move.submitted_y;

    var target_resp = calc_range(last_move_x, last_move_y, target_tile_x, target_tile_y);
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
      var last_move = saveMoveResult(number_of_moves, response_time, submittedX, submittedY);
      window.last_move = last_move;

      Flash_Background_Correct();   
      
      // Start the next trial.
      number_of_moves += 1;    
      $('.square.active').addClass("processed")
      $('.square.processed').removeClass("active")              
      Start_New_Move();
  }
  });



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
    display_grid(); // Load next trial
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
      
      // update the last move
      var last_move = saveMoveResult(number_of_moves, response_time, submittedX, submittedY, key);
      window.last_move = last_move
      console.log(last_move);      

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
        window.reward = 1;

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