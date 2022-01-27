// let maze = document.querySelector('canvas');

// let ctx = maze.getContext('2d');

export default class Cell {
  constructor(ctx, rowNum, colNum, width, height) {
    this.ctx;
    this.rowNum = rowNum;
    this.colNum = colNum;

    this.width = width;
    this.height = height;

    this.xCoord = this.colNum * this.width;
    this.yCoord = this.rowNum * this.height;

    // this.parentGrid = parentGrid;
    // this.parentSize = parentSize;

    // Path
    this.visited = false;
    //walls
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true,
    };
  }
  _drawCell() {
    // let x = (this.colNum * size) / columns;
    // let y = (this.rowNum * size) / rows;
    // initialize color of the strokes
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = '2';
    ctx;
    if (this.walls.topWall) this._drawTopWall(this.xCoord, this.yCoord);
    if (this.walls.rightWall) this._drawRightWall(this.xCoord, this.yCoord);
    if (this.walls.bottomWall) this._drawBottomWall(this.xCoord, this.yCoord);
    if (this.walls.leftWall) this._drawLeftWall(this.xCoord, this.yCoord);
    // if (this.visited) {
    //   ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
    // }
  }
  _drawTopWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCord, this.yCord);
    this.ctx.lineTo(this.xCord + this.width, this.yCord);
    this.ctx.stroke();
  }
  _drawBottomWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCord, this.yCord + this.height);
    this.ctx.lineTo(this.xCord + this.width, this.yCord + this.height);
    this.ctx.stroke();
  }
  _drawLeftWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCord, this.yCord);
    this.ctx.lineTo(this.xCord, this.yCord + this.height);
    this.ctx.stroke();
  }
  _drawRightWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCord + this.width, this.yCord);
    this.ctx.lineTo(this.xCord + this.width, this.yCord + this.height);
    this.ctx.stroke();
  }
  _removeWall(cell1, cell2, nextCell) {
    let columnDiff = nextCell.colNum - this.colNum;
    let rowDiff = nextCell.rowNum - this.rowNum;

    switch (columnDiff) {
      case 1:
        this.walls.rightWall = false;
        nextCell.walls.leftWall = false;
        break;
      case -1:
        this.walls.leftWall = false;
        nextCell.walls.rightWall = false;
    }

    switch (rowDiff) {
      case 1:
        this.walls.bottomWall = false;
        nextCell.walls.topWall = false;
        break;
      case -1:
        this.walls.topWall = false;
        nextCell.walls.bottomWall = false;
    }

    // // compare cell on x axis
    // let x = cell1.colNum - cell2.colNum;
    // if (x === 1) {
    //   cell1.walls.leftWall = false;
    //   cell2.walls.rightWall = false;
    // } else if (x === -1) {
    //   cell1.walls.rightWall = false;
    //   cell2.walls.leftWall = false;
    // }
    // // compare cell on y axis
    // let y = cell1.rowNum - cell2.rowNum;
    // if (y === 1) {
    //   cell1.walls.topWall = false;
    //   cell2.walls.bottomWall = false;
    // } else if (y === -1) {
    //   cell1.walls.bottomWall = false;
    //   cell2.walls.topWall = false;
    // }
  }
  _checkNeighbors(grid) {
    let topNeighbor =
      this.rowNum !== 0 ? grid[this.rowNum - 1][this.colNum] : undefined;

    let bottomNeighbor =
      this.rowNum !== grid.length - 1
        ? grid[this.rowNum + 1][this.colNum]
        : undefined;

    let leftNeighbor =
      this.colNum !== 0 ? grid[this.rowNum][this.colNum - 1] : undefined;

    let rightNeighbor =
      this.colNum !== grid[0].length - 1
        ? grid[this.rowNum][this.colNum + 1]
        : undefined;

    let unVisited = [];

    if (topNeighbor && !topNeighbor.visited) unVisited.push(topNeighbor);
    if (bottomNeighbor && !bottomNeighbor.visited)
      unVisited.push(bottomNeighbor);
    if (leftNeighbor && !leftNeighbor.visited) unVisited.push(leftNeighbor);
    if (rightNeighbor && !rightNeighbor.visited) unVisited.push(rightNeighbor);

    if (unVisited.length !== 0)
      return unVisited[Math.floor(Math.random() * unVisited.length)];
    else return undefined;

    // let grid = this.parentGrid;
    // let row = this.rowNum;
    // let col = this.colNum;
    // let neighbors = [];

    // // Side area of canvas will return undefined to
    // // side area out of grid scope
    // // Push all available neighbors to the neightbours array
    // let top = row !== 0 ? grid[row - 1][col] : undefined;
    // let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
    // let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
    // let left = col !== 0 ? grid[row][col - 1] : undefined;
    // if (top && !top.visited) neighbors.push(top);
    // if (right && !right.visited) neighbors.push(right);
    // if (bottom && !bottom.visited) neighbors.push(bottom);
    // if (left && !left.visited) neighbors.push(left);

    // if (neighbors.length != 0) {
    //   let random = Math.floor(Math.random() * neighbors.length);
    //   return neighbors[random];
    // } else {
    //   return undefined;
    // }
  }

  // _drawTopWall(x, y, size, rows, columns) {
  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x + size / columns, y);
  //   ctx.stroke();
  // }
  // _drawRightWall(x, y, size, rows, columns) {
  //   ctx.beginPath();
  //   ctx.moveTo(x + size / columns, y);
  //   ctx.lineTo(x + size / columns, y + size / rows);
  //   ctx.stroke();
  // }

  // _drawBottomWall(x, y, size, rows, columns) {
  //   ctx.beginPath();
  //   ctx.moveTo(x, y + size / rows);
  //   ctx.lineTo(x + size / columns, y + size / rows);
  //   ctx.stroke();
  // }
  // _drawLeftWall(x, y, size, rows, columns) {
  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x, y + size / rows);
  //   ctx.stroke();
  // }
  // Function that draw the cells in the canvas

  // _highlight(columns) {
  //   let x = (this.colNum * this.parentSize) / columns + 1;
  //   let y = (this.rowNum * this.parentSize) / columns + 1;

  //   // ctx.fillStyle = 'green'; //Color of visited color
  //   ctx.fillRect(
  //     x,
  //     y,
  //     this.parentSize / columns - 3,
  //     this.parentSize / columns - 3
  //   );
  // }
}
