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
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 150, "w": 70, "h": 50, "text": "Map", "screen": this, "action":  this.mapScreen3}));
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 260, "w": 80, "h": 50, "text": "Items", "screen": this, "action":  this.itemScreen}));
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 370, "w": 80, "h": 50, "text": "Research", "screen": this, "action":  this.researchScreen}));
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 500, "w": 80, "h": 50, "text": "Buildings", "screen": this, "action":  this.buildingScreen}));
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 610, "w": 80, "h": 50, "text": "Equipment", "screen": this, "action":  this.equipmentScreen}));
        this.buttons.push(new Button({"active": true, "style": "circle", "x": 60, "y": 740, "w": 80, "h": 50, "text": "Throne", "screen": this, "action":  this.throneRoomScreen}));


        
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
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(this.x, this.y, canvas.w / .5, canvas.h / .5);

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

    buildingScreen() {
        console.log("going to Buildings screen");
        buildingScreen = new BuildingScreen();
        screenManager.screen = buildingScreen;
    }

    equipmentScreen() {
        console.log("going to equipment screen");
        equipmentScreen = new EquipmentScreen();
        screenManager.screen = equipmentScreen;
    }

    throneRoomScreen() {
        console.log("going to throne room screen");
        throneRoomScreen = new ThroneRoomScreen();
        screenManager.screen = throneRoomScreen;
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