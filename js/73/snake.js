
const theCanvas = document.querySelector('#theCanvas');
const hitWall = document.querySelector('#hitWall');
const restart = document.querySelector('#restart');

const context = theCanvas.getContext('2d');

const IMG_SIZE = 64;

function sizeCanvas() {
    theCanvas.width = window.innerWidth - (window.innerWidth % IMG_SIZE);
    theCanvas.height = window.innerHeight - (window.innerHeight % IMG_SIZE);
}

sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const snakeHead = document.createElement('img');
snakeHead.src = 'media/snakeHead.png';

const apple = document.createElement('img');
apple.src = 'media/apple.png';

let x = 0;
let y = 0;
let direction = 'ArrowRight';
let score = 0;
let playGame;
let appleX = 0;
let appleY = 0;

function randomApplePosition() {
    do {
        appleX = Math.floor(Math.random() * (theCanvas.width / IMG_SIZE)) * IMG_SIZE;
        appleY = Math.floor(Math.random() * (theCanvas.height / IMG_SIZE)) * IMG_SIZE;
    } while (appleX === x && appleY === y);
}

function startGame() {
    randomApplePosition();

    playGame = setInterval(() => {
        context.clearRect(0, 0, theCanvas.width, theCanvas.height);

        switch (direction) {
            case 'ArrowUp':
                y -= IMG_SIZE;
                break;
            case 'ArrowDown':
                y += IMG_SIZE;
                break;
            case 'ArrowLeft':
                x -= IMG_SIZE;
                break;
            case 'ArrowRight':
                x += IMG_SIZE;
                break;
        }

        if (x < 0 || y < 0 || x >= theCanvas.width || y >= theCanvas.height) {
            const gameOver = new Audio('media/alert.mp3');
            gameOver.play();

            hitWall.style.display = 'flex';
            clearInterval(playGame);
            return;
        }

        if (x === appleX && y === appleY) {
            score++;

            randomApplePosition();

            const appleEaten = new Audio('media/success.mp3');
            appleEaten.play();
        }

        context.fillStyle = 'red';
        context.font = '25px Arial';

        const scoreText = `Score: ${score}`;
        const metrics = context.measureText(scoreText);

        context.fillText(scoreText, (theCanvas.width - metrics.width) - 10, 40);

        context.drawImage(snakeHead, x, y);
        context.drawImage(apple, appleX, appleY, IMG_SIZE, IMG_SIZE);

    }, 500);
}

function restartGame() {
    clearInterval(playGame);

    x = 0;
    y = 0;
    direction = 'ArrowRight';
    score = 0;

    hitWall.style.display = 'none';

    context.clearRect(0, 0, theCanvas.width, theCanvas.height);

    startGame();
}

restart.addEventListener('click', restartGame);

let imagesLoaded = 0;

function checkImagesLoaded() {
    imagesLoaded++;

    if (imagesLoaded === 2) {
        startGame();
    }
}

snakeHead.onload = checkImagesLoaded;
apple.onload = checkImagesLoaded;

snakeHead.onerror = () => console.error('Snake image failed to load');
apple.onerror = () => console.error('Apple image failed to load');

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            direction = e.key;
            break;
        default:
            console.log(`${e.key} not processed`);
    }
});