class Controller {
    #name; #index; #axes; #buttons; #mapType;

    constructor(gamepad) {
        this.#name = gamepad.id;
        this.#index = gamepad.index;
        this.#axes = gamepad.axes;
        this.#buttons = gamepad.buttons;
        this.#mapType = gamepad.mapping;

        this.vibration = gamepad.vibrationActuator;
    }

    // getters
    get axes() {return this.#axes}
    get buttons() {return this.#buttons}
}

class GenericGamepad extends Controller{

}

class Keyboard extends Controller {

}

class XboxOneGamepad extends Controller {
    constructor(gamepad) {
        super(gamepad)
    }
}

class NintendoProController extends Controller {

}

class SwitchJoycon extends Controller {

}

let controllerMappings = {
    keyboard: {
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
        }
    },
    gamepads: {
        XboxOne: {

        }
    }
};