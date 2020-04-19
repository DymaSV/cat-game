import { Sprite } from "./sprite";
import {
    waterSpriteSheet,
    wallSpriteSheet,
    houseSpriteSheet
} from "./characters";
import { Obstacle } from './obstacle';

let obstaclesArray = new Array();
class World {
    constructor() {
        this.isObstaclesSaved = false;
        this.MAP_BLOCK_W = 64;
        this.MAP_BLOCK_H = 64;
        this.map = [
            1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1,
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

        this.house = new Sprite(houseSpriteSheet, 1000, 150);
        this.house.canvasSpriteWidth = 96;
        this.house.canvasSpriteHeight = 96;
    }

    drawMap(contextWidth, contextHeight) {
        let mapIndex = 0;
        for (let y = 0; y < 7; y = y + 1) {
            if (y * this.MAP_BLOCK_W > contextHeight) { break; }
            for (let x = 0; x < 20; x = x + 1, mapIndex++) {
                if (mapIndex > this.map.length) { break; }
                if (x * this.MAP_BLOCK_W > contextWidth) { mapIndex--; break; }
                let x_new = x * this.MAP_BLOCK_W;
                let y_new = y * this.MAP_BLOCK_H;
                let arr = this.getSprite(this.map[mapIndex]);
                if (arr.length > 1) {
                    arr.forEach(element => {
                        element.draw(x_new, y_new);
                    });
                } else {
                    arr[0].draw(x_new, y_new);
                }
                let object = arr[arr.length - 1];
                if (!this.isObstaclesSaved)
                    if (this.isActiveObstacle(this.map[mapIndex])) {
                        let id = "el" + mapIndex;
                        obstaclesArray.push(new Obstacle(
                            id,
                            object,
                            x_new,
                            y_new,
                            true,
                            this.MAP_BLOCK_W,
                            this.MAP_BLOCK_H));
                    }
            }
        }
        this.house.draw(this.house.x, this.house.y)
        if (!this.isObstaclesSaved) {
            let id = "house";
            obstaclesArray.push(new Obstacle(id, this.house, this.house.x, this.house.y, true, this.MAP_BLOCK_W, this.MAP_BLOCK_H));
        }
        this.isObstaclesSaved = true;
    }

    getSprite(flag) {
        switch (flag) {
            case 1:
                return [this.wall];
            case 0:
                return [this.wall, this.water];
            case 8:
                return [this.wall]
            default:
                return [this.wall];
        }
    }

    isActiveObstacle(flag) {
        switch (flag) {
            case 1:
                return false;
            case 8:
            case 0:
                return true;
            default:
                return false;
        }
    }

}

export { World, obstaclesArray }
