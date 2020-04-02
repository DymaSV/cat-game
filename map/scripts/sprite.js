var Sprite = function(fn) {

    this.TO_RADIANS = Math.PI/180;
    this.image = null;
    this.spriteSheet = null;
    this.is_pattern = false;
    this.pattern = null;
    this.pattern_x_times = 0;
    this.load = function(filename) { this.image = new Image(); this.image.src = filename; return this; };
    this.to_pattern = function(x_times) { this.pattern_x_times = x_times; this.pattern = Context.context.createPattern(this.image, 'repeat'); this.is_pattern = true; };

    this.animationDelay = 0;
    this.animationIndexCounter = 0;
    this.animationCurrentFrame = 0;

    // Load the sprite
    if (fn != undefined && fn != "" && fn != null)
    {
        if(fn instanceof SpriteSheet){
            this.spriteSheet = fn;
            this.image = this.spriteSheet.image;
        }
        else {
            this.load(fn);
            console.log("Loaded sprite " + fn);
        }
    }
    else
    {
        console.log("Unable to load sprite. Filename '" + fn + "' is undefined or null.");
    }

    //Draw function
    this.draw = function(x, y, various) {
        if(various == undefined){
            Context.context.drawImage(this.image, x, y, BLOCK_W, BLOCK_H);
        }
        if(Array.isArray(various) && various.length > 0)
        {
            if (this.animationDelay++ >= 3) {
                this.animationDelay = 0;
                this.animationIndexCounter++;
                if (this.animationIndexCounter >= various.length)
                    this.animationIndexCounter = 0;
                this.animationCurrentFrame = various[this.animationIndexCounter];
            }
            var res = i2xy(this.animationCurrentFrame, 4);
            Context.context.drawImage(this.image, res[0]*32, res[1]*32, 32, 32, x, y, 32, 32);
        }
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
    this.rot = function(x, y, angle) {
        Context.context.save();
        Context.context.translate(x,y);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
        Context.context.restore();
    }
};