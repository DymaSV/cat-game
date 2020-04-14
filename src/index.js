import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { drawMap, waterArray } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { createEnemies } from "./scripts/enemy";
import { Hero } from "./scripts/hero";
import { catSpriteSheet, bangSpriteSheet } from "./scripts/characters";
import $ from 'jquery';

var contextWidth = 1280;
var contextHeight = 960;
var bang = new Sprite(bangSpriteSheet);
var hero = new Hero(catSpriteSheet, 0, 0, 2, contextWidth, contextHeight);
let enemiesArray = new Array();
let collision = new Collision();
let Context = null;

function enemyMove() {
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].move();
    }
}

$(document).ready(function () {
    Context = new HTML("game", contextWidth, contextHeight);
    initKeyEvents();
    enemiesArray = createEnemies(10, 200, 200);
    hero.canvasSpriteWidth = 48;
    hero.canvasSpriteHeight = 48;
    hero.sprite.x = -16;
    hero.sprite.y = -16 ;
    bang.spriteSheetSize = 14
    bang.canvasSpriteWidth = 48;
    bang.canvasSpriteHeight = 48;
});

setInterval(function () {
    drawMap(contextWidth, contextHeight);
    collision.detectHeroEnemyCollision(hero, enemiesArray);
    collision.detectHeroWaterCollision(hero, waterArray);
    if (collision.heroEnemyCollision) {
        bang.draw(hero.sprite.x, hero.sprite.y, DirectionEnum.none);
        collision.heroEnemyCollision = true;
    } else {
        hero.move(collision);
        enemyMove();
    }
}, 40);

export { Context };