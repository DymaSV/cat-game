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

class Stage {
    constructor() {
        this.level = 1;
        this.lastLevel = 5;
        this.initSpriteSheets();
    }

    initSpriteSheetsFirstLevel() {
        this.mouseSpriteSheet = new SpriteSheet("mouse", mouseImage, 4, MousePositions);
        this.ghostSpriteSheet = new SpriteSheet("ghost", ghostImage, 3, GhostPositions);
        this.catSpriteSheet = new SpriteSheet("cat", catImage, 4, HeroPositions);
        this.dogSpriteSheet = new SpriteSheet("dog", dogImage, 5, EnemyPositions);
        this.barrierSpriteSheet = new SpriteSheet("barrier", barrierImage, null);
        this.landSpriteSheet = new SpriteSheet("land", landImage, null);
        this.stoneSpriteSheet = new SpriteSheet("stone_1", stoneImage, null);
        this.houseSpriteSheet = new SpriteSheet("house", houseImage, null);
        this.teleportSpriteSheet = new SpriteSheet("teleport", teleportImage, 5, TeleportPositions);
    }

    initSpriteSheetsSecondLevel() {
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
    }

    initSpriteSheets() {
        switch (this.level) {
            case 1:
                this.initSpriteSheetsFirstLevel();
                break;
            case 2:
                this.initSpriteSheetsSecondLevel();
                break;
            case 3:
                this.initSpriteSheetsFirstLevel();
                break;
            case 4:
                this.initSpriteSheetsFirstLevel();
                break;
            case 5:
                this.initSpriteSheetsFirstLevel();
                break;
            default:
                this.initSpriteSheetsFirstLevel();
                break;
        }
    }

    resetLevel() {
        this.level = 1;
        initSpriteSheets();
    }

    upLevel() {
        this.level++;
        this.initSpriteSheets();
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

export let stage = new Stage();
