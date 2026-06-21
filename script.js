const runner = document.getElementById("runner");
const obstacle = document.getElementById("obstacle");
const energy = document.getElementById("energy");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const statusEl = document.getElementById("status");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");
const starsContainer = document.getElementById("stars");

let score = 0;
let level = 1;
let running = false;
let jumping = false;
let speed = 6;
let obstacleX = 900;
let energyX = 1300;
let obstacleTimer;
let gameLoop;

function crearEstrellas() {
  starsContainer.innerHTML = "";

  for (let i = 0; i < 120; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    const size = Math.random() * 2.4 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 70}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    if (Math.random() > 0.75) {
      star.style.background = "#00f7ff";
      star.style.boxShadow = "0 0 10px rgba(0,255,255,0.9)";
    }

    if (Math.random() > 0.9) {
      star.style.background = "#ffd166";
      star.style.boxShadow = "0 0 10px rgba(255,209,102,0.9)";
    }

    starsContainer.appendChild(star);
  }
}

function startGame() {
  score = 0;
  level = 1;
  speed = 6;
  obstacleX = 900;
  energyX = 1300;
  running = true;
  jumping = false;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  statusEl.textContent = "CORRIENDO";

  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";

  obstacle.style.right = "-70px";
  energy.style.right = "-80px";

  clearInterval(gameLoop);

  gameLoop = setInterval(updateGame, 20);
}

function restartGame() {
  startGame();
}

function jump() {
  if (!running || jumping) return;

  jumping = true;
  runner.classList.add("jump");

  setTimeout(() => {
    runner.classList.remove("jump");
    jumping = false;
  }, 720);
}

function boost() {
  if (!running) return;

  statusEl.textContent = "BOOST IA";
  speed += 2;

  setTimeout(() => {
    speed -= 2;
    statusEl.textContent = "CORRIENDO";
  }, 1600);
}

function updateGame() {
  if (!running) return;

  score += 1;

  if (score % 500 === 0) {
    level += 1;
    speed += 0.8;
    levelEl.textContent = level;
  }

  scoreEl.textContent = score;

  obstacleX -= speed;
  energyX -= speed * 0.9;

  if (obstacleX < -80) {
    obstacleX = 900 + Math.random() * 450;
  }

  if (energyX < -80) {
    energyX = 1200 + Math.random() * 700;
  }

  obstacle.style.right = `${900 - obstacleX}px`;
  energy.style.right = `${900 - energyX}px`;

  checkCollision();
  checkEnergy();
}

function checkCollision() {
  const runnerRect = runner.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const hit =
    runnerRect.left < obstacleRect.right - 10 &&
    runnerRect.right > obstacleRect.left + 10 &&
    runnerRect.bottom > obstacleRect.top + 10 &&
    runnerRect.top < obstacleRect.bottom - 10;

  if (hit && !jumping) {
    endGame();
  }
}

function checkEnergy() {
  const runnerRect = runner.getBoundingClientRect();
  const energyRect = energy.getBoundingClientRect();

  const collected =
    runnerRect.left < energyRect.right &&
    runnerRect.right > energyRect.left &&
    runnerRect.bottom > energyRect.top &&
    runnerRect.top < energyRect.bottom;

  if (collected) {
    score += 150;
    statusEl.textContent = "ENERGÍA +150";
    energyX = 1400 + Math.random() * 600;

    setTimeout(() => {
      if (running) statusEl.textContent = "CORRIENDO";
    }, 900);
  }
}

function endGame() {
  running = false;
  clearInterval(gameLoop);

  statusEl.textContent = "CAÍSTE";
  finalScoreEl.textContent = score;
  gameOverScreen.style.display = "flex";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }

  if (e.code === "KeyE") {
    boost();
  }
});

document.addEventListener("touchstart", (e) => {
  const target = e.target.tagName.toLowerCase();
  if (target !== "button" && running) {
    jump();
  }
});

window.addEventListener("load", () => {
  crearEstrellas();
});
