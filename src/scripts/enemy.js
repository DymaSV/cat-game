import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { SpriteCollisionFlags } from './collision';
import { obstaclesArray } from "./world";
import { Collision } from "./collision";

class Enemy {
    constructor(id, spriteSheet, x, y, speed, borderMoveWidth, borderMoveHeight, getCollisionSize) {
        this.id = id;
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
        this.obstaclesCollisionFlag = new SpriteCollisionFlags();
        this.collision = new Collision();
        this.moveChoosed = false;
        this.getCollisionSize = getCollisionSize;
    }

    move() {
        // Get enemy cordinates and direction
        this.getEnemyCoordinates(
            this.borderMoveWidth,
            this.borderMoveHeight);
        // Calculate border for character
        this.sprite.borderPoints.calculateBorderPointsDynamicObjects(
            this.sprite.x,
            this.sprite.y,
            this.sprite.canvasSpriteWidth,
            this.sprite.canvasSpriteHeight,
            this.getCollisionSize(this.direction));
        // Draw one move if it's possible
        this.sprite.draw(this.sprite.x, this.sprite.y, this.direction);
        this.lastDirection = this.direction;
    }

    resetMove() {
        this.moveChoosed = false;
        this.moveCirle = this.cirle;
    }

    getEnemyCoordinates(contextWidth, contextHeight) {
        if (!this.moveChoosed && this.moveCirle > 0) {
            this.direction = this.getRandomInt(4);
            this.moveChoosed = true;
        } else {
            this.moveCirle--;
            if (this.moveCirle <= 0) {
                this.resetMove();
            }
        }

        if (this.direction == DirectionEnum.left) {
            if (this.sprite.x - this.speed >= 0) {
                this.sprite.x = this.sprite.x - this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (this.obstaclesCollisionFlag.obstacleCollision) {
                    this.sprite.x = this.sprite.x + this.speed;
                    this.resetMove();
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            } else {
                this.direction = DirectionEnum.none;
                this.resetMove();
            }
        }
        if (this.direction == DirectionEnum.right) {
            if (this.sprite.x + this.speed < contextWidth) {
                this.sprite.x = this.sprite.x + this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (this.obstaclesCollisionFlag.obstacleCollision) {
                    this.sprite.x = this.sprite.x - this.speed;
                    this.resetMove();
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            } else {
                this.direction = DirectionEnum.none;
                this.resetMove();
            }
        }
        if (this.direction == DirectionEnum.up) {
            if (this.sprite.y - this.speed >= 0) {
                this.sprite.y = this.sprite.y - this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (this.obstaclesCollisionFlag.obstacleCollision) {
                    this.sprite.y = this.sprite.y + this.speed;
                    this.resetMove();
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            } else {
                this.direction = DirectionEnum.none;
                this.resetMove();
            }
        }
        if (this.direction == DirectionEnum.down) {
            if (this.sprite.y + this.speed < contextHeight) {
                this.sprite.y = this.sprite.y + this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (this.obstaclesCollisionFlag.obstacleCollision) {
                    this.sprite.y = this.sprite.y - this.speed;
                    this.resetMove();
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            } else {
                this.direction = DirectionEnum.none;
                this.resetMove();
            }
        }
    }

    getRandomInt(num) {
        return Math.floor(Math.random() * Math.floor(num));
    }
}

export { Enemy};
