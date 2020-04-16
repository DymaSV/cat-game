import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { dogSpriteSheet } from "./characters";
import { SpriteCollisionFlags } from './collision';
import { obstaclesArray } from "./world";
import { Collision } from "./collision";

function createEnemies(count, borderMoveWidth, borderMoveHeight) {
    let enemiesArray = new Array();
    for (let i = 1; i < count+1; i++) {
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
        this.lastDirection = DirectionEnum.none;
        this.spriteCollisionFlags = new SpriteCollisionFlags();
        this.collision = new Collision();
        this.moveChoosed = false;
    }

    move() {
        // Check collision
        this.collision.detectObstacleCollision(this,obstaclesArray);
        // Get enemy cordinates and direction
        let enemyMoves = this.getEnemyCoordinates(this.sprite.x,
            this.sprite.y,
            this.speed,
            this.borderMoveWidth,
            this.borderMoveHeight);
        this.sprite.x = enemyMoves.x;
        this.sprite.y = enemyMoves.y;
        // Calculate border for character
        this.sprite.borderPoints.calculateBorderPointsDynamicObjects(
            this.sprite.x,
            this.sprite.y,
            this.sprite.canvasSpriteWidth,
            this.sprite.canvasSpriteHeight,
            this.getCollisionSize(this.direction));
        // Draw one move if it's possible
        if (!this.spriteCollisionFlags.obstacleCollision) {
            this.spriteCollisionFlags.direction = this.direction;
            this.sprite.draw(this.sprite.x, this.sprite.y, enemyMoves.direction);
        }
        else {
            this.sprite.draw(this.sprite.x, this.sprite.y, enemyMoves.direction);
        }
        this.lastDirection = this.direction;
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
            if (!this.spriteCollisionFlags.obstacleCollision || this.direction != this.spriteCollisionFlags.direction) {
                if (x - dxy >= 0) {
                    x = x - dxy;
                }
                this.spriteCollisionFlags.obstacleCollision = false;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.right) {
            if (!this.spriteCollisionFlags.obstacleCollision || this.direction != this.spriteCollisionFlags.direction) {
                if (x + dxy <= contextWidth) {
                    x = x + dxy;
                }
                this.spriteCollisionFlags.obstacleCollision = false;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.up) {
            if (!this.spriteCollisionFlags.obstacleCollision || this.direction != this.spriteCollisionFlags.direction) {
                if (y - dxy >= 0) {
                    y = y - dxy;
                }
                this.spriteCollisionFlags.obstacleCollision = false;
            } else {
                this.direction = DirectionEnum.none;
                this.getEnemyCoordinates(x, y, dxy, contextWidth, contextHeight);
            }
        }
        if (this.direction == DirectionEnum.down) {
            if (!this.spriteCollisionFlags.obstacleCollision || this.direction != this.spriteCollisionFlags.direction) {
                if (y + dxy <= contextHeight) {
                    y = y + dxy;
                }
                this.spriteCollisionFlags.obstacleCollision = false;
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
                return { left: 24, right: 24, up: 5, down: 5 };
            case DirectionEnum.right:
                return { left: 24, right: 24, up: 5, down: 5 };
            case DirectionEnum.up:
                return { left: 5, right: 5, up: 5, down: 5 };
            case DirectionEnum.down:
                return { left: 5, right: 5, up: 5, down: 24 };
            case DirectionEnum.none:
            default:
                return { left: 24, right: 24, up: 24, down: 24 };
        }
    }
}

export { Enemy, createEnemies };
