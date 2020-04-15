import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { dogSpriteSheet } from "./characters";


function createEnemies(count, borderMoveWidth, borderMoveHeight) {
    let enemiesArray = new Array();
    for (let i = 1; i < count; i++) {
        enemiesArray.push(new Enemy(dogSpriteSheet, i * 100, i * 45, 3, borderMoveWidth, borderMoveHeight));
    }
    return enemiesArray;
}
class Enemy {
    constructor(spriteSheet, x, y, speed, borderMoveWidth, borderMoveHeight) {
        this.sprite = new Sprite(spriteSheet, x, y);
        this.sprite.canvasSpriteWidth = 48;
        this.sprite.canvasSpriteHeight = 48;
        this.borderMoveWidth = borderMoveWidth;
        this.borderMoveHeight = borderMoveHeight;
        this.speed = speed;

        this.cirle = 10;
        this.moveCirle = 10;
        this.direction = DirectionEnum.none;
        this.moveChoosed = false;
    }

    move() {
        let enemyMoves = this.getEnemyCoordinates(this.sprite.x,
            this.sprite.y,
            this.speed,
            this.borderMoveWidth,
            this.borderMoveHeight);
        this.sprite.x = enemyMoves.x;
        this.sprite.y = enemyMoves.y;
        this.sprite.borderPoints.calculateBorderPointsDynamicObjects(
            this.sprite.x,
            this.sprite.y,
            this.sprite.canvasSpriteWidth,
            this.sprite.canvasSpriteHeight,
            this.getCollisionSize(this.direction));
        this.sprite.draw(this.sprite.x, this.sprite.y, enemyMoves.direction);
    }


    getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight) {
        if (!this.moveChoosed && this.moveCirle > 0) {
            this.direction = this.getRandomInt(4);
            this.moveChoosed = true;
        } else {
            this.moveCirle--;
            if (this.moveCirle <= 0) {
                this.moveChoosed = false;
                this.moveCirle = this.cirle;
            }
        }

        if (this.direction == DirectionEnum.left) {
            if (x - dxy >= 0) {
                x = x - dxy;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.right) {
            if (x + dxy <= contextWidth) {
                x = x + dxy;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.up) {
            if (y - dxy >= 0) {
                y = y - dxy;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.down) {
            if (y + dxy <= contextHeight) {
                y = y + dxy;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        let direction = this.direction
        return { x, y, direction };
    }

    getRandomInt(num) {
        return Math.floor(Math.random() * Math.floor(num));
    }

    getCollisionSize(direction) {
        switch (direction) {
            case DirectionEnum.left:
                return { left: 12, right: 12, up: 12, down: 12 };
            case DirectionEnum.right:
                return { left: 12, right: 12, up: 12, down: 12 };
            case DirectionEnum.up:
                return { left: 12, right: 12, up: 12, down: 12 };
            case DirectionEnum.down:
                return { left: 12, right: 12, up: 12, down: 12 };
            case DirectionEnum.none:
            default:
                return { left: 12, right: 12, up: 12, down: 12 };
        }
    }
}

export { Enemy, createEnemies };
