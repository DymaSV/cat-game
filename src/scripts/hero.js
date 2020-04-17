import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { keyState } from "./keyboard";
import { SpriteCollisionFlags } from './collision';

class Hero {
    constructor(spriteSheet, x, y, speed, borderMoveWidth, borderMoveHeight) {
        this.sprite = new Sprite(spriteSheet, x, y);
        this.borderMoveWidth = borderMoveWidth;
        this.borderMoveHeight = borderMoveHeight;
        this.speed = speed;
        this.direction = DirectionEnum.none;
        this.lastDirection = DirectionEnum.none;

        this.obstaclesCollisionFlag = new SpriteCollisionFlags();
        this.heroEnemyCollision = false;
        this.heroFoodCollision = false;
        this.life = 2;
    }

    plusLife() {
        this.life++;
        document.getElementById("life-point").innerHTML = this.life;
    }

    move() {
        this.direction = DirectionEnum.none;
        if (keyState.keyLeftState) {
            this.direction = DirectionEnum.left;
            if (!this.obstaclesCollisionFlag.obstacleCollision || this.direction != this.obstaclesCollisionFlag.direction) {
                if (this.sprite.x - this.speed >= 0) {
                    this.sprite.x = this.sprite.x - this.speed;
                }
                this.obstaclesCollisionFlag.obstacleCollision = false;
            }
        }
        if (keyState.keyRightState) {
            this.direction = DirectionEnum.right;
            if (!this.obstaclesCollisionFlag.obstacleCollision || this.direction != this.obstaclesCollisionFlag.direction) {
                if (this.sprite.x + this.speed <= this.borderMoveWidth) {
                    this.sprite.x = this.sprite.x + this.speed;
                }
                this.obstaclesCollisionFlag.obstacleCollision = false;
            }
        }
        if (keyState.keyDownState) {
            this.direction = DirectionEnum.down;
            if (!this.obstaclesCollisionFlag.obstacleCollision || this.direction != this.obstaclesCollisionFlag.direction) {
                if (this.sprite.y + this.speed <= this.borderMoveHeight) {
                    this.sprite.y = this.sprite.y + this.speed;
                }
                this.obstaclesCollisionFlag.obstacleCollision = false;
            }
        }
        if (keyState.keyUpState) {
            this.direction = DirectionEnum.up;
            if (!this.obstaclesCollisionFlag.obstacleCollision || this.direction != this.obstaclesCollisionFlag.direction) {
                if (this.sprite.y - this.speed >= 0) {
                    this.sprite.y = this.sprite.y - this.speed;
                }
                this.obstaclesCollisionFlag.obstacleCollision = false;
            }
        }
        this.sprite.borderPoints.calculateBorderPointsDynamicObjects(
            this.sprite.x,
            this.sprite.y,
            this.sprite.canvasSpriteWidth,
            this.sprite.canvasSpriteHeight,
            this.getCollisionSize(this.direction));

        if (!this.obstaclesCollisionFlag.obstacleCollision) {
            this.obstaclesCollisionFlag.direction = this.direction;
            this.sprite.draw(this.sprite.x, this.sprite.y, this.direction);
        } else {
            this.sprite.draw(this.sprite.x, this.sprite.y, this.lastDirection);
        }
        this.lastDirection = this.direction;
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

export { Hero };