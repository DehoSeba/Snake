//VARIABLES//
let score = 0;
let itemScale = 10;
let background = "rgb(0, 0, 0)";
let snakeColor = "rgb(255, 255, 255)";
let fruitColor = "rgb(240, 0, 32)";
let canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
let displayScore = document.getElementById("score");
let reset = document.getElementById("restart"); //restart button
reset.addEventListener("click", restart);
let direction = "right";  
let lost = false;
let snake = [
  { x: 200, y: 200 },
  { x: 200, y: 190 },
  { x: 200, y: 180 },
];
let snakeHead = snake[0];
let snakeSpeed = 2;
let fruit = {
  x: Math.floor(Math.random() * canvas.width), //random fruit pos
  y: Math.floor(Math.random() * canvas.height),
};
//////////////////////////////////////////////////////////////////////////
//FUNCTIONS//
//Draw my board//
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; // Grid color
  ctx.lineWidth = 1;
// Draw vertical lines
// for (let x = 0; x < canvas.width; x += itemScale) {
//   ctx.beginPath();
//   ctx.moveTo(x, 0);
//   ctx.lineTo(x, canvas.height);
//   ctx.stroke();
// }

// Draw horizontal lines
// for (let y = 0; y < canvas.height; y += itemScale) {
//   ctx.beginPath();
//   ctx.moveTo(0, y);
//   ctx.lineTo(canvas.width, y);
//   ctx.stroke();
// }
}
//Snake init//
function drawSnake() {
  ctx.fillStyle = snakeColor;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, itemScale, itemScale);
    ctx.strokeRect(snakePart.x, snakePart.y, itemScale, itemScale);
  });
}
//Create Score//
function drawScore() {
  displayScore.innerHTML = `Score : ${score}`;
}
//Draw fruits
function drawFruit() {
  ctx.fillStyle = fruitColor;
  ctx.fillRect(fruit.x, fruit.y, itemScale, itemScale);
}
//Detect if i press a key//
function keyDownHandler(event) {
  if (event.defaultPrevented) {
    return;
  }

  // Prevent turning around
  if (
    (event.code === "KeyS" || event.code === "ArrowDown") && direction === "up" ||
    (event.code === "KeyW" || event.code === "ArrowUp") && direction === "down" ||
    (event.code === "KeyA" || event.code === "ArrowLeft") && direction === "right" ||
    (event.code === "KeyD" || event.code === "ArrowRight") && direction === "left"
  ) {
    return;
  }

  switch (event.code) {
    case "KeyS":
    case "ArrowDown":
      direction = "down";
      break;
    case "KeyW":
    case "ArrowUp":
      direction = "up";
      break;
    case "KeyA":
    case "ArrowLeft":
      direction = "left";
      break;
    case "KeyD":
    case "ArrowRight":
      direction = "right";
      break;
  }
  if (event.code !== "Tab") {
    event.preventDefault();
  }
}
//Move
function moveSnake() {
  let newHead = { x: snakeHead.x, y: snakeHead.y };

  switch (direction) {
    case "right":
      newHead.x += snakeSpeed;
      break;
    case "left":
      newHead.x -= snakeSpeed;
      break;
    case "up":
      newHead.y -= snakeSpeed;
      break;
    case "down":
      newHead.y += snakeSpeed;
      break;
    default:
      break;
  }

  snakeHead = newHead; // Update snakeHead before further checks

  detectCol(newHead);

  snake.unshift(newHead);

  if (newHead.x === fruit.x && newHead.y === fruit.y) {
    ateFruit();
  } else {
    snake.pop();
  }

  drawBoard();
  drawSnake();
  drawFruit();

  requestAnimationFrame(moveSnake);
}
//Detect colision with wall and body
function detectCol(snakeHead) {
  // Check for collisions with the walls
  if (snakeHead.x < 0 || snakeHead.y < 0 || snakeHead.x >= canvas.width || snakeHead.y >= canvas.height) {
    lost = true;
    return;
  }

  // Check for collisions with the snake body
  for (let i = 1; i < snake.length; i++) {
    if (snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {
      lost = true;
      return;
    }
  }
}
//Eat fruit spawn another one, spawn a snake part and increment score
function ateFruit(){
  score +=10;
  drawFruit();
}
//Game Over
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  ctx.font = "50px futur";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  reset.style.visibility = "visible";
}
//Restart
function restart() {
  score = 0;
  snake = [
    { x: 200, y: 200 },
    { x: 200, y: 190 },
    { x: 200, y: 180 },
  ];
  fruit = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
  };
  reset.style.visibility = "hidden";
  gameStart();
}
//Start
function gameStart() {
  window.addEventListener("keydown", keyDownHandler);
  lost = false;
  drawBoard();
  drawSnake();
  drawFruit();
  drawScore();
  requestAnimationFrame(moveSnake);
}
//Main
 function main() {
  lost = false;
   gameLoop();
 }
 //Game Loop
 function gameLoop(){
  if(!lost){
    gameStart();
  }
  else{
    gameOver();
  }
 }
