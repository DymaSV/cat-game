import { SpriteSheet } from "./spritesheet";
import {
    EnemyPositions,
    HeroPositions,
    GhostPositions,
    MousePositions,
    CatInHousePositions
} from "./positions";

import mouseImage from '../images/mouse.png';
import wallImage from '../images/grass.jpg';
import waterImage from '../images/tree_2.png';
import dogImage from '../images/dog-sprite-sheet.png';
import ghostImage from '../images/cat-ghost.png';
import catImage from '../images/cats.png';
import houseImage from '../images/house.png';
import houseWinImage from '../images/house-sprite.png';
import catPawImage from '../images/cat-paw.png';
import mouseLogoImage from '../images/mouse-logo.png';

const mouseSpriteSheet = new SpriteSheet("mouse", mouseImage, 4, MousePositions);
const ghostSpriteSheet = new SpriteSheet("ghost", ghostImage, 3, GhostPositions);
const catSpriteSheet = new SpriteSheet("cat", catImage, 4, HeroPositions);
const dogSpriteSheet = new SpriteSheet("dog", dogImage, 5, EnemyPositions);
const waterSpriteSheet = new SpriteSheet("water", waterImage, null);
const wallSpriteSheet = new SpriteSheet("wall", wallImage, null);
const houseSpriteSheet = new SpriteSheet("house", houseImage, null);
const houseWinSpriteSheet = new SpriteSheet("houseWin", houseWinImage, 4, CatInHousePositions);

export {
    wallSpriteSheet,
    catSpriteSheet,
    dogSpriteSheet,
    ghostSpriteSheet,
    waterSpriteSheet,
    mouseSpriteSheet,
    houseSpriteSheet,
    houseWinSpriteSheet
};
