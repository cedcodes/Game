export default class Player {
  constructor(maze){
    this.maze = maze
    this.ctx = maze.ctx
    this.width= maze.cellWidth
    this.height = maze.cellHeight

  }

 _drawPlayer() {
  //  Coordinates of the player
   this.xCord = this.colnum * this.width
   this.yCord = this.rowNum * this.height

   let image = new Image()

   image.height = this.height*1.5 // Scale image inside a cell
   image.yPos= this.yCord - image.height/6 // adjust vertical pos according to mouse's height
 }
}
