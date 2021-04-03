// setup canvas
let canvas = document.getElementById('display');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let ctx = canvas.getContext('2d');

// variables
const gridSize = 31;
const gridWidth = Math.floor(canvas.width / gridSize) + 1;
const gridHeight = Math.floor(canvas.height / gridSize) + 1;

let snakeCoords = [[5, 3], [4, 3], [3, 3], [2, 3]];
let snakeDirection = "right";
let appleCoords = [(gridSize - 1) / 2, (gridSize - 1) / 2];
let score = 0;

// draw helpers
function erase()
{
  ctx.fillStyle = '#000044';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSquare(coords)
{
  ctx.fillStyle = 'green';
  ctx.fillRect(coords[0] * gridSize, coords[1] * gridSize, gridSize, gridSize);
}
function drawHead(coords)
{
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(coords[0] * gridSize, coords[1] * gridSize, gridSize, gridSize);
}
function drawCircle(coords)
{
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc((coords[0] + 0.5) * gridSize, (coords[1] + 0.5) * gridSize, gridSize / 2, 0, 2 * Math.PI);
  ctx.fill();
}
function renderScore()
{

}
function loseGame() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    alert(`Score: ${score}`);
    location.reload();
}

// user input
window.addEventListener('keydown', event => {
    if (event.code == "ArrowUp" &&
    snakeDirection != "down")
    {
        snakeDirection = "up";
    }
    if (event.code == "ArrowDown" &&
    snakeDirection != "up")
    {
        snakeDirection = "down";
    }
    if (event.code == "ArrowLeft" &&
    snakeDirection != "right")
    {
        snakeDirection = "left";
    }
    if (event.code == "ArrowRight" &&
    snakeDirection != "left")
    {
        snakeDirection = "right";
    }
});


function drawSnake() {
    for (let i=1; i < snakeCoords.length; i++)
    {
        drawSquare(snakeCoords[i]);
    }
    drawHead(snakeCoords[0]);
}

function appendHead()
{
    switch (snakeDirection)
    {
    case "up":
        snakeCoords.unshift([
            snakeCoords[0][0],
            snakeCoords[0][1] - 1
        ]);
        break;
    case "down":
        snakeCoords.unshift([
            snakeCoords[0][0],
            snakeCoords[0][1] + 1
        ]);
        break;
    case "left":
        snakeCoords.unshift([
            snakeCoords[0][0] - 1,
            snakeCoords[0][1]
        ]);
        break;
    case "right":
        snakeCoords.unshift([
            snakeCoords[0][0] + 1,
            snakeCoords[0][1]
        ]);
        break;
    }
}

setInterval(() =>
{ erase();
    appendHead();

    /*- Wall Collision -*/
    if (snakeCoords[0][0] == -1) {
        loseGame();
    }
    else if (snakeCoords[0][0] == gridWidth) {
        loseGame();
    }
    else if (snakeCoords[0][1] == -1) {
        loseGame();
    }
    else if (snakeCoords[0][1] == gridHeight) {
        loseGame();
    }

    /*- Self Collision -*/
    for (let i=1; i < snakeCoords.length; i++)
    {
        if (snakeCoords[0][0] == snakeCoords[i][0] &&
            snakeCoords[0][1] == snakeCoords[i][1])
        {
            loseGame();
        }
    }
    
    /*- Apple Collision -*/
    if (snakeCoords[0][0] == appleCoords[0] &&
        snakeCoords[0][1] == appleCoords[1])
    {
        appleCoords = [Math.floor(Math.random() * (gridWidth)), Math.floor(Math.random() * (gridHeight))];
        score++;
    }
    else {
        snakeCoords.pop();
    }

    drawCircle(appleCoords);
    drawSnake();
    renderScore();
}
, 100);

// todo program the game