import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { dogSpriteSheet, mouseSpriteSheet } from "./characters";
import { SpriteCollisionFlags } from './collision';
import { obstaclesArray } from "./world";
import { Collision } from "./collision";

function createEnemies(count, borderMoveWidth, borderMoveHeight) {
    let enemiesArray = new Array();
    for (let i = 1; i < count + 1; i++) {
        let dog = new Enemy(i, dogSpriteSheet, i * 100, i * 35, 3, borderMoveWidth, borderMoveHeight)
        dog.sprite.canvasSpriteWidth = 60;
        dog.sprite.canvasSpriteHeight = 60;
        enemiesArray.push(dog);
    }
    return enemiesArray;
}


function createFood(count, borderMoveWidth, borderMoveHeight) {
    let food = new Array();
    for (let i = 1; i < count + 1; i++) {
        let mouse = new Enemy(i, mouseSpriteSheet, i * 100, i * 30, 4, borderMoveWidth, borderMoveHeight);
        mouse.sprite.spriteSheetHeight = 50;
        mouse.sprite.spriteSheetWidth = 50;
        mouse.sprite.canvasSpriteWidth = 25;
        mouse.sprite.canvasSpriteHeight = 25;
        food.push(mouse);
    }
    return food;
}

class Enemy {
    constructor(id, spriteSheet, x, y, speed, borderMoveWidth, borderMoveHeight) {
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

export { Enemy, createEnemies, createFood };
