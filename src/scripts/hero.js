import { DirectionEnum } from "./utility";
import { keyState } from "./keyboard";
import { SpriteCollisionFlags } from './collision';
import { Collision } from "./collision";
import { obstaclesArray } from "./world";

class Hero {
    constructor(sprite, speed) {
        this.sprite = sprite;
        this.speed = speed;
        this.direction = DirectionEnum.none;
        this.lastDirection = DirectionEnum.none;

        this.obstaclesCollisionFlag = new SpriteCollisionFlags();
        this.heroEnemyCollision = false;
        this.heroFoodCollision = false;
        this.life = 3;
        this.steps = 120;
        this.isWin = false;
        this.collision = new Collision();
        this.winIndex = 0;
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
             if (this.sprite.x + this.speed <= this.sprite.viewport.endTile[0] *  this.sprite.viewport.tileW ) {
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
            if (this.sprite.y + this.speed <= this.sprite.viewport.endTile[1] *  this.sprite.viewport.tileH) {
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

    winMove() {
        if (this.winIndex >= 10) {
            this.sprite.spriteSheet.spritePositions = {
                win: [28, 28, 28, 29, 29, 29]
            };
        }
        this.sprite.draw(this.sprite.x, this.sprite.y, DirectionEnum.win);
        this.winIndex++;
    }

    getCollisionSize(direction) {
        switch (direction) {
            case DirectionEnum.left:
                return { left: 20, right: 20, up: 7, down: 7 };
            case DirectionEnum.right:
                return { left: 20, right: 20, up: 7, down: 7 };
            case DirectionEnum.up:
                return { left: 7, right: 7, up: 7, down: 7 };
            case DirectionEnum.down:
                return { left: 7, right: 7, up: 7, down: 20 };
            case DirectionEnum.none:
            default:
                return { left: 20, right: 20, up: 20, down: 20 };
        }
    }

    resetHero() {
        this.direction = DirectionEnum.none;
        this.lastDirection = DirectionEnum.none;
        this.heroEnemyCollision = false;
        this.heroFoodCollision = false;
        this.life = 3;
        this.steps = 120;
        this.updateHtml();
    }
}

export { Hero };