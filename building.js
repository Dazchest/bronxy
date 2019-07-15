class Building {


    constructor(data) {
        console.log("this is building constructor");
        this.upgrading = false;
        this.amount = 0;
        this.collectable = false;
        this.collactableTime = 3;  // can collect rss after # seconds

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }

        //setup the more static objects
        this.images = new Image();
        let imageSrc = "images/" + this.type + ".png";
        this.images.src = imageSrc

        this.buttons = [];
        this.buttons.push(new Button({"active": false, "offset" : {"x": 0, "y": -30}, "w": 100, "h": 30, "text": "Upgrade", "screen": this, "action": this.upgradeScreen}));
    }

    drawButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            let b = this.buttons[x];
            if(b.active) {
                b.x = b.offset.x + this.gridPos.x * gridSize.x + camera.x;
                b.y = b.offset.y + this.gridPos.y * gridSize.y + camera.y;
                b.draw();
            }
        }
    }
    showButtons() {
        if(this.collectable == false) { // no rss to collect, so show button
            for(let x=0; x<this.buttons.length; x++) {
                this.buttons[x].show();
            }
        }
    }
    hideButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            this.buttons[x].hide();
        }
    }

    checkButtons() {
        //console.log("checking buttons???");
        this.buttonClicked = false;
        var b;
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                console.log(this.buttons.length);
                b = this.buttons[x];
                //console.log("action = " + b.action);
                //console.log("active = " + b.active);
                if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
                    console.log("presssssss " + x);
                    if(b.action && b.active) {
                        this.buttonClicked = b;
                    }
                }
            }
        }
        if(this.buttonClicked) {
            clicked = false;
            console.log(this.buttonClicked.text + " pressed");
            let callback = this.buttonClicked.action;
            callback(this);
        }
    }


    draw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y, gridSize.x, gridSize.y);

        if(this.images.complete) {
            ctx.drawImage(this.images, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y, gridSize.x, gridSize.y);
        }
        ctx.fillStyle = '#000000';
        ctx.font = "20px Georgia";
        ctx.fillText(this.name, this.gridPos.x * gridSize.x + camera.x - 10, this.gridPos.y * gridSize.y + camera.y + 0);
        ctx.font = "15px Georgia";
        ctx.fillText("level: " + this.level, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + gridSize.y + 20);
        ctx.font = "15px Georgia";
        if(this.upgrading) {
            let timeLeft = Math.ceil(this.endTime - Date.now()/1000);
            ctx.fillText("time: " + timeLeft, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + gridSize.y + 35);
        } else if(this.pph) {
            ctx.fillText("rss: " + this.amount, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + gridSize.y + 35);
        }
        this.drawButtons();
    }




    upgrade() {
        this.upgrading = true;

        // check for construction buffs
        let pBuff = 0;  //percentage buff
        let vBuff = 0;  //value buff
        if(buffManager.construction) {
            if(buffManager.construction.construction.percentage) {
                pBuff = buffManager.construction.construction.percentage;
            } 
            if(buffManager.construction.construction.value) {
                vBuff = buffManager.construction.construction.value;
            }
        }
        //-------------------------------------------

        this.startTime = Date.now()/1000;   //convert to seconds
        let buildTime = buildings[this.type].levels[this.level].baseBuildTime;
        this.buildTime = Math.ceil(buildTime / (1+(pBuff/100)));   //this need fixing
        this.buildTime -= vBuff;
        this.endTime = this.startTime + this.buildTime;
        console.log(buildTime);

        resources.food.amount -= buildings[this.type].levels[this.level].requirements.resources.food;
        resources.wood.amount -= buildings[this.type].levels[this.level].requirements.resources.wood;
        resources.stone.amount -= buildings[this.type].levels[this.level].requirements.resources.stone;
        resources.iron.amount -= buildings[this.type].levels[this.level].requirements.resources.iron;

        //saveList({buildingList});       //must have the brackets in
        //saveList({resources});
        saveGame2();
        //saveList(getVarNameFromObject({troopList}));

    }

    checkUpgrading() {
        if(this.upgrading) {
            if(this.endTime <= Date.now()/1000) {
                this.upgrading = false;
                console.log("upgrade complete");
                buildingHandler.usedSlots--;
                if(this.production) {
                    this.pph = buildings[this.type].levels[this.level].pph;
                }
                this.collectionTime = Date.now();
                this.level ++;
                saveGame2();
            }
        }
    }
    displayUpgradeTimer(c) {
        popup(this.endTime - Date.now()/1000, 180, 565 + (c * 20));
    }

    checkProduction() {
        if(this.pph){
            // check for productioin buffs
            let p = this.production;
            let pph = this.pph;
            let buff = 0;
            if(buffManager.production[p].percentage) {
                buff = buffManager.production[p].percentage;
                pph = pph + (this.pph * (buff/100));
            } 
            if(buffManager.production[p].value) {
                buff = buffManager.production[p].value;
                pph = pph + (buff);
            }
            this.totalpph = pph;
            //-------------------------------------------

            this.timeElapsed = (Date.now() - this.collectionTime) / 1000;    // in seconds
            this.collectable = true;
            if(this.timeElapsed < this.collactableTime) {
                this.collectable = false;
                return;                 // can only collect after # seconds/minutes
            } 
            if(this.timeElapsed > 60*60) {   // no production after 1 hour
                this.timeElapsed = 60*60;   // set to 1 hour
            }

            pph = pph * (this.timeElapsed);
            this.amount = Math.floor(pph/3600);
        }
        if(this.production == "rss"){   //its a warehouse
            this.timeElapsed = (Date.now() - this.collectionTime) / 1000;    // in seconds
            this.collectable = true;
            if(this.timeElapsed < this.collactableTime) {
                this.collectable = false;
                return;                 // can only collect after # seconds/minutes
            } 
        }
    }

    collectProduction() {
        if(this.production == "rss") {  // collect all rss
            console.log("collecting from warehouse");
            this.collectionTime = Date.now();
            for(let x=0; x<buildingList.length; x++) {
                if(buildingList[x].pph) {
                    resources[buildingList[x].production].amount += buildingList[x].amount;
                    buildingList[x].collectionTime = Date.now();
                    buildingList[x].amount = 0;
                }
            }
            saveGame2();
        } else {
            resources[this.production].amount += this.amount;
            this.collectionTime = Date.now();
            this.amount = 0;
            saveGame2();
        }
    }

    click() {
        console.log("clicked = " + this.name);
        if(this.upgrading) {
            console.log("building upgrading");
            clicked = false;
            return;         // dont do anything if the building is upgrading
        }
        if(this.timeElapsed > this.collactableTime) {
            this.collectProduction();
            clicked = false;    
            buildingHandler.currentBuilding = null;
            return;            
        }
        //buildingInfoScreen = new BuildingInfoScreen(this);
        buildingHandler.hideOuterButtons();
        this.showButtons();
        clicked = false;
    }

    upgradeScreen(self) {
        if(self.upgrading) { // if already upgrading, then dont alow to upgrade again
            return;
        }
        console.log("upgrade screen please!!!");
        buildingUpgradeScreen = new BuildingUpgradeScreen(self);
        screenManager.screen = buildingUpgradeScreen;

    }

    upgradeBuilding() {
        if(this.newBuilding) {
            buildingList.push(this);
            this.newBuilding = false;
        }
        buildingHandler.usedSlots++;
        this.upgrade();
        //self.exitInfoScreen(self);
    }


}


