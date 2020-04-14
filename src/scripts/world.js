import { Sprite } from "./sprite";
import { waterSpriteSheet, wallSpriteSheet } from "./characters";

var isWaterSaved = false;
let MAP_BLOCK_W = 64;
let MAP_BLOCK_H = 64;
let waterArray = new Array();
let map = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

function drawMap(contextWidth, contextHeight) {
    let wall = new Sprite(wallSpriteSheet);
    wall.canvasSpriteWidth = MAP_BLOCK_W;
    wall.canvasSpriteHeight = MAP_BLOCK_H;
    let mapIndex = 0;
    for (let y = 0; y < 10; y = y + 1) {
        if (y * MAP_BLOCK_W > contextHeight) { 
            break; 
        }
        for (let x = 0; x < 100; x = x + 1, mapIndex++) {
            if (mapIndex > map.length) { break; }
            if (x * MAP_BLOCK_W > contextWidth) { 
                mapIndex--; 
                break; 
            }
            let x_new = x * MAP_BLOCK_W;
            let y_new = y * MAP_BLOCK_H;

            if (map[mapIndex] == 1) {
                wall.draw(x_new, y_new);
            } else {
                const water = new Sprite(waterSpriteSheet);
                water.canvasSpriteWidth = MAP_BLOCK_W;
                water.canvasSpriteHeight = MAP_BLOCK_H;
                water.draw(x_new, y_new);
                if (!isWaterSaved)
                    waterArray.push(water);
            }
        }
    }
    isWaterSaved = true;
}

export { waterArray, isWaterSaved, drawMap }
