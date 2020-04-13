import { SpriteSheet } from "./spritesheet";
import { EnemyPositions, HeroPositions, BangPositions } from "./positions";

import wallImage from '../images/wall.png';
import waterImage from '../images/water.png';
import dogImage from '../images/dog-sprite-sheet.png';
import bangImage from '../images/bang.png';
import catImage from '../images/cats.png';

const bangSpriteSheet = new SpriteSheet(bangImage, 15, 15, 8, BangPositions);
const catSpriteSheet = new SpriteSheet(catImage, 10, 10, 4, HeroPositions);
const dogSpriteSheet = new SpriteSheet(dogImage, 10, 10, 5, EnemyPositions);
const waterSpriteSheet = new SpriteSheet(waterImage, 16, 16);
const wallSpriteSheet = new SpriteSheet(wallImage, 16, 16);

export{
    wallSpriteSheet, 
    catSpriteSheet, 
    dogSpriteSheet, 
    bangSpriteSheet, 
    waterSpriteSheet
};
