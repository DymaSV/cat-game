let dogSpriteSheet = new SpriteSheet("./images/dog-sprite-sheet.png", 10, 10, 5, EnemyPositions);

export function createEnemies(enemiesArray, count, borderWidth, borderHeight) {
    for (let i = 1; i < count; i++) {
        enemiesArray.push(new Enemy(dogSpriteSheet, i*100, i*30, borderWidth, borderHeight));
    }
}

class Enemy{
    constructor(spriteSheet, x, y, borderWidth, borderHeight){
        this.sprite = new Sprite(spriteSheet);
        this.x = this.sprite.x = x;
        this.y = this.sprite.y = y;
        this.borderWidth = borderWidth;
        this.borderHeight = borderHeight;
        
        this.cirle = 50;
        this.moveCirle = 50;
        this.direction = DirectionEnum.none;
        this.moveChoosed = false;
    }
    
    move(){
        let enemyMoves = this.getEnemyCoordinates(this.x, this.y, 1, this.borderWidth, this.borderHeight);
        this.x = enemyMoves.x;
        this.y = enemyMoves.y;
        this.sprite.draw(this.x, this.y, enemyMoves.direction);
    }

    
    getEnemyCoordinates (x, y, dxy, contextWidth, contextHeight) {
        if(!this.moveChoosed && this.moveCirle > 0){
            // //get direction of x; 0 - left, 1 - right;
            // this.x_direction = this.getRandomInt(2);
            // //get direction of y; 0 - up, 1 - down;
            // this.y_direction = this.getRandomInt(2);

            this.direction = this.getRandomInt(4);
            this.moveChoosed = true;
        } else {
            this.moveCirle--;
            if(this.moveCirle <= 0){
                this.moveChoosed = false;
                this.moveCirle = this.cirle;
            }
        }
        
        if(this.direction == DirectionEnum.left) {
            if(x - dxy >= 0) {
                x = x - dxy;
            } else {
                this.getEnemyCoordinates(x, y, 1, contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.right) {
            if(x + dxy <= contextWidth) {
                x = x + dxy;
            } else {
                this.getEnemyCoordinates(x, y, 1, contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.up) {
            if(y - dxy >= 0) {
                y = y - dxy;
            } else {
                this.getEnemyCoordinates(x, y, 1, contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.down) {
            if(y + dxy <= contextHeight) {
                y = y + dxy;
            } else {
                this.getEnemyCoordinates(x, y, 1, contextWidth, contextHeight);
            }
        }
        let direction = this.direction
        return {x, y, direction};
    }

    getRandomInt(num) {
        return Math.floor(Math.random() * Math.floor(num));
      }
}

