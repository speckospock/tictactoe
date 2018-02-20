const makeTile = el => {
  if (el < 0) return 'O';
  if (el > 0) return 'X';
  return ' ';
};

const createRow = row => `|${makeTile(row[0])}|${makeTile(row[1])}|${makeTile(row[2])}|\n`;

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

const initialBoard = () => ([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);

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

const handleMove = createMoveHandler();

const sum = (a, b) => a + b;

const checkRow = row => {
  let total = row.reduce(sum, 0);
  if (total === -3) return -1; //player 2 wins
  if (total === 3) return 1; //player 1 wins
  return 0; //nobody wins yet
}

const checkRows = board => board.map(row => checkRow(row)).reduce(sum, 0);

const checkCols = board => {
  let cols = board.reduce((newBoard, row, r) => {
    row.forEach((col, c) => {
      newBoard[c][r] = col;
    })
    return newBoard;
  }, ([[],[],[]]));
  return checkRows(cols);
};

const checkDiag = board => {
  let majDiag = [board[0][0], board[1][1], board[2][2]];
  let minDiag = [board[0][2], board[1][1], board[2][0]];
  return checkRows([majDiag, minDiag]);
}

const checkWinner = board => {
  let rCheck = checkRows(board);
  if (rCheck) return rCheck;
  let cCheck = checkCols(board);
  if (cCheck) return cCheck;
  let dCheck = checkDiag(board);
  return dCheck;
}

const play = (board = initialBoard()) => {
  createBoard(board);
  return board;
}

const ticTacToe = () => {
  let gameBoard = initialBoard();
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