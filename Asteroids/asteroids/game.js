
// game state
let ship = new Ship()

// check for user input
window.addEventListener('keydown', event => {
  if (event.code == 'ArrowDown') {
    ship.dy += 1
  }
  if (event.code == 'ArrowLeft') {
    ship.dx -= 1
  }
  if (event.code == 'ArrowRight') {
    ship.dx += 1
  }
  if (event.code == 'ArrowUp') {
    ship.dy -= 1
  }
})

window.addEventListener('keyup', event => {
  // todo we might need this later...
})

// game loop
function loop() {
  // change game state
  ship.step()

  // draw all
  erase()
  ship.draw()

  // trigger loop
  setTimeout(() => loop(), 1000 / 60)
}

// wait for images to load
async function loadGame() {
  await shipSprite.loaded
  await rockSprite.loaded
  loop()
}
loadGame()
