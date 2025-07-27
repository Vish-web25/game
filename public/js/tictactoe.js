let currentPlayer = '❌';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `🎉 ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== '')) {
    statusText.textContent = "🤝 It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
  statusText.textContent = `Turn: ${currentPlayer}`;
}

function checkWin() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '❌';
  gameActive = true;
  statusText.textContent = `Turn: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

window.onload = () => {
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
  });
  statusText.textContent = `Turn: ${currentPlayer}`;
};
