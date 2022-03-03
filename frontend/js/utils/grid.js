import { load_config, load_grid } from "./module.js";

//const API_URL = "http://127.0.0.1:5502/backend"
const API_URL = "http://134.76.24.103/node"


const keyboardWorld = [[0,1,0],
					  [1,1,1]];

var background_color = "white";  

var max_n_moves = 20;
window.max_n_moves = max_n_moves;

function updateMatrix(y, x, val) {
	matrix[y][x] = val;
}

function updateKeyboardMatrix(y, x, val) {
	keyboardWorld[y][x] = val;
}

// Draw area
function getContext(w, h, color = "#111", isTransparent = false) {
	var canvas = document.getElementById('gridCanvas');	
	var context =  canvas.getContext("2d");
	canvas.style.background = color;
	if (isTransparent) {
		canvas.style.backgroundColor = "transparent";
	}

	return context;
}

function renderKeyboard() {
	var c = document.getElementById("keyboardCanvas");
	var ctx = c.getContext("2d");

	for (let row = 0; row <  keyboardMatrix.length; row ++) {
		for (let col = 0; col <  keyboardMatrix[row].length; col ++) {			
			let keyVal =  keyboardMatrix[row][col];
			let color = 'white';

			if (keyVal === 0) {
				color = "white";

			} else if (keyVal === 1) {										
				ctx.rect(col * ( cellSize +  padding),
				row * ( cellSize +  padding),
				cellSize,  cellSize);	
				
				drawArrows(ctx, col, row, cellSize, padding);				

			} else {
				color = 'yellow';

			} 		
			
			ctx.fillStyle = color;
			ctx.fillRect(col * ( cellSize +  padding),
				row * ( cellSize +  padding),
				cellSize,  cellSize);	
			

			ctx.lineWidth = 1;
			ctx.strokeStyle="black";			
			ctx.stroke();
		}		

	}	
	
}
	
function render() {
	const w = ( cellSize +  padding) *  matrix[0].length - ( padding);
	const h = ( cellSize +  padding) *  matrix.length - ( padding);
		
	var cellSize = 60;
	// Color every cell in the grid
	for (let row = 0; row <  matrix.length; row ++) {
		for (let col = 0; col <  matrix[row].length; col ++) {
			const cellVal =  matrix[row][col];
			let color = "gray"; // cell colors						
			
			// If the matrix value is 1, generate tiles. 
			// If 2, generate obstacles. 
			// 3 highlights the location of the player
			// 4 indicates that the move is in the process 
			// 5 for target cell
			if (cellVal === 2) {
				color = "red";				
			} else if (cellVal === 3) {
				color =  player.color;
			} else if (cellVal === 4) {
				color = "#d8c627"				
			} else if (cellVal === 5) {
				color = "green"						
			}								


			gridContext.lineWidth = 1;
			gridContext.strokeStyle="#000000";
			gridContext.stroke()										

			if (cellVal > 0) {
				gridContext.fillRect(col * ( cellSize +  padding),
					row * ( cellSize +  padding),
					cellSize,  cellSize);

				// Draw borders
				gridContext.rect(col * ( cellSize +  padding),
					row * ( cellSize +  padding),
					cellSize,  cellSize);			
					gridContext.stroke();

				gridContext.fillStyle = color;

				if (cellVal === 2) {
					drawFlames(gridContext, col, row, cellSize, padding);
				} else if (cellVal === 5){
					drawDoor(gridContext, col, row, cellSize, padding);	
				} 
			}						
		}				
	}

	gridContext.font = "10px";
	gridContext.fillStyle = "white";	
}

