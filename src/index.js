import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World, obstaclesArray } from "./scripts/world";
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
let world = new World();
let Context = null;

$(document).ready(function () {
    Context = new HTML("game", contextWidth, contextHeight);
    initKeyEvents();
    initCharacters();
});

function initCharacters() {
    enemiesArray = createEnemies(10, 200, 200);
    hero.sprite.canvasSpriteWidth = 48;
    hero.sprite.canvasSpriteHeight = 48;
    hero.sprite.x = 0;
    hero.sprite.y = 0;
    bang.spriteSheetSize = 14
    bang.canvasSpriteWidth = 48;
    bang.canvasSpriteHeight = 48;
}

function enemyMove() {
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].move();
    }
}

setInterval(function () {
    world.drawMap(contextWidth, contextHeight);
    collision.detectHeroEnemyCollision(hero, enemiesArray);
    collision.detectHeroWaterCollision(hero, obstaclesArray);
    if (collision.heroEnemyCollision) {
        bang.draw(hero.sprite.x, hero.sprite.y, DirectionEnum.none);
        collision.heroEnemyCollision = true;
    } else {
        hero.move(collision);
        enemyMove();
    }
}, 40);

export { Context };