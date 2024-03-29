class NewInput {
    // inputs = [];
    constructor(i, data) {
        this.i = document.createElement('input');
        // this.i.id = 'input';
        // this.i.style.position = 'absolute';
        // this.i.style.left = '50px';
        // this.i.style.top = '50px';
        // this.i.style.width = '50px';

        for(let x=0; x<Object.keys(i).length; x++) {
            name = Object.keys(i)[x];
            this.i[name] = i[name];
        }
        this.i.style.position = 'absolute';
        this.i.style.left = '50px';
        this.i.style.top = '50px';
        this.i.style.width = '50px';
        this.i.style.zIndex = "-99999";
    
        // this.i.type = 'hidden';
        document.getElementById('maindiv').appendChild(this.i);

        this.w = 100;   // default w and h, can be overidden with data, below...
        this.h = 30;

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }



        this.cursor = {flash: false, state: false, start: Date.now(), x: 0, y: 0, lastFlash: Date.now(), speed: 1000};
        this.button = new Button({"active": true, drawButton: false, "x": this.x, "y": this.y, "w": this.w, "h": this.h, "text": "", "screen": this, "action":  this.setFocus.bind(this)});
    }

    draw() {
        //TODO: CAN WE CHECK FOR DOUBLE CLICK AND HIGHLIGHT ???
        //return;
        //console.log("drawing input???");
        ctx.save();

        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.globalAlpha = 1;
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        this.text = this.i.value;

        ctx.fillStyle = '#000000';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.fillText(this.text, this.x + 2, this.y + this.h/2);

        ctx.restore();

        //sthis.checkHover();
        this.drawCursor();
    }

    setFocus() {
        this.i.focus();
        console.log("setting focus");
    }

    static checkHover(inputs) {
        canvas.style.cursor = 'default';
        for(let x=0; x<inputs.length; x++) {
            if(mouse.x >= inputs[x].x && mouse.x <= inputs[x].x+inputs[x].w && mouse.y >= inputs[x].y && mouse.y <= inputs[x].y+inputs[x].h) {
                canvas.style.cursor = 'text';
            }
        }
    }

    drawCursor() {
        if(this.i === document.activeElement) { // only draw when focused
            //console.log(this.i.selectionStart);
            if(Date.now() > this.cursor.lastFlash + this.cursor.speed) {
                if(this.cursor.state) {
                    this.cursor.state = false;
                    this.cursor.lastFlash = Date.now();
                } else {
                    this.cursor.state = true;
                    this.cursor.lastFlash = Date.now();
                }
            }
            if(this.cursor.state) {
                ctx.fillStyle = '#000000';
                let textWidth = ctx.measureText(this.text).width;
                ctx.fillRect(this.x + textWidth + 2, this.y, 2, this.h);
            }
        }
    }
}
function getInput() {
    //alert("f");
    // ctx.fillStyle = '#000000';
    // ctx.fillText("wahsfsefwefwefweefooo", 400, 200);
    // ctx.font = "20px Georgia";
    // ctx.fillStyle = '#ffffff';
    // ctx.fillText("fps: " + fps, 400, 300);

}

function checkInput() {
    //console.log("key = " + e.keyCode);
    if(document.getElementById('quantityInput').value < 0) {
        document.getElementById('quantityInput').value = 1;
    }
}