function Submit_Response(keyPressed, moveDirection) {          	
	// Save the response          
	let moveEndTimeMs = new Date().getTime();           
	let response_time = (moveEndTimeMs-MoveStartTimeMs)/1000    
	let submittedX = player.x;
	let submittedY = player.y;
	
	// update the last move
	var last_move = saveMoveResult(number_of_moves, response_time, submittedX, submittedY, keyPressed, moveDirection);
	window.last_move = last_move
	console.log(last_move);      

	if (number_of_moves <= max_n_moves) {
		// Check if the target is reached
		if (matrix[endLoc.y][endLoc.x] === 2) {                 
			document.removeEventListener('keydown', movePlayer);
			setTimeout(function() {
				Flash_Background_Correct();
				$(".grids").slideUp();    					
				
				// First round of practice ends
				if (trial_n === (max_practice+1)) {					
					$(".instructions-obstacle").slideDown();
				// Second round of practice ends
				} else if (trial_n === (1 + (max_practice)*2)) {
					$(".practice-end").slideDown(); 					
				} else {
					$(".inter-trial").slideDown(); 	 
				}
			}, 1000)
		} else {        		
			// Start the next move, if the end point is not reached               
			setTimeout(function(){                     
				Start_New_Move(max_trials, number_of_moves, max_moves); 
			}, time_limit);
		}  
	} else {
		$(".grids").slideUp();
		$(".number-of-moves").slideDown()
	}               
}  

function saveMoveResult(number_of_moves, response_time, submittedX, submittedY, keyPressed, moveDirection){          
	// create API call to save building block choice
	var xhr = new XMLHttpRequest();
	console.log("Sending API Call to save move choice")

	const saved_response = {
		"trial_n": trial_n,
		"move_n": number_of_moves.toString(),                 
		"response_time": response_time,
		"submitted_x": submittedX,
		"submitted_y": submittedY,
		"key": keyPressed,
		"move_direction": moveDirection
		};            


	xhr.open("POST", API_URL+"/move");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(saved_response));    
	return saved_response    
}

function Start_New_Trial() {
	window.scrollTo(0, 0);
	disableScroll();

	// Inrease the trial no
	trial_n +=1;      
	window.trial_n = trial_n

	// Grid info
	const gridPractice = [[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]];

	const gridTrial = [[0, 0, 1, 1, 1, 0, 0],
					[0, 0, 0, 1, 0, 0, 0],
					[0, 0, 1, 1, 1, 0, 0],
					[0, 1, 1, 1, 1, 1, 1]];
	
	
	var matrix = gridTrial;
	window.matrix = matrix;
	
						
	// Position of the player
	var playerX = 2;
	var playerY = 0;
	var player = { x: playerX, y: playerY, color: "orange" };
	window.player = player;


	var keyboardMatrix = keyboardWorld;
	window.keyboardMatrix = keyboardMatrix;

	var gridContext = getContext(0, 0, "white");
	window.gridContext = gridContext;


	var endLoc = {x: 6, y:3};
	var startLoc = {x:2, y:0};
	var obstacleLoc = {x: [2,3,4], y:3}
		

	// Initiate keyboard controls
	updateMatrix(player.y,  player.x, 3);	

	// Initialize the end point
	updateMatrix(endLoc.y, endLoc.x,5);
	
	// Initialize the starting position of the player	
	updateMatrix(startLoc.y, startLoc.x, 3);
	player.x = startLoc.x;
	player.y = startLoc.y;
	
	// Initialize the end point
	updateMatrix(endLoc.y, endLoc.x,5);

	// Locate the obstacles if the player is not in the practice round
	if (trial_n === (max_practice+1+1)) {	
		for( var i = 0; i < obstacleLoc.x.length; i++){
			updateMatrix(obstacleLoc.y, obstacleLoc.x[i], 2);
		}
	} else if (trial_n === (max_practice+1+2)) {
		let obstacleLoc = {x: [2,3,4], y:[2,3]}
		for( var k = 0; k < obstacleLoc.y.length; k++){
			for( var i = 0; i < obstacleLoc.x.length; i++){
				updateMatrix(obstacleLoc.y[k], obstacleLoc.x[i], 2);
			}
		}}
	
	// Render the updated locations
	render();
	renderKeyboard();

	document.addEventListener('keydown', movePlayer);	     
	window.number_of_moves = 0;
		
	// keyboard control
	var n_keypress = 0;
	window.n_keypress = n_keypress;	
}

