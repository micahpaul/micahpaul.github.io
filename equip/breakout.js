// JavaScript code goes here
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const darkColorsArr = [
"#f00",
"#0f0",
"#00f",
"Wheat",
"#ff0",
"#f0f",
"#0ff",
"#face",
"Goldenrod",
"chartreuse",
"purple",
"maroon"
];

function getRandomIndex() {
const randomIndex = Math.floor(darkColorsArr.length * Math.random());
return randomIndex;
}

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballColor = darkColorsArr[getRandomIndex()];
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let interval = 0;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 3;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1){
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;         
                b.x = brickX;
                b.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = "0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }  
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx + ballRadius > canvas.width || 
        x + dx - ballRadius < 0) {
        dx = -dx;
        ballColor = darkColorsArr[getRandomIndex()]
    }

    if (y + dy < ballRadius || 
        (y + dy > canvas.height - ballRadius - paddleHeight 
            && (x > paddleX && x < paddleX + paddleWidth ))) {
        dy = -dy;
        ballColor = darkColorsArr[getRandomIndex()]
    } 
    else if (y + dy > canvas.height - ballRadius) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    drawPaddle();

    collisionDetection();

    drawBricks();
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function collisionDetection() {
    for (let c=0; c < brickColumnCount; c++) {
        for (let r=0; r < brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 0) {
                continue;
            }
            
            if (x > b.x && x < b.x + brickWidth &&
                y > b.y && y < b.y + brickHeight) {
                b.status = 0;
                dy = -dy;
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

interval = setInterval(draw, 10);