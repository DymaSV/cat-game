class EnemyUtility{
    moveCirle = 20;
    x_direction = -1;
    y_direction = -1;
    moveChoosed = false;
    getEnemyCoordinates (x, y, dxy, contextWidth, contextHeight) {
        
        if(!this.moveChoosed && this.moveCirle > 0){
            //get direction of x; 0 - left, 1 - right;
            this.x_direction = this.getRandomInt(2);
            //get direction of y; 0 - up, 1 - down;
            this.y_direction = this.getRandomInt(2);
            this.moveChoosed = true;
        } else {
            this.moveCirle--;
            if(this.moveCirle <= 0){
                this.moveChoosed = false;
                this.moveCirle = 20;
            }
        }
        
        if(this.x_direction == 0) {
            if(x - dxy >= 0) {
                x = x - dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.x_direction == 1) {
            if(x + dxy <= contextWidth) {
                x = x + dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.y_direction == 0) {
            if(y - dxy >= 0) {
                y = y - dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        if(this.y_direction == 1) {
            if(y + dxy <= contextHeight) {
                y = y + dxy;
            } else {
                this.getEnemyCoordinates(x,y,contextWidth, contextHeight);
            }
        }
        return {x, y};
    }

    getRandomInt(num) {
        return Math.floor(Math.random() * Math.floor(num));
      }
}
