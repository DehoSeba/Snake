//variables
let score = 0;
let canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
const snake = { x: 200, y: 200, w: 10, h: 10, speed: 5 };

//draw board
function drawBoard() {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, 400, 400);
  ctx.save();
}
//create snake
function drawSnake() {
  ctx.fillStyle = "green";
  ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
}
//create fruits

//create score
function drawScore() {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillText(`Score: ${score}`, 0, 10);
}
//detect if i press a movement key
function keyDownHandler() {
  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        downPressed = true;
        break;
      case "KeyW":
      case "ArrowUp":
        upPressed = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        leftPressed = true;
        break;
      case "KeyD":
      case "ArrowRight":
        rightPressed = true;
        break;
    }
  });
}
//detect if i released a movement key
function keyUpHandler() {
  window.addEventListener("keyup", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    switch (event.code) {
      case "KeyS":
      case "ArrowDown":
        downPressed = false;
        break;
      case "KeyW":
      case "ArrowUp":
        upPressed = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        leftPressed = false;
        break;
      case "KeyD":
      case "ArrowRight":
        rightPressed = false;
        break;
    }
  });
}
//move snake

function move() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (rightPressed) {
    snake.y -= snake.speed;
  }
  if (downPressed) {
    snake.y += snake.speed;
  }
  if (rightPressed) {
    snake.x += snake.speed;
  }
  if (leftPressed) {
    snake.x -= snake.speed;
  }
  drawBoard();
  drawScore();
  drawSnake();
  drawFruit();
  requestAnimationFrame(move);
}
//make snake always moving
/*while moving 
if moving left -> keep moving left
if moving right -> keep moving right
if moving up -> keep moving up 
if moving down -> keep moving up */

//random fruits appearing and detect if snake ate it then repop another one
let fruit = { x: 100, y: 100, w: 10, h: 10, speed: 5 };
let hasEaten = Boolean;
function ateFruit() {
    
  if (fruit.x && fruit.y === snake.x && snake.y) {
    hasEaten = true;
    score++;
  } else {
    hasEaten = false;
  }
}
function drawFruit(){
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(fruit.x, fruit.y, fruit.h, fruit.w);
}
//eating fruits grow snake and score

//detect colision

//game loop

//main
function main() {
  drawBoard();
  drawScore();
  drawSnake();
  keyDownHandler();
  keyUpHandler();
  ateFruit();
  move();
}
