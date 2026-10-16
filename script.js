const grid = document.getElementById("grid");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
const restartBtn = document.getElementById("restart");

// 12 Çift (Toplam 24 Kart) için genişletilmiş ikon listesi
const items = [
  "⚡",
  "☁️",
  "❄️",
  "🌙",
  "🌊",
  "🔥",
  "⭐",
  "☀️",
  "🍄",
  "🦋",
  "🍀",
  "🍓",
];

let cards = [];
let flippedCards = [];
let moves = 0;
let time = 0;
let timer = null;
let matchedCount = 0;

function init() {
  grid.innerHTML = "";
  moves = 0;
  time = 0;
  matchedCount = 0;
  movesEl.textContent = moves;
  timeEl.textContent = time + "s";
  flippedCards = [];
  clearInterval(timer);
  timer = null;

  cards = [...items, ...items].sort(() => Math.random() - 0.5);

  cards.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.item = item;

    card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">${item}</div>
        `;

    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  });
}

function flipCard() {
  if (
    flippedCards.length === 2 ||
    this.classList.contains("flipped") ||
    this.classList.contains("matched")
  )
    return;

  if (!timer) {
    timer = setInterval(() => {
      time++;
      timeEl.textContent = time + "s";
    }, 1000);
  }

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.item === card2.dataset.item) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCount += 2;
    flippedCards = [];

    if (matchedCount === cards.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert(`Harika! Oyunu ${moves} hamlede ve ${time} saniyede bitirdin.`);
      }, 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

restartBtn.addEventListener("click", init);
init();
