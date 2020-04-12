import { Sprite } from "./sprite";
import { SpriteSheet } from "./spritesheet";

export let isWaterSaved = false;
var MAP_BLOCK_W = 32;
var MAP_BLOCK_H = 32;
export let waterArray = new Array();
var waterSpriteSheet = new SpriteSheet("./images/water.png", 16, 16);
var wall = new Sprite("./images/wall.png");

var map = [
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

export function initMap() {
    let mapIndex = 0;
    for (let y = 0; y < 10; y=y+1) {
        for (let x = 0; x < 100; x=x+1, mapIndex++) {
            let x_new = x * MAP_BLOCK_W;
            let y_new = y * MAP_BLOCK_H;
            if(map[mapIndex] == 1) {
                wall.draw(x_new, y_new);
            } else {
                var water = new Sprite(waterSpriteSheet);
                water.draw(x_new, y_new);
                if(!isWaterSaved)
                    waterArray.push(water);
            }
        } 
    }
    isWaterSaved = true;
}

export function drawMap(){
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