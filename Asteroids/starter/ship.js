class Ship
{
    constructor(pos) {
        this.x = pos[0];
        this.y = pos[1];
        this.dx = 0;
        this.dy = 0;

        this.angle = Math.PI * 1.5;

        this.sprite = shipSprite.image;
        this.size = 50;
    }
    
    thrust() {
        this.dx = Math.cos(this.angle);
        this.dy = Math.sin(this.angle);
    }
    step() {
        this.x += this.dx
        this.y += this.dy

        this.dx *= 0.98;
        this.dy *= 0.98;
        
        if (this.x < 0) {
            this.x = canvas.width;
        }
        else if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = canvas.height;
        }
        else if (this.y > canvas.height) {
            this.y = 0;
        }
    }

    rotateLeft() {
        this.angle -= 0.1;
    }
    rotateRight() {
        this.angle += 0.1;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.sprite, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}
