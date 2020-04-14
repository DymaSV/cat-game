class Obstacle {
    constructor(sprite, x, y, isCollisionActive) {
        this.collisionWidth = sprite.spriteSheet.collisionWidth;
        this.collisionHeight = sprite.spriteSheet.collisionHeight;
        this.canvasSpriteWidth = sprite.canvasSpriteWidth;
        this.canvasSpriteHeight = sprite.canvasSpriteHeight;
        this.x = x;
        this.y = y;
        this.isCollisionActive = isCollisionActive;

        this.borderPoints = new SpriteBorder();
        this.borderPoints.calculateBorderPoints(this.x, this.y, this.collisionWidth, this.collisionHeight)
    }
}

class SpriteBorder {
    constructor() {
        this.x_left = null;
        this.x_right = null;
        this.y_up = null;
        this.y_down = null;
    }
    calculateBorderPoints(x, y, width, height) {
        this.x_left = x - width / 2;
        this.x_right = x + width / 2;
        this.y_up = y - height / 2;
        this.y_down = y + height / 2;
    }
}

export { Obstacle, SpriteBorder };