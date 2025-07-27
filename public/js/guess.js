let secretNumber;
let attempts;

function initGame() {
  secretNumber = Math.floor(Math.random() * 20) + 1; // 1–20
  attempts = 5;
  document.getElementById("message").textContent = "🤔 Guess a number between 1 and 20";
  document.getElementById("attempts").textContent = `🧪 Attempts Left: ${attempts}`;
  document.getElementById("input").value = "";
}

function checkGuess() {
  const input = document.getElementById("input");
  const guess = Number(input.value);
  const message = document.getElementById("message");
  const attemptsEl = document.getElementById("attempts");

  if (!guess || guess < 1 || guess > 20) {
    message.textContent = "⚠️ Enter a number between 1 and 20!";
    return;
  }

  attempts--;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}`;
    message.style.color = "green";
    disableInput();
  } else if (attempts === 0) {
    message.textContent = `💀 Out of attempts! The number was ${secretNumber}`;
    message.style.color = "red";
    disableInput();
  } else {
    message.textContent = guess > secretNumber ? "📉 Too high!" : "📈 Too low!";
    attemptsEl.textContent = `🧪 Attempts Left: ${attempts}`;
    input.value = "";
  }
}

function disableInput() {
  document.getElementById("input").disabled = true;
  document.getElementById("submit").disabled = true;
}

function restartGame() {
  initGame();
  document.getElementById("input").disabled = false;
  document.getElementById("submit").disabled = false;
  document.getElementById("message").style.color = "#000";
}

window.onload = initGame;
