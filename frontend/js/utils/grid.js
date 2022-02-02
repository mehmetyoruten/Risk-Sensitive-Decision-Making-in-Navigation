import { load_config } from "./module.js";

const API_URL = "http://127.0.0.1:5502/backend"

var number_of_moves = 0;
var trial_n = 1;
const gridWorld = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0, 0, 0]
	];

// Position of the player
var playerX = 0;
var playerY = gridWorld.length-1;
var matrix = gridWorld;
window.matrix = matrix;
var player = { x: playerX, y: playerY, color: "orange" };


var uiContext =  getContext(1000, 650, "white");
var outlineContext = getContext(0, 0, "white"); // color of the lines between tiles
var topContext =  getContext(0, 0, "#111", true);
var cellSize = 40;
var padding = 3;
matrix[playerY][playerX] = 2; // make value of the starting position 2, to highlight the pla


// if there is no obstacle, and if you are in the grid, you can move
function isValidMove(x, y) {
	if ( matrix[ player.y + y][ player.x + x] === 0) {
		return true;
	}
	return false;
}

function updateMatrix(y, x, val) {
	matrix[y][x] = val;
}

var movePlayer = function( e ) {
	//left arrow key
	if ((e.keyCode === 37) && (n_keypress == 0)) { 
		if ( isValidMove(-1, 0)) {
			n_keypress += 1; 
			updateMatrix( player.y,  player.x, 0);
			// Highlight the cell being processed
			updateMatrix( player.y,  player.x - 1, 3);
			render();

			setTimeout(function(){
				updateMatrix( player.y,  player.x -1 , 2);	
				player.x --				
				render();
				// Submit the response        				
			}, 500)
					
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

		}
		
		// right arrow key
	} else if ((e.keyCode === 39 && (n_keypress == 0))) { 
		if ( isValidMove(1, 0)) {
			n_keypress += 1; 
			updateMatrix( player.y,  player.x, 0);
			updateMatrix( player.y,  player.x + 1, 3);
			render();

			setTimeout(function(){
				updateMatrix( player.y,  player.x + 1, 2);
				player.x ++;
				render();
			}, 500)
			
			// Submit the response        
			Submit_Response('right');

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
		}

		// up arrow key
	} else if ((e.keyCode === 38) && (n_keypress == 0)) { 
		if ( isValidMove(0, -1)) {
			n_keypress += 1; 
			updateMatrix( player.y,  player.x, 0);
			updateMatrix( player.y - 1,  player.x, 3);
			render();

			setTimeout(function(){
				updateMatrix( player.y - 1,  player.x, 2);
				player.y --;
				render();
			}, 500)		
			
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
		}

		// down arrow key
	} else if ((e.keyCode === 40) && (n_keypress == 0)) {
		if ( isValidMove(0, 1)) {
			n_keypress += 1; 
			updateMatrix( player.y,  player.x, 0);
			updateMatrix( player.y + 1,  player.x, 3);
			render();

			setTimeout(function(){
				updateMatrix( player.y + 1,  player.x, 2);
				player.y ++;
				render();
			}, 500)			
			
			// Submit the response        
			Submit_Response('down');

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
		}
	} else if (max_practice > trial_n) {
		if ((e.keyCode > 0) && (n_keypress == 1)){
			alert("Please wait for your response to be processed!")
		} else if ((e.which != 37 || e.which != 38 || e.which != 39 || e.which != 40 ) && (n_keypress == 0)) {
			alert("Please only use the arrow keys!") 
		}
	}
	window.player = player;
}

function getCenter(w, h) {
	return {
		x: window.innerWidth / 2 - w / 2 + "px",
		y: window.innerHeight / 2 - h / 2 + "px"
	};
}


// Draw area
function getContext(w, h, color = "#111", isTransparent = false) {
	var canvas = document.getElementById('myCanvas');	
	var context =  canvas.getContext("2d");
	canvas.style.background = color;
	if (isTransparent) {
		canvas.style.backgroundColor = "transparent";
	}
	const center =  getCenter(w, h);	

	return context;
}

