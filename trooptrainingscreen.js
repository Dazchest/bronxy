class TroopTrainingScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(troopBuilding) {

        super();


        this.name = "Training";
        for(let x=0; x<Object.keys(troopBuilding).length; x++) {
            name = Object.keys(troopBuilding)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = troopBuilding[name];
        }

        this.troopBuilding = troopBuilding;
        this.training = troopBuilding.training;
       // troopBuilding.trainingScreen = this;
        this.troopType = troopBuilding.troopType
        this.troopName = troopBuilding.troopName
        this.troops = troops[troopBuilding.troopType];
        this.troopList = troopBuilding.troopList;
        //this.tiers = this.troopList.tiers;
        // if(this.troopList.length>0) {
        // } else {
        //     this.tiers = [];
        // }
        this.currentTier = 1;

        console.log("this is Troop Training constructor");
        console.log("troops that train here are - " + "type: " + this.troopType + " : " +  this.troopName);

        this.buttons = [];

        this.buttons.push(new Button({"active": true, style: "circle", radius: 50, "x": 500, "y": 100, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "name": "train", "x": 365, "y": 365, "w": 100, "h": 30, "text": "Train", "screen": this, "action":  this.train}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "left", "name": "troopleft", "x": 75, "y": 200, "w": 128, "h": 128, "text": "Left", "screen": this, "action":  this.viewTiers}));
        this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "right", "name": "troopright", "x": 420, "y": 200, "w": 128, "h": 128, "text": "Right", "screen": this, "action":  this.viewTiers}));

        this.buttons.push(new Button({"active": true, "name": "speed", "x": 365, "y": 565, "w": 100, "h": 30, "text": "Speed", "screen": this, "action":  this.speed}));

        let i = {};
        i.id = 'quantityInput';
        i.name = 'quantityInput[]';
        i.type = 'number';  
        i.min = 0;
        //i.max = 50;      
        i.value = 0;

        let iData = {x: 200, y: 375};
        let newI = new NewInput(i, iData);

        this.inputs.push(newI);

        if(this.troopBuilding.training) {   //this.troopBuilding.training
            setButtonState(this.buttons, "train", false);
            console.log("we are already training hyou know...");
        }

        this.x = 0;
        this.y = 0;
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;

        this.active = true;
    }


    tick() {
        this.draw();
    }

    draw() {
        if(this.active) {
            ctx.save;
            ctx.scale(1,1);

            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#333333";
            ctx.fillRect(0, 0, canvas.w, canvas.h);

            ctx.fillStyle = '#eeeeee';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.displayTroops(this.currentTier);      //which tier to display
            this.drawButtons();
            this.checkButtons();
            if(this.troopBuilding.training) {   //this.troopBuilding.training
                this.displayTrainingTimer();
            }

            this.inputs[0].draw();
            this.inputs[0].button.check();

            Resource.drawAll(); // draw resources at the top of the screen
            //this.checkDisplayResearch();
            //this.checkResearchButtons();
            ctx.restore();

        }
    }

    displayTroops(tier) {
        tier -= 1;
        //TODO: this is just a quick show
        ctx.fillStyle = '#eeeeee';
        ctx.font = "20px Georgia";

        if(troopList[this.troopType]) {
            if(troopList[this.troopType].levels[tier]) {
                ctx.fillText(troopList[this.troopType].levels[tier].quantity + " " + this.troops.levels[tier].name, this.x + 100, this.y + 350);
            } else {
                ctx.fillText("0 " + this.troops.levels[tier].name, this.x + 100, this.y + 350);
            }
        } else {
            ctx.fillText("0 " + this.troops.levels[tier].name, this.x + 100, this.y + 350);
        }

        // draw left and right buttons
        if(buttonImages[0].icon.complete) {
            ctx.drawImage(buttonImages[0].icon, 75, 200, gridSize.x, gridSize.y);
        }
        if(buttonImages[1].icon.complete) {
            ctx.drawImage(buttonImages[1].icon, 420, 200, gridSize.x, gridSize.y);
        }

        if(troops[this.troopType].levels[tier].image) { // check image is available
            if(troops[this.troopType].levels[tier].image.complete) {
                let troopimage = troops[this.troopType].levels[tier].image;
                ctx.drawImage(troopimage, 236, 200, troopimage.width / 4, troopimage.height / 4  );
            }
        }

        // check requirements
        this.requirementsMet = true;
        let r = this.troops.levels[tier].requirements;

        let quantityInput = document.getElementById('quantityInput').value;
        ctx.fillStyle = '#ffffff';

        let resCheck = ['food', 'wood', 'stone', 'iron'];
        for(let x=0; x<resCheck.length; x++) {
            ctx.fillStyle = '#ffffff';
            if(resources[resCheck[x]].amount < quantityInput * r.resources[resCheck[x]]) {
                ctx.fillStyle = '#ff0000';
                this.requirementsMet = false;
            }
            ctx.fillText(resources[resCheck[x]].text + ": " + quantityInput * r.resources[resCheck[x]], 50 + (x * 95), 650)    
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillText("Total Time: " + quantityInput * this.troops.levels[tier].baseTrainTime, 50, 700)

        if(this.troopBuilding.training) { //this.troopBuilding.training
            this.requirementsMet = false;
        }


        // check buildings required
        let br = r.buildings;
        //console.log(br);
        for(let x=0; x<br.length; x++) {
            let brName = buildings[br[x].type].name;
            let brType = br[x].type;
            var fontC = '#0000ff';

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

        if(this.requirementsMet == false) {
            setButtonState(this.buttons, "train", false);
        } else {
            setButtonState(this.buttons, "train", true);
        }

    }
    //---------------------------------------

    train(self) {
        let quantityInput = document.getElementById('quantityInput').value;
        if(quantityInput < 1) {
            quantityInput = 1;
            document.getElementById('quantityInput').value = 1;
        }
        setButtonState(self.buttons, "train", false);
        console.log("lets train some troops: " + self.currentTier);
        self.troopBuilding.train(self.currentTier, quantityInput);
    }

    viewTiers(self, b) {
        console.log(b);
        if(b.direction == "left" && self.currentTier > 1) {
            self.currentTier -= 1;
        }
        if(b.direction == "right" && self.currentTier < troops[self.troopType].levels.length) {
            self.currentTier += 1;
        }
        
        self.displayTroops(self.currentTier);
    }

    displayTrainingTimer() {
        popup(this.trainingQueue.endTime - Date.now()/1000, 180, 565);
    }

    // checkDisplayResearch() {
    //     for(let x=0; x<researchList.length; x++) {
    //         researchList[x].displayResearch();
    //     }
    // }

    // checkResearchButtons() {
    //     for(let x=0; x<researchList.length; x++) {
    //         if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
    //             if(clicked) {   //mouse is clicked, check if it was on a research button
    //                 let b = researchList[x].button;
    //                 if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
    //                     if(b.action && b.active) {
    //                         clicked = false;
    //                         console.log(b.text + " pressed");
    //                         let callback = b.action;
    //                         callback(b.where, b);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    speed(self) {

        //self.closeScreen();
        if(self.inputs) {
            for(let x=0; x<self.inputs.length; x++) {
                document.getElementById('maindiv').removeChild(self.inputs[x].i);
            }
        }


       // self.troopBuilding.train(self.currentTier, quantityInput);
        //self.troopBuilding.trainingQueue.endTime -= 60;

        self.active = false;
        speedScreen = new SpeedScreen(self.troopBuilding);

        console.log("going to speed screen");
        screenManager.screen = speedScreen;
        //ItemManager.displaySpeeds(self);
    }

}