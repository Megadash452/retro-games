const radians = Math.PI/180;
const degrees = 180/Math.PI;

let canvas = document.getElementById("display");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let ctx = canvas.getContext('2d');

function loadSprite(src) {
    let image = new Image()
    let loaded = new Promise(readyToReturn => {
        image.onload = readyToReturn;
    })

    image.src = src;
    return {
        image: image,
        loaded: loaded,
    }
}
function erase() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

let shipSprite = loadSprite('ship.png');
let rockSprite = loadSprite('rock.png');




// class Canvas
// {
//     constructor(canvasSelector, ctx) {
//         this.canvas = document.querySelector(canvasSelector);
//         this.canvas.width = canvas.clientWidth;
//         this.canvas.height = canvas.clientHeight;
//         this.width = this.canvas.width;
//         this.height = this.canvas.height;
//         this.canvas.ctx = this.canvas.getContext(ctx);
//         this.ctx = this.canvas.getContext(ctx);
//     }

//     loadSprite(src) {
//         let image = new Image()
//         let loaded = new Promise(readyToReturn => {
//             image.onload = readyToReturn;
//         })
    
//         image.src = src;
//         return {
//             image: image,
//             loaded: loaded,
//         }
//     }
//     erase() {
//         ctx.fillStyle = 'black'
//         ctx.fillRect(0, 0, canvas.width, canvas.height)
//     }
// }
// let canvas = new Canvas("#display", '2d')
// let shipSprite = canvas.loadSprite('ship.png')
// let rockSprite = canvas.loadSprite('rock.png')