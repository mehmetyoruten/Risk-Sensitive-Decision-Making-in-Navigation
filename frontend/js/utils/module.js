
/*
================================================================================
Experiment Settings
================================================================================
*/

const API_URL = "http://134.76.24.103/node"

/*
================================================================================
API Interaction
================================================================================
*/

function load_config(){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let config = JSON.parse(xmlHttp.responseText);
            console.log(config);

            // set number of trials 
            window.time_limit = config["time_limit"];
            
            // set number of practice trials without obstacles
            window.max_practice = config["max_practice"];

            // set number of practice trials with obstacles
            window.practice_obstacle = config["practice_obstacle"];

            // set number of practice trials
            window.max_moves = config["max_moves"];

            // set number of trials 
            window.max_trials = config["max_trials"];                                          
            
            // set number of different grids
            window.max_grids = config["max_grids"];  
            
            // Initialize some variables       
            window.trial_n = config["trial_n"];

            window.number_of_moves = config["number_of_moves"];
            window.session = config["session"];
            window.total_loss = config["total_loss"];

            window.timeLag = config["timeLag"];

            window.background_color = config["background_color"];

        }
    }    
    console.log("Loading config..")
    xmlHttp.open("GET", API_URL+"/config", true); // true for asynchronous 
    xmlHttp.send(null);    
    
}


function load_grid(gridId){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp);
        }

    }            
    console.log("Loading grid with id: " + gridId + "...");
    xmlHttp.open("GET", API_URL+"/grids/"+gridId, false); // true for asynchronous 
    xmlHttp.send(null);                
}

function callback(xmlHttp) {    
    // it should print grid info
    const grids = JSON.parse(xmlHttp.responseText);    

    // set gridWorld
    const gridWorld = grids["gridWorld"];
    window.matrix = gridWorld;
    
    // set initialization parameters
    window.endLoc = grids["endLoc"];
    window.startLoc = grids["startLoc"];            
    window.obstacleLoc = grids["obstacleLoc"];

    // location of the player
    window.player = grids["player"];          

    console.log(grids)
}


function saveSession(){        
    let code_version = "1"; 
    
    let sess_start_time = new Date().getTime();

    // Create empty arrays to save used maps and results of the trials
    var maps = [];
    window.maps = maps;

    var results = [];
    window.results = results;
    
    var session_id = Math.random().toString(16).substr(2, 16);
    window.session_id = session_id;
    
    var xmlHttp = new XMLHttpRequest();
    // create API call to create new session 
    xmlHttp.open("POST", API_URL+"/sessions");        
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4){
            if (xmlHttp.status == 201){
                // After successful post, receive id of the created trial 
                var resp = xmlHttp.responseText;
                let id = parseInt(resp.id);                                
            }
        }
    }

    // send Post request to API
    var body = JSON.stringify({
        id: session_id,
        start_time: sess_start_time,
        end_time: 0,
        results: results,
        maps: maps,
        code_version: code_version,
        comment : 1
        })
    
    xmlHttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlHttp.send(body);    
}

function loadSessionInfo(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        SessionInfo(xmlHttp)         
        }
    }    
    console.log("Loading session info..")
    xmlHttp.open("GET", API_URL+"/sessions", true); // true for asynchronous 
    xmlHttp.send(null);            

    
}

function SessionInfo(xmlHttp){        
    // Get all the sessions
    let session = JSON.parse(xmlHttp.responseText);    

    // Declare the current session id
    //window.session_id = session[session.length - 1].id;
    console.log("Session id: " + session_id);    
}


function saveSessionResult(comment){
    let sess_end_time = new Date().getTime();
    
    var xhr = new XMLHttpRequest();
        
    xhr.open("PATCH", API_URL+"/sessions/"+session_id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        end_time: sess_end_time,
        maps: maps,
        results: results,
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


export {load_config, 
        load_grid,
        saveSession, 
        saveSessionResult, 
        saveTrial,
        loadSessionInfo } ;
