import { Sprite } from "./sprite";
import { DirectionEnum } from "./utility";
import { keyState } from "./keyboard";

class Hero {
    constructor(spriteSheet, x, y, speed, borderMoveWidth, borderMoveHeight) {
        this.sprite = new Sprite(spriteSheet, x, y);
        this.sprite.canvasSpriteWidth = 48;
        this.sprite.canvasSpriteHeight = 48;
        this.borderMoveWidth = borderMoveWidth;
        this.borderMoveHeight = borderMoveHeight;
        this.speed = speed;
        this.lastDirection = DirectionEnum.none;
        this.direction = DirectionEnum.none;
    }

    move(collision) {
        this.direction = DirectionEnum.none;
        if (keyState.keyLeftState) {
            if (!collision.heroWaterCollisionBegin) {
                if (this.sprite.x - this.speed >= 0) {
                    this.sprite.x = this.sprite.x - this.speed;
                }
                collision.heroWaterCollisionEnd = false;
            }
            this.direction = DirectionEnum.left;
        }
        if (keyState.keyRightState) {
            if (!collision.heroWaterCollisionBegin) {
                if (this.sprite.x + this.speed <= this.borderMoveWidth) {
                    this.sprite.x = this.sprite.x + this.speed;
                } 
                collision.heroWaterCollisionEnd = false;
            }
            this.direction = DirectionEnum.right;
        }
        if (keyState.keyDownState) {
            if (!collision.heroWaterCollisionBegin) {
                if (this.sprite.y + this.speed <= this.borderMoveHeight) {
                    this.sprite.y = this.sprite.y + this.speed;
                }
                collision.heroWaterCollisionEnd = false;
            }
            this.direction = DirectionEnum.down;
        }
        if (keyState.keyUpState) {
            if (!collision.heroWaterCollisionBegin) {
                if (this.sprite.y - this.speed >= 0) {
                    this.sprite.y = this.sprite.y - this.speed;
                }
                collision.heroWaterCollisionEnd = false;
            }
            this.direction = DirectionEnum.up;
        }
        if (this.lastDirection != this.direction) {
            this.lastDirection = this.direction;
            collision.heroWaterCollisionBegin = false;
            collision.heroWaterCollisionEnd = true;
        }
        this.sprite.draw(this.sprite.x, this.sprite.y, this.direction);
    }
}

export { Hero };