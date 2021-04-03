class Laser
{
    constructor(pos, vel) {
        this.x = pos[0];
        this.y = pos[1];
        this.dx = vel[0];
        this.dy = vel[1];
        console.log(pos, vel);

        this.hit = false;
    }

    step() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw() {
        // ctx.fillStyle = '#ffffff';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, 20, 0, 2*Math.Pi);
        // ctx.fill();

        ctx.drawImage(
            rockSprite.image,
            this.x ,
            this.y ,
            10,
            10
        );
    }
}