<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        canvas {
            border: 1px solid #000;
            margin: 20px auto;
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="snakeCanvas" width="400" height="400"></canvas>
    <script src="snake_game.js"></script>
</body>
</html>
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const snakeSize = 10;
    const canvasSize = 400;

    let snake = [{ x: 200, y: 200 }];
    let food = { x: 0, y: 0 };
    let direction = 'RIGHT';

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw the snake
        ctx.fillStyle = 'green';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize));

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
    }

    function update() {
        // Update snake position
        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === 'RIGHT') headX += snakeSize;
        if (direction === 'LEFT') headX -= snakeSize;
        if (direction === 'UP') headY -= snakeSize;
        if (direction === 'DOWN') headY += snakeSize;

        // Check collision with food
        if (headX === food.x && headY === food.y) {
            snake.unshift({ x: headX, y: headY });
            generateFood();
        } else {
            // Remove the tail
            snake.pop();

            // Add new head
            snake.unshift({ x: headX, y: headY });
        }

        // Check collision with walls or self
        if (headX < 0 || headY < 0 || headX >= canvasSize || headY >= canvasSize || checkCollision()) {
            clearInterval(gameLoop);
            alert('Game Over!');
        }
    }

    function generateFood() {
        const x = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
        const y = Math.floor(Math.random() * (canvasSize / snakeSize)) * snakeSize;
        food = { x, y };
    }

    function checkCollision() {
        return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    }

   function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 'ArrowDown':
            if (direction !== 'UP') direction = 'DOWN';
            break;
        case 'ArrowLeft':
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 'ArrowRight':
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
    }
}

// Event listener for arrow keys
window.addEventListener('keydown', handleKeyPress);


    // Initial setup
    generateFood();

    // Event listener for arrow keys
    window.addEventListener('keydown', handleKeyPress);

    // Game loop
    const gameLoop = setInterval(() => {
        update();
        draw();
    }, 100);
});
