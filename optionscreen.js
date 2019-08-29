class OptionScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Options";

        this.buttons.push(new Button({"style": "circle", radius: 50, "active": true, "x": 450, "y": 100, "w": 100, "h": 50, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        for(let x=0; x<optionList.length; x++) {
            let optionWidth = optionList[x].w;
            let optionHeight = optionList[x].h;
            //let b = new Button({"active": true, "drawButton": false, "x": 0, "y": 0, "w": optionWidth, "h": optionHeight, "text": "", "action":  this.showItem});
            //optionList[x].button = b;
        }
        
        camera.x = 0;
        camera.y = 0;
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
        
        this.listBox = new ListBox(80, 150, 400, 300);
    }


    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#aaaaaa";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);

            //this.listBox.listen();
            this.displayOptions();
            this.drawButtons();
            this.checkButtons();
            this.checkOptionButtons();
            //Resource.drawAll();

        }
    }

    displayOptions() {
        //this.listBox.init();    // always call rest() later
        //this.listBox.clear();

        this.listBox.draw(optionList);
    }

    // showItem(qty, itemClicked) {
    //     //console.log("item clicked");
    //     //console.log(itemButton);
    //     if(itemClicked.group != "speedup") {
    //         itemClicked.useItem(1, itemClicked);
    //     }
    // }

    checkOptionButtons(optionToCheck) {
        if(!optionToCheck) {
            optionToCheck = optionList;
        }
        //console.log("checkingngngngngng");
        for(let x=0; x<optionList.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a research button
                let b = optionList[x].button;
                //console.log(b);
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                    if(b.action && b.active) {
                        clicked = false;
                        //console.log(b.text + " pressed");
                        let callback = b.action;
                        //console.log(callback);
                        callback(b);
                    }
                }
            }
        }
    }

}



class Option {

    constructor(data) {
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }


        this.w = 320;
        this.h = 50;

    }

        /**
     * Draw Option
     * @param {int} x 
     * @param {int} y 
     * @param {int} size 
     */
    draw(x, y, size) {
        this.x = x;
        this.y = y;
        let textOffsetY = Math.round(this.h / 2);

        ctx.drawImage(itemHolderImages[0], x, y, itemHolderImages[0].width, this.h);       //left
        ctx.drawImage(itemHolderImages[2], x + itemHolderImages[0].width, y, this.w, this.h);       //middle
        ctx.drawImage(itemHolderImages[1], x + this.w + itemHolderImages[0].width, y, itemHolderImages[1].width, this.h);       //right

        ctx.textBaseline = "middle";
        ctx.fillStyle = '#eeeeee';
        ctx.font = this.h/2 + "px Georgia";
        ctx.fillText(this.text, x + 10, y + textOffsetY);
    }

}
