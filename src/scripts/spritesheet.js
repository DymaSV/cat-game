
export class SpriteSheet {
        constructor(filename, spriteSheetColumnsCount, spritePositions) {
                this.image = document.createElement("img");
                this.image.src = filename;
                this.spriteSheetColumnsCount = spriteSheetColumnsCount;
                this.spritePositions = spritePositions;
        }
}
