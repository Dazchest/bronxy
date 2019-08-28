class ItemScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Items";

        this.buttons.push(new Button({"style": "circle", radius: 50, "active": true, "x": 450, "y": 50, "w": 100, "h": 50, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        for(let x=0; x<itemList.length; x++) {
            let itemWidth = itemList[x].w;
            let itemHeight = itemList[x].h;
            let b = new Button({"active": true, "drawButton": false, "x": 0, "y": 0, "w": itemWidth, "h": itemHeight, "text": "", "action":  this.showItem});
            itemList[x].button = b;
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

            // DRAW TH PANEL
            let borderPanelStartX = this.listBox.x - itemListImages[7].width + 26;
            let borderPanelStartY = this.listBox.y - itemListImages[1].height;
            let borderPanelWidth = this.listBox.w - 52;
            let borderPanelHeight = this.listBox.h - 26;
            // ctx.drawImage(itemListImages[0], borderPanelStartX , borderPanelStartY);
            // ctx.drawImage(itemListImages[1], borderPanelStartX  + 32, borderPanelStartY, borderPanelWidth, itemListImages[1].height);
            // ctx.drawImage(itemListImages[2], borderPanelStartX + borderPanelWidth + 32, borderPanelStartY);

            // ctx.drawImage(itemListImages[3], borderPanelStartX + borderPanelWidth + 32, borderPanelStartY + 32, itemListImages[3].width, borderPanelHeight);

            // ctx.drawImage(itemListImages[4], borderPanelStartX + borderPanelWidth + 32, borderPanelStartY + 32 + borderPanelHeight);
            // ctx.drawImage(itemListImages[5], borderPanelStartX + 32, borderPanelStartY + 32 + borderPanelHeight, borderPanelWidth, itemListImages[5].height);
            // ctx.drawImage(itemListImages[6], borderPanelStartX, borderPanelStartY + 32 + borderPanelHeight);

            // ctx.drawImage(itemListImages[7], borderPanelStartX, borderPanelStartY + 32, itemListImages[7].width, borderPanelHeight);
            //--
            // ctx.drawImage(itemListImages[10], this.listBox.x-10, this.listBox.y-7, this.listBox.w+20, this.listBox.h+15);
            //--

            //this.listBox.listen();
            this.displayItems();
            this.drawButtons();
            this.checkButtons();
            this.checkItemButtons();
            Resource.drawAll();

        }
    }

    displayItems() {
        //this.listBox.init();    // always call rest() later
        //this.listBox.clear();

        this.listBox.draw(itemList);
    }

    showItem(qty, itemClicked) {
        //console.log("item clicked");
        //console.log(itemButton);
        if(itemClicked.group != "speedup") {
            itemClicked.useItem(1, itemClicked);
        }
    }

    checkItemButtons(listToCheck) {
        if(!listToCheck) {
            listToCheck = itemList;
        }
        //console.log("checkingngngngngng");
        for(let x=0; x<itemList.length; x++) {
            //if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
                if(clicked) {   //mouse is clicked, check if it was on a research button
                    let b = itemList[x].button;
                    //console.log(b);
                    if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                        if(b.action && b.active) {
                            clicked = false;
                            //console.log(b.text + " pressed");
                            let callback = b.action;
                            //console.log(callback);
                            let qty = 1;  
                            callback(qty, itemList[x]);
                        }
                    }
                }
            //}
        }
    }

}

class SpeedScreen extends ItemScreen{

    constructor(speedBuilding) {
        super();
        
        this.name = "Lets Speed";

        this.trainingQueue = speedBuilding.trainingQueue;

        this.speedList = itemManager.getSpeeds();

        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "x": 400, "y": 340, "w": 100, "h": 30, "text": "Use", "screen": this, "action":  this.useSpeed}));

        for(let x=0; x<this.speedList.length; x++) {
            let b = new Button({"active": true, "drawButton": false, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "", "action":  this.selectItem});
            this.speedList[x].button = b;
        }

    }

    draw() {
        //return;
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffaa88";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            ctx.fillStyle = '#aa0000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.trainingQueue.endTime - Date.now()/1000, 300, 500);

            this.displayItems();
            this.displaySpeeds();
            this.drawButtons();
            this.checkButtons();
            this.checkItemButtons();
            //Resource.drawAll();

        }
    }

    checkItemButtons() {
       for(let x=0; x<this.speedList.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                let b = this.speedList[x].button;
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                    if(b.action && b.active) {
                        clicked = false;
                        let callback = b.action;
                        callback(this, this.speedList[x]);
                    }
                }
            }
        }
    }

    displayItems() {
        for(let x=0; x<this.speedList.length; x++) {
            this.speedList[x].draw(50, 200 + (x * 35));
            // go through the buttons, and change x,y to match the item x,y
            this.speedList[x].button.x = this.speedList[x].x;
            this.speedList[x].button.y = this.speedList[x].y;
        }
    }

    displaySpeeds() {
        for(let x=0; x<this.speedList.length; x++) {
            ctx.font = "30px Arial";
            ctx.fillStyle = '#4444ee';
            ctx.fillText(this.speedList[x].name, 220, 240 + (x*40));
        }
    }

    selectItem(self, itemClicked) {
        console.log("item clicked");
        console.log(self);
        console.log(itemClicked);
        self.selectedItem = itemClicked;
        //console.log(itemButton);
        //itemButton.useItem(1, itemButton);
    }

    useSpeed(self, b) {
        //return;
        let speedTime = self.selectedItem.levels[0].contents[0].minutes * 60;   // 60 seconds???
        //self.trainingQueue.endTime -= speedTime;
        self.trainingQueue.endTime -= speedTime;
        console.log(speedTime + " seconds");
        console.log(self.trainingQueue.endTime);
    }

}

var bufferImage = new Image();
