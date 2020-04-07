var heroEnemyCollision = false;
var heroWaterCollisionBegin = false;
var heroWaterCollisionEnd = false;
var lastDirection = DirectionEnum.none;
var Context = null;
var contextWidth = 1280;
var contextHeight = 960;
let dogSpriteSheet = new SpriteSheet("./images/dog-sprite-sheet.png", 10, 10, 5, EnemyPositions);
var wall = new Sprite("./images/wall.png");
var waterSpriteSheet = new SpriteSheet("./images/water.png", 16, 16);
var bangSpriteSheet = new SpriteSheet("./images/bang.png", 15, 15, 8, BangPositions);
var catSpriteSheet = new SpriteSheet("./images/cats.png", 10, 10, 4, HeroPositions);
var bang = new Sprite(bangSpriteSheet);
var cat = new Sprite(catSpriteSheet);
var cat_x = cat.x = 0;
var cat_y = cat.y = 0;
let enemiesArray = new Array();
let waterArray = new Array();
let collision = new Collision();    

let heroMove = function(){
    let direction = DirectionEnum.none;
    if(keyState.keyLeftState){
        if(!heroWaterCollisionBegin){
            cat_x = cat_x-1;
            heroWaterCollisionEnd = false;
        }
        direction = DirectionEnum.left;
    }
    if(keyState.keyRightState){
        if(!heroWaterCollisionBegin){
            cat_x = cat_x+1;
            heroWaterCollisionEnd = false;
        }
        direction = DirectionEnum.right;
    }
    if(keyState.keyDownState){
        if(!heroWaterCollisionBegin){
            cat_y = cat_y+1;
            heroWaterCollisionEnd = false;
        }
        direction = DirectionEnum.down;
    }
    if(keyState.keyUpState){
        if(!heroWaterCollisionBegin){
            cat_y = cat_y-1;
            heroWaterCollisionEnd = false;
        }
        direction = DirectionEnum.up;
    }
    if(lastDirection != direction) {
        lastDirection = direction;
        heroWaterCollisionBegin = false;
        heroWaterCollisionEnd = true;
    }
    cat.draw(cat_x, cat_y, direction);
}
let enemyMove = function(){
    for (let i = 0; i < enemiesArray.length; i++) {
            enemiesArray[i].move();
    }
}
let detectHeroEnemyCollision = function(){
    for (let i = 0; i < enemiesArray.length; i++) {
        if(!heroEnemyCollision){
            heroEnemyCollision = collision.detectCollision(cat, enemiesArray[i].sprite);
        }
        else {break;}
    }
}
let detectHeroWaterCollision = function(){
    for (let i = 0; i < waterArray.length; i++) {
        if(!heroWaterCollisionBegin && !heroWaterCollisionEnd){
            heroWaterCollisionBegin = collision.detectCollision(cat, waterArray[i]);
        }
        else {break;}
    }
}

$(document).ready(function(){
    Context = new HTML("game", contextWidth, contextHeight);
    initKeyEvents();
    createEnemies(enemiesArray, 10, 200, 200);
    isWaterSaved = false;
    initMap();
});

setInterval(function(){
    drawMap();
    detectHeroEnemyCollision();
    detectHeroWaterCollision();
    if(heroEnemyCollision)
    {
        bang.draw(cat_x, cat_y, 4);
        heroEnemyCollision = true;
    } else {
        heroMove();
        enemyMove();
    }
}, 40)