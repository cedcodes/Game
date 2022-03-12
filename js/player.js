export default class Player {
  constructor(maze){
    this.maze = maze
    this.ctx = maze.ctx;
		this.width = maze.cellWidth;
		this.height = maze.cellHeight;
		this.stepCount = 0;

  }

  _setPlayer(){

		this.colNum = 	this.maze.goal.colNum === 0 	? this.maze.gridLastColumn : 0;
		this.rowNum = 	this.maze.goal.rowNum === 0 	? this.maze.gridLastRow : 0;
		this._drawPlayer();
  }


  // ZORO
  _drawPlayer(){
    this.xCord = this.colNum * this.width;
		this.yCord = this.rowNum * this.height;

		let zoro = new Image();
		
		zoro.height = this.height * 1;					// scale zoro inside 'player' cell
		zoro.yPos = this.yCord - zoro.height/15;		// adjust vertical pos according to zoro's height

		let player = this;

		zoro.onload = ()=> player.ctx.drawImage(zoro, player.xCord,	zoro.yPos,	player.width,	zoro.height);
		zoro.src = "./images/player.png";

		this.stepCount++;
	}

	// data = key
	// gestureTarget = value
	_move(data, gestureTarget) {
		let current = this.maze.grid[this.rowNum][this.colNum];
		let walls = current.walls;

		// if clicked, Player is moved
		let changeOccurred = false;

		if(gestureTarget === undefined) // if gestureTarget isn't passed in i.e. it's a keyboard move
			changeOccurred = this._testCases(data.keyCode, 65, 87, 68, 83, walls);
		else
			changeOccurred = this._testCases(gestureTarget, data.left, data.top, data.right, data.bottom, walls);
		if(changeOccurred) {

			
			this.ctx.clearRect(current.xCoord, current.yCoord, current.width, current.height);// removes the repeating image of player
			current._drawCell();
			this._drawPlayer();
		}
	}

	// TestCases for Move Events
	_testCases(test, case1, case2, case3, case4, walls) {
		switch(test) {
			case case1:
				if (!walls.leftWall) {
					this.colNum -= 1;		return true;
				}	break;

			case case2:
				if (!walls.topWall) {
					this.rowNum -= 1; 	return true;
				}	break;

			case case3:
				if (!walls.rightWall) {
					this.colNum += 1; 	return true;
				}	break;

			case case4:
				if (!walls.bottomWall) {
					this.rowNum += 1; 	return true;
				}	break;

			default: return undefined;
		}
	}

}


