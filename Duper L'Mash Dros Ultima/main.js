const radians = Math.PI/180;
const degrees = 180/Math.PI;

class Canvas{
    constructor(id, dim)
    {
        this.element = document.getElementById(id);
        this.ctx = this.element.getContext(dim);

        this.element.width = document.body.clientWidth;
        this.element.height = document.body.clientHeight;
        this.width = this.element.width;
        this.height = this.element.height;
    }

    set backgroundColor(color) {
        this.element.style.backgroundColor = color;
    }
    clear() {
        //this.ctx.fillStyle = "rgba(0, 0, 0, 0)";
        //this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.clearRect(0, 0, this.width, this.height)
    }


    drawRectangle(coords, dimensions, color="#000000")
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(coords[0], coords[1], dimensions[0], dimensions[1]);
    }
    drawRectangleOutline(coords, dimensions, stroke=1, color="#000000")
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;

        this.ctx.fillRect(
            coords[0], coords[1],
            dimensions[0], dimensions[1]
        );
        this.ctx.clearRect(
            coords[0] + stroke, coords[1] + stroke,
            dimensions[0] - stroke * 2, dimensions[1] - stroke * 2
        );
    }

    drawCircle(center, radius, color="#000000")
    {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(center[0] + radius, center[1]);
        this.ctx.arc(
            center[0], center[1],
            radius,
            0, 2 * Math.PI
        );
        this.ctx.stroke();
    }
    drawArc(center, radius, angles, direction="counter-clockwise", color="#000000")
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;

        const sA = angles[0] * radians;
        const eA = angles[1] * radians;

        if (direction.toLowerCase() == "counterclockwise"||
            direction.toLowerCase() == "counter-clockwise")
        {
            this.ctx.moveTo(
                center[0] + radius * Math.cos(sA),
                center[1] - radius * Math.sin(sA)
            );
            this.ctx.arc(
                center[0], center[1],
                radius,
                -sA, -eA,
                true
            );
        }
        else if (direction.toLowerCase() == "clockwise")
        {
            this.ctx.moveTo(
                center[0] + radius * Math.cos(sA),
                center[1] + radius * Math.sin(sA)
            );
            this.ctx.arc(
                center[0], center[1],
                radius,
                sA, eA
            );
        }
        this.ctx.stroke();
    }
    drawPie(center, radius, angles, direction="counter-clockwise", color="#000000")
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;

        this.ctx.moveTo(center[0], center[1]);

        const sA = angles[0] * radians;
        const eA = angles[1] * radians;

        if (direction.toLowerCase() == "counterclockwise"||
            direction.toLowerCase() == "counter-clockwise")
        {
            this.ctx.lineTo(
                center[0] + radius * Math.cos(sA),
                center[1] - radius * Math.sin(sA)
            );
            this.ctx.arc(
                center[0], center[1],
                radius,
                -sA, -eA,
                true
            );
        }
        else if (direction.toLowerCase() == "clockwise")
        {
            this.ctx.lineTo(
                center[0] + radius * Math.cos(sA),
                center[1] + radius * Math.sin(sA)
            );
            this.ctx.arc(
                center[0], center[1],
                radius,
                sA, eA
            );
        }
        this.ctx.lineTo(center[0], center[1]);
        this.ctx.stroke();
    }
}

let canvas = new Canvas("game", "2d");

canvas.backgroundColor = "#555555";
canvas.drawRectangleOutline([0, 0], [50, 50], stroke=1, color="red");

canvas.drawCircle([200, 100], 20);
canvas.drawPie([100, 100], 50, [0, 150], "clockwise");