//Fills in a square with the appropriate symbol
const makeTile = el => {
  if (el < 0) return 'O';
  if (el > 0) return 'X';
  return ' ';
};

//Creates a row of the game as a string to display
const createRow = row => `|${makeTile(row[0])}|${makeTile(row[1])}|${makeTile(row[2])}|\n`;

//Creates a game board as a string to display
const createBoard = boardArr => {
  let fillRow = `-------\n`;
  let board = fillRow;
  boardArr.forEach(row => {
    board += createRow(row);
    board += fillRow;
  });
  console.log(board);
  console.log('Make a move in the format \'row,col\':');
  return board;
};

//Returns an initial board state array
const initialBoard = () => ([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);

//Factory for a move handler function which keeps track of the current player
const createMoveHandler = () => {
  let player = 1;
  return (move, board) => {
    let r = move[0];
    let c = move[2];
    if (r >= 0 && r <= 2 && c >= 0 && c <= 2) {
      board[r][c] = player;
      player = (player > 0) ? -1 : 1;
    }
    return board;
  }
}

//Create a move handler with the factory
const handleMove = createMoveHandler();

//Used as a reducer later, gets sum of an array
const sum = (a, b) => a + b;

//Checks a row of the game for a winner
const checkRow = row => {
  let total = row.reduce(sum, 0);
  if (total === -3) return -1; //player 2 wins
  if (total === 3) return 1; //player 1 wins
  return 0; //nobody wins yet
}

//Checks all rows of the game for a winner
const checkRows = board => board.map(row => checkRow(row)).reduce(sum, 0);

//Converts cols => rows, then checks for a winner
const checkCols = board => {
  let cols = board.reduce((newBoard, row, r) => {
    row.forEach((col, c) => {
      newBoard[c][r] = col;
    })
    return newBoard;
  }, ([[],[],[]]));
  return checkRows(cols);
};

//Converts diagonals => rows, then checks for a winner
const checkDiag = board => {
  let majDiag = [board[0][0], board[1][1], board[2][2]];
  let minDiag = [board[0][2], board[1][1], board[2][0]];
  return checkRows([majDiag, minDiag]);
}

//Checks rows, columns, and diags for a winner
const checkWinner = board => {
  let rCheck = checkRows(board);
  if (rCheck) return rCheck;
  let cCheck = checkCols(board);
  if (cCheck) return cCheck;
  let dCheck = checkDiag(board);
  return dCheck;
}

//Starts the game
const play = (board = initialBoard()) => {
  createBoard(board);
  return board;
}

//Main function
const ticTacToe = () => {
  let gameBoard = initialBoard();
  //On user input, re-render the game and check for winners
  process.stdin.on('data', (data) => {
    let move = data.toString().trim();
    gameBoard = handleMove(move, gameBoard);
    let winner = checkWinner(gameBoard);
    createBoard(gameBoard);
    if (winner) {
      console.log(`Winner is: ${(winner > 0) ? 'Player 1' : 'Player 2'}`);
      process.exit();
    }
  });
  let board = play(gameBoard);
};

ticTacToe();