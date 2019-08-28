class ThroneEquipment {

    constructor(data) {
        this.itemType = "equipment";

        if(typeof data == "number") {   // create a new blank/random piece of equipment

            this.type = data;
            this.level = 0;
            this.quality = 0;
            this.equipped = false;

            this.levels = [];
            this.availableBuffs = throneRoomEquipment[this.type].availableBuffs;

            for(let x=0; x<6; x++) {        // go through each level
                let a = getRandom(0, 2);
                let attributes = {
                    level: x+1, 
                    buffType: this.availableBuffs[a].buffType, 
                    text: this.availableBuffs[a].text, 
                    activated: false, 
                    buff: getRandom(1, x+1),
                    upgradeChance: 60-((x)*10),       //percentages
                    upgradeStonesRequired: (x+1) * 100, //(x*x*100)
                    enhanceChance: 50-((x)*10),     // min should be 10%
                    enhanceStonesRequired: (x+1) * 250, //(x*x*150)
                }
                this.levels.push(attributes);
            }

            //saveList("equipmentList", true);        // only save if its new equipment

        } else {        // insert equipment from saved game/or data object
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }
        
        this.w = 320;
        this.h = 50;

        this.qualityColors = ['#aaaaaa', '#22cc22', '#2222cc', "#aa22cc", "#ccaa22", "#cc2222"];
        this.qualityNames = ['Basic', 'Common', 'Uncommon', 'Great', 'Excellent', 'Marvelous'];
        this.qualityAmount = 6;     // or  = this.qualityName.length
        this.qualities = [];
        for(let x=0; x<this.qualityAmount; x++) {
            let q = {color: this.qualityColors[x], name: this.qualityNames[x]};
            this.qualities.push(q);
        }

        this.enhanceGrowth = this.quality + 1
        if(this.quality > 0) {
            for(let i=0; i<6; i++) {    // go through each quality
                this.levels[i].buff += this.enhanceGrowth;
            }
        }

        this.show = false;
        this.name = throneRoomEquipment[this.type].name;
        this.text = throneRoomEquipment[this.type].text;
        this.roomPosition = throneRoomEquipment[this.type].roomPosition;

        this.button = new Button({"active": true, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "",  "action":  this.showEquipment});

        this.buttons = [];
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 50, "y": 200, "w": 100, "h": 40, "text": "upgrade",  "action":  this.upgrade.bind(this)}));
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 200, "y": 200, "w": 100, "h": 40, "text": "enhance",  "action":  this.enhance.bind(this)}));
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 350, "y": 200, "w": 100, "h": 40, "text": "equip",  "action":  throneRoom.equip.bind(throneRoom)}));
        this.buttons.push(new Button({"active": false, "style": "circle", "radius": 40, "drawButton": true, "x": 350, "y": 525, "w": 50, "h": 40, "text": "break",  "action":  this.breakEquipment.bind(this)}));
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "drawButton": true, "x": 475, "y": 550, "w": 100, "h": 50, "text": "scramble",  "action":  this.scramble.bind(this)}));

        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 25, "drawButton": true, "x": 510, "y": 185, "w": 100, "h": 20, "text": "X",  "action":  this.closeEquipment.bind(this)}));

    }
    
    draw(x, y, screen, w, h) {
        this.x = x;
        this.y = y;
        w = w || this.w;
        h = h || this.h;
        this.button.x = this.x;
        this.button.y = this.y;
        this.button.w = w;
        this.button.h = h;

        if(screenManager.screen == screen) {
            //console.error("wahoooooo");
            ctx.drawImage(throneImages[this.type], this.x, this.y, w, h);
        } else {

        let textOffsetY = Math.round(this.h / 2);

        ctx.drawImage(itemHolderImages[0], x, y, itemHolderImages[0].width, this.h);       //left
        ctx.drawImage(itemHolderImages[2], x + itemHolderImages[0].width, y, this.w, this.h);       //middle
        ctx.drawImage(itemHolderImages[1], x + this.w + itemHolderImages[0].width, y, itemHolderImages[1].width, this.h);       //right

        ctx.textBaseline = "middle";
        ctx.fillStyle = this.qualities[this.quality].color;
        ctx.font = this.h/2 + "px Georgia";
        ctx.fillText(this.name, x + 10, y + textOffsetY);
        ctx.fillText("quality: " + this.quality, x + 100, y + textOffsetY);
        ctx.fillText("level: " + this.level, x + this.w - 50, y + textOffsetY);
        }
    }

    showEquipment(self) {
        if(throneRoom.showingEquipment) {   // already showing equipment
            return;
        }
        console.log(self);
        console.log("pressed an equipment");
        throneRoom.showingEquipment = true;
        self.show = true;
    }

    closeEquipment() {
        throneRoom.showingEquipment = false;
        this.show = false;
    }

    displayEquipment() {
        if(this.show) {
            this.checkClickOutside();

            ctx.fillStyle = '#000000';
            ctx.globalAlpha = .5;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            ctx.fillStyle = '#111111';
            ctx.fillRect(50, 150, 500, 500);
            ctx.fillStyle = this.qualities[this.quality].color;
            ctx.fillText(this.name + " - Level: " + this.level + " - Quality: " + this.qualities[this.quality].name, 70, 180);

            for(let b=0; b<this.buttons.length; b++) {
                this.buttons[b].draw();
                this.buttons[b].check(this);
            }
            //this.displayUpgradeRequirements();

            //display the stats
            let yOffset = 280;

            ctx.fillStyle = '#0000ff';
            ctx.fillText("next growth %", 400, yOffset-10);


            ctx.font = '18px arial bold';
            for(let x=0; x<this.levels.length; x++) {
                yOffset += 30;
                let level = this.levels[x];
                if(level.activated) {
                    ctx.fillStyle = '#00ff00';
                    let c = 10004; // tick
                    ctx.fillText(String.fromCharCode(c), 65, yOffset);
                    ctx.fillText("Level: " + level.level, 80, yOffset);
                } else {
                    ctx.fillStyle = '#ff0000';
                    let c = 10008; // cross
                    ctx.fillText(String.fromCharCode(c), 65, yOffset);
                    ctx.fillText("Level: " + level.level, 80, yOffset);
                }
                ctx.fillText(level.text, 150, yOffset);
                ctx.fillText(level.buff + " %", 350, yOffset);
                
                //show the stats for the next enhance
                if(this.quality < 5) {
                ctx.fillStyle = '#4400ff';
                ctx.fillText("+" + this.enhanceGrowth + " %", 400, yOffset);
                } else {
                    ctx.fillText(" maxed", 400, yOffset);
                }
            }

            //display upgrade requirements
            if(this.level < this.levels.length) {    //only display if not max level
                ctx.fillStyle = '#ffffff';
                ctx.fillText("Upgrade Chance is " + this.levels[this.level].upgradeChance + " %", 65, yOffset + 75);
                
                if(zennyStones<this.levels[this.level].upgradeStonesRequired) {
                    this.buttons[0].active = false;
                    //setButtonState(this.buttons, "upgrade", false);
                    ctx.fillStyle = '#ff0000'
                } else {
                    this.buttons[0].active = true;
                    //setButtonState(this.buttons, "upgrade", true);
                    ctx.fillStyle = '#ffffff'
                }
                ctx.fillText("Zenny Stones Required to Upgrade: " + this.levels[this.level].upgradeStonesRequired + "/" + zennyStones, 65, yOffset + 150);
            } else {
                this.buttons[0].active = false;
            }

            //TODO: maybe have a "qualities" property - at the moment, they are one and the same
            //display enhance requirements
            if(this.quality < 5) {    //only display if not max level
                ctx.fillStyle = '#ffffff';
                ctx.fillText("Enhance Chance is " + this.levels[this.quality].enhanceChance + " %", 65, yOffset + 110);
                
                if(zennyStones<this.levels[this.level].enhanceStonesRequired) {
                    this.buttons[1].active = false;
                    //setButtonState(this.buttons, "upgrade", false);
                    ctx.fillStyle = '#ff0000'
                } else {
                    this.buttons[1].active = true;
                    //setButtonState(this.buttons, "upgrade", true);
                    ctx.fillStyle = '#ffffff'
                }
                ctx.fillText("Zenny Stones Required to Enhance: " + this.levels[this.level].enhanceStonesRequired + " / " + zennyStones, 65, yOffset + 170);
            } else {
                this.buttons[1].active = false;
            }



        }
    }

    checkClickOutside() {
        if(this.show && clicked){
            if(mouse.x < 50*zoom.x || mouse.x > 550*zoom.x || mouse.y < 150*zoom.y || mouse.y > 650 *zoom.y) {
                    clicked = false;
                    this.show = false;
                    throneRoom.showingEquipment = false;
                    console.log("clicked outside");
            }
        }
    }

    upgrade() {
        console.log("upgrade pressed");
        zennyStones -= this.levels[this.level].upgradeStonesRequired;
        for(let x=0; x<this.levels.length; x++) {
            if(this.levels[x].activated == false) {
                let r = getRandom(0, 100);
                console.log("random = ", r, " - chance = ", this.levels[x].upgradeChance)
                if(r <= this.levels[x].upgradeChance) {
                    Toast("upgrade succseful")
                    console.log("upgrade succseful");
                    this.levels[x].activated = true;
                    this.level++;
                    saveList("equipmentList", true);
                    return;
                }
                Toast("upgrade failed")
                console.log("upgrade failed");
                return;
            }
        }
    }
    enhance() {
        console.log("enhance pressed");
        zennyStones -= this.levels[this.quality].upgradeStonesRequired;
        for(let x=0; x<this.levels.length; x++) {
            if(x >= this.quality) {
                let r = getRandom(0, 100);
                console.log("random = ", r, " - enhance chance = ", this.levels[x].enhanceChance)
                if(r <= this.levels[x].enhanceChance) {
                    Toast("enhance succseful")
                    saveList("equipmentList", true);
                    console.log("enhance succseful");
                    this.quality++;
                    for(let i=0; i<6; i++) {
                        this.levels[i].buff += this.enhanceGrowth;
                    }
                    this.enhanceGrowth = this.quality + 1
                                return;
                }
                Toast("enhance failed")
                console.log("enhance failed");
                return;
            }
        }
    }
    equip() {
        console.log("equip pressed");
    }

    breakEquipment() {
        console.log("breaking>>>???");
        //return;
        for(let x=equipmentList.length-1; x>=0; x--) {
            if(equipmentList[x] == this) {
                Toast("equipment broke");
                for(let i=throneRoom.equipment.length-1; i>=0; i--) { // remove from throne room equipment list
                    if(throneRoom.equipment[i] == this) {
                        throneRoom.equipment.splice(i, 1);
                    }
                }
                equipmentList.splice(x, 1); // remove from equipment list
                zennyStones += 200;
                return;
            }
        }
    }

    // get new buffs
    scramble() {
        for(let x=0; x<6; x++) {
            let a = getRandom(0, 2);
            let attributes = {
                //level: this.levels[x].level, 
                buffType: this.availableBuffs[a].buffType, 
                text: this.availableBuffs[a].text, 
                activated: this.levels[x].activated, 
                buff: getRandom(1, x+1),
                //upgradeChance: this.levels[x].upgradeChance,       //percentages
                //upgradeStonesRequired: this.levels[x].upgradeStonesRequired, 
                //enhanceChance: this.levels[x].enhanceChance,
                //enhanceGrowth: this.levels[x].enhanceGrowth
            }
            //NOTICE: this will not preserve the object type... in case we change these properties
            this.levels[x] = Object.assign(this.levels[x], attributes);
        }

        // for(let x=0; x<6; x++) {        // go through each quality
        //     if(x < this.quality) {
                for(let i=0; i<6; i++) {
                    this.levels[i].buff += this.enhanceGrowth;
                }
        //     }
        // }
        saveList("equipmentList", true);


    }

}
var zennyStones = 100000;
var throneRoomEquipment =  [
        {name: "throne", type: 0, text: "Big Throne", roomPosition: {x: 275, y: 200}, availableBuffs:
        [
        {text: "All Troop Attack", buffType: "alltroopattack", buffRange: [1, 3]},
        {text: "All Troop Defence", buffType: "alltroopdefence", buffRange: [1, 3]},
        {text: "All Troop Health", buffType: "alltroophealth", buffRange: [1, 3]}
        ]
        },

        {name: "statue", type: 1, text: "Statue", roomPosition: {x: 75, y: 350}, availableBuffs:
        [   
        {text: "Construction Speed", buffType: "construnctionspeed", buffRange: [1, 3]},
        {text: "Research Speed", buffType: "researchspeed", buffRange: [1, 3]},
        {text: "Resource Production", buffType: "resourceproduction", buffRange: [1, 3]}
        ]
        }
    
    ];

    