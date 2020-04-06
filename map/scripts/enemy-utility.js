class EnemyUtility{
    moveCirle = 30;
    direction = DirectionEnum.none;
    moveChoosed = false;
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
                this.moveCirle = 20;
            }
        }
        
        if(this.direction == DirectionEnum.left) {
            if(x - dxy >= 0) {
                x = x - dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.right) {
            if(x + dxy <= contextWidth) {
                x = x + dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.up) {
            if(y - dxy >= 0) {
                y = y - dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.direction == DirectionEnum.down) {
            if(y + dxy <= contextHeight) {
                y = y + dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        let direction = this.direction
        return {x, y, direction};
    }

    getRandomInt(num) {
        return Math.floor(Math.random() * Math.floor(num));
      }
    
    // castToDirectionEnum(num) {
    //     if(num == 0) {return DirectionEnum.left;}
    //     if(num == 1) {return DirectionEnum.right;}
    //     if(num == 2) {return DirectionEnum.up;}
    //     if(num == 3) {return DirectionEnum.down;}
    //     return DirectionEnum.none;
    // }
}