
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

let player = {
  x: 100,
  y: 400,
  width: 40,
  height: 40,
  color: "orange",
  speed: 4,
  bullets: [],
  hp: 100
};

let enemies = [];
let spawnTimer = 0;

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function updatePlayer() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
}

function shoot() {
  player.bullets.push({
    x: player.x + player.width,
    y: player.y + player.height / 2 - 5,
    width: 15,
    height: 5,
    color: "yellow"
  });
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") shoot();
});

function spawnEnemy() {
  enemies.push({
    x: 960,
    y: Math.random() * 500,
    width: 40,
    height: 40,
    color: "red",
    speed: 2
  });
}

function updateBullets() {
  player.bullets.forEach((b, i) => {
    b.x += 7;
    drawRect(b);
    enemies.forEach(enemy => {
      if (
        b.x < enemy.x + enemy.width &&
        b.x + b.width > enemy.x &&
        b.y < enemy.y + enemy.height &&
        b.y + b.height > enemy.y
      ) {
        enemy.hit = true;
        player.bullets.splice(i, 1);
      }
    });
  });
}

function updateEnemies() {
  enemies.forEach((enemy, i) => {
    enemy.x -= enemy.speed;
    if (enemy.hit || enemy.x < -enemy.width) enemies.splice(i, 1);
    else drawRect(enemy);
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer();
  drawRect(player);
  updateBullets();
  updateEnemies();

  spawnTimer++;
  if (spawnTimer > 100) {
    spawnEnemy();
    spawnTimer = 0;
  }

  requestAnimationFrame(update);
}

update();
