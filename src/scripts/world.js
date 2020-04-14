import { Sprite } from "./sprite";
import { waterSpriteSheet, wallSpriteSheet } from "./characters";
import { Obstacle } from './obstacle';

let obstaclesArray = new Array();
class World {
    constructor() {
        this.isObstaclesSaved = false;
        this.MAP_BLOCK_W = 64;
        this.MAP_BLOCK_H = 64;
        this.map = [
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
        this.initSprites();

    }

    initSprites() {
        this.wall = new Sprite(wallSpriteSheet);
        this.wall.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.wall.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.water = new Sprite(waterSpriteSheet);
        this.water.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.water.canvasSpriteHeight = this.MAP_BLOCK_H;
    }

    drawMap(contextWidth, contextHeight) {
        let mapIndex = 0;
        for (let y = 0; y < 10; y = y + 1) {
            if (y * this.MAP_BLOCK_W > contextHeight) { break; }
            for (let x = 0; x < 100; x = x + 1, mapIndex++) {
                if (mapIndex > this.map.length) { break; }
                if (x * this.MAP_BLOCK_W > contextWidth) { mapIndex--; break; }
                let x_new = x * this.MAP_BLOCK_W;
                let y_new = y * this.MAP_BLOCK_H;
                let obj = this.getSprite(this.map[mapIndex]);
                obj.draw(x_new, y_new);
                if (!this.isObstaclesSaved)
                    if (this.isActiveObstacle(this.map[mapIndex]))
                        obstaclesArray.push(new Obstacle(obj, x_new, y_new, true));
            }
        }
        this.isObstaclesSaved = true;
    }

    getSprite(flag) {
        switch (flag) {
            case 1:
                return this.wall;
            case 0:
                return this.water;
            default:
                return this.wall;
        }
    }

    isActiveObstacle(flag) {
        switch (flag) {
            case 1:
                return false;
            case 0:
                return true;
            default:
                return false;
        }
    }

}

export { World, obstaclesArray }
