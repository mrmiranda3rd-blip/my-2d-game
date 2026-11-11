console.log("Game connected!");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let playerX = 100;
let playerY = 100;

let coinX = 400;
let coinY = 250;

let enemyX = 600;
let enemyY = 200;

let enemySpeed = 2;
let enemySpeedY = 2;

let score = 0;
let timeLeft = 30;
let lives = 3;
let animationId = null;
let invincibleUntil = 0;

ctx.fillStyle = "green";
ctx.fillRect(playerX, playerY, 50, 50);

let keys = {};

document.addEventListener("keydown", function(event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});
let timerId = null;

function startTimer() {
    clearInterval(timerId);

    timerId = setInterval(function() {
        if (timeLeft > 0 && lives > 0) {
            timeLeft -= 1;
        }

        if (timeLeft === 0 || lives === 0) {
            clearInterval(timerId);
        }
    }, 1000);
}

startTimer();

function gameLoop() {

    if (timeLeft === 0 || lives === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("GAME OVER", 280, 220);

        ctx.font = "25px Arial";
        ctx.fillText("Final Score: " + score, 320, 270);

    return;

    }

    enemyX += enemySpeed;

    if (enemyX <= 0 || enemyX >= canvas.width - 50) {
    enemySpeed = -enemySpeed;
    }

    enemyY += enemySpeedY;

    if (enemyY <= 0 || enemyY >= canvas.height - 50) {
    enemySpeedY = -enemySpeedY;
    }

    if (keys["ArrowRight"]) {
        playerX += 3;
    }

    if (keys["ArrowLeft"]) {
        playerX -= 3;
    }

    if (keys["ArrowDown"]) {
        playerY += 3;
    }

    if (keys["ArrowUp"]) {
        playerY -= 3;
    }

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerY < 0) {
        playerY = 0;
    }

    if (playerX > canvas.width - 50) {
        playerX = canvas.width - 50;
    }

    if (playerY > canvas.height - 50) {
        playerY = canvas.height - 50;
    }

    if (
        playerX < coinX + 20 &&
        playerX + 50 > coinX &&
        playerY < coinY + 20 &&
        playerY + 50 > coinY
    ) {
        score += 1;

        coinX = Math.random() * (canvas.width - 20);
        coinY = Math.random() * (canvas.height - 20);
    }

    if (
    Date.now() >= invincibleUntil &&
    playerX < enemyX + 50 &&
    playerX + 50 > enemyX &&
    playerY < enemyY + 50 &&
    playerY + 50 > enemyY
) {
    lives -= 1;

    playerX = 100;
    playerY = 100;

    invincibleUntil = Date.now() + 1500;
}

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(playerX, playerY, 50, 50);

    ctx.fillStyle = "gold";
    ctx.fillRect(coinX, coinY, 20, 20);

    ctx.fillStyle = "red";
    ctx.fillRect(enemyX, enemyY, 50, 50);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 25);
    ctx.fillText("Time: " + timeLeft, 10, 50);
    ctx.fillText("Lives: " + lives, 10, 75);

    animationId = requestAnimationFrame(gameLoop);
}

gameLoop();


const restartButton = document.getElementById("restartButton");

restartButton.addEventListener("click", function() {
    cancelAnimationFrame(animationId);

    playerX = 100;
    playerY = 100;
    coinX = 400;
    coinY = 250;
    enemyX = 600;
    enemyY = 200;
    enemySpeed = 2;
    enemySpeedY = 2;

    score = 0;
    timeLeft = 30;
    lives = 3;
    invincibleUntil = 0;

    startTimer();
    gameLoop();
});