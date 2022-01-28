import Cell from './cell.js';

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
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        // create a cell
        let cell = new Cell(this.ctx, r, c, this.cellWidth, this.cellHeight);
        row.push(cell);
      }
      this.grid.push(row);
    }

    this.current = this.grid[0][0]; //Start of the path

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
    } else if (this.stack.length > 0) {
      this.current = this.stack.pop();
    }

    window.requestAnimationFrame(() => {
      this._draw();
    });
  }
}
