class CityScreen extends ScreenView {

    // get the defaults from ScreenView
     constructor() {

        super();

        camera.x = -200;
        camera.y = -200;
        this.camera = camera;

        this.name = "City";
        this.inputs = [];
        //this.inputs.push(new newInput("f"));

        console.log("this is CityScreen constructor");
        this.buttons.push(new Button({"active": true, "x": 500, "y": 100, "w": 80, "h": 40, "text": "Items", "screen": this, "action":  this.itemScreen}));
        this.buttons.push(new Button({"active": true, "x": 500, "y": 160, "w": 80, "h": 30, "text": "Research", "screen": this, "action":  this.researchScreen}));

        this.buttons.push(new Button({"active": true, "x": 500, "y": 20, "w": 70, "h": 30, "text": "Map 3", "screen": this, "action":  this.mapScreen3}));

        
        // cities[currentCity].active = false;
        // buildingHandler.highlightGrid = false;
     }

    tick() {
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
            ctx.fillText(this.name, this.x + 20, this.y + 20);
    
            buildingHandler.drawBuildings();

            // var grd = ctx.createLinearGradient(0, 0, 0, 100);
            // grd.addColorStop(0, "#cccc66");
            // grd.addColorStop(1, "#aaaaff");

            // ctx.fillStyle = grd;
            // ctx.fillStyle = "#000000";
            // ctx.globalAlpha = .5;
            // ctx.fillRect(0, 0, canvas.width, 100);
            // ctx.globalAlpha = 1;

            this.drawButtons();
            this.checkButtons();

            
            buildingHandler.checkBuildingClick();
            buildingHandler.highlightEmptyBuildSpot();

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