
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
  return board;
};

const initialBoard = () => ([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);

const ticTacToe = () => {
  let board = createBoard(initialBoard());
  console.log(board);
};

ticTacToe();