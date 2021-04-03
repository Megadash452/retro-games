let hero = new Hero([gridSize * 3.5, 500]);

const devMode = true;
let gravity = 1;
let gameSpeed = 1;

let xScroll = 0;
let frame = 0;


// map files must be at least 20 lines high

let room = new Room([0, 0], [26, 20]);

let mapObjects = [
    new Ground([2, 18], [18, 2]),
    new Ground([5, 17]),
    new Ground([8/(gridSize*0.03), 5], [2, 1]),
    //new Ground([12, 5], [2, 1]),
    new Ground([7, 16], [2, 1]),
    new Ground([9, 16], [2, 1]),
    new Ground([12, 13], [6, 1]),
    new Ground([13, 14], [5, 4]),
    new Ground([22, 14], [4, 1]),

    new Spike([5, 14], [1, 1])
];
let spikes = [];


window.addEventListener('keydown', event => {
    keyPressed[event.code] = true;
});
window.addEventListener('keyup', event => {
    keyPressed[event.code] = false;
});

let relTime = 0;
function loop() {
    // change state

    if (keyPressed["ArrowLeft"]) {
        hero.moveLeft();
    }
    else if (keyPressed["ArrowRight"]) {
        hero.moveRight();
    }
    if ((keyPressed["Space"] || keyPressed["ArrowUp"]) && !hero.wasJump && !hero.airborne) {
        hero.jump();
        if (hero.wallJumpAllowed) {
            hero.wallJump();
        }
        hero.wasJump = true;
    } else if (!(keyPressed["Space"] || keyPressed["ArrowUp"])) {
        hero.wasJump = false;
    }
    if (keyPressed["ArrowDown"]) {
        hero.crouch();
    } else {
        hero.uncrouch();
    }

    hero.step();
    //hero.checkCollisions(hero.x - hero.dx, hero.y - hero.dy);

    // draw all
    erase();
    hero.draw();
    mapObjects.forEach(p => p.draw());
    room.draw();

    if (!(relTime % 5)) {
       frame++;
    }
    relTime++;
    setTimeout(() => loop(), 1000 / (gameSpeed * 60));
}

let animationCount = 0;
async function heroAnimation() {
    switch (animationCount % 3)
    {
    case 0:
        hero.movingSprite = heroWalkSprite1;
        animationCount = 0;
        break;
    case 1:
        hero.movingSprite = heroStandSprite;
        break;
    case 2:
        hero.movingSprite = heroWalkSprite2;
        break;
    }
    animationCount++;
    setTimeout(() => heroAnimation(), 100); //1000 - Math.abs(hero.dx*1000)
}

// wait for images to load
async function loadGame() {
    await heroStandSprite.loaded;
    await heroJumpSprite.loaded;
    await heroWalkSprite1.loaded;
    await heroWalkSprite2.loaded;
    await groundSprite.loaded;
    await groundTopSprite.loaded;
    loop();
    heroAnimation();
}
loadGame();