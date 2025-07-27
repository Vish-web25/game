const boardSize = 10;
let snake = [42];
let direction = 1; // right
let apple = 25;
let interval;
let score = 0;

const board = document.getElementById('snake-board');
const scoreText = document.getElementById('score');

function initBoard() {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

function drawBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.textContent = '');

  snake.forEach(i => cells[i].textContent = '🟩');
  cells[apple].textContent = '🍎';
}

function move() {
  const head = snake[0];
  const next = head + direction;

  // Wall or self collision
  if (
    next < 0 ||
    next >= boardSize * boardSize ||
    (direction === 1 && head % boardSize === boardSize - 1) ||
    (direction === -1 && head % boardSize === 0) ||
    snake.includes(next)
  ) {
    clearInterval(interval);
    alert('💀 Game Over!');
    return;
  }

  snake.unshift(next);

  if (next === apple) {
    score++;
    scoreText.textContent = `Score: ${score} 🐍`;
    generateApple();
  } else {
    snake.pop();
  }

  drawBoard();
}

function generateApple() {
  do {
    apple = Math.floor(Math.random() * boardSize * boardSize);
  } while (snake.includes(apple));
}

function changeDirection(e) {
  if (e.key === 'ArrowUp' && direction !== boardSize) direction = -boardSize;
  else if (e.key === 'ArrowDown' && direction !== -boardSize) direction = boardSize;
  else if (e.key === 'ArrowLeft' && direction !== 1) direction = -1;
  else if (e.key === 'ArrowRight' && direction !== -1) direction = 1;
}

function startGame() {
  snake = [42];
  direction = 1;
  score = 0;
  generateApple();
  drawBoard();
  interval = setInterval(move, 250);
}

window.onload = () => {
  initBoard();
  drawBoard();
  document.addEventListener('keydown', changeDirection);
  document.getElementById('restart').addEventListener('click', () => {
    clearInterval(interval);
    startGame();
  });
  startGame();
};
