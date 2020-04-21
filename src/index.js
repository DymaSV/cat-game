import './style.css';
import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { Hero } from "./scripts/hero";
import { catSpriteSheet, ghostSpriteSheet, houseWinSpriteSheet } from "./scripts/characters";
import { Factory } from "./scripts/factory";
import $ from 'jquery';

let contextWidth = 1280;
let contextHeight = 500;
let ghost = new Sprite(ghostSpriteSheet);
let houseWin = new Sprite(houseWinSpriteSheet, 1000, 150);
let hero = new Hero(catSpriteSheet, 0, 0, 2, contextWidth, contextHeight);
let enemiesArray = new Array();
let foodArray = new Array();
let collision = new Collision();
let factory = new Factory();
let world = new World();
let Context = null;

$(document).ready(function () {
    Context = new HTML("game", contextWidth, contextHeight);
    contextHeight = contextHeight - 100;
    initKeyEvents();
    world.drawMap(contextWidth, contextHeight);
    initCharacters();
});

function initCharacters() {
    foodArray = factory.createFood(10, contextWidth, contextHeight);
    enemiesArray = factory.createEnemies(10, contextWidth, contextHeight);

    hero.sprite.canvasSpriteWidth = 48;
    hero.sprite.canvasSpriteHeight = 48;
    hero.sprite.x = 0;
    hero.sprite.y = 0;

    ghost.spriteSheetWidth = 45;
    ghost.spriteSheetHeight = 48;
    ghost.canvasSpriteWidth = 36;
    ghost.canvasSpriteHeight = 36;

    houseWin.spriteSheetWidth = 125;
    houseWin.spriteSheetHeight = 115;
    houseWin.canvasSpriteWidth = 96;
    houseWin.canvasSpriteHeight = 96;
}

function moveCharacters(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].move();
    }
}

function enemyDetectHero() {
    if (hero.sprite.y > 0) {
        hero.sprite.y = hero.sprite.y - 3;
        ghost.draw(hero.sprite.x + 12, hero.sprite.y, DirectionEnum.none);
        hero.heroEnemyCollision = true;
    }
    else {
        initCharacters()
        hero.resetHero();
    }
}

setInterval(function () {
    world.drawMap(contextWidth, contextHeight);
    if (hero.isWin) {
        hero.winMove()
    } else {
        if (hero.heroEnemyCollision) {
            enemyDetectHero();
        } else {
            hero.heroEnemyCollision = collision.detectHeroEnemyCollision(hero, enemiesArray);
            let foodIdDetected = collision.detectHeroFoodCollision(hero, foodArray)
            if (foodIdDetected) {
                foodArray = factory.updateFoodArray(foodArray, foodIdDetected)
                hero.plusLife();
            }
            hero.move();
        }
        moveCharacters(foodArray);
        moveCharacters(enemiesArray);
    }
}, 40);

export { Context };