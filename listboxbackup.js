class ListBox {

    constructor(x, y, w, h, canvas, ctx, vertical, horizontal) {
        console.log("Creating the ListBox");

        this.x = x * screenZoom.x;
        this.y = y * screenZoom.y;
        this.x2 = x;
        this.y2 = y;
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
        this.listCanvas.style.left = Math.round(this.x2 * screenZoom.x) + "px";
        this.listCanvas.style.top = Math.round(this.y2 * screenZoom.x) + "px";
        this.listCanvas.width = this.w * screenZoom.x;
        this.listCanvas.height = this.h * screenZoom.x;

        this.listCtx.fillStyle = "#000000";
        this.listCtx.fillRect(0, 0, this.listCanvas.width, this.listCanvas.height);
    
        document.body.appendChild(this.listCanvas);

        this.eventHandler = this.scrollList.bind(this);
        this.addEventListeners();

        
    }

    addEventListeners() {
        this.mouseDownFired = false;
        
        this.listCanvas.addEventListener('mousedown', this.doMouseDown.bind(this)); 
    
        // this.listCanvas.addEventListener("touchmove", this.scrollList);
    
        // this.listCanvas.addEventListener("touchend", function(e) {
        //     touchStart.x = 99999;
        // });

        this.listCanvas.addEventListener('mousemove', function(e) {
            mouse.x = Math.floor(e.offsetX / screenZoom.x);
            mouse.y = Math.floor(e.offsetY / screenZoom.y);
            mouse.movement.x = e.movementX;
            mouse.movement.y = e.movementY;
        });
    
        this.listCanvas.addEventListener("touchmove", this.eventHandler);
        this.listCanvas.addEventListener("touchend", function(e) {
            touchStart.x = 99999;
        });
    
    
        this.listCanvas.addEventListener('click', doClick);

    }


    close() {
        this.listCanvas.remove();
        this.active = false;
    }

    doMouseDown(e) {
        this.scrolling = false;
        this.listCanvas.addEventListener('mousemove', this.eventHandler);

        this.listCanvas.addEventListener('mouseup', function() {
            this.listCanvas.removeEventListener('mousemove', this.eventHandler);
            this.scrolling = true;
        }.bind(this));
        this.listCanvas.addEventListener('mouseout', function() {
            this.listCanvas.removeEventListener('mousemove', this.eventHandler);
        }.bind(this))
    }

    scrollList(e) {
        //console.log(e.movementY);
        
        if(e.touches) {
            var touch = e.touches[0];

            if(touchStart.x == 99999) {
                touchStart.x = touch.clientX;   // reset current touch position
                touchStart.y = touch.clientY;
            }
            distX = touch.clientX - touchStart.x;
            distY = touch.clientY - touchStart.y;
    
            e.movementX = distX;
            e.movementY = distY;
    
            touchStart.x = touch.clientX;   // reset current touch position
            touchStart.y = touch.clientY;
            e.preventDefault()
        }

        camera.y += e.movementY;

        if(e.movementY > 0) { //scrolling down
            //console.log("scrolling down");
            if(camera.y >= 0 ) {
                camera.y = 0;
            }

        }

        if(e.movementY < 0) { //scrolling up
            //console.log("scrolling up");
            //if(this.bottom > this.listCanvas.height) {
                if(-camera.y >= this.bottom - this.listCanvas.height) {
                    camera.y =  -this.bottom + this.listCanvas.height;
                }
            //}

        }

    }

    init() {
        this.listCtx.save();
        this.listCtx.scale(screenZoom.x, screenZoom.y);
    }
    rest() {
        this.listCtx.restore();
    }

    clear() {
        this.listCtx.clearRect(0, 0, this.listCanvas.width, this.listCanvas.height);
        this.listCtx.fillStyle = 'rgb(89,86,82)';
        //this.listCtx.fillRect(0, 0, this.listCanvas.width, this.listCanvas.height);
    }

}