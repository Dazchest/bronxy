class ListBox {

    constructor(x, y, w, h, vertical, horizontal) {
        console.log("Creating the ListBox");

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.horizontal = false;
        this.vertical = true;
        this.active = true; 
        this.bottom = 0;            // where the last list item will be displayed vertical
        this.right = 0;             // where the last list item will be displayed horizontal

        this.listScroll = false;

        //console.log(researchList);
    }

    listen() {
        if(listScroll == false && camera.y >= 5) {
            //console.log("scroll back up");
            camera.y -= 2;
        }
        if(camera.y >= 50) {
            camera.y = 50;
        }
        if(listScroll == false && camera.y < -this.bottom + this.h) {
            camera.y += 2;
        }
        if(camera.y < -this.bottom + this.h - 50) {
            camera.y = -this.bottom + this.h - 50;
        }
    }

    draw(list) {
        //return;
        ctx.drawImage(itemListImages[10], this.x-10, this.y-7, this.w+20, this.h+15);

        if(list == false) {
            return;
        }
        this.listen();

        ctx.save();

        // --- DO CLIPPING ---
        ctx.strokeStyle = '#ff00ff';
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.clip();

        if(researchScreen.active) {
            for(let x=0; x<list.length; x++) {
                let itemWidth = list[x].w;
                let itemHeight = list[x].h;
                list[x].draw(this.x + 5, this.y + 5 + ((list[x].row-1) * (itemHeight + 25)) + camera.y);
                this.bottom = 5 + (list.length * (itemHeight + 25));    // - (list[x].h * 2)
                // go through the buttons, and change x,y to match the item x,y
                list[x].button.x = list[x].x;
                list[x].button.y = list[x].y;
                list[x].button.w = itemWidth;
                list[x].button.h = itemHeight;
           }
        } else {
            for(let x=0; x<list.length; x++) {
                let itemWidth = list[x].w;
                let itemHeight = list[x].h;
                list[x].draw(this.x + 5, this.y + 5 + (x * (itemHeight + 5)) + camera.y);
                this.bottom = 5 + (list.length * (itemHeight + 5));    // - (list[x].h * 2)
                // go through the buttons, and change x,y to match the item x,y
                if(list[x].button) {    // TODO: need to sort
                    list[x].button.x = list[x].x;
                    list[x].button.y = list[x].y;
                    list[x].button.w = itemWidth;
                    list[x].button.h = itemHeight;
                }
            }
        }

        ctx.restore();

    }

    close() {
        this.active = false;
    }

    init() {
    }
    rest() {;
    }

    clear() {
    }

}