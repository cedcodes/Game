export default class Player {
  constructor(maze){
    this.maze = maze
    this.ctx = maze.ctx;
		this.width = maze.cellWidth;
		this.height = maze.cellHeight;
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

}


