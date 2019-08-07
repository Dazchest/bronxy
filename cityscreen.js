class CityScreen extends ScreenView {

    // get the defaults from ScreenView
     constructor() {

         super();

       // this.bing();
        //ScreenView.call(this);
        this.name = "City";
        this.inputs = [];
        //this.inputs.push(new newInput("f"));

        console.log("this is CityScreen constructor");
        this.buttons.push(new Button({"active": true, "x": 500, "y": 100, "w": 80, "h": 30, "text": "Items", "screen": this, "action":  this.itemScreen}));
        this.buttons.push(new Button({"active": true, "x": 500, "y": 140, "w": 80, "h": 30, "text": "Research", "screen": this, "action":  this.researchScreen}));
        //this.buttons.push(new Button({"active": true, "x": 260, "y": 20, "w": 70, "h": 30, "text": "Map 1", "screen": this, "action":  this.mapScreen}));
        //this.buttons.push(new Button({"active": true, "x": 340, "y": 20, "w": 70, "h": 30, "text": "Map 2", "screen": this, "action":  this.mapScreen2}));
        this.buttons.push(new Button({"active": true, "x": 420, "y": 20, "w": 70, "h": 30, "text": "Map 3", "screen": this, "action":  this.mapScreen3}));
        // return;
        // let b = {}; // new Button();
        // b.x = 50;
        // b.y = 125;
        // b.w = 50;
        // b.h = 50;
        // b.offset = {"x": 100, "y": 100}; 
        // b.type = "upgrade";
        // b.text = "Upgrade";
        // b.color = "#00ff00";
        // b.active = false;
        // b.action = this.upgradeBuilding;
        // let bb = new Button(b);
        // this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        // //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        // this.buttons.push(bb);
        // console.log(this);
        
        // cities[currentCity].active = false;
        // buildingHandler.highlightGrid = false;
     }

    tick() {
        //console.log("fff");
        this.draw();

    }

    draw() {
        //console.log("cityscreen here");
        //return;
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#aaaaff";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.drawButtons();
            this.checkButtons();
            buildingHandler.drawBuildings();
            Resource.drawAll();

            //this.inputs[0].draw();
            }
    }

    itemScreen() {
        console.log("going to item screen");
        itemScreen = new ItemScreen();
        screenManager.screen = itemScreen;

    }

    researchScreen() {
        console.log("going to Research screen");
        researchScreen = new ResearchScreen();
        screenManager.screen = researchScreen;
    }

    // mapScreen() {
    //     console.log("going to the map 1");
    //     mapScreen = new MapScreen(1);
    //     screenManager.screen = mapScreen;
    // }

    // mapScreen2() {
    //     console.log("going to the map 2");
    //     mapScreen = new MapScreen(2);
    //     screenManager.screen = mapScreen;
    // }

    mapScreen3() {
        console.log("going to the map 3");
        //mapScreen = new MapScreen(3);
        screenManager.screen = mapScreen;
        mapScreen.setup();
    }

}