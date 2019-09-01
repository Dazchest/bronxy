class EquipmentScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Equipment";
        throneRoom.showingEquipment = false;
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
            ctx.fillRect(this.x, this.y, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, 20, 130);
    
            this.drawButtons();
            if(!throneRoom.showingEquipment) {     // dont test this screen buttons if we are displaying equipment
                this.checkButtons();
                this.checkEquipmentButtons();
            }
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


class ThroneRoomScreen extends ScreenView {

    constructor() {
        super();

        this.buttons = [];
        this.name = "Throne Room";
        this.active = true;
        
        throneRoom.showingEquipment = false;

        console.log("this is Throne Room Screen constructor"); 
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "x": 550, "y": 100, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        
        cities[currentCity].active = false;
        cityScreen.active = false;
        buildingHandler.highlightGrid = false;

    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#55bbee";
            ctx.fillRect(this.x, this.y, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, 20, 130);
    
            this.drawEquipment();
            this.drawButtons();
            if(!throneRoom.showingEquipment) {     // dont test this screen buttons if we are displaying equipment
                this.checkButtons();
                this.checkEquipmentButtons();
            }
            //Resource.drawAll(); // draw resources at the top of the screen
            
            //this.listBox.draw(equipmentList);

            // for(let x=0; x<equipmentList.length; x++) {
            //     equipmentList[x].displayEquipment();
            // }
            for(let x=0; x<throneRoom.equipment.length; x++) {
                throneRoom.equipment[x].displayEquipment();
            }

           
        }
    }

    drawEquipment() {
        for(let x=0; x<throneRoom.equipment.length; x++) {
            let roomX = throneRoom.equipment[x].roomPosition.x;
            let roomY = throneRoom.equipment[x].roomPosition.y;
            throneRoom.equipment[x].draw(roomX, roomY, this, 100, 300);
        }
    }

    checkEquipmentButtons() {
        for(let x=0; x<throneRoom.equipment.length; x++) {
            //if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
                if(clicked) {   //mouse is clicked, check if it was on a research button
                    let b = throneRoom.equipment[x].button;
                    if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                        if(b.action && b.active) {
                            clicked = false;
                            let callback = b.action;
                            callback(throneRoom.equipment[x]);
                        }
                    }
                }
            //}
        }
    }


}

class ThroneRoom {

    constructor() {
        this.equipment = [];
        this.maxStatueCount = 1;
        //throne, statue, table, banner, advisor, picture 1,
        this.showingEquipment = false;
    }

    init() {
        for(let x=0; x<equipmentList.length; x++) {
            if(equipmentList[x].equipped) {
                this.equipment.push(equipmentList[x]);
                console.log("adding to throne room");
            }
        }

    }

    equip(item, b) {
        console.log("this = ", this)
        console.log("item = ", item.constructor.name);
        console.log("button = ", b)

        //check current equipment to see if item is already ther
        let counter = 0;
        let found = false;
        let id = null;
        for(let x=0; x<this.equipment.length; x++) {
            found = false;
            if(this.equipment[x] == item) {
                found = true;
                break;
            }
            if(this.equipment[x].constructor.type == item.constructor.type) {
                id = x;
                break;
                //counter++;
            }
        }
        if(found == false) {
            if(id) {        // found e.g, another statue, so replace
                this.equipment[id] = item;
            } else {        // no other equipment of item.type found, so push it onto the list
                this.equipment.push(item);
            }
            console.log("equipping item");
            item.equipped = true;
            Toast("Item Equipped");
            saveList("equipmentList", true);
            saveList("throneRoom", true);
        } else {
            Toast("Already Equipped");
            console.log("item already equipped -- or too many");
        }

    }
}