function Start_New_Move(max_trials, number_of_moves, max_moves) {    
	window.MoveStartTimeMs = new Date().getTime();    
	$("#progress").html(" &nbsp;&nbsp; <strong>Trial: </strong> "+ trial_n + "<br>" + 
	" &nbsp;&nbsp; <strong> Number of moves: </strong> " + number_of_moves 
	+ "<br>" + "&nbsp;&nbsp; <strong> Total Loss:</strong> " + total_loss);         

	var n_keypress = 0;
	window.n_keypress = n_keypress;

	if (trial_n > max_trials) {
		// The experimet is done, conclude the experiment.
		document.removeEventListener('keydown', movePlayer);
		$(".grids").slideUp();
		$(".session-end").slideDown();        
		
		// Send session info to server        
		// saveSessionResult("0");     		 
	}

	number_of_moves += 1;	
	window.number_of_moves = number_of_moves;
}

function Flash_Background_Correct() {
	// Note: jquery-ui necessary to animate colors.
	$('body').stop().animate({backgroundColor:'#006622'}, 10);	
	$('body').animate({backgroundColor:background_color}, 1000);
}

function Flash_Background_Incorrect() {
	// Note: jquery-ui necessary to animate colors.
	$('body').stop().animate({backgroundColor:'#800000'}, 10);	
	$('body').animate({backgroundColor:background_color}, 1000);
}

// Put arrow images on keyboard
function drawArrows(ctx, col, row, cellSize, padding) {
  const upArrow = new Image();
  const downArrow = new Image();
  const leftArrow = new Image();
  const rightArrow = new Image();  
 
  upArrow.src = 'js/utils/pics/up-arrow.png';
  downArrow.src = 'js/utils/pics/down-arrow.png';
  leftArrow.src = 'js/utils/pics/left-arrow.png';
  rightArrow.src = 'js/utils/pics/right-arrow.png';
  
  const arrows = [[0, upArrow, 0],
  [leftArrow,downArrow,rightArrow]];
  window.arrows = arrows;

  arrows[row][col].onload = function(){
	ctx.drawImage(arrows[row][col], col * ( cellSize +  padding + 2),
	row * ( cellSize +  padding + 2) ,
	cellSize-5,  cellSize-5);	
  }

}

// Draw door image
function drawDoor(ctx, col, row, cellSize, padding) {
	const doorExit = new Image();	 
	doorExit.src = 'js/utils/pics/double-door.png';
		
	doorExit.onload = function(){
	  ctx.drawImage(doorExit, col * ( cellSize +  padding ),
	  row * ( cellSize +  padding) ,
	  cellSize-5,  cellSize-5);	
	}  
  }

// Draw flame image
function drawFlames(ctx, col, row, cellSize, padding) {
const flame = new Image();	 
flame.src = 'js/utils/pics/flame.png';
	
flame.onload = function(){
	ctx.drawImage(flame, col * ( cellSize +  padding ),
	row * ( cellSize +  padding) ,
	cellSize-5,  cellSize-5);	
}  
}

 
/*
================================================================================
Move Player
================================================================================
*/

// if there is no obstacle, and if you are in the grid, you can move
function isValidMove(x, y) {
	if ( matrix[ player.y + y][ player.x + x] === 1 ) {
		return true;
	} else if (matrix[ player.y + y][ player.x + x] === 2) {
		setTimeout(function() {
			Flash_Background_Incorrect();	
			total_loss += 1;
			$(".grids").slideUp();    
			$(".lost-page").slideDown(); 		
			document.removeEventListener('keydown', movePlayer);		
		}, 1000)		
		
		return true;
	} else if (matrix[ player.y + y][ player.x + x] === 4) {
		return true
	}
	return false;	
}

function randomNum(e){    
    let rnd = Math.random();
	let arrowKeys = [37, 38, 39, 40];
    
	for( var i = 0; i < arrowKeys.length; i++){     
        if ( arrowKeys[i] === e.keyCode) {     
            arrowKeys.splice(i, 1); 
        }    
    }

	if (rnd < 0.09) {
        return arrowKeys[0]

    } else if (0.14 > rnd >= 0.10 ){
		return arrowKeys[1]

	} else if (0.24 > rnd >= 0.15) {
		return arrowKeys[2]

	} else if (1 > rnd >= 0.25) {
        return e.keyCode		
    } 
}

