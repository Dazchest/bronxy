class ListBox {

    constructor(x, y, w, h, canvas, ctx, vertical, horizontal) {
        console.log("Creating the ListBox");

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.horizontal = false;
        this.vertical = true;
        this.canvas = canvas;
        this.ctx = ctx;
        this.active = true; 
        this.bottom = 0;

        this.mouseDownFired = false;
        this.scrolling = false;

        this.listCanvas = document.createElement('canvas');
        this.listCtx = this.listCanvas.getContext("2d");

        this.listCanvas.style.position = "absolute"; 
        this.listCanvas.style.left = "700px";
        this.listCanvas.style.top = "100px";
        this.listCanvas.width = this.w;
        this.listCanvas.height = this.h;

        // this.listCtx.fillStyle = "#000000";
        // this.listCtx.fillRect(0, 0, this.listCanvas.width, this.listCanvas.height);
    
        document.body.appendChild(this.listCanvas);

        // this.eventHandler = this.scrollList.bind(this);
        // this.addEventListeners();

        
    }

    listen() {
        // if(listScroll) {
        //     camera.y += mouse.movement.y;
        
        if(mouse.movement.y > 0) { //scrolling down
            //console.log("scrolling down");
            if(camera.y >= 0 ) {
                camera.y = 0;
            }
        }

        if(mouse.movement.y < 0) { //scrolling up
            //console.log("scrolling up");
                if(-camera.y >= this.bottom - this.h) {
                    camera.y =  -this.bottom + this.h;
                }
        }
    // }


    }


    close() {
        this.listCanvas.remove();
        this.active = false;
    }

    // doMouseDown(e) {
    //     this.scrolling = false;
    //     this.listCanvas.addEventListener('mousemove', this.eventHandler);

    //     this.listCanvas.addEventListener('mouseup', function() {
    //         this.listCanvas.removeEventListener('mousemove', this.eventHandler);
    //         this.scrolling = true;
    //     }.bind(this));
    //     this.listCanvas.addEventListener('mouseout', function() {
    //         this.listCanvas.removeEventListener('mousemove', this.eventHandler);
    //     }.bind(this))
    // }


    init() {
        this.listCtx.save();
        //this.listCtx.scale(screenZoom.x, screenZoom.y);
    }
    rest() {
        this.listCtx.restore();
    }

    clear() {
        this.listCtx.clearRect(0, 0, this.listCanvas.width, this.listCanvas.height);
        //this.listCtx.fillStyle = 'rgb(89,86,82)';
        //this.listCtx.fillRect(0, 0, this.listCanvas.width, this.listCanvas.height);
    }

}