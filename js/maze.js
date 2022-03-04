import Cell from './cell.js';
import Player from './player.js'

export default class Maze {
  constructor(ctx, width, height, rows, columns) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.columns = columns;

    this.cellWidth = width / columns;
    this.cellHeight = height / rows;

    this.grid = []; //Store individual cells
    this.stack = []; //Push each cell(visited) to track previous steps
  }
  // Grid define
  _setup() {
    for (let rowNum = 0; rowNum < this.rows; rowNum++) {
      let row = [];
      for (let colNum = 0; colNum < this.columns; colNum++) {
        // create a cell
        let cell = new Cell(this.ctx, rowNum, colNum, this.cellWidth, this.cellHeight);
        row.push(cell);
      }
      this.grid.push(row);
    }
		// will be used to place player diagonally opposite to goal
		this.gridLastRow = this.grid.length - 1;
		this.gridLastColumn = this.grid[0].length - 1;


		this.player = new Player(this);

    this.current = this._startPoint(); //Start of the path

    this._draw();
  }
  _draw() {
    let maze = document.querySelector('canvas');

    maze.width = this.width;
    maze.height = this.height;

    maze.style.background = 'black';
    this.current.visited = true;
    
    this.grid.forEach((row) => row.forEach((col) => col._drawCell()));
    
    let nextCell = this.current._checkNeighbors(this.grid);
    if (nextCell) {
      nextCell.visited = true;
      
      this.stack.push(this.current);
      this.current._removeWall(nextCell);
      this.current = nextCell;
    }
     else if (this.stack.length > 0) {
      this.current = this.stack.pop();
    }
    if (this.stack.length === 0) {
			this.goal = this.current;
			this._drawGoal(this.goal);
      this.player._setPlayer();



			return;
		}
		
    window.requestAnimationFrame(() => {
      this._draw();
    });
  }
  _startPoint() {
    let corners = [this.grid[0][0], this.grid[this.gridLastRow][0], this.grid[0][this.gridLastColumn],
    this.grid[this.gridLastRow][this.gridLastColumn]];
  
    return corners[Math.floor(Math.random() * 4)];
  }

	_drawGoal(goal) {
		let boat = new Image();

	  boat.width = goal.width * 1;			// scale boat inside goal cell
		boat.height = goal.height * 1;

		// adjust boat position according to its size
		boat.xPos = goal.xCoord - boat.width/50;
		boat.yPos = goal.yCoord - boat.height/50

		boat.onload = ()=> goal.ctx.drawImage(boat, boat.xPos, boat.yPos, boat.width, boat.height);
		boat.src = "./images/goal.png";
	}
}