var movePlayer = function (e) {	
	if ((40 >= e.keyCode) && (e.keyCode >= 37)) {
		let key = randomNum(e);		
		// left arrow key
		if ((key === 37) && (n_keypress == 0)) { 
			if ( isValidMove(-1, 0)) {
				n_keypress += 1; 

				updateMatrix( player.y,  player.x, 1);
				// Highlight the cell being processed
				updateMatrix( player.y,  player.x - 1, 4);	
				
				// Highlight the keyboard
				updateKeyboardMatrix(1,0,2);
				renderKeyboard();
				updateKeyboardMatrix(1,0,1);
				setTimeout(function(){
					renderKeyboard();
				}, timeLag);

				// Render the grid
				render();
				updateMatrix( player.y,  player.x -1 , 3);	
				player.x --	

				setTimeout(function(){			
					render();				      				
				}, timeLag)
				
				// Submit the response  		
				Submit_Response(e.which, 'left')

				// Disable moving for a second
				setTimeout(function(){
					n_keypress = 0
					window.n_keypress = n_keypress;
				},timeLag);    

			}
			
			// right arrow key
		} else if ((key === 39 && (n_keypress == 0))) { 
			if ( isValidMove(1, 0)) {
				n_keypress += 1; 

				updateMatrix( player.y,  player.x, 1);
				updateMatrix( player.y,  player.x + 1, 4);

				// Highlight the keyboard
				updateKeyboardMatrix(1,2,2);
				renderKeyboard();
				updateKeyboardMatrix(1,2,1);
				setTimeout(function(){
					renderKeyboard();
				}, timeLag);

				// Render the grid
				render();
				updateMatrix( player.y,  player.x + 1, 3);
				player.x ++;

				setTimeout(function(){
					render();
				}, timeLag)
				
				// Submit the response        
				Submit_Response(e.which, 'right');

				// Disable moving for a second
				setTimeout(function(){
					n_keypress = 0
					window.n_keypress = n_keypress;
				},timeLag);    
			}

			// up arrow key
		} else if ((key === 38) && (n_keypress == 0)) { 
			if ( isValidMove(0, -1)) {
				n_keypress += 1; 
				updateMatrix( player.y,  player.x, 1);
				updateMatrix( player.y - 1,  player.x, 4);
				
				// Highlight the keyboard
				updateKeyboardMatrix(0,1,2);
				renderKeyboard();
				updateKeyboardMatrix(0,1,1);
				setTimeout(function(){
					renderKeyboard();
				}, timeLag);
				
				// Render the grid
				render();
				
				updateMatrix( player.y - 1,  player.x, 3);
				player.y --;
				setTimeout(function(){
					render();
				}, timeLag)		
				
				// Submit the response        
				Submit_Response(e.which, 'up');

				// Disable moving for a second
				setTimeout(function(){
					n_keypress = 0
					window.n_keypress = n_keypress;
				},timeLag);    
			}

			// down arrow key
		} else if ((key === 40) && (n_keypress == 0)) {
			if ( isValidMove(0, 1)) {
				n_keypress += 1; 

				updateMatrix( player.y,  player.x, 1);
				// Highlight the target tile as being processed
				updateMatrix( player.y + 1,  player.x, 4);

				// Highlight the keyboard
				updateKeyboardMatrix(1,1,2);
				renderKeyboard();
				updateKeyboardMatrix(1,1,1);
				setTimeout(function(){
					renderKeyboard();
				}, timeLag);

				render();
				updateMatrix( player.y + 1,  player.x, 3);
				player.y ++;

				setTimeout(function(){
					render();
				}, timeLag);					

				// Submit the response        
				Submit_Response(e.which, 'down');
							

				// Disable moving for a second
				setTimeout(function(){
					n_keypress = 0
					window.n_keypress = n_keypress;
				},timeLag);    
			}		    	
		} //else if (n_keypress == 1) {			
			//alert("Please wait for your response to be processed!");
		//}
			window.player = player;

	} else {
		alert("Please use only the arrow keys!");
	}	
}

function disableScroll() {
    document.body.classList.add("stop-scrolling");
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}
export {render, renderKeyboard, Start_New_Trial, Start_New_Move}

