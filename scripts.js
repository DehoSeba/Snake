// VARIABLES
let score = 0;
let itemScale = 10; // Size of each snake part and fruit
let background = "rgb(0, 0, 0)"; 
let snakeColor = "rgb(255, 255, 255)"; 
let fruitColor = "rgb(240, 0, 32)"; 
let canvas = document.getElementById("board"); // Reference to the canvas element
const ctx = canvas.getContext("2d"); // Context for drawing on the canvas
let displayScore = document.getElementById("score"); 
let reset = document.getElementById("restart"); // Restart button
reset.addEventListener("click", restart); // Event listener for restart button
window.addEventListener("keydown", keyDownHandler); // Event listener for keyboard input
let direction = "right"; // Initial direction of the snake
let lost = false; // Flag to track if the game is lost
let snake = [
  { x: 200, y: 200 }, 
  { x: 200, y: 190 }, 
  { x: 200, y: 180 }, 
];
let snakeHead = snake[0]; // Reference to the snake's head
let snakeSpeed = 2; 
let fruit = {
  x: Math.floor(Math.random() * (canvas.width - itemScale)), // Random initial position of the fruit
  y: Math.floor(Math.random() * (canvas.height - itemScale)),
};

//////////////////////////////////////////////////////////////////////////
// FUNCTIONS

// Draw the game board
function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

// Draw the snake on the canvas
function drawSnake() {
  ctx.fillStyle = snakeColor;

  // Loop through each part of the snake and draw it
  for (let i = 0; i < snake.length; i++) {
    const snakePart = snake[i];
    ctx.fillRect(snakePart.x, snakePart.y, itemScale, itemScale); // Draw a snake part
  }
}

// Display the player's score
function drawScore() {
  displayScore.innerHTML = `Score : ${score}`;
}

// Draw the fruit on the canvas
function drawFruit() {
  ctx.fillStyle = fruitColor;
  ctx.fillRect(fruit.x, fruit.y, itemScale, itemScale); // Draw the fruit
}

// Handle keyboard input to change the snake's direction
function keyDownHandler(event) {
  if (event.defaultPrevented) {
    return;
  }

  // Prevent turning around
  if (
    ((event.code === "KeyS" || event.code === "ArrowDown") &&
      direction === "up") ||
    ((event.code === "KeyW" || event.code === "ArrowUp") &&
      direction === "down") ||
    ((event.code === "KeyA" || event.code === "ArrowLeft") &&
      direction === "right") ||
    ((event.code === "KeyD" || event.code === "ArrowRight") &&
      direction === "left")
  ) {
    return;
  }

  // Set the new direction based on the pressed key
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

// Move the snake on the canvas
function moveSnake() {
  let newHead = { x: snake[0].x, y: snake[0].y };

  // Update the position of the snake's head based on the current direction
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

  // Add the new head to the front of the snake
  snake.unshift(newHead);

  // Check for collisions with  fruit
  detectCol(newHead);
  if (
    newHead.x < fruit.x + itemScale &&
    newHead.x + itemScale > fruit.x &&
    newHead.y < fruit.y + itemScale &&
    newHead.y + itemScale > fruit.y
  ) {
    ateFruit();
  } else {
    snake.pop(); // Remove the tail of the snake if it doesn't eat a fruit (that's what make the movement)
  }
  // Draw the updated game state
  drawBoard();
  drawScore();
  drawSnake();
  drawFruit();
}

function detectCol(snakeHead) {
  // Check for collisions with the walls
  if (
    snakeHead.x < 0 ||
    snakeHead.y < 0 ||
    snakeHead.x >= canvas.width ||
    snakeHead.y >= canvas.height
  ) {
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

// Handle actions when the snake eats a fruit
function ateFruit() {
  score += 10; 
  snakeSpeed += 0.1; 
  fruit = {
    x: Math.floor(Math.random() * (canvas.width - itemScale)), 
    y: Math.floor(Math.random() * (canvas.height - itemScale)),
  };
  drawFruit(); //need calculate pos and draw new fruit since this function pop when i ate one ^_^
}

// Display the game over screen
function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  ctx.font = "50px futur";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  reset.style.visibility = "visible"; // Show the restart button
}

// Restart the game
function restart() {
  lost = false;
  snakeSpeed = 2; // Reset snake speed
  score = 0; // Reset score
  snake = [
    { x: 200, y: 200 },
    { x: 200, y: 190 },
    { x: 200, y: 180 },
  ]; // Reset snake position
  fruit = {
    x: Math.floor(Math.random() * (canvas.width - itemScale)), // Respawn a new fruit
    y: Math.floor(Math.random() * (canvas.height - itemScale)),
  };
  reset.style.visibility = "hidden"; // Hide the restart button
  gameStart(); // Start the game
}

// Initialize game elements
function initGame() {
  drawBoard();
  drawSnake();
  drawFruit();
  drawScore();
}

// Start the game
function gameStart() {
  if (!lost) {
    initGame();
  }
  requestAnimationFrame(moveSnake);
}

// Game loop
function gameLoop() {
  if (!lost) {
    moveSnake();
  } else {
    gameOver();
  }
  requestAnimationFrame(gameLoop);
}

// Main entry point
function main() {
  lost = false;
  gameLoop(); // Start the game loop
}
