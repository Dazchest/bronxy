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
        this.tiers = troopList[this.troopType].tiers;

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
        i.value = 1;
        i.addEventListener('keydown', getInput);

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
        ctx.fillText(this.tiers[tier].quantity + " " + this.troops.levels[tier].name, this.x + 100, this.y + 180);
        //this.tiers[x].draw();

        let r = this.troops.levels[tier].requirements;
        ctx.fillText("Food: " + r.resources.food, this.x + 25, this.y + 240)
        ctx.fillText("Wood: " + r.resources.wood, this.x + 125, this.y + 240)
        ctx.fillText("Stone: " + r.resources.stone, this.x + 250, this.y + 240)
        ctx.fillText("Iron: " + r.resources.iron, this.x + 375, this.y + 240)

        let quantityInput = document.getElementById('quantityInput').value;
        ctx.fillText("Food: " + quantityInput * r.resources.food, this.x + 25, this.y + 300)
        ctx.fillText("Wood: " + quantityInput * r.resources.wood, this.x + 125, this.y + 300)
        ctx.fillText("Stone: " + quantityInput * r.resources.stone, this.x + 250, this.y + 300)
        ctx.fillText("Iron: " + quantityInput * r.resources.iron, this.x + 375, this.y + 300)

        ctx.fillText("Total Time: " + quantityInput * this.troops.levels[tier].baseTrainTime, this.x + 375, this.y + 380)
    }

    train(self) {
        console.log("lets train some troops");
        let quantityInput = document.getElementById('quantityInput').value;
        setButtonState(self.buttons, "train", false);
        self.troopBuilding.train(1, quantityInput);
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