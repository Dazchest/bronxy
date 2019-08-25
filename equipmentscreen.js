class EquipmentScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Equipment";
        //this.currentTree = "City";

        console.log("this is Equipment Screen constructor"); 
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "x": 550, "y": 100, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        this.listBox = new ListBox(100, 150, 400, 400, true, false);

        
        cities[currentCity].active = false;
        cityScreen.active = false;
        buildingHandler.highlightGrid = false;
    }


    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffbbdd";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, 20, 130);
    
            this.drawButtons();
            this.checkButtons();
            this.checkEquipmentButtons();
            Resource.drawAll(); // draw resources at the top of the screen
            
            this.listBox.draw(equipmentList);

            for(let x=0; x<equipmentList.length; x++) {
                equipmentList[x].displayEquipment();
            }

           
        }
    }


    checkEquipmentButtons() {
        for(let x=0; x<equipmentList.length; x++) {
            //if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
                if(clicked) {   //mouse is clicked, check if it was on a research button
                    let b = equipmentList[x].button;
                    if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                        if(b.action && b.active) {
                            clicked = false;
                            let callback = b.action;
                            callback(equipmentList[x]);
                        }
                    }
                }
            //}
        }
    }






}