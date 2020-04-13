import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { initMap, drawMap, waterArray } from "./scripts/world";
import { keyState, initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { createEnemies } from "./scripts/enemy";
import { catSpriteSheet, bangSpriteSheet } from "./scripts/characters";
import $ from 'jquery';

var heroEnemyCollision = false;
var heroWaterCollisionBegin = false;
var heroWaterCollisionEnd = false;
var lastDirection = DirectionEnum.none;
var contextWidth = 1280;
var contextHeight = 960;
var bang = new Sprite(bangSpriteSheet);
var cat = new Sprite(catSpriteSheet);
var cat_x = cat.x = 0;
var cat_y = cat.y = 0;
let enemiesArray = new Array();
let collision = new Collision();    
let Context = null;

function heroMove(){
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
function enemyMove(){
    for (let i = 0; i < enemiesArray.length; i++) {
            enemiesArray[i].move();
    }
}

function detectHeroEnemyCollision(){
    for (let i = 0; i < enemiesArray.length; i++) {
        if(!heroEnemyCollision){
            heroEnemyCollision = collision.detectCollision(cat, enemiesArray[i].sprite);
        }
        else {break;}
    }
}

function detectHeroWaterCollision(){
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
    enemiesArray = createEnemies(10, 200, 200);
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
}, 40);

export { Context };