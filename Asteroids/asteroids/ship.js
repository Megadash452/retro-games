
// define classes to track our state
class Ship {
  constructor() {
    this.sprite = shipSprite.image
    // x,y describe the center of the ship
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    // dx,dy describe the speed the ship is traveling
    this.dx = 0
    this.dy = 0
    // the angle is in radians, meaning it goes from 0 - 2*Math.PI
    this.angle = Math.PI * 1.5
    this.size = 50
  }
  rotateLeft() {
    // todo
  }
  rotateRight() {
    // todo
  }
  thrust() {
    // todo
  }
  step() {
    this.x += this.dx
    this.y += this.dy
  }
  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(this.sprite, -this.size / 2, -this.size / 2, this.size, this.size)
    ctx.restore()
  }
}
