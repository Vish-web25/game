const emojis = ['🍕', '🍕', '🍩', '🍩', '🍓', '🍓', '🍇', '🍇', '🍉', '🍉', '🍎', '🍎'];
let shuffled = [];
let flipped = [];
let lockBoard = false;

window.onload = () => {
  const board = document.getElementById("memory-board");
  shuffled = emojis.sort(() => 0.5 - Math.random());

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.innerHTML = `<div class="front">❓</div><div class="back">${emoji}</div>`;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
};

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flipped.push(this);

  if (flipped.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  const isMatch = card1.dataset.emoji === card2.dataset.emoji;

  if (!isMatch) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flipped = [];
  lockBoard = false;

  if (document.querySelectorAll('.flipped').length === emojis.length) {
    setTimeout(() => {
      alert("🎉 You matched all emojis!");
      window.location.reload();
    }, 300);
  }
}
