document.addEventListener('DOMContentLoaded', function() {
    load_config();
}, false);


function load_config(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            config = JSON.parse(xmlHttp.responseText);
            console.log(config);

            document.getElementById('input_num_trials').value = config["num_trials"] ; 
            document.getElementById('input_num_solhouettes').value = config["num_silhouettes"] ; 
            document.getElementById('input_background').value=config["background_color"];
            document.getElementById('input_time_limit').value = config["time_limit"]; 
            document.getElementById('input_num_debr_tasks').value = config["num_debriefing_tasks"];
        }
    }
    console.log("Loading config..")
    xmlHttp.open("GET", "http://134.76.24.103/node/config", true); 
    xmlHttp.send(null);
}


function submit_config(){
    num_trials = document.getElementById('input_num_trials').value; 
    num_silhouettes = document.getElementById('input_num_solhouettes').value; 
    background_color = document.getElementById('input_background').value;
    time_limit = document.getElementById('input_time_limit').value;
    num_debriefing_tasks = document.getElementById('input_num_debr_tasks').value;
    
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://134.76.24.103/node/config");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        num_trials: num_trials, 
        num_silhouettes : num_silhouettes,
        background_color: background_color, 
        time_limit: time_limit,
        num_debriefing_tasks: num_debriefing_tasks
    }));
}