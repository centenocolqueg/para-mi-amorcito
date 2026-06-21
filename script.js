const ceoHpEl = document.getElementById("ceoHp");
const enemy1HpEl = document.getElementById("enemy1Hp");
const enemy2HpEl = document.getElementById("enemy2Hp");

const ceo = document.getElementById("ceo");
const enemy1 = document.getElementById("enemy1");
const enemy2 = document.getElementById("enemy2");

const message = document.getElementById("message");
const effect = document.getElementById("effect");

const gameOver = document.getElementById("gameOver");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");

let ceoHp = 100;
let enemy1Hp = 100;
let enemy2Hp = 100;
let defending = false;
let gameEnded = false;
let enemyLoop;

function updateUI() {
  ceoHpEl.textContent = Math.max(0, ceoHp);
  enemy1HpEl.textContent = Math.max(0, enemy1Hp);
  enemy2HpEl.textContent = Math.max(0, enemy2Hp);
}

function showEffect() {
  effect.classList.remove("show");
  void effect.offsetWidth;
  effect.classList.add("show");
}

function attack() {
  if (gameEnded) return;

  ceo.classList.add("attack");
  showEffect();

  const target = enemy1Hp > 0 ? enemy1 : enemy2;
  let damage = Math.floor(Math.random() * 12) + 10;

  if (target === enemy1) {
    enemy1Hp -= damage;
    enemy1.classList.add("hit");
    message.textContent = `CEO golpeó a VIRUS -${damage}`;
  } else {
    enemy2Hp -= damage;
    enemy2.classList.add("hit");
    message.textContent = `CEO golpeó a DARK AI -${damage}`;
  }

  setTimeout(() => {
    ceo.classList.remove("attack");
    enemy1.classList.remove("hit");
    enemy2.classList.remove("hit");
  }, 260);

  checkDefeated();
  updateUI();
  checkWinner();
}

function block() {
  if (gameEnded) return;

  defending = true;
  ceo.classList.add("blocking");
  message.textContent = "DEFENSA ACTIVADA 🛡️";

  setTimeout(() => {
    defending = false;
    ceo.classList.remove("blocking");
    if (!gameEnded) message.textContent = "CEO MODE ACTIVADO";
  }, 1200);
}

function power() {
  if (gameEnded) return;

  showEffect();

  const damage = Math.floor(Math.random() * 18) + 22;

  if (enemy1Hp > 0) {
    enemy1Hp -= damage;
    enemy1.classList.add("hit");
  }

  if (enemy2Hp > 0) {
    enemy2Hp -= damage;
    enemy2.classList.add("hit");
  }

  message.textContent = `PODER IA golpeó a los 2 enemigos -${damage}`;

  setTimeout(() => {
    enemy1.classList.remove("hit");
    enemy2.classList.remove("hit");
  }, 300);

  checkDefeated();
  updateUI();
  checkWinner();
}

function enemyAttack() {
  if (gameEnded) return;

  const aliveEnemies = [];
  if (enemy1Hp > 0) aliveEnemies.push("VIRUS");
  if (enemy2Hp > 0) aliveEnemies.push("DARK AI");

  if (aliveEnemies.length === 0) return;

  let damage = Math.floor(Math.random() * 10) + 7;

  if (defending) {
    damage = Math.floor(damage / 3);
    message.textContent = `Bloqueaste el ataque. Daño recibido: ${damage}`;
  } else {
    message.textContent = `${aliveEnemies[0]} atacó al CEO -${damage}`;
    ceo.classList.add("hit");
    setTimeout(() => ceo.classList.remove("hit"), 250);
  }

  ceoHp -= damage;
  updateUI();
  checkWinner();
}

function checkDefeated() {
  if (enemy1Hp <= 0) enemy1.classList.add("defeated");
  if (enemy2Hp <= 0) enemy2.classList.add("defeated");
}

function checkWinner() {
  if (ceoHp <= 0) {
    endGame(false);
    return;
  }

  if (enemy1Hp <= 0 && enemy2Hp <= 0) {
    endGame(true);
  }
}

function endGame(win) {
  gameEnded = true;
  clearInterval(enemyLoop);

  gameOver.style.display = "flex";

  if (win) {
    resultTitle.textContent = "VICTORIA CEO 👑";
    resultText.textContent = "Derrotaste a los dos enemigos con poder IA.";
  } else {
    resultTitle.textContent = "DERROTA";
    resultText.textContent = "El CEO cayó. Reinicia y vuelve más fuerte.";
  }
}

function restartGame() {
  ceoHp = 100;
  enemy1Hp = 100;
  enemy2Hp = 100;
  defending = false;
  gameEnded = false;

  ceo.classList.remove("hit", "attack", "blocking");
  enemy1.classList.remove("hit", "defeated");
  enemy2.classList.remove("hit", "defeated");

  gameOver.style.display = "none";
  message.textContent = "CEO MODE ACTIVADO";

  updateUI();

  clearInterval(enemyLoop);
  enemyLoop = setInterval(enemyAttack, 1500);
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "a") attack();
  if (key === "s") block();
  if (key === "d") power();
});

window.addEventListener("load", () => {
  updateUI();
  enemyLoop = setInterval(enemyAttack, 1500);
});
