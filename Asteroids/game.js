let ship = new Ship();
let keyPressed = {};
let rocks = [new Rock(), new Rock(), new Rock()];
let lasers = [];


window.addEventListener('keydown', key => {
    keyPressed[key.code] = true;
});
window.addEventListener('keyup', key => {
    keyPressed[key.code] = false;
});
window.addEventListener("keypress", key => {
    if (key.code == "Space") {
        lasers.push(ship.shootLaser());
    }
});


let tick = 0;
function loop() {
    //spawn rocks
    tick++;
    if (tick % 500 == 0) {
        rocks.push(new Rock());
    }

    //key presses
    if (keyPressed["ArrowDown"]) {
        ship.dx -= Math.cos(ship.angle)/10;
        ship.dy -= Math.sin(ship.angle)/10;
    }
    if (keyPressed['ArrowLeft']) {
        ship.rotateLeft();
    }
    if (keyPressed['ArrowRight']) {
        ship.rotateRight();
    }
    if (keyPressed['ArrowUp']) {
        ship.thrust();
    }
    

    // change game state
    ship.step();
    rocks.forEach(rock => rock.step())
    lasers.forEach(laser => laser.step());

    //check collisions
    rocks.forEach(rock => {
        lasers.forEach(laser => {
            if(rock.checkForHit(laser)) {
                console.log("hit");
            }
        });
    });
    rocks = rocks.filter(rock => !rock.hit);
    lasers = lasers.filter(laser => !laser.hit);

    // draw all
    erase();
    ship.draw();
    rocks.forEach(rock => rock.draw());
    lasers.forEach(laser => laser.draw());
    

    setTimeout(() => loop(), 1000 / 60);
}

// wait for images to load
async function loadGame() {
    await shipSprite.loaded;
    await rockSprite.loaded;
    loop();
}
loadGame();