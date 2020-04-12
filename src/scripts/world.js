import { Sprite } from "./sprite";
import { SpriteSheet } from "./spritesheet";

var isWaterSaved = false;
let MAP_BLOCK_W = 32;
let MAP_BLOCK_H = 32;
let waterArray = new Array();
const waterSpriteSheet = new SpriteSheet("./images/water.png", 16, 16);
let wall = new Sprite("./images/wall.png");
let map = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    0,1,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,1,
    1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,0,1,0,1,1,0,0,1,1,1,0,1,0,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    0,1,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,1,
    1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,0,1,0,1,1,0,0,1,1,1,0,1,0,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function initMap() {
    let mapIndex = 0;
    for (let y = 0; y < 10; y=y+1) {
        for (let x = 0; x < 100; x=x+1, mapIndex++) {
            let x_new = x * MAP_BLOCK_W;
            let y_new = y * MAP_BLOCK_H;
            if(map[mapIndex] == 1) {
                wall.draw(x_new, y_new);
            } else {
                const water = new Sprite(waterSpriteSheet);
                water.draw(x_new, y_new);
                if(!isWaterSaved)
                    waterArray.push(water);
            }
        } 
    }
    isWaterSaved = true;
}

function drawMap(){
    let mapIndex = 0;
    for (let y = 0; y < 10; y=y+1) {
        for (let x = 0; x < 100; x=x+1, mapIndex++) {
            let x_new = x * MAP_BLOCK_W;
            let y_new = y * MAP_BLOCK_H;
            if(map[mapIndex] == 1) {
                wall.draw(x_new, y_new);
            }
        } 
    }
    for (let i = 0; i < waterArray.length; i++) {
        const element = waterArray[i];
        element.draw(element.x, element.y);
    }
}

export {MAP_BLOCK_W, MAP_BLOCK_H, waterArray, isWaterSaved, drawMap, initMap}
