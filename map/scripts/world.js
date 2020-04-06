var wall = new Sprite("./wall.png");
var waterSpriteSheet = new SpriteSheet("./water.png", 32, 32);
var water = new Sprite(waterSpriteSheet);
var BLOCK_W = 32;
var BLOCK_H = 32;
var map = [0,1,1,1,1,1,1,1,1,1,
    0,1,0,0,1,1,1,0,0,1,
    1,1,0,0,0,0,0,0,0,1,
    1,1,0,0,1,1,1,0,0,1,
    1,1,0,1,0,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,
    1,1,0,0,1,1,1,0,0,1,
    1,1,1,1,1,1,1,0,0,1,
    1,1,1,1,1,1,1,1,1,1];


let drawMap = function(){
    let mapIndex = 0;
    for (let y = 0; y < 10; y=y+1) {
        for (let x = 0; x < 10; x=x+1, mapIndex++) {
            let x_new = x * BLOCK_W;
            let y_new = y * BLOCK_H;
            if(map[mapIndex] == 1) {
                wall.draw(x_new, y_new);
            }
            else {
                water.draw(x_new, y_new);
            }
        } 
    }
}