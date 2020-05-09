import { stage } from "./stage";


let mouseSpriteSheet = null;
let ghostSpriteSheet = null;
let catSpriteSheet = null;
let dogSpriteSheet = null;
let barrierSpriteSheet = null;
let landSpriteSheet = null;
let stoneSpriteSheet = null;
let pineSpriteSheet = null;
let houseSpriteSheet = null;
let teleportSpriteSheet = null;

class Character {
    constructor(){
        this.initCharacters();
    }

    initCharacters() {
        mouseSpriteSheet = stage.getSpriteSheet("mouse");
        ghostSpriteSheet = stage.getSpriteSheet("ghost");
        catSpriteSheet = stage.getSpriteSheet("cat");
        dogSpriteSheet = stage.getSpriteSheet("dog");
        barrierSpriteSheet = stage.getSpriteSheet("barrier");
        landSpriteSheet = stage.getSpriteSheet("land");
        stoneSpriteSheet = stage.getSpriteSheet("stone_1");
        pineSpriteSheet = stage.getSpriteSheet("pine");
        houseSpriteSheet = stage.getSpriteSheet("house");
        teleportSpriteSheet = stage.getSpriteSheet("teleport");
    }
}

let character = new Character();

export {
    character,
    landSpriteSheet,
    catSpriteSheet,
    dogSpriteSheet,
    ghostSpriteSheet,
    barrierSpriteSheet,
    mouseSpriteSheet,
    houseSpriteSheet,
    stoneSpriteSheet,
    pineSpriteSheet,
    teleportSpriteSheet
};
