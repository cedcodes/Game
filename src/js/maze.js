import Cell from './cell.js';

let maze = document.querySelector('canvas');

// let ctx = maze.getContext('2d');

let current;

export default class Maze {
  // initialize maze
  // constructor(size, rows, columns) {
  constructor(ctx, width, height, rows, columns) {
    // this.size = size;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.columns = columns;

    this.cellWidth = width / columns;
    this.cellHeight = height / rows;

    // creates 2D array
    // Store individual arrays
    this.grid = [];
    // push pop
    this.stack = [];
  }
  // Methods

  // Draw the Grid
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

    current = this.grid[0][0]; //Start of the path

    this._draw();
  }
  // DrawMap
  _draw() {
    maze.width = this.width;
    maze.height = this.height;
    maze.style.background = 'black';
    current.visited = true;

    this.grid.forEach((row) => row.forEach((col) => col._draw()));

    // for (let r = 0; r < this.rows; r++) {
    //   for (let c = 0; c < this.columns; c++) {
    //     let grid = this.grid;
    //     grid[r][c]._drawCell(this.size, this.rows, this.columns);
    //   }
    // }

    let next = current._checkNeighbors(this.grid);
    if (next) {
      next.visited = true;
      this.stack.push(current);
      // current._highlight(this.columns);

      current._removeWall(current, next);

      current = next;
    } else if (this.stack.length > 0) {
      current = this.stack.pop();

      // current._highlight(this.columns);
    }

    // this.gridLastColumn = this.grid[0].length - 1;

    window.requestAnimationFrame(() => {
      this._draw();
    });
  }
}
