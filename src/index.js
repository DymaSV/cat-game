import './style.css';
import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World, obstaclesArray } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { createEnemies, createFood } from "./scripts/enemy";
import { Hero } from "./scripts/hero";
import { catSpriteSheet, bangSpriteSheet } from "./scripts/characters";
import $ from 'jquery';

var contextWidth = 1280;
var contextHeight = 400;
var bang = new Sprite(bangSpriteSheet);
var hero = new Hero(catSpriteSheet, 0, 0, 2, contextWidth, contextHeight);
let enemiesArray = new Array();
let foodArray = new Array();
let collision = new Collision();
let world = new World();
let Context = null;

$(document).ready(function () {
    Context = new HTML("game", contextWidth, contextHeight);
    initKeyEvents();
    initCharacters();
});

function initCharacters() {
    foodArray = createFood(10, contextWidth, contextHeight);
    enemiesArray = createEnemies(10, contextWidth, contextHeight);
    hero.sprite.canvasSpriteWidth = 48;
    hero.sprite.canvasSpriteHeight = 48;
    hero.sprite.x = 0;
    hero.sprite.y = 0;
    bang.spriteSheetWidth = 125;
    bang.spriteSheetHeight = 125;
    bang.canvasSpriteWidth = 48;
    bang.canvasSpriteHeight = 48;
}

function moveCharacters(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].move();
    }
}

setInterval(function () {
    world.drawMap(contextWidth, contextHeight);
    collision.detectHeroEnemyCollision(hero, enemiesArray);
    collision.detectObstacleCollision(hero, obstaclesArray);
    let i = collision.detectHeroFoodCollision(hero, foodArray);
    if (i) {
        foodArray = foodArray.filter(function(el) { return el.id != i; });
    }
    if (hero.heroEnemyCollision) {
        bang.draw(hero.sprite.x + 12, hero.sprite.y + 12, DirectionEnum.none);
        hero.heroEnemyCollision = true;
    } else {
        hero.move();
    }
    moveCharacters(foodArray);
    moveCharacters(enemiesArray);
}, 40);

export { Context };