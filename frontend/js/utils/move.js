function radomNum(){    
    let rnd = Math.random();

    if (rnd < 0.25) {
        return 37

    } else if (0.5 > rnd >= 0.25 ) {
        return 38

    } else if (0.75 > rnd >= 0.5) {
        return 39
    } else {
        return 40
    }
}



var movePlayer = function( e ) {
	//left arrow key
	if ((e.keyCode === 37) && (n_keypress == 0)) { 
		if ( isValidMove(-1, 0)) {
			n_keypress += 1; 
			updateMatrix( player.y,  player.x, 0);
			// Highlight the cell being processed
			updateMatrix( player.y,  player.x - 1, 3);	
			
			// Highlight the keyboard
			updateKeyboardMatrix(1,0,2);
			renderKeyboard();
			updateKeyboardMatrix(1,0,1);
			setTimeout(function(){
				renderKeyboard();
			}, 500);

			// Render the grid
			render();
			updateMatrix( player.y,  player.x -1 , 2);	
			player.x --	

			setTimeout(function(){			
				render();				      				
			}, 500)
			
			// Submit the response  		
			Submit_Response('left')

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

			// Highlight the keyboard
			updateKeyboardMatrix(1,2,2);
			renderKeyboard();
			updateKeyboardMatrix(1,2,1);
			setTimeout(function(){
				renderKeyboard();
			}, 500);

			// Render the grid
			render();
			updateMatrix( player.y,  player.x + 1, 2);
			player.x ++;

			setTimeout(function(){
				render();
			}, 500)
			
			// Submit the response        
			Submit_Response('right');

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
			
			// Highlight the keyboard
			updateKeyboardMatrix(0,1,2);
			renderKeyboard();
			updateKeyboardMatrix(0,1,1);
			setTimeout(function(){
				renderKeyboard();
			}, 500);
			
			// Render the grid
			render();
			
			updateMatrix( player.y - 1,  player.x, 2);
			player.y --;
			setTimeout(function(){
				render();
			}, 500)		
			
			// Submit the response        
			Submit_Response('up');

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
			// Highlight the target tile as being processed
			updateMatrix( player.y + 1,  player.x, 3);

			// Highlight the keyboard
			updateKeyboardMatrix(1,1,2);
			renderKeyboard();
			updateKeyboardMatrix(1,1,1);
			setTimeout(function(){
				renderKeyboard();
			}, 500);

			render();
			updateMatrix( player.y + 1,  player.x, 2);
			player.y ++;

			setTimeout(function(){
				render();
			}, 500);					

			// Submit the response        
			Submit_Response('down');
						

			// Disable moving for a second
			setTimeout(function(){
				n_keypress = 0
				window.n_keypress = n_keypress;
			},1000);    
		}
	// After practice trials don't show the alert menu
	} else if ((max_practice+1) >= trial_n) {
		if ((e.keyCode > 0) && (n_keypress == 1)){
			alert("Please wait for your response to be processed!")
		} else if ((e.which != 37 || e.which != 38 || e.which != 39 || e.which != 40 ) && (n_keypress == 0)) {
			alert("Please only use the arrow keys!") 
		}
	}
	window.player = player;
}