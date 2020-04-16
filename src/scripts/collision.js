import { Obstacle } from './obstacle';
import { DirectionEnum } from "./utility";

export class SpriteCollisionFlags {
    constructor() {
        this.obstacleCollision = false;
        this.direction = DirectionEnum.none;
    }
}
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
        let bp1 = obj1.sprite.borderPoints;
        let bp2 = obj2.borderPoints;
        if (bp1.x_left)
            switch (obj1.direction) {
                case DirectionEnum.left:
                    if ((bp1.x_left <= bp2.x_right && bp1.x_left >= bp2.x_left) &&
                        ((bp1.y_up >= bp2.y_up && bp1.y_up <= bp2.y_down) ||
                            (bp1.y_down <= bp2.y_down && bp1.y_down >= bp2.y_up))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.right:
                    if ((bp1.x_right >= bp2.x_left && bp1.x_right <= bp2.x_right) &&
                        ((bp1.y_up >= bp2.y_up && bp1.y_up <= bp2.y_down) ||
                            (bp1.y_down <= bp2.y_down && bp1.y_down >= bp2.y_up))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.down:
                    if ((bp1.y_down >= bp2.y_up && bp1.y_down <= bp2.y_down) &&
                        ((bp1.x_left >= bp2.x_left && bp1.x_left <= bp2.x_right) ||
                            (bp1.x_right <= bp2.x_right && bp1.x_right >= bp2.x_left))) {
                        return true;
                    }
                    return false;
                case DirectionEnum.up:
                    if ((bp1.y_up <= bp2.y_down && bp1.y_up >= bp2.y_up) &&
                        ((bp1.x_left >= bp2.x_left && bp1.x_left <= bp2.x_right) ||
                            (bp1.x_right <= bp2.x_right && bp1.x_right >= bp2.x_left))) {
                        return true;
                    }
                    return false;
                default:
                    return false;
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

    detectObstacleCollision(object, obstacleArray) {
        for (let i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i] instanceof Obstacle && obstacleArray[i].isCollisionActive) {
                if (!object.spriteCollisionFlags.obstacleCollision) {
                    object.spriteCollisionFlags.obstacleCollision = this.detectObstecleCollision(object, obstacleArray[i]);
                }
                else { break; }
            }
        }
    }
}
