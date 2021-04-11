class Controller {

}

class Keyboard extends Controller {

}

class XboxGamepad extends Controller {
    constructor(gamepad) {
        
    }
}

let pressActions = {
    jump: {
        main: "Space",
        aliases: ["ArrowUp"]
    },
    moveLeft: {
        main: "ArrowLeft",
        aliases: []
    },
    moveRight: {
        main: "ArrowRight",
        aliases: []
    },
    crouch: {
        main: "ArrowDown",
        aliases: []
    },
}
