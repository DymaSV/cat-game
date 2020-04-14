
export class SpriteSheet {
        constructor(filename, collisionWidth, collisionHeight, spriteSheetColumnsCount, spritePositions) {
                this.image = document.createElement("img");
                this.image.src = filename;
                this.collisionWidth = collisionWidth;
                this.collisionHeight = collisionHeight;
                this.spriteSheetColumnsCount = spriteSheetColumnsCount;
                this.spritePositions = spritePositions;
        }
}
