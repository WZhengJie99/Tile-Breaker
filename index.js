var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var squares = [];
// Define the type of the size parameter in getGradientColor
function getGradientColor(size) {
    var maxIntensity = 300;
    var fixedCanvasWidth = 1000;
    var intensity = Math.floor(maxIntensity * (size / fixedCanvasWidth));
    return "rgb(".concat(intensity, ", ").concat(255 - intensity, ", ").concat(255 - intensity / 2, ")");
}
function createSquare(x, y, size) {
    return { x: x, y: y, size: size, color: getGradientColor(size) };
}
function initializeSquares() {
    var initialSize = 100;
    for (var y = 0; y < canvas.height; y += initialSize) {
        for (var x = 0; x < canvas.width; x += initialSize) {
            var square = createSquare(x, y, initialSize);
            squares.push(square);
            // Debugging initial color output
            if (x === 0 && y === 0) {
                console.log('Initial tile color:', square.color);
            }
        }
    }
}
function drawSquares() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach(function (square) {
        context.fillStyle = square.color;
        context.fillRect(square.x, square.y, square.size, square.size);
        context.strokeStyle = '#2980b9';
        context.strokeRect(square.x, square.y, square.size, square.size);
    });
}
function splitSquare(square) {
    var newSize = square.size / 2;
    if (newSize < 2)
        return;
    squares.push(createSquare(square.x, square.y, newSize), createSquare(square.x + newSize, square.y, newSize), createSquare(square.x, square.y + newSize, newSize), createSquare(square.x + newSize, square.y + newSize, newSize));
}
// Type the event parameter for mousemove as MouseEvent
canvas.addEventListener('mousemove', function (event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    for (var i = squares.length - 1; i >= 0; i--) {
        var square = squares[i];
        if (mouseX > square.x && mouseX < square.x + square.size &&
            mouseY > square.y && mouseY < square.y + square.size) {
            splitSquare(square);
            squares.splice(i, 1);
            break;
        }
    }
    drawSquares();
});
initializeSquares();
drawSquares();
