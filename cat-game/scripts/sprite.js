var Sprite = function(fn) {

    this.TO_RADIANS = Math.PI/180;
    this.image = null;
    this.spriteSheet = null;
    this.spritePositions = null;
    this.animate = null;
    this.collisionWidth = null;
    this.collisionHeight = null;
    this.x = 0;
    this.y = 0;
    this.is_pattern = false;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };

    // Load the sprite
    if (fn != undefined && fn != "" && fn != null) {
        if(fn instanceof SpriteSheet){
            this.spriteSheet = fn;
            this.image = this.spriteSheet.image;
            this.animate = new Animate(0, 0, 0);
            this.collisionWidth = this.spriteSheet.collisionWidth;
            this.collisionHeight = this.spriteSheet.collisionHeight;
            this.spritePositions = this.spriteSheet.spritePositions;
            console.log("Loaded sprite " + this.spriteSheet.image.src);
        } else {
            this.load(fn);
            console.log("Loaded sprite " + fn);
        }
    } else
    {
        console.log("Unable to load sprite. Filename '" + fn + "' is undefined or null.");
    }
    
    //Draw function
    this.draw = function(x, y, direction) {
        if(direction == undefined) {
            Context.context.drawImage(this.image, x, y, MAP_BLOCK_W, MAP_BLOCK_H);
        } else {
            various = this.getSpritePositions(direction);
            if(Array.isArray(various) && various.length > 0) {
                if (this.animate.animationDelay++ >= 3) {
                    this.animate.animationDelay = 0;
                    this.animate.animationIndexCounter++;
                    if (this.animate.animationIndexCounter >= various.length)
                        this.animate.animationIndexCounter = 0;
                    this.animate.animationCurrentFrame = various[this.animate.animationIndexCounter];
                }

                var res = i2xy(this.animate.animationCurrentFrame, this.spriteSheet.spriteSheetWidth);
                Context.context.drawImage(this.image, res[0]*32, res[1]*32, 32, 32, x, y, 32, 32);
            }
        }
        this.x = x;
        this.y = y;
    };

    // Stretched draw
    this.draw2 = function(x, y, w, h) {
        if (this.is_pattern) {
            //Context.context.fillStyle = Context.context.createPattern(this.image, 'repeat');;
            //Context.context.fillRect(x, y, w, h);
            for (var i = 0; i < this.pattern_x_times; i++) {
                Context.context.drawImage(this.image, x + w*i, y, w, h);
            }
        } else {
            Context.context.drawImage(this.image, x, y, w, h);
        }
    };

    // Rotated draw
    this.rotImage = function(x, y, angle, various) {
        if (this.animate.animationDelay++ >= 3) {
            this.animate.animationDelay = 0;
            this.animate.animationIndexCounter++;
            if (this.animate.animationIndexCounter >= various.length)
                this.animate.animationIndexCounter = 0;
                this.animate.animationCurrentFrame = various[this.animate.animationIndexCounter];
        }
        var res = i2xy(this.animate.animationCurrentFrame, 4);
        Context.context.save();
        Context.context.translate(x-16,y-16);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(this.image,  res[0]*32, res[1]*32, 32, 32, x, y, 32, 32);
        Context.context.restore();
    }

    // Rotated draw
    this.rot = function(x, y, angle) {
        Context.context.save();
        Context.context.translate(x,y);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
        Context.context.restore();
    }

    this.getSpritePositions = function(direction) {
        if(this.spritePositions) {
            if(direction == DirectionEnum.left) {
                return this.spritePositions.left;
            }
            if(direction == DirectionEnum.right) {
                return this.spritePositions.right;
            }
            if(direction == DirectionEnum.up) {
                return this.spritePositions.up;
            }
            if(direction == DirectionEnum.down) {
                return this.spritePositions.down;
            }
            return this.spritePositions.none;
        }
        else {return null;}
    }
};