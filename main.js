use2D = true;
	
//VARS
var canvas = document.getElementById('canvas'), 
	ctx = canvas.getContext('2d'),
	score = 0,
	move = 0,
	speed = 180,
	start = true,
	snake = new Array(2);
	
var grid = new Array (25);
for (var x = 0; x < grid.length; x++) {
	grid[x] = new Array (25);
}

//add snake and food
grid = makeSnake(grid);
grid = makeFood(grid);

makeGame();

//controls with arrow keys
window.addEventListener('keydown', function(x) {
    //up
    if (x.keyCode === 38 && move !== 3) {
        move = 2; 
    //down
    } else if (x.keyCode === 40 && move !== 2) {
        move = 3; 
    //left
    } else if (x.keyCode === 37 && move !== 0) {
        move = 1;
    //right
    } else if (x.keyCode === 39 && move !== 1) {
        move = 0; 
    }
});

function makeGame() {
	//clear for no overlaps
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	mainScreen();
	
	//go through snake body
	for (var a = snake.length-1; a >= 0; a--) {
		if (a === 0) {
			switch(move) {
				//right
				case 0:
					snake[0] = {x: snake[0].x+1, y: snake[0].y};
					break;
				//left
				case 1:
					snake[0] = {x: snake[0].x-1, y: snake[0].y};
					break;
				//up
				case 2:
					snake[0] = {x: snake[0].x, y: snake[0].y-1};
					break;
				//down
				case 3:
					snake[0] = {x: snake[0].x, y: snake[0].y+1};
					break;
			}
			
			//check for out of bounds
			if (snake[0].x < 0 ||
				snake[0].x >= 20 ||
				snake[0].y < 0 ||
				snake[0].y >= 20) {
					gameOver();
					return;
			}
			
			//increase score if food eaten
			if (grid[snake[0].x][snake[0].y] === 1) {
				score += 5;
				grid = makeFood(grid);
				//add body
				snake.push({x: snake[snake.length-1].x, y: snake[snake.length-1].y});
				grid[snake[snake.length-1].x][snake[snake.length-1].y] = 2;
			//check if body hits head
			} else if (grid[snake[0].x][snake[0].y] === 2) {
				gameOver();
				return;
			}
			
			grid[snake[0].x][snake[0].y] = 2;
			
			} else {
				if (a === (snake.length-1)) {
					grid[snake[a].x][snake[a].y] = null;
				}
				snake[a] = {x: snake[a-1].x, y: snake[a-1].y};
				grid[snake[a].x][snake[a].y] = 2;
			}
		}

	for (var x = 0; x < grid.length; x++) {
		for (var y = 0; y < grid[0].length; y++) {
			if (grid[x][y] === 1) {
				//head
				ctx.fillStyle = 'black';
				ctx.fillRect(x*10, y*10, 20, 20);
				ctx.strokeStyle = 'white';
				ctx.strokeRect(x*10, y*10, 20, 20);
			} else if (grid[x][y] === 2) {
				ctx.fillStyle = 'white';
				ctx.fillRect(x*10, y*10, 20, 20);
				ctx.strokeStyle = 'black';
				ctx.strokeRect(x*10, y*10, 20, 20);
			}
		}
	}
	
	//set speed
	if (start) {
		setTimeout(makeGame, speed);
	}
}

function mainScreen() {
	//display score
	ctx.strokeStyle = 'black';
	ctx.font = "bold 13px Arial";
	ctx.fillText("Score: "+score, 5, 395);
}

//gameOver part isn't working.. not sure why 
function gameOver() {
	//clear for no overlap
	ctx.clearRect(0, 0, canvas.width. canvas.height);
	ctx.fillStyle = 'black';
	ctx.font = 'bold 20px Arial';
	ctx.fillText('GAME OVER', canvas.width/2, canvas/height/3);
}

function makeSnake(grid) {
	//assign random position
	var rdmX = Math.round(Math.random() * 19);
	var rdmY = Math.round(Math.random() * 19);
	//avoid out of bounds
	while ((rdmX - snake.length) < 0) {
		rdmX = Math.round(Math.random() * 19);
	}
	for (var i = 0; i < snake.length; i++) {
		snake[i] = {x:rdmX-i,y:rdmY};
		grid[rdmX-i][rdmY] = 2;
	}
	return grid;
}

function makeFood(grid) {
	//assign random position
	var rdmX = Math.round(Math.random() * 19);
	var rdmY = Math.round(Math.random() * 19);
	//avoid placement on snake~
	while (grid[rdmX][rdmY] === 2) {
		rdmX = Math.round(Math.random() * 19);
		rdmY = Math.round(Math.random() * 19);
	}
	grid[rdmX][rdmY] = 1;
	return grid;
}
