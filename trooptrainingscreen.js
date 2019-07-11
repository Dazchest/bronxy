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
        troopBuilding.trainingScreen = this;
        this.troopType = troopBuilding.troopType
        this.troopName = troopBuilding.troopName
        this.troops = troopBuilding.troops;
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

        this.buttons.push(new Button({"active": true, "x": 500, "y": 500, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "name": "train", "x": 420, "y": 200, "w": 100, "h": 30, "text": "Train", "screen": this, "action":  this.train}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        let i = document.createElement('input');
        i.id = 'quantityInput';
        i.style.position = 'absolute';
        i.style.left = (150 + this.x) + 'px';
        i.style.top =  (165 + camera.x) + 'px';
        i.style.width = '200px';
        i.type = 'number';  
        i.min = 1;
        i.value = 1;
        //i.addEventListener('keydown', getInput);
        //i.addEventListener('change', checkInput); 

        console.log(i);
        this.inputs.push(i);
        document.getElementById('maindiv').appendChild(i);

        if(this.troopBuilding.training) {
            setButtonState(this.buttons, "train", false);
            console.log("we are already training hyou know...");
        }

        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }


    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#333333";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#eeeeee';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.displayTroops(1);      //which tier to display
            this.drawButtons();
            this.checkButtons();
            if(this.troopBuilding.training) {
                this.displayTrainingTimer();
            }

            Resource.drawAll(); // draw resources at the top of the screen
            //this.checkDisplayResearch();
            //this.checkResearchButtons();

        }
    }

    displayTroops(tier) {
        tier -= 1;
        //TODO: this is just a quick show
        ctx.fillStyle = '#eeeeee';
        ctx.font = "20px Georgia";

        if(troopList[this.troopType]) {
            if(troopList[this.troopType].levels[tier]) {
                ctx.fillText(troopList[this.troopType].levels[tier].quantity + " " + this.troops.levels[tier].name, this.x + 100, this.y + 180);
            }
        } else {
            ctx.fillText("0 " + this.troops.levels[tier].name, this.x + 100, this.y + 180);
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
            ctx.fillText("hello", 150, 25);
            ctx.fillText(resources[resCheck[x]].text + ": " + quantityInput * r.resources[resCheck[x]], this.x + 25 + (x * 95), this.y + 260)    
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillText("Total Time: " + quantityInput * this.troops.levels[tier].baseTrainTime, this.x + 375, this.y + 380)

        if(this.troopBuilding.training) {
            this.requirementsMet = false;
        }

        if(this.requirementsMet == false) {
            setButtonState(this.buttons, "train", false);
        } else {
            setButtonState(this.buttons, "train", true);
        }

    }

    train(self) {
        console.log("lets train some troops");
        let quantityInput = document.getElementById('quantityInput').value;
        if(quantityInput < 1) {
            quantityInput = 1;
            document.getElementById('quantityInput').value = 1;
        }
        setButtonState(self.buttons, "train", false);
        self.troopBuilding.train(self.currentTier, quantityInput);
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


}