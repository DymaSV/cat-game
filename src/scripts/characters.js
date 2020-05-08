import { SpriteSheet } from "./spritesheet";
import {
    EnemyPositions,
    HeroPositions,
    GhostPositions,
    MousePositions,
    CatInHousePositions
} from "./positions";

import mouseImage from '../images/mouse.png';
import landImage from '../images/grass.jpg';
import stoneImage from '../images/stone_1.png';
import barrierImage from '../images/tree_2.png';
import dogImage from '../images/dog-sprite-sheet.png';
import ghostImage from '../images/cat-ghost.png';
import catImage from '../images/cats.png';
import houseImage from '../images/house.png';
import houseWinImage from '../images/house-sprite.png';
import pineImage from '../images/pine.png';

// This import should be for transfer images to dist folder
import catPawImage from '../images/cat-paw.png';
import mouseLogoImage from '../images/mouse-logo.png';

const mouseSpriteSheet = new SpriteSheet("mouse", mouseImage, 4, MousePositions);
const ghostSpriteSheet = new SpriteSheet("ghost", ghostImage, 3, GhostPositions);
const catSpriteSheet = new SpriteSheet("cat", catImage, 4, HeroPositions);
const dogSpriteSheet = new SpriteSheet("dog", dogImage, 5, EnemyPositions);
const barrierSpriteSheet = new SpriteSheet("barrier", barrierImage, null);
const landSpriteSheet = new SpriteSheet("land", landImage, null);
const stoneSpriteSheet = new SpriteSheet("stone_1", stoneImage, null);
const pineSpriteSheet = new SpriteSheet("pine", pineImage, null);
const houseSpriteSheet = new SpriteSheet("house", houseImage, null);
const houseWinSpriteSheet = new SpriteSheet("houseWin", houseWinImage, 4, CatInHousePositions);

export {
    landSpriteSheet,
    catSpriteSheet,
    dogSpriteSheet,
    ghostSpriteSheet,
    barrierSpriteSheet,
    mouseSpriteSheet,
    houseSpriteSheet,
    houseWinSpriteSheet,
    stoneSpriteSheet,
    pineSpriteSheet
};
