import { Sprite } from "./sprite";
import { dogSpriteSheet, mouseSpriteSheet } from "./characters";
import { Enemy } from "./enemy";
import { DirectionEnum } from "./utility";
import { obstaclesArray } from "./world";
import { Collision } from "./collision";

class Factory {
    constructor() {
        this.collision = new Collision();
    }
    createEnemies(count, viewport) {
        let enemiesArray = new Array();
        for (let i = 1; i < count + 1; i++) {
            let dog = this.getEnemyInstance(i, i * 130, i * 50, viewport);
            dog.sprite.canvasSpriteWidth = 60;
            dog.sprite.canvasSpriteHeight = 60;
            enemiesArray.push(dog);
        }
        return enemiesArray;
    }

    getEnemyInstance(id, x, y, viewport) {
        let enemy = new Enemy(
            id,
            new Sprite(dogSpriteSheet, x, y, viewport),
            3,
            this.enemyCollisionSize);
        enemy.move();
        this.collision.detectObstacleCollision(enemy, obstaclesArray);
        if (enemy.obstaclesCollisionFlag.obstacleCollision) {
            enemy.obstaclesCollisionFlag.obstacleCollision = false;
            return this.getEnemyInstance(id, x + 80, y + 10, viewport)
        }
        return enemy;
    }

    createFood(count, viewport) {
        let food = new Array();
        for (let i = 1; i < count + 1; i++) {
            let mouse = this.getFoodInstance(i, i * 100, i * 20, viewport)
            food.push(mouse);
        }
        return food;
    }

    getFoodInstance(id, x, y, viewport) {
        let mouse = new Enemy(
            id,
            new Sprite(mouseSpriteSheet, x, y, viewport),
            4,
            this.mouseCollisionSize);
        mouse.sprite.spriteSheetHeight = 50;
        mouse.sprite.spriteSheetWidth = 50;
        mouse.sprite.canvasSpriteWidth = 25;
        mouse.sprite.canvasSpriteHeight = 25;
        mouse.move();
        this.collision.detectObstacleCollision(mouse, obstaclesArray);
        if (mouse.obstaclesCollisionFlag.obstacleCollision) {
            mouse.obstaclesCollisionFlag.obstacleCollision = false;
            return this.getFoodInstance(id, x + 100, y + 10, viewport)
        }
        return mouse;
    }

    updateFoodArray(foodArray, id) {
        if (id) {
            return foodArray.filter(function (el) { return el.id != id; });
        }
    }

    enemyCollisionSize(direction) {
        switch (direction) {
            case DirectionEnum.left:
                return { left: 20, right: 20, up: 20, down: 20 };
            case DirectionEnum.right:
                return { left: 20, right: 20, up: 20, down: 20 };
            case DirectionEnum.up:
                return { left: 20, right: 20, up: 20, down: 20 };
            case DirectionEnum.down:
                return { left: 20, right: 20, up: 20, down: 20 };
            case DirectionEnum.none:
            default:
                return { left: 20, right: 20, up: 20, down: 20 };
        }
    }

    mouseCollisionSize(direction) {
        switch (direction) {
            case DirectionEnum.left:
                return { left: 10, right: 10, up: 10, down: 10 };
            case DirectionEnum.right:
                return { left: 10, right: 10, up: 10, down: 10 };
            case DirectionEnum.up:
                return { left: 10, right: 10, up: 10, down: 10 };
            case DirectionEnum.down:
                return { left: 10, right: 10, up: 10, down: 10 };
            case DirectionEnum.none:
            default:
                return { left: 10, right: 10, up: 10, down: 10 };
        }
    }
}

export { Factory };