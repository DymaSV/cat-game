class SpriteSheet{
    constructor(filename, collisionWidth, collisionHeight, spriteSheetWidth){
        this.image = new Image();
        this.image.src = filename;
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
        this.spriteSheetWidth = spriteSheetWidth;
    }
}