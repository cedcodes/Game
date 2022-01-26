import Cell from './cell.js';

let maze = document.querySelector('canvas');

let ctx = maze.getContext('2d');

let current;
export default class Maze {
  // initialize maze
  constructor(size, rows, columns) {
    this.size = size;
    this.rows = rows;
    this.columns = columns;

    // creates 2D array
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
        let cell = new Cell(r, c, this.grid, this.size);
        row.push(cell);
      }
      this.grid.push(row);
    }
    current = this.grid[0][0]; //Start of the path

    this._draw();
  }
  _draw() {
    maze.width = this.size;
    maze.height = this.size;
    maze.style.background = 'black';
    current.visited = true;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let grid = this.grid;
        grid[r][c]._show(this.size, this.rows, this.columns);
      }
    }
    let next = current._checkNeighbors();
    if (next) {
      next.visited = true;
      this.stack.push(current);
      current._highlight(this.columns);

      current._removeWall(current, next);

      current = next;
    } else if (this.stack.length > 0) {
      let cell = this.stack.pop();
      current = cell;
      current._highlight(this.columns);
    }
    if (this.stack.length === 0) {
      this._drawGoal(this.goal);
    }
    window.requestAnimationFrame(() => {
      this._draw();
    });
  }
  _drawGoal(goal) {}
}
