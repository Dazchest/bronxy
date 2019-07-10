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
            let b = new Button({"item": itemList[x], "active": true, "drawButton": false, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "", "screen": this, "action":  this.showItem});
            itemList[x].button = b;
            this.buttons.push(b);
        }
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }


    tick() {
        draw();
    }

    draw() {
        //console.log(this.buttons.length);
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
            Resource.drawAll();

        }
    }

    displayItems() {
        for(let x=0; x<itemList.length; x++) {
          //  if(itemList[x].action != "none") {  // dont display thing like gold
                itemList[x].draw(50, 200 + (x * 35));
                // go through the buttons, and change x,y to match the item x,y
                for(let y=0; y<this.buttons.length; y++) {
                    if(this.buttons[y] == itemList[x].button) {
                        this.buttons[y].x = itemList[x].x;
                        this.buttons[y].y = itemList[x].y;
                    }
                }
          //  }
        }
    }

    showItem(self, itemButton) {
        console.log("item clicked");
        console.log(itemButton.item);
        itemButton.item.useItem(1, itemButton);
    }

}