import Maze from './maze.js';
const maze = document.querySelector('canvas');
const ctx = maze.getContext('2d');
let Width, Height;
let NEWMAZE // Maze generation

// User defined colNum and rowNum
// Define row and column CustomGrid Number
let CustomGrid = document.querySelectorAll('#rows, #columns');
let CustomRow = CustomGrid[0].value;
let CustomColumn = CustomGrid[1].value;

// ******************** SET MAZE COLUMN & ROW SIZES *****************************//
let btnChange = document.querySelector('#button');

btnChange.addEventListener('click', (e) => {
  e.preventDefault();
  // if either of #rows and #columns has changed
  if (
    CustomGrid[0].value !== CustomRow ||
    CustomGrid[1].value !== CustomColumn
  ) {
    resetRowCol();
    initiate();
  }
});

// ******************** GLOBAL FUNCTIONS ****************************************//
function setCanvasSize() {
  if (window.innerWidth >= 650) {
    Width = 600;
    Height = 600;
  } else if (450 <= window.innerWidth && window.innerWidth < 650) {
    Width = window.innerWidth - 10;
    Height = 500;
  } else {
    Width = window.innerWidth - 10;
    Height = 460;
  }
}

function resetRowCol() {
  CustomRow = CustomGrid[0].value;
  CustomColumn = CustomGrid[1].value;
}

function initiate() {
 NEWMAZE = new Maze(ctx, Width, Height, CustomRow, CustomColumn);
  NEWMAZE._setup();
  listenMoves();

}

setCanvasSize();
initiate();

// ******************* MOVE EVENTS *************************************************//

function listenMoves() {
	window.addEventListener('keydown', handleKeyDown);
}
function handleKeyDown(evt) {
	let Player = NEWMAZE.player;
	Player._move({ keyCode: evt.keyCode });
  checkCompletion()
}

// ******************* COMPLETION *************************************************//

let gameComplete =document.querySelector('.complete')
let gameCompleteText = document.querySelector('.complete h2')
let btnRestart = document.querySelector('.restart')

function checkCompletion() {
	let Player = NEWMAZE.player;
	let reachedCol = Player.colNum === NEWMAZE.goal.colNum;
	let reachedRow = Player.rowNum === NEWMAZE.goal.rowNum;

	if (reachedRow && reachedCol) {
		mazeComplete();
	}
}
// Complete Maze
function mazeComplete() {
	let Player = NEWMAZE.player;
  gameCompleteText.innerHTML=`You assisted Zoro by taking ${Player.stepCount-1} steps.`

  gameComplete.classList.add('show')

  btnRestart.addEventListener('click', restartMaze)
}

// Restart Maze

function restartMaze(){
initiate()
gameComplete.classList.remove('show')
gameCompleteText.innerHTML=``
btnRestart.removeEventListener('click', restartMaze)


}