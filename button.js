class Button {


    constructor(data) {
        this.offset = {"x": 0, "y": -30};
        this.drawButton = true;
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
        this.screen = null;
    }

    draw() {
        if(this.drawButton) {
            if(this.active) {
                ctx.fillStyle = "#00ff00";
            } else {
                ctx.fillStyle = "#ff4444";
            }
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.text, this.x + 5, this.y + 20);
        }
    }

    /**
     * CHECK AN INDIVIDUAL BUTTON
     * 
     * @param {object} button 
     */
    //TODO: maybe have it so accepts a button and this --- so.. (b = this)
    check(researchThis) {
        if(clicked) {   //mouse is clicked, check if it was on a button
            if(mouse.x > this.x && mouse.x < this.x + this.w && mouse.y > this.y && mouse.y < this.y + this.h) {
                if(this.action && this.active) {
                    clicked = false;
                    console.log(this.text + " pressed");
                    let callback = this.action;
                    //callback(this.where, this);
                    callback(researchThis, this);
                    return true
                }
            }
        }
        return false;
    }


    show() {
        this.active = true;
    }
    hide() {
        this.active = false;
    }
}