function render() {
	const w = ( cellSize +  padding) *  matrix[0].length - ( padding);
	const h = ( cellSize +  padding) *  matrix.length - ( padding);

	const center =  getCenter(w, h);

	// Color every cell in the grid
	for (let row = 0; row <  matrix.length; row ++) {
		for (let col = 0; col <  matrix[row].length; col ++) {
			const cellVal =  matrix[row][col];
			let color = "gray"; // cell colors
			
			// If the matrix value is 1, put red. If 2, yellow for the player
			if (cellVal === 1) {
				color = "red";
			} else if (cellVal === 2) {
				color =  player.color;
			} else if (cellVal === 3) {
				color = "#d8c627"
			}						

			outlineContext.fillStyle = color;
			outlineContext.fillRect(col * ( cellSize +  padding),
			row * ( cellSize +  padding),
			cellSize,  cellSize);

			// Draw borders
			outlineContext.rect(col * ( cellSize +  padding),
			row * ( cellSize +  padding),
			cellSize,  cellSize);
			outlineContext.stroke();

			outlineContext.lineWidth = "0.1"
			outlineContext.strokeStyle="#000000";
			outlineContext.stroke()

			outlineContext.lineWidth = 2;
			
		}
	}
}

function Submit_Response(key) {          
	
	// Save the response          
	let moveEndTimeMs = new Date().getTime();           
	let response_time = (moveEndTimeMs-MoveStartTimeMs)/1000    
	let submittedX = player.x;
	let submittedY = player.y;
	
	// update the last move
	var last_move = saveMoveResult(number_of_moves, response_time, submittedX, submittedY, key);
	window.last_move = last_move
	console.log(last_move);      

	// Check if the target is reached
	if (matrix[3][6] === 3) {                 
	trial_n +=1;      
	window.trial_n = trial_n
	$(document).off('keydown');          

	$(".grids").slideUp();    
		
	if (trial_n === (max_practice+1)) {
		$(".practice-end").slideDown();          
		$(document).off('keydown');      
		Start_New_Trial();              
	} else {
		$(".inter-trial").slideDown(); 
		$(document).off('keydown');  
			
		Start_New_Trial();                     
	}                                               

	} else {        
	// Start the next move, if it is not reached               
		setTimeout(function(){                     
			Start_New_Move(max_trials, number_of_moves, max_moves); 
		}, time_limit);
	}                 
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

function Start_New_Trial() {
	// Initiate keyboard controls
	updateMatrix(player.y,  player.x, 0);
	updateMatrix(3,6,0);
	
	// Initialize the starting position of the player
	player.y = 3;
	player.x = 0;	 
	updateMatrix(player.y, player.x, 2);
	render();

	$(document).keydown(movePlayer); 	     
	window.number_of_moves = 0;
	
	
	// keyboard control
	var n_keypress = 0;
	window.n_keypress = n_keypress;
}

function Start_New_Move(max_trials, number_of_moves, max_moves) {    
	window.MoveStartTimeMs = new Date().getTime();    
	$("#progress").html(" &nbsp;&nbsp; Trial: "+ trial_n + "<br>" + " &nbsp;&nbsp; Number of moves: " + number_of_moves);         

	var n_keypress = 0;
	window.n_keypress = n_keypress;

	if (trial_n > max_trials) {
		// The experimet is done, conclude the experiment.
		$(document).off('keydown');    
		$(".grids").slideUp();
		$(".session-end").slideDown();        
		
		// Send session info to server        
		// saveSessionResult("0");     		 

	} else if (number_of_moves <= max_moves){
		// The experiment is not done, display next stimulus.
		$(".trial-content__submit-button").slideDown();
	}
	
	number_of_moves += 1;
	window.number_of_moves = number_of_moves
}
	

export {render, movePlayer, Start_New_Trial, Start_New_Move }

