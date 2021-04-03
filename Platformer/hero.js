class Hero
{
    constructor(pos) {
        this.size = 1.35;
        this.x = pos[0];
        this.y = pos[1];
        this.width = gridSize * (this.size-0.52); // (this.size-0.4)
        this.height = gridSize * (this.size-0.39); // (this.size-0.39)

        this.respawnX = this.x;
        this.respawnY = this.y;

        this.dx = 0;
        this.dy = 0;
        this.speed = 1;
        
        this.airborne = true;
        this.crouching = false;

        this.sprite;
        this.movingSprite = heroWalkSprite1.image;
    }

    respawn() {
        this.dy = 0;
        this.dx = 0;
        this.x = this.respawnX;
        this.y = this.respawnY;
        xScroll = 0;
    }

    jump() {
        if (!this.airborne) {
            this.airborne = true;
            this.dy = -0.35 * gridSize; // might change to lower
        }
    }
    crouch() {
        this.crouching = true;
        this.speed = 0.3;
        hero.height = gridSize * (hero.size-0.7);
    }
    uncrouch() {
        this.crouching = false;
        this.speed = 1;
        hero.height = gridSize * (hero.size-0.39);
    }

    moveLeft() {
        if (!this.airborne) {
            this.dx += -0.02 * gridSize * this.speed;
        } else {
            this.dx += -0.015 * gridSize * this.speed;
        }
    }
    moveRight() {
        if (!this.airborne) {
            this.dx += 0.02 * gridSize * this.speed;
        } else {
            this.dx += 0.015 * gridSize * this.speed;
        }
        if (!this.crouching) {

        }
    }

    checkCollisions(preX, preY) {
        mapObjects.forEach(object => {
            let isInside = object.contains(this.x, this.y, this);

            if (object.isAbove(preX, preY, this) && isInside) { // WAS ABOVE
                object.hits(this, "top");
            }
            else if (object.isBelow(preX, preY, this) && isInside) { // WAS BELOW
                object.hits(this, "bottom");
            }
            if (object.isToRight(preX, preY, this) && isInside) { // Hit wall from RIGHT
                object.hits(this, "right");
            }
            else if (object.isToLeft(preX, preY, this) && isInside) { // Hit Wall form LEFT
                object.hits(this, "left");
            }
        });
    }

    step() {
        this.x += this.dx;
        this.y += this.dy;


        this.checkCollisions(this.x - this.dx, this.y - this.dy);
        

        if (this.y > room.y + room.height) { // bottom room border
            this.respawn();
        } else if (this.y - this.height < room.y) { // top room border
            this.y = room.y + this.height;
        }
        if (this.x - this.width/2 < room.x) { // left room border
            this.x = room.x + this.width/2;
        } else if (this.x + this.width/2 > room.x + room.width) { // right room border
            this.x = room.x + room.width - this.width/2;
        }

        if ((this.x > room.x + canvas.width/2) &&
            (this.x < room.x + room.width - canvas.width/2)) {
            xScroll = this.x - canvas.width/2;
        }

        //friction
        this.dx *= 0.9;

        if (!this.crouching) { //gravity & fastfall
            this.dy += 0.02 * gridSize * gravity;
        } else {
            this.dy += 0.04 * gridSize * gravity;
        }
    }

    draw() {
        this.sprite = heroStandSprite;
        if (Math.abs(this.dx) > 0.1) {
            this.sprite = this.movingSprite;
        }
        if (this.airborne) {
            this.sprite = heroJumpSprite;
        }
        // Draw hero sprite
        ctx.drawImage(
            this.sprite,
            this.x - gridSize / 2*this.size - xScroll,
            this.y - gridSize*this.size,
            gridSize * this.size, 
            gridSize * this.size
        );

        // ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.restore();

        if (devMode) {
            // Draw Hero Hitbox
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 3;
            ctx.strokeRect(
                this.x - this.width/2 + ctx.lineWidth/2 - xScroll,
                this.y - this.height + ctx.lineWidth/2,
                this.width - ctx.lineWidth,
                this.height - ctx.lineWidth
            )
            // Draw small dot at (hero.x, hero.y)
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(this.x - xScroll, this.y-1, 1, 0, 2*Math.PI);
            ctx.fill();
        }
    }
}