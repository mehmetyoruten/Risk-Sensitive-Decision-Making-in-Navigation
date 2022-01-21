/*
================================================================================
Experiment Settings
================================================================================
*/

const API_URL = "http://134.76.24.103/node"
//const API_URL = "http://127.0.0.1:5501/backend"


/*
================================================================================
API Interaction
================================================================================
*/
function display_grid(){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let grid = JSON.parse(xmlHttp.responseText);
            console.log(grid);

            let obstacle_x = grid["obstacle_x"];
            let obstacle_y = grid["obstacle_y"];            
            
            $('.obstacle').removeClass('obstacle');
            $('[data-x=' + obstacle_x + '][data-y='+ obstacle_y +']').addClass('obstacle');    
        }
    }
    console.log("Loading grid " + trial_n)
    xmlHttp.open("GET", API_URL+"/grids/"+trial_n, true); // true for asynchronous 
    xmlHttp.send(null);
  }

function load_config(){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let config = JSON.parse(xmlHttp.responseText);
            console.log(config);

            // set number of trials 
            window.time_limit = config["time_limit"];

            // set number of practice trials
            window.max_practice = config["max_practice"];

            // set number of practice trials
            window.max_moves = config["max_moves"];

            // set number of trials 
            window.max_trials = config["max_trials"];                                          
            
            // set number of different grids
            window.max_grids = config["max_grids"];                                           
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
    let xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL+"/session");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
            if (xhr.status == 201){
                let object = JSON.parse(xhr.response)
                console.log(object)
            }
        }
    }
    // send Post request to API
    let body = JSON.stringify({
        participant: participant,
        code_version: code_version
        })

    xhr.send(body);    
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
    console.log("Sending API Call to save move choice")

    var saved_response = {
      "trial_n": trial_n,
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

function Start_New_Move(max_trials, number_of_moves, max_moves) {    

    // Count the number of moves
    $("#progress").html(" &nbsp;&nbsp; Trial: "+ trial_n + "<br>" + " &nbsp;&nbsp; Number of moves: " + number_of_moves);
            
    window.trialStartTimeMs = new Date().getTime();    

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
    window.number_of_moves = number_of_moves
    var [x_pos, y_pos] = Get_Position();
    window.x_pos = x_pos
    window.y_pos = y_pos
}

function Start_New_Trial() {
    $('.active').removeClass('active');
    $('.processed').removeClass('processed');
    $('#start__square').addClass('processed');
    $('#start__square').addClass('active');               
    window.number_of_moves = 0;        
}

function Get_Position() {      
    var x_pos = $(".active").data('x');
    var y_pos = $(".active").data('y');    
    return [x_pos, y_pos]
}


function Submit_Response(key) {          
    
    // Save the response          
    let trialEndTimeMs = new Date().getTime();           
    let response_time = (trialEndTimeMs-trialStartTimeMs)/1000
    let submittedX = $('.active').data('x');
    let submittedY = $('.active').data('y');        
    
    // update the last move
    var last_move = saveMoveResult(number_of_moves, response_time, submittedX, submittedY, key);
    window.last_move = last_move
    console.log(last_move);      

    // Check if the target is reached
    if (($(".active").data('x')=== $('#end__square').data('x') && ($(".active").data('y') === $('#end__square').data('y')))) {   
              
      trial_n +=1;      
      window.trial_n = trial_n
      $(".grids").slideUp();    
      

      if (trial_n === (max_practice+1)) {
        $(".practice-end").slideDown();                       
      } else {
        $(".inter-trial").slideDown();                       
      }                                         
      window.reward = 1;

    } else {        
      // Start the next move, if it is not reached               
        setTimeout(function(){                
            $('.processed').removeClass('processed')
            $('.active').addClass('processed')      
            Start_New_Move(max_trials, number_of_moves, max_moves); 
        }, time_limit);
    }                 
}  



export {display_grid, 
        load_config, 
        saveSession, 
        saveSessionResult, 
        saveTrial, 
        saveMoveResult,
        Start_New_Move, 
        Start_New_Trial,
        Get_Position,
        Submit_Response} ;
