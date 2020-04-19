class Obstacle {
    constructor(id, sprite, x, y, isCollisionActive, collisionWidth, collisionHeight) {
        this.id = id;
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
        this.canvasSpriteWidth = sprite.canvasSpriteWidth;
        this.canvasSpriteHeight = sprite.canvasSpriteHeight;
        this.x = x;
        this.y = y;
        this.isCollisionActive = isCollisionActive;

        this.borderPoints = new SpriteBorder();
        this.borderPoints.calculateBorderPointsStaticObjects(this.x, this.y, this.collisionWidth, this.collisionHeight)
    }
}

class SpriteBorder {
    constructor() {
        this.x_left = null;
        this.x_right = null;
        this.y_up = null;
        this.y_down = null;
    }
    calculateBorderPointsStaticObjects(x, y, width, height) {
        this.x_left = x;
        this.x_right = x + width;
        this.y_up = y;
        this.y_down = y + height;
    }
    calculateBorderPointsDynamicObjects(x, y, canvasSpriteWidth, canvasSpriteHeight, additionalSizes) {
        let center_x = x + canvasSpriteWidth / 2;
        let center_y = y + canvasSpriteHeight / 2;
        this.x_left = center_x - additionalSizes.left;
        this.x_right = center_x + additionalSizes.right;
        this.y_up = center_y - additionalSizes.up;
        this.y_down = center_y + additionalSizes.down;
    }
}

export { Obstacle, SpriteBorder };