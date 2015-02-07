use2D = true;

var canvas = document.getElementById("canvas"), 
	ctx = canvas.getContext("2d");
	grid = new Array(20);
	score = 0;
	direction = 0;
	
//create underlying rows and columns
for (var x = 0; x < grid.length; x++) {
	grid[x] = new Array(20);
}
		
mainScreen();
grid = makeSnake(grid);
grid = makeFood(grid);
mainScreen();

function mainScreen() {
	ctx.strokeStyle = 'black';
	ctx.font = "bold 13px Arial";
	ctx.fillText("Score: "+score, 5, 395);
	
	for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[0].length; y++) {
            if (grid[x][y] === 1) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
            } 
            else if (map[x][y] === 2) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * 10, y * 10 + 20, 10, 10);			
            }
		}
	}
}


function makeFood(grid) {
	//create random value positions for food
	var rdmX = Math.round(Math.random() * 19);
	var rdmY = Math.round(Math.random() * 19);
	
	//avoid placement on snake
	while (grid[rdmX][rdmY] === 2) {
		rdmX = Math.round(Math.random() * 19);
		rdmY = Math.round(Math.random() * 19);
	} 
	
	grid[rdmX][rdmY] = 1;
	return grid;
}

snake = new Array(1);

function makeSnake(grid) {
	//create random value positions for snake
	var rdmX = Math.round(Math.random() * 19);
	var rdmY = Math.round(Math.random() * 19);
	
	//avoid placement out of boundaries
	while ((rdmX-snake.length) < 0) {
		rdmX = Math.round(Math.random() * 19);
	}
	
	for (var x = 0; x < snake.length; x++) {
		snake[x] = { x:rdmX-x,y:rdmY};
		grid[rdmX-x][rdmY] = 2;
	}
	
	return grid;
}
