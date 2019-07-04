class Button {


    constructor(data) {
        this.offset = {"x": 0, "y": -30};
        this.drawButton = true;
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
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
            ctx.fillText(this.text, this.x + 30, this.y + 20);
        }
    }

    show() {
        this.active = true;
    }
    hide() {
        this.active = false;
    }
}