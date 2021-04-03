let canvas = document.getElementById('display');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let ctx = canvas.getContext('2d');

// loading images so we can draw them later
function loadSprite(filename) {
    let image = new Image();
    let loaded = new Promise((resolve, reject) => {
        image.onload = resolve;
    });
    image.src = 'res/images/' + filename;
    return {
        image: image,
        loaded: loaded,
    };
}

// draw helpers
function erase() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let heroStandSprite = loadSprite('hero_stand.png').image;
let heroJumpSprite = loadSprite('hero_jump.png').image;
let heroWalkSprite1 = loadSprite('hero_walk1.png').image;
let heroWalkSprite2 = loadSprite('hero_walk2.png').image;
let groundSprite = loadSprite('ground.png').image;
let groundTopSprite = loadSprite('ground_top.png').image;

const heroSprites = {
    stand: loadSprite('hero_stand.png'),
    jump: loadSprite('hero_jump.png')
};


let maxY = 15;
let gridSize = Math.ceil(canvas.height / maxY);
let keyPressed = {};