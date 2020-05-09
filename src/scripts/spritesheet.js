
export class SpriteSheet {
        constructor(id, filename, spriteSheetColumnsCount, spritePositions) {
                this.id = id;
                this.image = document.createElement("img");
                this.image.src = filename;
                this.spriteSheetColumnsCount = spriteSheetColumnsCount;
                this.spritePositions = spritePositions;
        }
}
