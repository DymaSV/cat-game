class SpriteSheet{
    constructor(filename, collisionWidth, collisionHeight){
        this.image = new Image();
        this.image.src = filename;
        this.collisionWidth = collisionWidth;
        this.collisionHeight = collisionHeight;
    }
}