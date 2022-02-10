
/*
================================================================================
Experiment Settings
================================================================================
*/

const API_URL = "http://134.76.24.103/node"
//const API_URL = "http://127.0.0.1:5502/backend"


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

            // set number of practice trials
            window.max_practice = config["max_practice"];

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

        }
    }    
    console.log("Loading config..")
    xmlHttp.open("GET", API_URL+"/config.json", true); // true for asynchronous 
    xmlHttp.send(null);    
    
}
    

function load_grid(){      
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let grids = JSON.parse(xmlHttp.responseText);
            console.log(grids);

            // set gridWorld
            const gridWorld = grids["gridWorld"];

            // set gridWorld for practice
            const gridTrial = grids["gridPractice"]

            return gridWorld
        }
    }    
    console.log("Loading grid..")
    xmlHttp.open("GET", API_URL+"/grids.json", true); // true for asynchronous 
    xmlHttp.send(null);        
    
}

function saveSession(){
    let participant = 1337;
    let code_version = 1; 
    
    var xmlHttp = new XMLHttpRequest();
    // create API call to create new session 
    xmlHttp.open("POST", API_URL+"/sessions.json");


    // send Post request to API
    var body = JSON.stringify({
        id: 2000,
        participant: participant,
        code_version: code_version,
        comment : comment
        })
    
    xmlHttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlHttp.send(body);    
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




export {load_config, 
        load_grid,
        saveSession, 
        saveSessionResult, 
        saveTrial } ;
