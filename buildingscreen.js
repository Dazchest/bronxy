class BuildingScreen extends ScreenView {

    // get the defaults from ScreenView
     constructor() {

        super();

        camera.x = 0;
        camera.y = 0;
        this.camera = camera;

        this.name = "Buildings";
        this.inputs = [];
        //this.inputs.push(new newInput("f"));

        console.log("this is BuildingScreen constructor");
        this.buttons.push(new Button({"active": true, "style": "circle", radius: 50, "x": 500, "y": 100, "w": 70, "h": 50, "text": "Exit", "screen": this, "action":  this.exitScreen}));

        this.listBox = new ListBox(50, 100, 300, 400);

        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
     }

    tick() {
        this.draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(this.x, this.y, canvas.w / .5, canvas.h / .5);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x + 20, this.y + 20);
    
            //buildingHandler.drawBuildings();

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

            
            // buildingHandler.checkBuildingClick();
            // buildingHandler.highlightEmptyBuildSpot();

            this.listBox.draw(buildingList);
            Resource.drawAll();

            //this.inputs[0].draw();
            }
    }




}