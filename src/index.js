import './style.css';
import { HTML } from "./scripts/canvas";
import { DirectionEnum } from "./scripts/utility";
import { Sprite } from "./scripts/sprite";
import { World, obstaclesArray } from "./scripts/world";
import { initKeyEvents } from "./scripts/keyboard";
import { Collision } from "./scripts/collision";
import { createEnemies, createFood } from "./scripts/enemy";
import { Hero } from "./scripts/hero";
import { catSpriteSheet, ghostSpriteSheet, houseWinSpriteSheet } from "./scripts/characters";
import $ from 'jquery';

var contextWidth = 1280;
var contextHeight = 500;
var bang = new Sprite(ghostSpriteSheet);
var houseWin = new Sprite(houseWinSpriteSheet, 1000, 150);
var hero = new Hero(catSpriteSheet, 0, 0, 2, contextWidth, contextHeight);
let enemiesArray = new Array();
let foodArray = new Array();
let collision = new Collision();
let world = new World();
let Context = null;

$(document).ready(function () {
    Context = new HTML("game", contextWidth, contextHeight);
    contextHeight = contextHeight - 100;
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
    bang.spriteSheetWidth = 45;
    bang.spriteSheetHeight = 48;
    bang.canvasSpriteWidth = 36;
    bang.canvasSpriteHeight = 36;

    // houseWin.sprite.x = staticHouse.x;
    // houseWin.sprite.y = staticHouse.y;
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
let winIndex = 0;
setInterval(function () {
    world.drawMap(contextWidth, contextHeight);
    if (hero.isWin) {
        // let staticHouse = obstaclesArray.filter(function (el) { return el.id == "house"; });
        // houseWin.draw(1000, 150, DirectionEnum.up);
        if (winIndex >= 10) {
            hero.sprite.spriteSheet.spritePositions = {
                win: [28,28,28,29,29,29]
            };
        }
        hero.sprite.draw(hero.sprite.x, hero.sprite.y, DirectionEnum.win);
        winIndex++;
    } else {
        collision.detectHeroEnemyCollision(hero, enemiesArray);
        collision.detectObstacleCollision(hero, obstaclesArray);
        let i = collision.detectHeroFoodCollision(hero, foodArray);
        if (i) {
            foodArray = foodArray.filter(function (el) { return el.id != i; });
        }
        if (hero.heroEnemyCollision) {
            if (hero.sprite.y > 0) {
                hero.sprite.y = hero.sprite.y - 3;
                bang.draw(hero.sprite.x + 12, hero.sprite.y, DirectionEnum.none);
                hero.heroEnemyCollision = true;
            }
            else {
                initCharacters()
                hero.resetHero();
            }
        } else {
            hero.move();
        }

        moveCharacters(foodArray);
        moveCharacters(enemiesArray);
    }
}, 40);

export { Context };