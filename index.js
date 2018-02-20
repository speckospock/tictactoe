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

const play = (board = initialBoard()) => {
  createBoard(board);
  return board;
}

const ticTacToe = () => {
  let gameBoard = initialBoard();
  process.stdin.on('data', (data) => {
    let move = data.toString().trim();
    gameBoard = handleMove(move, gameBoard);
    createBoard(gameBoard);
  });
  let board = play(gameBoard);
};

ticTacToe();