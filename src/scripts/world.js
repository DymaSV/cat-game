import { Sprite } from "./sprite";
import {
    barrierSpriteSheet,
    landSpriteSheet,
    houseSpriteSheet,
    teleportSpriteSheet
} from "./characters";
import { Obstacle } from './obstacle';
import { stage } from "./stage";

let obstaclesArray = new Array();
class World {
    constructor(viewport) {
        this.viewport = viewport;
        this.initSprites();
    }

    initSprites() {
        this.MAP_BLOCK_W = stage.getTileSize().width;
        this.MAP_BLOCK_H = stage.getTileSize().height;
        this.map = stage.getMap();

        this.land = new Sprite(stage.getSpriteSheet("land"), 0, 0, this.viewport);
        this.land.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.land.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.barrier = new Sprite(stage.getSpriteSheet("barrier"), 0, 0, this.viewport);
        this.barrier.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.barrier.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.barrier2 = new Sprite(stage.getSpriteSheet("barrier2"), 0, 0, this.viewport);
        this.barrier2.canvasSpriteWidth = 48;
        this.barrier2.canvasSpriteHeight = this.MAP_BLOCK_H;

        this.teleport = new Sprite(stage.getSpriteSheet("teleport"), 0, 0, this.viewport);
        this.teleport.spriteSheetWidth = 200;
        this.teleport.spriteSheetHeight = 350;
        this.teleport.canvasSpriteWidth = 48;
        this.teleport.canvasSpriteHeight = 64;

        this.stone = new Sprite(stage.getSpriteSheet("stone"), 0, 0, this.viewport);
        this.stone.canvasSpriteWidth = this.MAP_BLOCK_W;
        this.stone.canvasSpriteHeight = 46;

        this.house = new Sprite(
            stage.getSpriteSheet("house"),
            this.viewport.screen[0] - 96,
            this.viewport.mapH * stage.getTileSize().height - 96,
            this.viewport);
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
                    let id = object.spriteSheet.id;
                    obstaclesArray.push(new Obstacle(
                        id,
                        object,
                        x_new,
                        y_new,
                        true,
                        object.canvasSpriteWidth,
                        object.canvasSpriteHeight));
                }
            }
        }
        if (stage.isLastLevel()) {
            if (this.house.x < (1 + this.viewport.endTile[0]) * this.viewport.tileW &&
                this.house.y < (1 + this.viewport.endTile[1]) * this.viewport.tileH) {
                this.house.draw(
                    this.house.x,
                    this.house.y);
            }
            let id = "house";
            obstaclesArray.push(new Obstacle(
                id,
                this.house,
                this.house.x,
                this.house.y,
                true,
                this.house.canvasSpriteWidth,
                this.house.canvasSpriteHeight));
        }
    }

    getSprite(flag) {
        switch (flag) {
            case 1:
                return [this.land];
            case 0:
                return [this.land, this.barrier];
            case 2:
                return [this.land, this.barrier2];
            case 8:
                return [this.land, this.teleport];
            case 7:
                return [this.land, this.stone];
            default:
                return [this.land];
        }
    }

    isActiveObstacle(flag) {
        switch (flag) {
            case 1:
                return false;
            case 8:
            case 7:
            case 0:
            case 2:
                return true;
            default:
                return false;
        }
    }

}

export { World, obstaclesArray }
