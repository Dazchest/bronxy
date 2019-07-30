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
            let color = this.color ? this.color : '#00ff55';
            if(this.active) {
                ctx.fillStyle = color;
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
            if(mouse.x > this.x*zoom.x && mouse.x < this.x*zoom.x + this.w*zoom.x && mouse.y > this.y*zoom.y && mouse.y < this.y*zoom.y + this.h*zoom.y) {
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