import { SpriteSheet } from "./spritesheet";
import { EnemyPositions, HeroPositions, BangPositions, MousePositions } from "./positions";

import wallImage from '../images/wall.png';
import waterImage from '../images/water.png';
import dogImage from '../images/dog-sprite-sheet.png';
import bangImage from '../images/bang.png';
import catImage from '../images/cats.png';
import mouseImage from '../images/mouse.png';

const bangSpriteSheet = new SpriteSheet(bangImage, 5, BangPositions);
const catSpriteSheet = new SpriteSheet(catImage, 4, HeroPositions);
const dogSpriteSheet = new SpriteSheet(dogImage, 5, EnemyPositions);
const waterSpriteSheet = new SpriteSheet(waterImage, null);
const wallSpriteSheet = new SpriteSheet(wallImage, null);
const mouseSpriteSheet = new SpriteSheet(mouseImage, 4, MousePositions);

export{
    wallSpriteSheet, 
    catSpriteSheet, 
    dogSpriteSheet, 
    bangSpriteSheet, 
    waterSpriteSheet, 
    mouseSpriteSheet
};
