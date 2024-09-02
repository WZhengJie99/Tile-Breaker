const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let squares = [];

function getGradientColor(size) {
    const maxIntensity = 300;
    const fixedCanvasWidth = 1000;
    const intensity = Math.floor(maxIntensity * (size / fixedCanvasWidth));
    return `rgb(${intensity}, ${255 - intensity}, ${255 - intensity / 2})`;
}

function createSquare(x, y, size) {
    return { x, y, size, color: getGradientColor(size) };
}

function initializeSquares() {
    const initialSize = 100;
    for (let y = 0; y < canvas.height; y += initialSize) {
        for (let x = 0; x < canvas.width; x += initialSize) {
            const square = createSquare(x, y, initialSize);
            squares.push(square);

            // color debug
            if (x === 0 && y === 0) {
                console.log('Initial tile color:', square.color);
            }
        }
    }
}

function drawSquares() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach(square => {
        context.fillStyle = square.color;
        context.fillRect(square.x, square.y, square.size, square.size);
        context.strokeStyle = '#2980b9';
        context.strokeRect(square.x, square.y, square.size, square.size);
    });
}

function splitSquare(square) {
    const newSize = square.size / 2;
    if (newSize < 2) return;

    squares.push(
        createSquare(square.x, square.y, newSize),
        createSquare(square.x + newSize, square.y, newSize),
        createSquare(square.x, square.y + newSize, newSize),
        createSquare(square.x + newSize, square.y + newSize, newSize)
    );
}

canvas.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    for (let i = squares.length - 1; i >= 0; i--) {
        const square = squares[i];
        if (
            mouseX > square.x && mouseX < square.x + square.size &&
            mouseY > square.y && mouseY < square.y + square.size
        ) {
            splitSquare(square);
            squares.splice(i, 1);
            break;
        }
    }
    drawSquares();
});

initializeSquares();
drawSquares();
