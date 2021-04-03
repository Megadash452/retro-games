class Ground extends MapObject {
    constructor(pos, dim=[1, 1]) {
        super(pos, dim);
    }
    
    hits(entity, direction="") {
        // directions: top || bottom || right || left
        switch (direction) {
            case "top":
                entity.airborne = false;
                entity.dy = 1/60 * gridSize;
                entity.y = this.y;
                break;

            case "bottom":
                entity.dy = -0.5;
                entity.y = this.y + this.height + entity.height - 1;
                break;

            case "right":
                entity.dx = 0; // 1/60 * gridSize;
                entity.x = this.x + this.width + entity.width/2;
                if (entity.airborne && !(Math.abs(Math.sign(entity.dy) - 1)))
                {
                    entity.dy = 0.04 * gridSize * gravity;
                }
                break;

            case "left":
                entity.dx = 0; // -1/60 * gridSize;
                entity.x = this.x - entity.width/2;
                if (entity.airborne && !(Math.abs(Math.sign(entity.dy) - 1)))
                {
                    entity.dy = 0.04 * gridSize * gravity;
                    // hero grab
                }
                break;
            
            default:
                entity.airborne = true;
        }
    }

    draw() {
        ctx.fillStyle = "green";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        for (let row=0; row < this.height; row += gridSize) {
            let image = undefined;
            if (!row) {
                image = groundTopSprite;
            } else {
                image = groundSprite;
            }

            for (let column = 0; column < this.width; column += gridSize) {
                ctx.drawImage(
                    image,
                    this.x + column - xScroll,
                    this.y + row,
                    gridSize, 
                    gridSize
                );
            }
        }

        super.draw("green"); // hitbox draw
    }
}