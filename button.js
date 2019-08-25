class Button {


    constructor(data) {
        this.offset = {"x": 0, "y": -30};
        this.drawButton = true;
        this.style = "rectangle";
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
        this.screen = null;
    }

    draw() {
        if(this.drawButton) {
            ctx.save();
            let color = this.color ? this.color : '#00ff55';
            if(this.active) {
                ctx.fillStyle = color;
            } else {
                ctx.fillStyle = "#ff4444";
            }

            ctx.shadowBlur=4;//  shadow Blur
            ctx.shadowColor="#009933"; // shadow color
            ctx.shadowOffsetX=3; // offset along X axis
            ctx.shadowOffsetY=-3;  // offset along Y axis

            let height = 40;
            ctx.font = "40px Georgia";
            let textWidth = ctx.measureText(this.text).width;
            if(this.style == "rectangle") {
                ctx.fillRect(this.x, this.y, textWidth + 20, height + 10);
                this.w = textWidth + 20;
                this.h = height + 10;
                ctx.shadowColor = "transparent";
                ctx.fillStyle = '#000000';
                ctx.fillText(this.text, this.x + 5, this.y + height);
            } else
            if(this.style == "circle") {
                height = this.radius ? this.radius : this.h;
                ctx.font = "25px Georgia";
                let textWidth = ctx.measureText(this.text).width;
                ctx.beginPath();
                ctx.arc(this.x, this.y, height, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                ctx.shadowColor = "transparent";
                ctx.fillStyle = '#000000';
                ctx.fillText(this.text, this.x - textWidth/2, this.y + 12);
            }
            ctx.restore();
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
            console.log(this.style);
            if(this.style == "rectangle") {
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
            } else
            if(this.style == "circle") {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                console.log("circle dist = ", dist);
                if(dist < this.h) {
                    if(this.action && this.active) {
                        clicked = false;
                        console.log(this.text + " pressed");
                        let callback = this.action;
                        callback(researchThis, this);
                        return true
                    }
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