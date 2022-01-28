export default class Cell {
  constructor(ctx, rowNum, colNum, width, height) {
    this.ctx = ctx;
    this.rowNum = rowNum;
    this.colNum = colNum;

    this.width = width;
    this.height = height;

    this.xCoord = this.colNum * this.width;
    this.yCoord = this.rowNum * this.height;

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
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'black';
    this.ctx.lineWidth = '2';
    if (this.walls.topWall) this._drawTopWall(this.xCoord, this.yCoord);
    if (this.walls.rightWall) this._drawRightWall(this.xCoord, this.yCoord);
    if (this.walls.bottomWall) this._drawBottomWall(this.xCoord, this.yCoord);
    if (this.walls.leftWall) this._drawLeftWall(this.xCoord, this.yCoord);
  }
  _drawTopWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCoord, this.yCoord);
    this.ctx.lineTo(this.xCoord + this.width, this.yCoord);
    this.ctx.stroke();
  }
  _drawBottomWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCoord, this.yCoord + this.height);
    this.ctx.lineTo(this.xCoord + this.width, this.yCoord + this.height);
    this.ctx.stroke();
  }
  _drawLeftWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCoord, this.yCoord);
    this.ctx.lineTo(this.xCoord, this.yCoord + this.height);
    this.ctx.stroke();
  }
  _drawRightWall() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCoord + this.width, this.yCoord);
    this.ctx.lineTo(this.xCoord + this.width, this.yCoord + this.height);
    this.ctx.stroke();
  }
  _removeWall(nextCell) {
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
  }
  // Check next cell to visit
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
  }
}
