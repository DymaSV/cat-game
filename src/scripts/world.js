import { Sprite } from "./sprite";
import {
    barrierSpriteSheet,
    landSpriteSheet,
    houseSpriteSheet
} from "./characters";
import { Obstacle } from './obstacle';

let obstaclesArray = new Array();
class World {
    constructor(viewport) {
        this.MAP_BLOCK_W = 64;
        this.MAP_BLOCK_H = 64;
        this.map = [
            1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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
        this.viewport = viewport;
        this.initSprites();
    }

    initSprites() {
        this.land = new Sprite(landSpriteSheet, 0, 0, this.viewport);
        this.land.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.land.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.barrier = new Sprite(barrierSpriteSheet, 0, 0, this.viewport);
        this.barrier.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.barrier.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.house = new Sprite(houseSpriteSheet, 1000, 150, this.viewport);
        this.house.canvasSpriteWidth = 96;
        this.house.canvasSpriteHeight = 96;
    }

    drawMap() {
        obstaclesArray = new Array();
        for (let y = this.viewport.startTile[1]; y <= this.viewport.endTile[1]; y = y + 1) {
            for (let x = this.viewport.startTile[0]; x <= this.viewport.endTile[0]; x = x + 1) {
                let x_new = x * this.MAP_BLOCK_W;
                let y_new = y * this.MAP_BLOCK_H;
                let arr = this.getSprite(this.map[(y * this.viewport.mapW) + x]);
                if (arr.length > 1) {
                    arr.forEach(element => {
                        element.draw(x_new, y_new);
                    });
                } else {
                    arr[0].draw(x_new, y_new);
                }
                let object = arr[arr.length - 1];
                    if (this.isActiveObstacle(this.map[(y * this.viewport.mapW) + x])) {
                        let id = "el" + (y * this.viewport.mapW) + x;
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
        if (this.house.x < (1 + this.viewport.endTile[0]) * this.viewport.tileW &&
            this.house.y < (1 + this.viewport.endTile[1]) * this.viewport.tileH) {
            this.house.draw(
                this.house.x,
                this.house.y);
        }
            let id = "house";
            obstaclesArray.push(new Obstacle(id, this.house, this.house.x, this.house.y, true, this.MAP_BLOCK_W, this.MAP_BLOCK_H));
        this.isObstaclesSaved = true;
    }

    getSprite(flag) {
        switch (flag) {
            case 1:
                return [this.land];
            case 0:
                return [this.land, this.barrier];
            case 8:
                return [this.land]
            default:
                return [this.land];
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
