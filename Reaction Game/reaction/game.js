// set up our canvas to fill the screen

let canvas = document.getElementById('display')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let ctx = canvas.getContext('2d')

// game logic

let msUntilReady = 2000 + (Math.random() * 3000) // 2-5 seconds of waiting
let msUntilLate = msUntilReady + 100 // half a second to react

let start = new Date()
let ready = new Date(start.getTime() + msUntilReady)
let late = new Date(start.getTime() + msUntilLate)

window.addEventListener('keydown', event => {
    if (event.code == 'Enter')
    {
        let now = new Date()
        if (now < ready) {
            alert('too early!')
        }
        else if (now > late) {
            alert('too slow!')
        }
        else {
            alert('YOU WIN!!!')
        }
    }
    console.log("not 'Enter' key")
})

function drawRed()
{
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width/2 - 200/2, canvas.height/2 - 200/2, 200, 200);
}
function drawGreen()
{
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width/2 - 300/2, canvas.height/2 - 300/2, 300, 300);
}

function drawOutline(x_pos, y_pos, width, height, color="black")
{
    ctx.fillStyle = color;

    ctx.moveTo(x_pos, y_pos);
    ctx.lineTo(x_pos + width, y_pos);
    ctx.lineTo(x_pos + width, y_pos + height);
    ctx.lineTo(x_pos, y_pos + height);
    ctx.lineTo(x_pos, y_pos);

    ctx.stroke();
}

function drawSeriousFace()
{
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(95, 90);
    ctx.lineTo(50, 90);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
}


ctx.arc(10, 10, 30, 0, Math.PI, true);
setTimeout(() =>
{
    console.log('go!');
    ctx.clearRect(0, 0, canvas.width, canvas.height, 300, 300);
    drawGreen();
},
msUntilReady)
setTimeout(() =>
{
    console.log('stop!');
    ctx.clearRect(0, 0, canvas.width, canvas.height, 300, 300);
    drawRed();
},
msUntilLate)
