 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
let apple = { x: 15, y: 15 };
const boxSize = 20;
let score = 0; 

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем яблоко
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * boxSize, apple.y * boxSize, boxSize, boxSize);

    // Рисуем змею
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    }

    // Двигаем змейку
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x === apple.x && head.y === apple.y) {
        snake.unshift(head);
        score++; 
        placeApple();
    } else {
        snake.unshift(head);
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width / boxSize || head.y < 0 || head.y >= canvas.height / boxSize || collision(head)) {
        alert('Game Over! Нажмите закрыть для перезагрузки.');
        document.location.reload();
    }

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function collision(head) {
    for (let segment of snake.slice(1)) {
        if (segment.x === head.x && segment.y === head.y) {
            return true;
        }
    }
    return false;
}

function placeApple() {
    apple = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

setInterval(draw, 100);