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

chooseButton.addEventListener('click', () => {
    const radius = Number(sizeInput.value);
    const color = colorPicker.value;
    const x = radius + Math.random() * (theCanvas.width - radius * 2);
    const y = radius + Math.random() * (theCanvas.height - radius * 2);

    const ball = new Ball(x, y, radius, color);
    balls.push(ball);

}
);

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


function bounce() {
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    balls.forEach(ball => {
        ball.move();
        ball.draw();
    });
}

setInterval(bounce, 10);

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 1;
        this.dy = 2;
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < this.radius ||
            this.x > theCanvas.width - this.radius) {
            this.dx = -this.dx;
        }

        if (this.y < this.radius ||
            this.y > theCanvas.height - this.radius) {
            this.dy = -this.dy;
        }
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}
