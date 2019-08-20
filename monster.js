class Monster {

    constructor(data) {
        for (let x = 0; x < Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
        this.lastFrameTime = Date.now();
        this.currentFrame = 0;
        let r = getRandom(1,2);
        this.directionFacing = r==1 ? 1 : -1;       // set a random facing direct
        //this.level == 2 ? this.action = 2 : this.action = 0;    // set default action
        this.action = 0;        // set default action
    }

    drawM(action, x, y, w, h) {
        action ? action = action : action = this.action; 
        //style[action] = idel, walking, fightingt etc
        let currentImage = this.animation.style[action].images[this.currentFrame];
        let frameCount = this.animation.style[action].frameCount;
        let animationSpeed = this.animation.style[action].speed;


        ctx.save();

        if(this.directionFacing == -1) {
            ctx.translate(x + 80, y);
        } else {        
            ctx.translate(x, y);
        }
        ctx.scale(this.directionFacing,1);
        //ctx.drawImage(currentImage, x, y, w, h);
        ctx.drawImage(currentImage, 0, 0, w, h);
        ctx.restore();

        if (Date.now() >= this.lastFrameTime + animationSpeed) {
            this.currentFrame += 1;
            this.currentFrame = this.currentFrame % frameCount;
            this.lastFrameTime = Date.now();
        }
    }
}
