class Spike extends MapObject
{
    constructor(pos, dim=[1, 1]) {
        super(pos, dim);
    }

    hits(entity) {
        entity.respawn();
    }

    draw() {
        super.draw("red");
    }
}