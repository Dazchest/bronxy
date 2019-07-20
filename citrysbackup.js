class CityScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();

        this.bing();
        this.name = "City";

        console.log("this is CityScreen constructor");
        this.buttons.push(new Button({"active": true, "x": 500, "y": 100, "w": 80, "h": 30, "text": "Items", "screen": this, "action":  this.itemScreen}));
        this.buttons.push(new Button({"active": true, "x": 500, "y": 140, "w": 80, "h": 30, "text": "Research", "screen": this, "action":  this.researchScreen}));
        this.buttons.push(new Button({"active": true, "x": 260, "y": 20, "w": 70, "h": 30, "text": "Map 1", "screen": this, "action":  this.mapScreen}));
        this.buttons.push(new Button({"active": true, "x": 340, "y": 20, "w": 70, "h": 30, "text": "Map 2", "screen": this, "action":  this.mapScreen2}));
        this.buttons.push(new Button({"active": true, "x": 420, "y": 20, "w": 70, "h": 30, "text": "Map 3", "screen": this, "action":  this.mapScreen3}));
        return;
        let b = {}; // new Button();
        b.x = 50;
        b.y = 125;
        b.w = 50;
        b.h = 50;
        b.offset = {"x": 100, "y": 100}; 
        b.type = "upgrade";
        b.text = "Upgrade";
        b.color = "#00ff00";
        b.active = false;
        b.action = this.upgradeBuilding;
        let bb = new Button(b);
        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        this.buttons.push(bb);
        console.log(this);
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
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

    mapScreen() {
        console.log("going to the map 1");
        mapScreen = new MapScreen(1);
        screenManager.screen = mapScreen;
    }

    mapScreen2() {
        console.log("going to the map 2");
        mapScreen = new MapScreen(2);
        screenManager.screen = mapScreen;
    }

    mapScreen3() {
        console.log("going to the map 3");
        mapScreen = new MapScreen(3);
        screenManager.screen = mapScreen;
    }

}





class ScreenManager {
    
    constructor(screen) {
        this.screen = screen;
        this.screen.active = true;
    }

    closeCurrentScreen() {
        this.screen.active = false;
    }

}

class ScreenView {
    
    constructor() {
        this.margin = 10;
        this.x = 10;
        this.y = 100;
        this.w = canvas.width - this.margin * 2;
        this.h = canvas.height - this.y - this.margin * 1;

        this.active = true;

        this.buttons = [];
        this.inputs = [];

        console.log("this is ScreenView constructor");

    }

    ticktock() {
        this.tick();
    }

    exitScreen = function(self) {
        console.log("closing the screen");

        // only reset the camera if exiing the map screen
        if(screenManager.screen == mapScreen) {
            camera.x = 0;
            camera.y = 0;
        }

        self.active = false;
        cities[currentCity].active = true;
        //screenManager.screen =    
        //cityScreen = new CityScreen();
        if(self.troopBuilding) {
            console.log("exiting - from a troop building");
            self.troopBuilding.trainingScreen = null;
        }

        for(let x=0; x<self.inputs.length; x++) {
            document.getElementById('maindiv').removeChild(self.inputs[x]);
        }
        screenManager = new ScreenManager(cityScreen);
        }

    drawButtons() {
        //console.log(this.buttons.length);
        for(let x=0; x<this.buttons.length; x++) {
             this.buttons[x].draw();
         }
    }

    checkButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                
                let b = this.buttons[x];
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                    if(b.action && b.active) {
                        clicked = false;
                        console.log(b.text + " pressed");
                        let callback = b.action;
                        callback(this, b);
                    }
                }
            }
        }
    }



    bing() {
        console.log("pressed the bong");
    }
}