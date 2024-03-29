class BuildingUpgradeScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(building, that) {

        super();
        this.building = building;
        this.that = that;
        for(let x=0; x<Object.keys(building).length; x++) {
            name = Object.keys(building)[x];
            this[name] = building[name];
        }
        this.buttons = [];

        this.bing();

        let b = {}; // new Button();
        b.x = 50;
        b.y = 125;
        b.w = 50;
        b.h = 50;
        b.offset = {"x": 100, "y": 100}; 
        b.type = "upgrade";
        b.text = "Upgrade";
        b.color = "#00ff00";
        b.style = "rectangle";
        b.active = false;
        b.action = this.upgradeBuilding;
        let bb = new Button(b);
        this.buttons.push(bb);
        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        console.log(this);
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }

    displayUpgradeRequirements() {
        ctx.font = "20px Georgia";
        let fontC = '#0000ff';

        this.requirementsMet = true;
        let level = this.level; //level will be 1 above, because of index 0
        let levelMaxed = false;
        let buildingType = this.type;
        let buildingName = this.name;
        ctx.fillText("Building: " + buildingName + " - " + buildingType, 100, 450);

        if(level == buildings[buildingType].levels.length) {
            ctx.fillText("level maxed" , 200, 100);  
            levelMaxed = true;
        }
        if(levelMaxed == false) {
            // check quantity of building allowed
            let buildingCount = 0;
            for(let x=0; x<buildingList.length; x++) {
                if(buildingList[x].type == buildingType) {
                    buildingCount ++;
                }
            }
            ctx.fillText("build count: " + buildingCount, 280, 300);

            // check current buildings
            let br = buildings[buildingType].levels[level].requirements.buildings;
            for(let x=0; x<br.length; x++) {
                let brName = buildings[br[x].type].name;
                let brType = br[x].type;
                fontC = '#0000ff';

                var typeFound = false;
                var type;
                for(let y=0; y<buildingList.length; y++) { // check if building required is even built yet 
                    if(buildingList[y].type == brType) { 
                        typeFound = true;  // set typefound to the buildingList index found
                        type = y;
                    }
                }
                if(typeFound) { //check if building found is at required level
                    if(buildingList[type].level < br[x].level) {
                        this.requirementsMet = false;
                        fontC = '#ff0000';
                    }
                } else {
                    fontC = '#ff0000';
                    this.requirementsMet = false;
                }
    

                ctx.fillStyle = fontC;
                ctx.fillText("build req: " + brName + " - " + brType + " - " + br[x].level, 100, 500 + (x * 25));
                //ctx.fillText("build req: " + buildingList[brType].level, 50, 550 + (x * 25));
            }


            // check resources
            let food = buildings[buildingType].levels[level].requirements.resources.food;
            let wood = buildings[buildingType].levels[level].requirements.resources.wood;
            let stone = buildings[buildingType].levels[level].requirements.resources.stone;
            let iron = buildings[buildingType].levels[level].requirements.resources.iron;

            fontC = '#0000ff';
            if(resources.food.amount < food) {
                this.requirementsMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Food: " + food, 200, 400);

            fontC = '#0000ff';
            if(resources.wood.amount < wood) {
                this.requirementsMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Wood: " + wood, 200, 425);

            fontC = '#0000ff';
            if(resources.stone.amount < stone) {
                this.requirementsMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Stone: " + stone, 200, 450);

            fontC = '#0000ff';
            if(resources.iron.amount < iron) {
                this.requirementsMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Iron: " + iron, 200, 475);
        } else {
            this.requirementsMet = false;
        }

        // check if build slots are full
        if(buildingHandler.usedSlots >= buildingHandler.slots) {
            this.requirementsMet = false;
            console.log("all slots are full");
        }

        ctx.fillText("requirements met: " + this.requirementsMet, 375, 100);

        if(this.requirementsMet) {
            setButtonActive(this.buttons, "upgrade");
        }

}

    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            if(this.level == 0) {
                buildingUpgradeScreen.buttons[0].text = "Build"
            } else {
                buildingUpgradeScreen.buttons[0].text = "Upgrade"
    
            }
    
            this.displayUpgradeRequirements();
            this.drawButtons();
            this.checkButtons();
            Resource.drawAll();

        }
    }


    detailsScreen(self) {
        self.active = false;
        console.log("going to detailsscreen");
        buildingDetailsScreen = new BuildingDetailsScreen(self.building, self);
        buildingDetailsScreen.active = true;
    }

    upgradeBuilding(self) {
        if(self.building.newBuilding) {
            buildingList.push(self.building);
            self.building.newBuilding = false;
        }
        buildingHandler.usedSlots++;
        self.building.upgrade();
        self.exitScreen(self);
    }

}