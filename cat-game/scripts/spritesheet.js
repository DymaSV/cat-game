class SpriteSheet{
    constructor(filename, collisionWidth, collisionHeight, spriteSheetWidth, spritePositions){
        this.image = new Image();
        this.image.src = filename;
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
        this.spriteSheetWidth = spriteSheetWidth;
        this.spritePositions = spritePositions;
    }
}