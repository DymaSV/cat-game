import { i2xy, DirectionEnum } from './utility';
import { Animate } from './animate';
import { SpriteSheet } from './spritesheet';
import { Context } from "../index";
import { SpriteBorder } from './obstacle';

class Sprite {
    // isMoving - indicate posibility to move
    constructor(fn, x, y) {
        this.TO_RADIANS = Math.PI / 180;
        this.spriteSheetSize = 32; //Width and Height of area that we take in image .png like one item
        this.canvasSpriteWidth = 32; //Width of image on canvas
        this.canvasSpriteHeight = 32; //Height of image on canvas

        this.spriteSheet = null;
        this.animate = null;
        this.x = x;
        this.y = y;
        this.is_pattern = false;

        this.borderPoints = new SpriteBorder();
        this.initSprite(fn);
    }

    initSprite(fn) {
        // Load the sprite
        if (fn != undefined && fn != "" && fn != null && fn instanceof SpriteSheet) {
            this.spriteSheet = fn;
            this.animate = new Animate(0, 0, 0);
            console.log("Loaded spriteSheet " + this.spriteSheet.image.srcset);
        } else {
            console.log("Unable to load sprite. Filename '" + fn + "' is undefined or null.");
        }

    };

    //Draw function
    draw(x, y, direction) {
        var various = this.getSpritePositions(direction);
        if (Array.isArray(various) && various.length > 0) {
            if (this.animate.animationDelay++ >= 3) {
                this.animate.animationDelay = 0;
                this.animate.animationIndexCounter++;
                if (this.animate.animationIndexCounter >= various.length)
                    this.animate.animationIndexCounter = 0;
                this.animate.animationCurrentFrame = various[this.animate.animationIndexCounter];
            }

            var res = i2xy(this.animate.animationCurrentFrame, this.spriteSheet.spriteSheetColumnsCount);

            Context.context.drawImage(this.spriteSheet.image,
                res[0] * this.spriteSheetSize,
                res[1] * this.spriteSheetSize,
                this.spriteSheetSize,
                this.spriteSheetSize,
                x,
                y,
                this.canvasSpriteWidth,
                this.canvasSpriteHeight);
        } else {
            Context.context.drawImage(this.spriteSheet.image,
                x,
                y,
                this.canvasSpriteWidth,
                this.canvasSpriteHeight);
        }
        this.x = x;
        this.y = y;
    };

    // Stretched draw
    draw2(x, y, w, h) {
        if (this.is_pattern) {
            for (var i = 0; i < this.pattern_x_times; i++) {
                Context.context.drawImage(this.spriteSheet.image, x + w * i, y, w, h);
            }
        } else {
            Context.context.drawImage(this.spriteSheet.image, x, y, w, h);
        }
    };

    // Rotated draw
    rotImage(x, y, angle, various) {
        if (this.animate.animationDelay++ >= 3) {
            this.animate.animationDelay = 0;
            this.animate.animationIndexCounter++;
            if (this.animate.animationIndexCounter >= various.length)
                this.animate.animationIndexCounter = 0;
            this.animate.animationCurrentFrame = various[this.animate.animationIndexCounter];
        }
        var res = i2xy(this.animate.animationCurrentFrame, 4);
        Context.context.save();
        Context.context.translate(x - this.canvasSpriteWidth / 2, y - this.canvasSpriteHeight / 2);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(this.spriteSheet.image,
            res[0] * this.spriteSheetSize,
            res[1] * this.spriteSheetSize,
            this.spriteSheetSize,
            this.spriteSheetSize,
            x,
            y,
            this.canvasSpriteWidth,
            this.canvasSpriteHeight);
        Context.context.restore();
    }

    // Rotated draw
    rot(x, y, angle) {
        Context.context.save();
        Context.context.translate(x, y);
        Context.context.rotate(angle * this.TO_RADIANS);
        Context.context.drawImage(
            this.spriteSheet.image,
            -(this.spriteSheet.image.width / 2),
            -(this.spriteSheet.image.height / 2)
        );
        Context.context.restore();
    }

    getSpritePositions(direction) {
        if (this.spriteSheet.spritePositions) {
            if (direction == DirectionEnum.left) {
                return this.spriteSheet.spritePositions.left;
            }
            if (direction == DirectionEnum.right) {
                return this.spriteSheet.spritePositions.right;
            }
            if (direction == DirectionEnum.up) {
                return this.spriteSheet.spritePositions.up;
            }
            if (direction == DirectionEnum.down) {
                return this.spriteSheet.spritePositions.down;
            }
            return this.spriteSheet.spritePositions.none;
        }
        else { return null; }
    }
};

export { Sprite };