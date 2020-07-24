/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let x = 0 ; x < HEIGHT ; x++){
    board.push(Array.from({length:WIDTH}));
  };
};

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");

  // TODO: create top row which includes head cells.
   //* create top row
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  //* create head cells for the top row
  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: create the others rows of the board
  //* create others rows includes cells
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0 ; y--){
    if (!board[y][x]){
      return y;
    }
  }
  return null;
};

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.style.top = `${ - 50 * (y + 2)}px`; 
  piece.setAttribute('class',`piece p${currPlayer}`);    
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  setTimeout(alert, 2000);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {    
    return endGame(`Player ${currPlayer} won!`);
  } 

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('This is end!')
  }
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //* to check every spot have the same color , if it true then alert which player win.
    return cells.every( 
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) { //* loop over rows 
    for (var x = 0; x < WIDTH; x++) { //* loop over cells in each row
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //* check horizontally 4 spot have the same color 
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //* check verizontally 4 spot have the same color 
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //* check if there are same colors on the same line 
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //* check if there are same colors on the same line 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //* if one of the conditions is true, then execute checkForWin() function
        return true;
      }
    }
  }
}





makeBoard();
makeHtmlBoard();
