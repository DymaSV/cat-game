import './style.css';
import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { Hero } from "./scripts/hero";
import { catSpriteSheet, ghostSpriteSheet } from "./scripts/characters";
import { Factory } from "./scripts/factory";
import { ViewPort } from "./scripts/viewport";
import { stage } from "./scripts/stage";
import $ from 'jquery';

let ghost = null;
let hero = null;
let enemiesArray = new Array();
let foodArray = new Array();
let collision = new Collision();
let factory = new Factory();
let world = null;
let viewport = null;
let Context = null;

$(document).ready(function () {
    let contextWidth = $(window).width() - 100;
    let contextHeight = $(window).height() - 200;
    Context = new HTML("game", contextWidth, contextHeight);

    viewport = new ViewPort(64, 64, Math.floor(contextWidth / 64), 20, contextWidth, contextHeight);
    world = new World(viewport);
    ghost = new Sprite(ghostSpriteSheet, 0, 0, viewport);
    hero = new Hero(new Sprite(catSpriteSheet, 0, 0, viewport), 2);

    initKeyEvents();
    initCharacters();

});

export function newLevel() {
    stage.upLevel();
    world.initSprites();
    viewport.reset()
    initCharacters()
    hero.resetHero();
}

function initCharacters() {
    foodArray = factory.createFood(20, viewport);
    enemiesArray = factory.createEnemies(10, viewport);

    hero.sprite.canvasSpriteWidth = 48;
    hero.sprite.canvasSpriteHeight = 48;
    hero.sprite.x = 0;
    hero.sprite.y = 0;

    ghost.spriteSheetWidth = 45;
    ghost.spriteSheetHeight = 48;
    ghost.canvasSpriteWidth = 34;
    ghost.canvasSpriteHeight = 34;
}

function moveCharacters(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].move();
    }
}

function enemyDetectHero() {
    if (hero.sprite.y > viewport.startTile[1] * viewport.tileH) {
        hero.sprite.y = hero.sprite.y - 3;
        ghost.draw(hero.sprite.x + 12, hero.sprite.y, DirectionEnum.none);
        hero.heroEnemyCollision = true;
    }
    else {
        viewport.reset()
        initCharacters()
        hero.resetHero();
    }
}

function heroDetectFood() {
    let foodIdDetected = collision.detectHeroFoodCollision(hero, foodArray)
    if (foodIdDetected) {
        foodArray = factory.updateFoodArray(foodArray, foodIdDetected)
        hero.plusLife();
    }
}

setInterval(function () {
    viewport.update(
        hero.sprite.x + (hero.sprite.canvasSpriteWidth / 2),
        hero.sprite.y + (hero.sprite.canvasSpriteHeight / 2)
    );
    Context.context.fillStyle = "#000000";
    Context.context.fillRect(0, 0, viewport.screen[0], viewport.screen[1])

    world.drawMap();
    if (hero.isWin) {
        hero.winMove()
    } else {
        if (hero.heroEnemyCollision) {
            enemyDetectHero();
        } else {
            hero.heroEnemyCollision = collision.detectHeroEnemyCollision(hero, enemiesArray);
            heroDetectFood();
            hero.move();
        }
        moveCharacters(foodArray);
        moveCharacters(enemiesArray);
    }
}, 40);

export { Context };