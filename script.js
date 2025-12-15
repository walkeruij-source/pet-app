// ===== TELEGRAM =====
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ===== DOM =====
const petImg = document.getElementById("petImg");
const bubble = document.getElementById("bubble");
const coinsEl = document.getElementById("coins");
const dayEl = document.getElementById("day");

// ===== СОСТОЯНИЕ ПИТОМЦА =====
let pet = {
  name: "Бублик",
  hunger: 70,
  clean: 80,
  mood: 90,
  coins: 0,
  day: 1
};

// ===== ОГРАНИЧЕНИЯ =====
function clamp(v) {
  return Math.max(0, Math.min(100, v));
}

// ===== ОБНОВЛЕНИЕ UI =====
function updateUI(text) {
  bubble.textContent = text;
  coinsEl.textContent = pet.coins + " 🟊";
  dayEl.textContent = pet.day;
}

// ===== МОРГАНИЕ =====
let blinking = false;

function blink() {
  if (blinking) return;
  blinking = true;

  petImg.src = "assets/dog_closed.png";

  setTimeout(() => {
    petImg.src = "assets/dog_open.png";
    blinking = false;
  }, 120);
}

setInterval(blink, 3500);

// ===== ДЕЙСТВИЯ =====
function feed() {
  pet.hunger = clamp(pet.hunger + 20);
  pet.mood = clamp(pet.mood + 5);
  updateUI("Бублик поел 🐾");
}

function wash() {
  pet.clean = clamp(pet.clean + 25);
  updateUI("Бублик чистый ✨");
}

function play() {
  pet.mood = clamp(pet.mood + 15);
  pet.hunger = clamp(pet.hunger - 10);
  updateUI("Бублик счастлив 🎾");
}

function sleep() {
  pet.day += 1;
  pet.hunger = clamp(pet.hunger - 15);
  pet.mood = clamp(pet.mood + 5);
  pet.coins += 5;
  updateUI("Новый день 🌅");
}

// ===== КНОПКИ =====
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "feed") feed();
    if (action === "wash") wash();
    if (action === "play") play();
    if (action === "sleep") sleep();
  });
});

// ===== СТАРТ =====
updateUI("Бублик рад тебя видеть 🐶");