//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

class troopTrainingBuilding extends Building {

    constructor(data) {
        super(data);

        //this.training = false;
        //this.trainingQueue = {};

        this.buttons.push(new Button({"active": false, "offset" : {"x": 0, "y": 80}, "w": 100, "h": 30, "text": "Train", "screen": this, "action": this.trainTroopsScreen}));

    }

    trainTroopsScreen(self) {
        if(self.upgrading) { // if upgrading, then dont alow to train troops
            console.log("Upgrading... cant train");
            return;
        }
        console.log("Troop Training screen please!!!");
        console.log(self);
        troopTrainingScreen = new TroopTrainingScreen(self);
        screenManager.screen = troopTrainingScreen;
    }

    checkTraining() {
        if(this.training) {
            //console.log("we are training in " + this.name);
            if(this.trainingQueue.endTime <= Date.now()/1000) {
                this.training = false;
                console.log("training complete");
                //console.log(this.barracksTroopList);
                //console.log(this.trainingQueue.quantity);



                // check if we have this troop type and tier already.. if true, just add quantity... if false, create new troop and push
                if(troopList[this.troopType]) {
                    console.log("found some type " + this.troopType);
                    console.log(this.trainingQueue);
                    if(troopList[this.troopType].levels[this.trainingQueue.tier]) {
                        troopList[this.troopType].levels[this.trainingQueue.tier].quantity += this.trainingQueue.quantity;
                        console.log(troopList[this.troopType].levels[this.trainingQueue.tier]);
                        console.log("adding to existing troops");
                    } else {    // only insert the new tier/level data
                        let tierData = {};
                        tierData.level = this.trainingQueue.tier + 1;
                        tierData.quantity = this.trainingQueue.quantity;
                        tierData.type = this.troopType;
                        tierData.name = troops[this.troopType].levels[this.trainingQueue.tier].name;
                        troopList[this.troopType].levels[this.trainingQueue.tier] = tierData;
    
                        console.log("creating new troops")
                    }
                } else {
                    console.log(this.troopType);
                    let troopData = {};
                    troopData.type = this.troopType;
                    troopData.levels = [];
                    let tierData = {};
                    tierData.level = this.trainingQueue.tier + 1;
                    tierData.quantity = this.trainingQueue.quantity;
                    tierData.type = this.troopType;
                    tierData.name = troops[this.troopType].levels[this.trainingQueue.tier].name;
                    troopData.levels.push(tierData);
                    troopList[this.troopType] = (new Troop(troopData));

                    console.log("creating new troops")
                }
                if(this.trainingScreen) {
                    setButtonState(this.trainingScreen.buttons, "train", true);
                }

                saveGame2();

            }
        }
    }

    train(tier, qty) {
        if(this.training) {   // already trainging so return - double checking at this point
            console.log('already training');
            return;
        }

        tier -= 1;
        this.training = true;
        this.trainingQueue.quantity = Number(qty);
        this.trainingQueue.tier = tier;

        this.trainingQueue.startTime = Date.now()/1000;   //convert to seconds
        let trainTime = qty * troops[this.troopType].levels[tier].baseTrainTime;
        //this.trainTime = Math.ceil(trainTime / (1+(pBuff/100)));   //this need fixing
        //this.trainTime -= vBuff;
        this.trainingQueue.trainTime = trainTime;
        this.trainingQueue.endTime = this.trainingQueue.startTime + this.trainingQueue.trainTime;
        console.log("training time = " + this.trainingQueue.trainTime + " seconds");

        // use the rss
        let t = troops[this.troopType].levels[this.trainingQueue.tier];
        resources.food.amount -= t.requirements.resources.food * qty;
        resources.wood.amount -= t.requirements.resources.wood * qty;
        resources.stone.amount -= t.requirements.resources.stone * qty;
        resources.iron.amount -= t.requirements.resources.iron * qty;

        saveGame2();

    }

    displayTrainingTimer() {
        //popup(this.trainingQueue.endTime - Date.now()/1000, 180, 565);
    }

}


