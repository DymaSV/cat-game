import './style.css';
import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { Hero } from "./scripts/hero";
import { Factory } from "./scripts/factory";
import { ViewPort } from "./scripts/viewport";
import { Stage } from "./scripts/stage";
import $ from 'jquery';

let stage = new Stage();
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
    document.getElementById("sound").addEventListener("click", getSound);

    let contextWidth = $(window).width() - 100;
    let contextHeight = $(window).height() - 200;
    Context = new HTML("game", contextWidth, contextHeight);

    viewport = new ViewPort(
        stage.viewPortSize().width,
        stage.viewPortSize().height,
        Math.floor(contextWidth / stage.viewPortSize().width),
        stage.viewPortSize().mapH,
        contextWidth, contextHeight);

    world = new World(viewport);
    ghost = new Sprite(stage.getSpriteSheet("ghost"), 0, 0, viewport);
    hero = new Hero(new Sprite(stage.getSpriteSheet("cat"), 0, 0, viewport), 2);

    initKeyEvents();
    initCharacters();

});

function getSound() {
    if (!stage.sound.isSoundActive) {
        stage.sound.isSoundActive = true;
    } else {
        stage.sound.isSoundActive = false;
    }

    if (stage.sound.isSoundActive) {
        stage.sound.activateSoundLoop();
    } else {
        stage.sound.sound.pause();
    }
}

function newLevel() {
    stage.upLevel();
    world.initSprites();
    viewport.reset()
    initCharacters()
    hero.resetHero();
}

function initCharacters() {
    //initialize hero before create map. Important for viewport.
    initHero();
    //initialize map before create foods and enemies. Enemies should know map before they get their positions.
    initMap();

    foodArray = factory.createFood(20, viewport);
    enemiesArray = factory.createEnemies(10, viewport);
}

function initHero() {
    hero.sprite.canvasSpriteWidth = 48;
    hero.sprite.canvasSpriteHeight = 48;
    hero.sprite.x = 0;
    hero.sprite.y = 0;
    ghost.spriteSheetWidth = 45;
    ghost.spriteSheetHeight = 48;
    ghost.canvasSpriteWidth = 34;
    ghost.canvasSpriteHeight = 34;
}

function initMap() {
    viewport.update(hero.sprite.x + (hero.sprite.canvasSpriteWidth / 2), hero.sprite.y + (hero.sprite.canvasSpriteHeight / 2));
    world.drawMap();
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

function heroDetectFoodCheck() {
    let foodIdDetected = collision.detectHeroFoodCollision(hero, foodArray)
    if (foodIdDetected) {
        foodArray = factory.updateFoodArray(foodArray, foodIdDetected)
        hero.plusLife();
        hero.meow();
    }
}

setInterval(function () {
    Context.context.fillStyle = "#000000";
    Context.context.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
    initMap();
    if (hero.isWin) {
        hero.winMove()
    } else {
        if (hero.heroEnemyCollision) {
            enemyDetectHero();
        } else {
            collision.detectHeroEnemyCollision(hero, enemiesArray);
            heroDetectFoodCheck();
            hero.move();
        }
        moveCharacters(foodArray);
        moveCharacters(enemiesArray);
    }
}, 40);

export { Context, stage, newLevel };