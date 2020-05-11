import $ from 'jquery';

let key_left = 37;
let key_right = 39;
let key_up = 38;
let key_down = 40;
let key_shift = 16;

class KeyActiveState {
    constructor() {
        this.keyShiftState = false;

        this.keyLeftState = false;
        this.keyRightState = false;
        this.keyUpState = false;
        this.keyDownState = false;

        this.upLeftState = false;
        this.upRightState = false;
        this.downLeftState = false;
        this.downRightState = false;
      }
}

const keyState = new KeyActiveState();
function initKeyEvents(){
    $(document).keydown(function(e){
        if (e.keyCode == key_shift) {
            keyState.keyShiftState = true;
        }
        //One direction
        if (e.keyCode == key_left) {
            keyState.keyLeftState = true;
        }
        if (e.keyCode == key_right) {
            keyState.keyRightState = true;
        }
        if (e.keyCode == key_up) {
            keyState.keyUpState = true;
        }
        if (e.keyCode == key_down) {
            keyState.keyDownState = true;
        }

        //Two direction
        if (keyState.keyLeftState && keyState.keyUpState) {
            keyState.upLeftState = true;
        }
        if (keyState.keyRightState && keyState.keyUpState) {
            keyState.upRightState = true;
        }
        if (keyState.keyLeftState && keyState.keyDownState) {
            keyState.downLeftState = true;
        }
        if (keyState.keyRightState && keyState.keyDownState) {
            keyState.downRightState = true;
        }
    });

    $(document).keyup(function(e){
        if (e.keyCode == key_shift) {
            keyState.keyShiftState = false;
        }
        //Direction
        if (e.keyCode == key_left) {
            keyState.keyLeftState = false;
        }
        if (e.keyCode == key_right) {
            keyState.keyRightState = false;
        }
        if (e.keyCode == key_up) {
            keyState.keyUpState = false;
        }
        if (e.keyCode == key_down) {
            keyState.keyDownState = false;
        }

         //Two direction
        if (keyState.keyLeftState && keyState.keyUpState) {
            keyState.upLeftState = false;
        }
        if (keyState.keyRightState && keyState.keyUpState) {
            keyState.upRightState = false;
        }
        if (keyState.keyLeftState && keyState.keyDownState) {
            keyState.downLeftState = false;
        }
        if (keyState.keyRightState && keyState.keyDownState) {
            keyState.downRightState = false;
        }
    });
}

export { keyState, initKeyEvents };