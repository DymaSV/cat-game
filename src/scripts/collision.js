import { Obstacle } from './obstacle';
import { DirectionEnum } from "./utility";

export class Collision {
    constructor() {
        this.heroEnemyCollision = false;
        this.heroWaterCollisionBegin = false;
        this.heroWaterCollisionEnd = false;
    }

    detectCollision(obj1, obj2) {
        if (obj1 && obj1)
            if (obj1.x < obj2.x + obj2.collisionWidth &&
                obj1.x + obj1.collisionWidth > obj2.x &&
                obj1.y < obj2.y + obj2.collisionHeight &&
                obj1.y + obj1.collisionHeight > obj2.y) {
                return true;
            }
        return false;
    }

    detectObstecleCollision(obj1, obj2) {
        switch (obj1.direction) {
            case DirectionEnum.left:
                break;
            case DirectionEnum.right:
                break;
            case DirectionEnum.down:
                break;
            case DirectionEnum.up:
                break;
            default:
                break;
        }
        if (obj1 && obj1)
            if (obj1.x < obj2.x + obj2.collisionWidth &&
                obj1.x + obj1.collisionWidth > obj2.x &&
                obj1.y < obj2.y + obj2.collisionHeight &&
                obj1.y + obj1.collisionHeight > obj2.y) {
                return true;
            }
        return false;
    }

    detectHeroEnemyCollision(hero, enemiesArray) {
        for (let i = 0; i < enemiesArray.length; i++) {
            if (!this.heroEnemyCollision) {
                this.heroEnemyCollision = this.detectCollision(hero.sprite, enemiesArray[i].sprite);
            }
            else { break; }
        }
    }

    detectHeroWaterCollision(object, obstacleArray) {
        for (let i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i] instanceof Obstacle && obstacleArray[i].isCollisionActive) {
                if (!this.heroWaterCollisionBegin && !this.heroWaterCollisionEnd) {
                    this.heroWaterCollisionBegin = this.detectObstecleCollision(object, obstacleArray[i]);
                }
                else { break; }
            }
        }
    }
}
