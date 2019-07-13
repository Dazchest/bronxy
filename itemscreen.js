class ItemScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Items";

        this.bing();

        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        for(let x=0; x<itemList.length; x++) {
            let b = new Button({"active": true, "drawButton": false, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "", "action":  this.showItem});
            itemList[x].button = b;
        }
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
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
    
            this.displayItems();
            this.drawButtons();
            this.checkButtons();
            this.checkItemButtons();
            Resource.drawAll();

        }
    }

    displayItems() {
        for(let x=0; x<itemList.length; x++) {
            itemList[x].draw(50, 200 + (x * 35));
            // go through the buttons, and change x,y to match the item x,y
            itemList[x].button.x = itemList[x].x;
            itemList[x].button.y = itemList[x].y;
        }
    }

    showItem(a, itemButton) {
        //console.log("item clicked");
        //console.log(itemButton);
        itemButton.useItem(1, itemButton);
    }

    checkItemButtons() {
        //console.log("checkingngngngngng");
        for(let x=0; x<itemList.length; x++) {
            //if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
                if(clicked) {   //mouse is clicked, check if it was on a research button
                    let b = itemList[x].button;
                    //console.log(b);
                    if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
                        if(b.action && b.active) {
                            clicked = false;
                            //console.log(b.text + " pressed");
                            let callback = b.action;
                            //console.log(callback);
                            let a=1;  
                            callback(a, itemList[x]);
                        }
                    }
                }
            //}
        }
    }

}