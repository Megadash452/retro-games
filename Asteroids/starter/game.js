let ship = new Ship([canvas.width / 2, canvas.height / 2]);
let keyPressed = {};


window.addEventListener('keydown', event => {
    keyPressed[event.code] = true;
})

window.addEventListener('keyup', event => {
    keyPressed[event.code] = false;
})


function loop() {
    if (keyPressed["ArrowDown"]) {
        ship.dy -= Math.cos(ship.angle)/10;
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

    // draw all
    erase();
    ship.draw();


    setTimeout(() => loop(), 1000 / 60);
}

// wait for images to load
async function loadGame() {
  await shipSprite.loaded
  await rockSprite.loaded
  loop()
}
loadGame()