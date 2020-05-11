import { SpriteSheet } from "./spritesheet";
import {
    EnemyPositions,
    HeroPositions,
    GhostPositions,
    MousePositions,
    TeleportPositions
} from "./positions";

import mouseImage from '../images/mouse.png';
import landImage from '../images/grass.jpg';
import land2Image from '../images/land_2.png';
import stoneImage from '../images/volcano.png';
import barrierImage from '../images/tree_2.png';
import dogImage from '../images/dog-sprite-sheet.png';
import ghostImage from '../images/cat-ghost.png';
import catImage from '../images/cats.png';
import houseImage from '../images/house.png';
import pineImage from '../images/pine.png';
import teleportImage from '../images/teleport.png';
import treeVolcano1Image from '../images/trees_volcano_1.png';
import treeVolcano2Image from '../images/trees_volcano_2.png';

// This import should be for transfer images to dist folder
import catPawImage from '../images/cat-paw.png';
import mouseLogoImage from '../images/mouse-logo.png';

// Sounds
import sound_1 from '../sounds/theme-1.ogg';
import sound_2 from '../sounds/theme-2.mp3';

let isSoundActive = false;
class Stage {
    constructor() {
        this.level = 1;
        this.lastLevel = 5;
        this.sound = document.createElement("audio");

        this.initLevel();
        document.getElementById("sound").addEventListener("click", getSound)
    }

    initFirstLevel() {
        this.mouseSpriteSheet = new SpriteSheet("mouse", mouseImage, 4, MousePositions);
        this.ghostSpriteSheet = new SpriteSheet("ghost", ghostImage, 3, GhostPositions);
        this.catSpriteSheet = new SpriteSheet("cat", catImage, 4, HeroPositions);
        this.dogSpriteSheet = new SpriteSheet("dog", dogImage, 5, EnemyPositions);
        this.barrierSpriteSheet = new SpriteSheet("barrier", barrierImage, null);
        this.landSpriteSheet = new SpriteSheet("land", landImage, null);
        this.stoneSpriteSheet = new SpriteSheet("stone_1", stoneImage, null);
        this.houseSpriteSheet = new SpriteSheet("house", houseImage, null);
        this.teleportSpriteSheet = new SpriteSheet("teleport", teleportImage, 5, TeleportPositions);

        this.sound.src = sound_2;
        activateSoundLoop(this.sound);
    }

    initSecondLevel() {
        this.mouseSpriteSheet = new SpriteSheet("mouse", mouseImage, 4, MousePositions);
        this.ghostSpriteSheet = new SpriteSheet("ghost", ghostImage, 3, GhostPositions);
        this.catSpriteSheet = new SpriteSheet("cat", catImage, 4, HeroPositions);
        this.dogSpriteSheet = new SpriteSheet("dog", dogImage, 5, EnemyPositions);
        this.barrierSpriteSheet = new SpriteSheet("barrier", treeVolcano1Image, null);
        this.barrier2SpriteSheet = new SpriteSheet("barrier_2", treeVolcano2Image, null);
        this.landSpriteSheet = new SpriteSheet("land_2", land2Image, null);
        this.stoneSpriteSheet = new SpriteSheet("stone_1", stoneImage, null);
        this.houseSpriteSheet = new SpriteSheet("house", houseImage, null);
        this.teleportSpriteSheet = new SpriteSheet("teleport", teleportImage, 5, TeleportPositions);

        this.sound.src = sound_1;
        activateSoundLoop(this.sound);
    }

    initLevel() {
        switch (this.level) {
            case 1:
                this.initFirstLevel();
                break;
            case 2:
                this.initSecondLevel();
                break;
            case 3:
                this.initFirstLevel();
                break;
            case 4:
                this.initFirstLevel();
                break;
            case 5:
                this.initFirstLevel();
                break;
            default:
                this.initFirstLevel();
                break;
        }
    }

    resetLevel() {
        this.level = 1;
        initLevel();
    }

    upLevel() {
        this.level++;
        this.initLevel();
    }

    isLastLevel() {
        if (this.level == this.lastLevel)
            return true;
        return false;
    }

    getMap() {
        switch (this.level) {
            case 1:
                return [
                    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1,
                    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];
            case 2:
                return [
                    1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
                    1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    2, 1, 1, 2, 1, 1, 1, 1, 7, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    2, 1, 1, 7, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 0, 1, 2, 1, 1,
                    1, 2, 1, 1, 1, 0, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
                    1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
                    8, 1, 1, 1, 1, 1, 1, 8, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];
            default:
                return [
                    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                ];
        }
    }

    getTileSize() {
        switch (this.level) {
            case 1:
                return { width: 64, height: 64 };
            default:
                return { width: 64, height: 64 };
        }
    }

    getSpriteSheet(characterId) {
        switch (characterId) {
            case "mouse":
                return this.mouseSpriteSheet;
            case "ghost":
                return this.ghostSpriteSheet;
            case "cat":
                return this.catSpriteSheet;
            case "dog":
                return this.dogSpriteSheet;
            case "barrier":
                return this.barrierSpriteSheet;
            case "barrier2":
                return this.barrier2SpriteSheet;
            case "land":
                return this.landSpriteSheet;
            case "teleport":
                return this.teleportSpriteSheet;
            case "stone":
                return this.stoneSpriteSheet;
            case "house":
                return this.houseSpriteSheet;
        }
    }
}

function activateSoundLoop(sound) {
    if (!sound || !isSoundActive) { return; }
    sound.loop = true;
    sound.onended = function () {
        sound.play();
    }
    sound.play();
}

function getSound() {
    if (!isSoundActive) {
        isSoundActive = true;
    } else {
        isSoundActive = false;
    }

    if (isSoundActive) {
        activateSoundLoop(stage.sound)
    } else {
        stage.sound.pause();
    }
}

export let stage = new Stage();
