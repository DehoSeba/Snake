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
let snakeSpeed = 5;
let fruit = {
  x: Math.floor(Math.random() * (canvas.width - itemScale)), //random fruit pos
  y: Math.floor(Math.random() * (canvas.height - itemScale)),
};
//////////////////////////////////////////////////////////////////////////
//FUNCTIONS//
//Board init//
function drawBoard() {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
  if (fruit.x != snake.x && fruit.y != snake.y) {
    ctx.fillStyle = fruitColor;
    ctx.fillRect(fruit.x, fruit.y, itemScale, itemScale);
  } else {
    fruit = {
      x: Math.floor(Math.random() * (gameWidth - itemScale)), //random fruit pos
      y: Math.floor(Math.random() * (gameHeight - itemScale)),
    };
  }
}
//Detect if i press a key//
function keyDownHandler() {
  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
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
      //consume the event so it doesn't get handled twice exept if the user want to leave the window
      event.preventDefault();
    }
  });
}
//Move
function move() {
  switch (direction) {
    case "right":
      snake.pop;

      break;
    case "left":
      snake.pop;

      break;
    case "up":
      snake.pop;

      break;
    case "down":
      snake.pop;

      break;
  }
}
//Detect colision with wall and body
function detectCol() {
  switch (lost) {
    case snakeHead.x < 0:
      lost = !true;
      break;
    case snakeHead.y < 0:
      lost = !true;
      break;
    case snakeHead.x > gameHeight:
      lost = !true;
      break;
    case snakeHead.y > gameWidth:
      lost = !true;
      break;
    default:
      lost = !false;
      break;
  }
}
//Eat fruit spawn another one, spawn a snake part and increment score
function ateFruit() {}
//Game Over
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  ctx.font = "50px futur";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  reset.style.visibility = 'visible';
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
    x: Math.floor(Math.random() * canvas.width - itemScale),
    y: Math.floor(Math.random() * canvas.height - itemScale),
  };
  reset.style.visibility = 'hidden';
  gameStart();
}
//Game Loop
function gameLoop() {
  if(lost == false){

  }
  else if (lost == true){
    gameOver();
  }
}
//Start
function gameStart() {
  lost = false;
  drawBoard();
  drawSnake();
  drawFruit();
  drawScore();
}
//Main
function main() {
  gameStart();
  gameLoop();
}
