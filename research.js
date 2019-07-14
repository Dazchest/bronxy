class Research {
    //each research node has its own button... lets see if we can get this working
    constructor(data) {
        //this.button = new Button({"active": true, "drawButton": true, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "r1", "screen": this, "action":  this.showResearch});
        //this.button = new Button({"active": true, "drawButton": true, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "r1", "screen": this, "action":  this.hideResearch});
 
        this.active = false;
        this.upgrading = false;
        this.level = 0;
        this.show = false;

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }
        
        this.button = new Button({"active": true, "drawButton": true, "x": 50, "y": 150 + (this.row * 45), "w": 100, "h": 30, "text": this.name, "action":  this.showResearch});
        this.upgradebutton = new Button({"active": false, "drawButton": true, "x": 50, "y": 200, "w": 100, "h": 30, "text": "upgrade",  "action":  this.upgrade});
    }


    showResearch(self, b) {
        if(researchManager.showingResearch) {   // already showing a research
            return;
        }
        console.log(self);
        console.log("pressed a research");
        researchManager.showingResearch = true;
        self.show = true;
    }

    hideResearch() {
        this.active = false;
    }

    draw(x = this.button.x, y = this.button.y) {
        this.checkClickOutside();

        ctx.font = "20px Georgia";
        ctx.fillStyle = '#0000f0';
        if(researchManager.upgrading) {
            ctx.fillStyle = '#4444aa';
        }
        if(this.level == 0) {
            ctx.fillStyle = '#666666';
        }
        
        ctx.fillRect(x, y, 50, 40);
        ctx.fillText(this.name, x+80, y+20);
        ctx.font = "10px Georgia";
        if(this.level > 0) {
            ctx.fillText("current: " + this.levels[this.level-1].name, x+80, y+35);
        } else {
            ctx.fillText("not researched", x+80, y+35);
        }
        ctx.font = "15px Georgia";
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.level + "/" + this.levels.length, x+2, y+20);

    }

    displayResearch() {
        if(this.show) {
            ctx.fillStyle = '#444444';
            let newX = researchScreen.x;
            ctx.fillRect(50,150,500,300);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.name, 70, 150);

            this.upgradebutton.draw();
            this.upgradebutton.check(this);
            this.displayUpgradeRequirements();
        }
    }

    checkClickOutside() {
        if(this.show && clicked){
            if(mouse.x < 50 || mouse.x > 350 || mouse.y < 100 || mouse.y > 400) {
                    clicked = false;
                    this.show = false;
                    researchManager.showingResearch = false;
                    console.log("clicked outside");
            }
        }
    }


    displayUpgradeRequirements() {
        ctx.font = "20px Georgia";
        let fontC = '#ffffff';

        let requirementMet = true;
        let currentLevel = this.level; //level will be 1 above, because of index 0
        let levelMaxed = false;
        let researchType = this.type;
        let researchName = this.name;
        let requiredList = [];
    
        if(currentLevel == this.levels.length) {
            ctx.fillStyle = '#ff0000';
            ctx.fillText("level maxed" , 200, 100);  
            levelMaxed = true;
        }
        if(levelMaxed == false) {
            // check buildings requirements
            if(this.levels[currentLevel].requirements.buildings) {
                let br = this.levels[currentLevel].requirements.buildings;
                for(let x=0; x<br.length; x++) {
                    let brName = buildings[br[x].type].name;
                    let brType = br[x].type;
                    fontC = '#ffffff';

                    var typeFound = false;
                    for(let y=0; y<buildingList.length; y++) { // check if building required is even built yet 
                        if(buildingList[y].type == brType) { 
                            typeFound = true;
                        }
                    }
                    if(typeFound) {
                        if(buildingList[brType].level < br[x].level) {
                            fontC = '#ff0000';
                            requirementMet = false;
                        }
                    } else {
                        fontC = '#ff0000';
                        requirementMet = false;
                    }

                    let rl = {"text": "Build req: " + brName + " - " + brType + " - Level: " + br[x].level, "color": fontC};
                    requiredList.push(rl);
                }
            }
            //------------------------------------
            // check research requirements
            if(this.levels[currentLevel].requirements.research) {
                let rr = this.levels[currentLevel].requirements.research;
                for(let x=0; x<rr.length; x++) {
                    let rrName;
                    let rrType = rr[x].type;
                    for(let r=0; r<researchList.length; r++) {  //find the research required name
                        if(rrType == researchList[r].type) {    // loop through list for name, and check level
                            rrName = researchList[r].name;
                            fontC = '#00ffff';
                            if(researchList[r].level < rr[x].level) {
                                requirementMet = false;
                                fontC = '#ff0000';
                            }
                        }
                    }
                    let rl = {"text": "Research req: " + rrName + " - " + rrType + " - Level: " + rr[x].level, "color": fontC};
                    requiredList.push(rl);
                }
            }
            //------------------------------------
            // check items required
            //TODO: change to include more items
            // this.item = this.levels[this.level].requirements.items[0].type;
            // this.requiredQuantity = this.levels[this.level].requirements.items[0].quantity;
            // let gold = itemList[this.item].quantity;    // players gold quantity
            
            // fontC = '#ff00ff';
            // if(gold < this.requiredQuantity) {
            //     requirementMet = false;
            //     fontC = '#ff0000';
            // }
            // let rl = {"text": itemList[0].name + " - " + this.requiredQuantity, "color": fontC};
            // requiredList.push(rl);
            //-----------------------------------------

            //------------------------------------
            // check GOLD required
            //TODO: change to include more items
            this.resource = this.levels[this.level].requirements.resources[0].type;
            this.requiredQuantity = this.levels[this.level].requirements.resources[0].quantity;
            let gold = resources[this.resource].quantity;    // players gold quantity
            
            fontC = '#ff00ff';
            if(gold < this.requiredQuantity) {
                requirementMet = false;
                fontC = '#ff0000';
            }
            let rl = {"text": resources[this.resource].name + " - " + this.requiredQuantity, "color": fontC};
            requiredList.push(rl);
            //-----------------------------------------

        } else {
            requirementMet = false;
        }

        //check if research slots are full
        if(researchManager.usedSlots >= researchManager.slots) {
            requirementMet = false;
            console.log("all research slots are full");
        }

        ctx.fillText("requirements met: " + requirementMet, 375, 100);

        if(requirementMet) {
            this.upgradebutton.active = true;
            this.requirementMet = true;
        } else {
            this.upgradebutton.active = false;
            this.requirementMet = false;
        }

        // --- print the requirements
        for(let x=0; x<requiredList.length; x++) {
            ctx.fillStyle = requiredList[x].color;
            ctx.fillText(requiredList[x].text, 100, 260 + (x * 25));
        }
    }   
    //----------------------------------------------------------------------------------------
    upgrade(self) {     // self = this
        console.log("ffffff");
        self.upgrading = true;
        researchManager.usedSlots++;
        researchManager.showingResearch = false;
        researchManager.upgrading = true;

        self.startTime = Date.now()/1000;   //convert to seconds
        
        let upgradeTime = self.levels[self.level].baseResearchTime;
        self.upgradeTime = upgradeTime;
        self.endTime = self.startTime + self.upgradeTime;
        //console.log(upgradeTime);
        console.log("upgradeeeee");
        self.show = false;

        //let itemsUsed = self.levels[self.level+1].requirements.resources.gold;
        resources.gold.amount -= self.requiredQuantity;
        saveGame2();

    }

    checkUpgrading() {
        if(this.upgrading) {
            if(this.endTime <= Date.now()/1000) {
                this.upgrading = false;
                console.log("Research Upgrade Complete");
                researchManager.usedSlots--;
                researchManager.upgrading = false;
                this.active = true;

                saveGame2();


                // update the buffs
                // loop through each buff available
                for(let x=0; x<this.levels[this.level].buff.length; x++) {
                    let g = Object.keys(this.levels[this.level].buff[x]);
                    let group = this.group;
                    let buffType = this.buffType;
                    let buffAmount = this.levels[this.level].buff[x][g[0]];
                    //check if buff already exists
                    if(!buffManager[group]) {
                        console.log("buff doesnt exists");
                        buffManager[group] = {};
                        buffManager[group][g] = {};
                        let r = {[buffType]: buffAmount};
                        console.log(r);
                        buffManager[group][g[0]] = r;
                    } else {
                        if(!buffManager[group][g][buffType]) {  //type doesnt exist yet.. set at zero so we have something to add onto
                            buffManager[group][g][buffType] = 0;
                        }
                        buffManager[group][g][buffType] += buffAmount;
                    }
                    console.log(g);
                    console.log(group);
                    console.log(buffAmount);
                }
                this.level ++;  // set this after all above... means level = correct index in the array
            }
        }
    }

    displayUpgradeTimer(c) {
        popup(this.endTime - Date.now()/1000, 180, 565 + (c * 20));
    }



    checkResearchButtons() {
        if(this.show == false) {  //not showing reseach, so can pick another
            if(clicked) {   //mouse is clicked, check if it was on a research button
                let b = this.button;
                if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
                    if(b.action && b.active) {
                        clicked = false;
                        console.log(b.text + " pressed");
                        let callback = b.action;
                        callback(this, b);
                    }
                }
            }
        }
    }


}