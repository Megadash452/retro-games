class Entity
{
    constructor(pos, sizeRatio, size=1, speed=1, type="common") {
        // pos: [num, num]; sizeRatio: [width, height]; size: num
        this.size = size;
        this.x = pos[0];
        this.y = pos[1];
        this.width = gridSize * (this.size-sizeRatio[0]); // (this.size-0.4)
        this.height = gridSize * (this.size-sizeRatio[1]); // (this.size-0.39)

        this.respawnX = this.x;
        this.respawnY = this.y;

        this.dx = 0;
        this.dy = 0;
        this.speed = speed;

        this.airborne = true;

        this.sprite;
        this.type = type;
    }

    checkCollisions(preX, preY) {
        let hitOne = "";
        mapObjects.forEach(object => {
            let isInside = object.contains(this.x, this.y, this);

            if (object.isAbove(preX, preY, this) && isInside) { // WAS ABOVE
                object.hits(this, "top");
                if (!hitOne)
                    hitOne = "top";
            }
            else if (object.isBelow(preX, preY, this) && isInside) { // WAS BELOW
                object.hits(this, "bottom");
                if (!hitOne)
                    hitOne = "bottom";
            }
            if (object.isToRight(preX, preY, this) && isInside) { // Hit wall from RIGHT
                object.hits(this, "right");
                if (!hitOne)
                    hitOne = "right";
            }
            else if (object.isToLeft(preX, preY, this) && isInside) { // Hit Wall form LEFT
                object.hits(this, "left");
                if (!hitOne)
                    hitOne = "top";
            }
        });
        // switch (hitOne) {
        // case "top":
        //     this.airborne = false;
        //     break;
        // case "bottom":

        //     break;
        // case "right":

        //     break;
        // case "left":

        //     break;
        // default:
        //     this.airborne = true;
        //     this.wallJumpAllowed = false;
        // }
    }

    delete(holder, index) {
        if (!holder) {
            console.log(`Cannot find origin of Entity{name:'${this.type}'}, cannot remove.`);
        } else if (index !== undefined) {
            holder.splice(index, 1);
        } else {
            holder = undefined;
        }
    }
}