const options = ['🪨', '📄', '✂️'];
const resultText = document.getElementById("result");
const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");

function play(player) {
  const computer = options[Math.floor(Math.random() * 3)];

  playerChoice.textContent = `👤 You: ${options[player]}`;
  computerChoice.textContent = `🤖 Bot: ${computer}`;

  const result = getResult(options[player], computer);
  resultText.textContent = result;
  resultText.className = "result show";
}

function getResult(p, c) {
  if (p === c) return "😐 It's a draw!";
  if ((p === '🪨' && c === '✂️') || (p === '📄' && c === '🪨') || (p === '✂️' && c === '📄')) {
    return "🎉 You win!";
  }
  return "💀 You lose!";
}
