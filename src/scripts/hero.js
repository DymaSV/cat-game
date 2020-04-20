import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { keyState } from "./keyboard";
import { SpriteCollisionFlags } from './collision';
import { Collision } from "./collision";
import { obstaclesArray } from "./world";

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
        this.steps = 120;
        this.isWin = false;
        this.collision = new Collision();
    }

    plusLife() {
        this.life++;
        this.steps = this.steps + 60;
        this.updateHtml();
    }

    catStep() {
        this.steps--;
        this.updateHtml();
        if (this.steps == 0 && this.life == 0) {
            this.heroEnemyCollision = true
        }
        if (this.steps == 0 && this.life > 0) {
            this.life--;
            this.steps = this.steps + 60;
            this.updateHtml();
        }
    }

    updateHtml() {
        document.getElementById("life-point").innerHTML = this.life;
        document.getElementById("cat-steps").innerHTML = this.steps;
    }

    move() {
        this.direction = DirectionEnum.none;
        if (keyState.keyLeftState) {
            this.direction = DirectionEnum.left;
            if (this.sprite.x - this.speed >= 0) {
                this.sprite.x = this.sprite.x - this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (!this.obstaclesCollisionFlag.obstacleCollision) {
                    this.catStep();
                } else {
                    this.sprite.x = this.sprite.x + this.speed;
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            }
        }
        if (keyState.keyRightState) {
            this.direction = DirectionEnum.right;
            if (this.sprite.x + this.speed <= this.borderMoveWidth) {
                this.sprite.x = this.sprite.x + this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (!this.obstaclesCollisionFlag.obstacleCollision) {
                    this.catStep();
                } else {
                    this.sprite.x = this.sprite.x - this.speed;
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            }
        }
        if (keyState.keyDownState) {
            this.direction = DirectionEnum.down;
            if (this.sprite.y + this.speed <= this.borderMoveHeight) {
                this.sprite.y = this.sprite.y + this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (!this.obstaclesCollisionFlag.obstacleCollision) {
                    this.catStep();
                } else {
                    this.sprite.y = this.sprite.y - this.speed;
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            }
        }
        if (keyState.keyUpState) {
            this.direction = DirectionEnum.up;
            if (this.sprite.y - this.speed >= 0) {
                this.sprite.y = this.sprite.y - this.speed;
                this.collision.detectObstacleCollision(this, obstaclesArray)
                if (!this.obstaclesCollisionFlag.obstacleCollision) {
                    this.catStep();
                } else {
                    this.sprite.y = this.sprite.y + this.speed;
                    this.obstaclesCollisionFlag.obstacleCollision = false;
                }
            }
        }
        this.sprite.borderPoints.calculateBorderPointsDynamicObjects(
            this.sprite.x,
            this.sprite.y,
            this.sprite.canvasSpriteWidth,
            this.sprite.canvasSpriteHeight,
            this.getCollisionSize(this.direction));

        this.sprite.draw(this.sprite.x, this.sprite.y, this.direction);
        this.lastDirection = this.direction;
    }

    checkSameDirection(direction, obstaclesDirection) {
        if (obstaclesDirection.obstacleCollision) {
            switch (obstaclesDirection.direction) {
                case DirectionEnum.right:
                    if (direction == DirectionEnum.left)
                        return true;
                    return false;
                case DirectionEnum.left:
                    if (direction == DirectionEnum.right)
                        return true;
                    return false;
                case DirectionEnum.up:
                    if (direction == DirectionEnum.down)
                        return true;
                    return false;
                case DirectionEnum.down:
                    if (direction == DirectionEnum.up)
                        return true;
                    return false;
                default:
                    return false;
            }
        }
        return false;
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

    resetHero() {
        this.direction = DirectionEnum.none;
        this.lastDirection = DirectionEnum.none;
        this.heroEnemyCollision = false;
        this.heroFoodCollision = false;
        this.life = 2;
        this.steps = 120;
        this.updateHtml();
    }
}

export { Hero };