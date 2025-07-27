const quizData = [
  {
    question: "🧠 What is the capital of France?",
    options: ["🇮🇹 Rome", "🇩🇪 Berlin", "🇫🇷 Paris", "🇪🇸 Madrid"],
    answer: "🇫🇷 Paris"
  },
  {
    question: "🔢 What is 5 × 6?",
    options: ["30", "11", "56", "25"],
    answer: "30"
  },
  {
    question: "🌍 Which planet is known as the Red Planet?",
    options: ["🪐 Saturn", "🌍 Earth", "☀️ Sun", "🔴 Mars"],
    answer: "🔴 Mars"
  },
  {
    question: "🐶 Which animal barks?",
    options: ["🐱 Cat", "🐶 Dog", "🐮 Cow", "🐘 Elephant"],
    answer: "🐶 Dog"
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");

function loadQuiz() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => checkAnswer(option);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = quizData[current].answer;
  if (selected === correct) {
    score++;
  }

  current++;
  if (current < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = `🎉 You scored ${score}/${quizData.length}`;
  optionsEl.innerHTML = `<button onclick="restart()">🔁 Try Again</button>`;
}

function restart() {
  current = 0;
  score = 0;
  loadQuiz();
}

window.onload = loadQuiz;
