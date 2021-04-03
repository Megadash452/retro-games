class MapObject
{
    constructor(pos, dim=[1, 1]) {
        this.x = pos[0] * gridSize;
        this.y = pos[1] * gridSize;
        this.width = dim[0] * gridSize;
        this.height = dim[1] * gridSize;
    }

    isBelow(x, y, entity) { // determines if the x and y coordinates given are below this ground's top border
        return  x + entity.width/2 >= this.x                // inner Left Boundary
            &&  x - entity.width/2 <= this.x + this.width   // inner Right Boundary
            &&  y - entity.height  >= this.y + this.height; // outer Bottom Boundary
    }
    isAbove(x, y, entity) { // opposite of 'isBelow;
        return  x + entity.width/2 >= this.x                // inner Left Boundary
            &&  x - entity.width/2 <= this.x + this.width   // inner Right Boundary
            &&  y                  <= this.y;               // outer Top Boundary
    }
    isToRight(x, y, entity) {
        return  y                  >  this.y                // inner Top Boundary
            &&  y - entity.height  <= this.y + this.height  // inner Bottom Boundary
            &&  x - entity.width/2 >= this.x + this.width;  // outer Right Boundary
    }
    isToLeft(x, y, entity) {
        return  y                  >  this.y                // inner Top Boundary
            &&  y - entity.height  <= this.y + this.height  // inner Bottom Boundary
            &&  x + entity.width/2 <= this.x;               // outer Left Boundary
    }

    contains(x, y, entity) {
        return  x + entity.width/2 > this.x                 // inner Left Boundary
            &&  x - entity.width/2 < this.x + this.width    // inner Right Boundary
            &&  y                  > this.y                 // inner Top Boundary
            &&  y - entity.height  < this.y + this.height   // inner Bottom Boundary
    }
    

    hits(entity, direction="") {
        // directions: top || bottom || right || left
        switch (direction) {
            case "top":
                //console.log("Entity{"+entity+"} hit MapObject{"+this+"} from the Top")
                break;

            case "bottom":
                //console.log("Entity{"+entity+"} hit MapObject{"+this+"} from the Bottom")
                break;

            case "right":
                //console.log("Entity{"+entity+"} hit MapObject{"+this+"} form the Right")
                break;

            case "left":
                //console.log("Entity{"+entity+"} hit MapObject{"+this+"} from the Left")
                break;
            
            default:
                //console.log("Entity{"+entity+"} hit MapObject{"+this+"}")
        }
    }

    draw(hitboxColor="grey") {
        if (devMode) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = hitboxColor;
            ctx.strokeRect(
                this.x + ctx.lineWidth/2 - xScroll,
                this.y + ctx.lineWidth/2 - yScroll,
                this.width - ctx.lineWidth,
                this.height - ctx.lineWidth
            );
        }
    }
}

class Room extends MapObject
{
    constructor(pos, dim) {
        super(pos, dim);
    }

    draw() {
        super.draw();
    }
}