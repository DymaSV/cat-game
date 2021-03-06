class ViewPort {
    constructor(tileW, tileH, mapW, mapH, contextWidth, contextHeight) {
        this.screen = [contextWidth, contextHeight];
        this.startTile = [0, 0];
        this.endTile = [0, 0];
        this.offset = [0, 0];
        this.tileW = tileW;
        this.tileH = tileH;
        this.mapW = mapW,
        this.mapH = mapH;
    }
    update(px, py) {
        if (px > this.screen[0] / 2) {
            this.offset[0] = Math.floor((this.screen[0] / 2)) - px;
        }
        if (py > this.screen[1] / 2) {
            this.offset[1] = Math.floor((this.screen[1] / 2)) - py;
        }

        var tile = [
            Math.floor(px / this.tileW),
            Math.floor(py / this.tileH)
        ];

        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / this.tileW);
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / this.tileH);
        if (this.startTile[0] < 0) { this.startTile[0] = 0; }
        if (this.startTile[1] < 0) { this.startTile[1] = 0; }

        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]) / this.tileW);
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]) / this.tileH);

        if (this.endTile[0] >= this.mapW) { this.endTile[0] = this.mapW; }
        if (this.endTile[1] >= this.mapH) { this.endTile[1] = this.mapH; }
    }
    reset() {
        this.startTile = [0, 0];
        this.endTile = [0, 0];
        this.offset = [0, 0];
    }
}

export { ViewPort };