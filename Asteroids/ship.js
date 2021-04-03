class Ship
{
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 0; // speed in x;
        this.dy = 0; // speed in y;

        this.angle = Math.PI * 1.5;

        this.sprite = shipSprite.image;
        this.size = 50;
    }

    thrust() {
        this.dx += Math.cos(this.angle)/10;
        this.dy += Math.sin(this.angle)/10;
    }
    step() {
        this.x += this.dx;
        this.y += this.dy;
        
        this.dx *= 0.98;
        this.dy *= 0.98;

        if (this.x < 0 - this.size) {
            this.x = canvas.width;
        }
        else if (this.x > canvas.width + this.size) {
            this.x = 0;
        }
        if (this.y < 0 - this.size) {
            this.y = canvas.height;
        }
        else if (this.y > canvas.height + this.size) {
            this.y = 0;
        }
    }
    shootLaser() {
        let laserdx = Math.cos(this.angle)*5;
        let laserdy = Math.sin(this.angle)*5;
        let laser = new Laser([this.x, this.y], [laserdx, laserdy]);
        return laser;
    }

    rotateRight() {
        this.angle += 0.1;
    }
    rotateLeft() {
        this.angle -= 0.1;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.sprite, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}