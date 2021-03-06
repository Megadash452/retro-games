let hero = new Hero([gridSize * 3.5, 500]);

const devMode = true;
let gravity = 1;
let gameSpeed = 1;

let xScroll = 0;
let yScroll = 0;
let frame = 0;


let keyPressed = {};
let controllers = {
    keyboards: [],
    gamepads: []
};


// map files must be at least 20 lines high

let room = new Room([0, 0], [26, 20]);

let mapObjects = [
    new Ground([2, 13], [18, 2]),
    new Ground([5, 12]),
    new Ground([8/(gridSize*0.03), 5], [2, 1]),
    new Ground([12, 5], [2, 1]),
    new Ground([7, 11], [2, 1]),
    new Ground([9, 11], [2, 1]),
    new Ground([13, 8], [5, 5]),
    new Ground([22, 9], [4, 1]),

    new Spike([21, 12], [1, 1])
];
let spikes = [];


window.addEventListener('keydown', event => {
    keyPressed[event.code] = true;
});
window.addEventListener('keyup', event => {
    keyPressed[event.code] = false;
});

window.addEventListener("gamepadconnected", function(e) {
    connected =  navigator.getGamepads();
    console.log(connected);
    console.log("/////////////")
    for (i=0; i < connected.length; i++) {
        let gamepad = connected[i];
        
        try{ 
            switch (gamepad.id) {
            case "Xbox 360 Controller (XInput STANDARD GAMEPAD)": // Xbox One
                controllers.gamepads.push(gamepad);
                break;
            case "Wireless Gamepad (STANDARD GAMEPAD Vendor: 057e Product: 2009)": // Nintendo Switch Pro Controller
                
                break;
            default:
                controllers.gamepads.push(gamepad);
            }
        }
        catch (e) {}
    }
});

function controllerManager() {
    gamepads = navigator.getGamepads();
    for (i=0; i < gamepads.length; i++) {
        controllers.gamepads[i] = gamepads[i];
    }

    setTimeout(() => controllerManager(), 1000);
}

let relTime = 0;
function loop() {
    // change state

    //console.log(controllers.gamepads)
    controllers.gamepads.forEach(gamepad => {
        let buttonIndex = 0;
        //console.log("gamepad: ", gamepad);
        
        if (gamepad) gamepad.buttons.forEach(button => {
            if (button.pressed) {
                console.log("button pressed: ", button, buttonIndex);
            }
            buttonIndex++;
        });
    });

    if (keyPressed["ArrowLeft"]) {
        hero.moveLeft();
    }
    else if (keyPressed["ArrowRight"]) {
        hero.moveRight();
    }
    if ((keyPressed["Space"] || keyPressed["ArrowUp"]) && !hero.wasJump && !hero.airborne) {
        hero.jump();
        hero.wasJump = true;
    } else if ((keyPressed["Space"] || keyPressed["ArrowUp"]) && !hero.wasJump && hero.airborne && hero.wallJumpAllowed) {
        hero.wallJump();
        hero.wasJump = true;
    } else if (!(keyPressed["Space"] || keyPressed["ArrowUp"])) {
        hero.wasJump = false;
    }
    if (keyPressed["ArrowDown"]) {
        hero.crouch();
    } else {
        hero.uncrouch();
    }

    hero.step();
    //hero.checkCollisions(hero.x - hero.dx, hero.y - hero.dy);

    // draw all
    erase();
    hero.draw();
    mapObjects.forEach(p => p.draw());
    room.draw();

    if (!(relTime % 5)) {
       frame++;
    }
    relTime++;
    setTimeout(() => loop(), 1000 / (gameSpeed * 60));

    
}

let animationCount = 0;
async function heroAnimation() {
    switch (animationCount % 3)
    {
    case 0:
        hero.movingSprite = heroWalkSprite1;
        animationCount = 0;
        break;
    case 1:
        hero.movingSprite = heroStandSprite;
        break;
    case 2:
        hero.movingSprite = heroWalkSprite2;
        break;
    }
    animationCount++;
    setTimeout(() => heroAnimation(), 100); //1000 - Math.abs(hero.dx*1000)
}

function loadFiles() {
    console.log("load files");

    // read controller mappigs
    let file = new XMLHttpRequest();
    
    file.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);
            console.log(arr);
        }
    };
    file.open("GET", "file:///C:/Users/marti/Desktop/Retro%20Games%20Club/Platformer/mappings.json", true);
    file.send();
}

// wait for images to load
async function loadGame() {
    await heroStandSprite.loaded;
    await heroJumpSprite.loaded;
    await heroWalkSprite1.loaded;
    await heroWalkSprite2.loaded;
    await groundSprite.loaded;
    await groundTopSprite.loaded;
    //loadFiles();
    loop();
    heroAnimation();
    controllerManager();
}
loadGame();