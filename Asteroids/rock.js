class Rock
{
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() * 6) - 3;
        this.dy = (Math.random() * 6) - 3;

        this.sprite = rockSprite.image;
        this.size = 100;
        this.hit = false;
    }

    checkForHit(laser) {
        // tirangle hypotenuse for distance
        let width = this.x - laser.x; // distance between centers of laser and rock in x
        let height = this.y - laser.y; // distance between centers of laser and rock in y
        let hypo = Math.sqrt(width*width + height*height);
        if (hypo <= this.size/2) {
            this.hit = true;
            laser.hit = true;
            
            return true;
        }
        return false;
    }

    step() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 /*- this.size*/) {
            this.x = canvas.width;
        }
        else if (this.x > canvas.width /*+ this.size*/) {
            this.x = 0;
        }
        if (this.y < 0 /*- this.size*/) {
            this.y = canvas.height;
        }
        else if (this.y > canvas.height /*+ this.size*/) {
            this.y = 0;
        }
    }

    draw() {
        ctx.drawImage(
            this.sprite,
            this.x -this.size / 2,
            this.y -this.size / 2,
            this.size,
            this.size
        );
    }
}