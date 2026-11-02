const theCanvas = document.querySelector('#theCanvas');
const context = theCanvas.getContext('2d');

const colorPicker = document.querySelector('#colorPicker');
const sizeInput = document.querySelector('#sizeInput');
const chooseButton = document.querySelector('#choose');
const clearButton = document.querySelector('.clearCanvas');

const balls = [];

clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    balls.length = 0;
});

function sizeCanvas() {
    theCanvas.width = window.innerWidth;
    theCanvas.height = window.innerHeight -
        document.querySelector('.settings').offsetHeight;

    balls.forEach(ball => {

        if (ball.x < ball.radius) {
            ball.x = ball.radius;
        }

        if (ball.x > theCanvas.width - ball.radius) {
            ball.x = theCanvas.width - ball.radius;
        }

        if (ball.y < ball.radius) {
            ball.y = ball.radius;
        }

        if (ball.y > theCanvas.height - ball.radius) {
            ball.y = theCanvas.height - ball.radius;
        }

    });
}

sizeCanvas();
window.addEventListener('resize', sizeCanvas);

chooseButton.addEventListener('click', () => {

    const radius = Number(sizeInput.value);
    const color = colorPicker.value;

    const ball = {
        x: radius + Math.random() * (theCanvas.width - radius * 2),
        y: radius + Math.random() * (theCanvas.height - radius * 2),
        radius: radius,
        color: color,
        dx: 1,
        dy: 2
    };

    balls.push(ball);
});

function bounce() {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    balls.forEach(ball => {

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x < ball.radius ||
            ball.x > theCanvas.width - ball.radius) {
            ball.dx = -ball.dx;
        }

        if (ball.y < ball.radius ||
            ball.y > theCanvas.height - ball.radius) {
            ball.dy = -ball.dy;
        }

        context.fillStyle = ball.color;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fill();
    });
}

setInterval(bounce, 10);