//variables
let score = 0;
const itemScale = 10; //if one day i want to let player adjust board game
let canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const gameWidth = board.width;
const gameHeight = board.height;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let lost = false;
let snake = [
  { x: 200, y: 200, w: itemScale, h: itemScale,},
  { x: 200, y: 190, w: itemScale, h: itemScale,},
  { x: 200, y: 180, w: itemScale, h: itemScale,}
];
//draw board
function drawBoard() {
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
//create snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach(snakePart=> {
  ctx.fillRect(snakePart.x, snakePart.y, itemScale, itemScale);
  ctx.strokeRect(snakePart.x, snakePart.y, itemScale, itemScale);})
}
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
    if (event.code !== "Tab") {
      //consume the event so it doesn't get handled twice exept if the user want to leave the window
      event.preventDefault();
    }
  },
  );
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
    if (event.code !== "Tab") {
      //consume the event so it doesn't get handled twice exept if the user want to leave the window
      event.preventDefault();
    }
  });
}
//auto move snake
function move() {

}
//detect collision
function detectCol(){
  switch(lost){
    case(snake[0].x< 0):
    lost = true;
    break;
    case(snake[0].y< 0):
    lost = true;
    break;
    case(snake[0].y> gameHeight):
    lost = true;
    break;
    case(snake[0].x> gameWidth):
    lost = true;
    break;
    default:
      lost = false;
      break;
  }
}
//change direction snake
function changeDirection() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (upPressed) {
    snake.forEach(snakePart=>{snakePart.y -= 2});
  }
  if (downPressed) {
    snake.forEach(snakePart=>{snakePart.y += 2});
  }
  if (rightPressed) {
    snake.forEach(snakePart=>{snakePart.x += 2});
  }
  if (leftPressed) {
    snake.forEach(snakePart=>{snakePart.x -= 2});
  }
}
//random fruits appearing and detect if snake ate it then repop another one
let fruit = { x: Math.random(Math.floor(gameWidth)*391), y: Math.random(Math.floor(gameHeight)*391), };
function drawFruit() {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(fruit.x, fruit.y, itemScale, itemScale);
  ctx.strokeRect(fruit.x, fruit.y, itemScale, itemScale);
}
//eating fruits grow snake and score

//game loop
function gameStart(){
}
//main
