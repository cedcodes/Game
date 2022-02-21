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
}

setCanvasSize();
initiate();
