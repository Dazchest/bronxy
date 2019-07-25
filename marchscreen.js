class MarchScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(tile) {

        super();

        this.tile = tile;
        console.log(this.tile);

        this.selectedTroops = [];
        this.troopsAvailable = [];
        this.name = "Marching";

        // for(let x=0; x<Object.keys(troopBuilding).length; x++) {
        //     name = Object.keys(troopBuilding)[x];
        //     this[name] = troopBuilding[name];
        // }

    //     this.troopBuilding = troopBuilding;
    //     this.training = troopBuilding.training;
    //    // troopBuilding.trainingScreen = this;
    //     this.troopType = troopBuilding.troopType
    //     this.troopName = troopBuilding.troopName
    //     this.troops = troops[troopBuilding.troopType];
    //     this.troopList = troopBuilding.troopList;
    //     //this.tiers = this.troopList.tiers;
    //     // if(this.troopList.length>0) {
    //     // } else {
    //     //     this.tiers = [];
    //     // }
    //     this.currentTier = 1;

        console.log("this is March constructor");

        this.buttons = [];

        this.buttons.push(new Button({"active": true, "x": 475, "y": 500, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "name": "march", "x": 365, "y": 365, "w": 100, "h": 30, "text": "March", "screen": this, "action":  this.march}));
        // this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "left", "name": "troopleft", "x": 75, "y": 200, "w": 128, "h": 128, "text": "Left", "screen": this, "action":  this.viewTiers}));
        // this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "right", "name": "troopright", "x": 420, "y": 200, "w": 128, "h": 128, "text": "Right", "screen": this, "action":  this.viewTiers}));

        let counter = 0;
        for(let x=0; x<troopList.length; x++) {
            for(let y=0; y<troopList[x].levels.length; y++) {
                //this.troopsAvailable.push(troopList[x].levels[y]);
                if(troopList[x].levels[y] != null) {
                    let availableQuantity = troopList[x].levels[y].quantity;

                    let i = document.createElement('input');
                    i.id = 'quantityInput';
                    i.name = 'quantityInput[]';
                    i.style.position = 'absolute';
                    i.style.left = ((268 + this.x) * zoom.x) + 'px';
                    i.style.top =  (265 + (counter * 25) * zoom.y) + 'px';
                    i.style.width = '48px';
                    i.type = 'number';  
                    i.min = 0;
                    i.max = availableQuantity;
                    i.value = 0;
                    //i.addEventListener('keydown', getInput);
                    //i.addEventListener('change', checkInput); 

                    counter ++;
                    console.log(i);
                    this.inputs.push(i);
                    document.getElementById('maindiv').appendChild(i);
                }

            }
        }

        mapScreen.active = false;
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
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
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#eeeeee';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.displayTroops();      
            this.drawButtons();
            this.checkButtons();
            // if(this.troopBuilding.training) {   //this.troopBuilding.training
            //     this.displayTrainingTimer();
            // }

            Resource.drawAll(); // draw resources at the top of the screen
            ctx.restore();

        }
    }

    displayTroops() {

        let counter = 0;
        for(let x=0; x<troopList.length; x++) {
            for(let y=0; y<troopList[x].levels.length; y++) {
                if(troopList[x].levels[y] != null) {
                    this.troopsAvailable.push(troopList[x].levels[y]);
                    let troopType = troopList[x].type;
                    let tier = troopList[x]
                    ctx.font = "16px Georgia";
                    ctx.fillText(troopList[x].levels[y].quantity + " - " + troops[x].levels[y].name, this.x + 100, this.y + 180 + (counter * 25));
                    counter++;
                }
            }
        }

        return;

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
            ctx.drawImage(buttonImages[0].icon, 75, 200, gridSize.x * 2, gridSize.y * 2);
        }
        if(buttonImages[1].icon.complete) {
            ctx.drawImage(buttonImages[1].icon, 420, 200, gridSize.x * 2, gridSize.y * 2);
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
            ctx.fillText(resources[resCheck[x]].text + ": " + quantityInput * r.resources[resCheck[x]], this.x + 25 + (x * 95), this.y + 420)    
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillText("Total Time: " + quantityInput * this.troops.levels[tier].baseTrainTime, this.x + 375, this.y + 380)

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

    march(self) {
        console.log("lets march some troops");
        let quantityInput = document.getElementById('quantityInput').value;
        if(quantityInput < 1) {
            quantityInput = 1;
            document.getElementById('quantityInput').value = 1;
        }
        setButtonState(self.buttons, "march", false);

        self.selectedTroops = new Troop({"type": 0, "tier": 1, "quantity": 50});
        marchManager.addMarch(self.tile, self.selectedTroops);
        self.exitScreen(self);
    }




}