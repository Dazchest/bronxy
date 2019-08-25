class MarchScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(tile) {

        super();

        this.tile = tile;
        console.log(this.tile);

        this.selectedTroops = [];
        this.troopsAvailable = [];
        this.name = "Marching";
        this.load = 0;

        // for(let x=0; x<Object.keys(troopBuilding).length; x++) {
        //     name = Object.keys(troopBuilding)[x];
        //     this[name] = troopBuilding[name];
        // }

        // get the troops into a list we can use better
        for(let x=0; x<troopList.length; x++) {
            if(troopList[x]) {
                for(let y=0; y<troopList[x].levels.length; y++) {
                    if(troopList[x].levels[y] != null) {
                        this.troopsAvailable.push(troopList[x].levels[y]);
                        let troopType = troopList[x].type;
                        let tier = troopList[x];
                    }
                }
            }
        }
        console.log("troops " + this.troopsAvailable);


        console.log("this is March constructor");

        this.buttons = [];

        this.buttons.push(new Button({"active": true, "x": 475, "y": 500, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "name": "march", "x": 365, "y": 365, "w": 100, "h": 30, "text": "March", "screen": this, "action":  this.march}));
        // this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "left", "name": "troopleft", "x": 75, "y": 200, "w": 128, "h": 128, "text": "Left", "screen": this, "action":  this.viewTiers}));
        // this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "right", "name": "troopright", "x": 420, "y": 200, "w": 128, "h": 128, "text": "Right", "screen": this, "action":  this.viewTiers}));

        this.inputs = [];
        if(troopList) {
            let counter = 0;
            for(let x=0; x<troopList.length; x++) {
                if(troopList[x]) {
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
            }
        }

        mapScreen.active = false;
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;

        this.setStartLoad();
    }


    tick() {
        this.draw();
    }

    draw() {
        if(this.active) {
            this.calculateLoad();
            this.setMaxInputLevels();

            ctx.save;
            ctx.scale(1,1);

            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#333333";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#eeeeee';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);

            this.displayTileInfo();

            if(troopList.length > 0) {
                this.displayTroops();   
            } else {
                ctx.fillStyle = '#ff0000';
                ctx.font = "40px Georgia";
                ctx.fillText("train some troops please", 200, 300);
                setButtonState(this.buttons, "march", false);
            }  

            if(marches.length == marchManager.slots) {
                ctx.fillText("ALL MARCH SLOTS ARE FULL", 200, 300);
                setButtonState(this.buttons, "march", false);
               // return;
            }

            this.drawButtons();
            this.checkButtons();
            // if(this.troopBuilding.training) {   //this.troopBuilding.training
            //     this.displayTrainingTimer();
            // }

            Resource.drawAll(); // draw resources at the top of the screen
            ctx.restore();

        }
    }

    displayTileInfo() {
        if(this.tile.resources) {
            ctx.fillStyle = '#ffff22';
            ctx.font = "25px arial";
            ctx.fillText("amount of resources = " + this.tile.availableAmount, this.x+5, this.y + 120);
            ctx.fillText("current load = " + this.load, this.x+5, this.y + 150);
        } else 
        if(this.tile.monster) {
            ctx.fillStyle = '#ffff22';
            ctx.font = "25px arial";
            ctx.fillText("Monster name = " + this.tile.monsterName, this.x+5, this.y + 120);

           // if(this.tile.level == 2) {
               let lev = this.tile.level;
                monsters[lev].drawM(0, 450, 150, 200, 150);
           // }
        }

    }

    displayTroops() {

        let counter = 0;
        for(let x=0; x<troopList.length; x++) {
            if(troopList[x]) {
                for(let y=0; y<troopList[x].levels.length; y++) {
                    if(troopList[x].levels[y] != null) {
                        //this.troopsAvailable.push(troopList[x].levels[y]);
                        let troopType = troopList[x].type;
                        let tier = troopList[x]
                        ctx.font = "16px Georgia";
                        ctx.fillText(troopList[x].levels[y].quantity + " - " + troops[x].levels[y].name, this.x + 100, this.y + 180 + (counter * 25));
                        counter++;
                    }
                }
            }
        }
        ctx.font = "18px Georgia";
        ctx.fillText("Select March Size = " + this.selectedMarchSize, this.x + 100, this.y + 180 + (counter * 25));
        counter++;
        ctx.fillText("Max March Size = " + marchManager.marchSize, this.x + 100, this.y + 180 + (counter * 25));

    }
    //---------------------------------------
    setStartLoad() {
        console.log("setting the start load");
        this.load = 0;
        this.selectedMarchSize = 0;
        let troopType, troopLevel, troopLoad, troopsNeeded;
        
        for(let x=0; x<this.troopsAvailable.length; x++) {
            if(this.troopsAvailable[x]) {
                console.log(this.troopsAvailable[x]);
                troopType = this.troopsAvailable[x].type;
                troopLevel = this.troopsAvailable[x].level;
                troopLoad = troops[troopType].levels[troopLevel].load;

                if(this.tile.resources) {
                    troopsNeeded = Math.ceil((this.tile.availableAmount - this.load) / troopLoad);
                } else 
                if(this.tile.monster) {
                    troopsNeeded = marchManager.marchSize - this.selectedMarchSize;
                }

                if(troopsNeeded > this.troopsAvailable[x].quantity) {
                    troopsNeeded = this.troopsAvailable[x].quantity;
                }
                this.inputs[x].value = troopsNeeded;

                this.selectedMarchSize += troopsNeeded;
                this.load += troopsNeeded * troopLoad;

                if(this.tile.resources && this.load >= this.tile.availableAmount) {
                    console.log("we have reached out target load");
                    console.log("load so far is " + this.load + " and needs " + troopsNeeded + " troops");
                    break;
                } else {
                    console.log("we need more troops???");
                }
                if(this.tile.monster && this.selectedMarchSize >= marchManager.marchSize) {
                    console.log("we have reached out target troop count");
                    console.log("count so far is " + this.selectedMarchSize + " and needs " + marchManager.marchSize + " troops");
                    break;
                } else {
                    console.log("we need more troops???");
                }
            }
        }
            
    }
    //---------------------------------------
    calculateLoad() {
        this.load = 0;
        this.selectedMarchSize = 0;
        let troopType, troopLevel, troopLoad, troopsNeeded;
        for(let x=0; x<this.inputs.length; x++) {
            troopType = this.troopsAvailable[x].type;
            troopLevel = this.troopsAvailable[x].level;
            troopLoad = troops[troopType].levels[troopLevel].load;
            
            if(this.tile.resources) {
                this.load += this.inputs[x].value * troopLoad;
                this.selectedMarchSize += Number(this.inputs[x].value);
            } else 
            if(this.tile.monster) {
                this.selectedMarchSize += Number(this.inputs[x].value);
            }
        }
    }
    //---------------------------------------
    setMaxInputLevels() {
        let inputQuantity, marchAvailable;

        for(let x=0; x<this.inputs.length; x++) {
            inputQuantity = Number(this.inputs[x].value);

            marchAvailable = marchManager.marchSize - this.selectedMarchSize;
            if(this.troopsAvailable[x].quantity > (inputQuantity + marchAvailable) ) {
                this.inputs[x].max = inputQuantity + marchAvailable;
            } else {
                this.inputs[x].max = this.troopsAvailable[x].quantity;
            }
            
            
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

        self.selectedTroops = new Troop({"type": 0, "tier": 1, "quantity": 54});
        //let marchData = 
        //marchManager.addMarch(self.tile, self.selectedTroops);
        marchManager.addMarch2(self);
        self.exitScreen(self);
    }




}