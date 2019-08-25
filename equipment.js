class ThroneEquipment {

    constructor() {
        this.itemType = "equipment";
        this.type = 0;
        this.name = "Thone";
        this.level = 1;
        this.quality = 0;

        this.quantity = 1;

        this.colors = {"grey": '#aaaaaa', "green": '#22cc22', "blue": '#2222cc', "purple": "#aa22cc", "orange": "#ccaa22", "red": "#cc2222"};
        this.qualityNames = {"grey": '#aaaaaa', "green": '#22cc22', "blue": '#2222cc', "purple": "#aa22cc", "orange": "#ccaa22", "red": "#cc2222"};

        //buffs
        //this.attack = 0;
        //this.defence = 0;
        //this.range = 0;
        //this.health = 0;

        //this.constructionSpeed = 0;
        //this.gatheringSpeed = 0;
        //this.resourceProductionSpeed = 0;

        this.show = false;

        this.levels = [];

        this.w = 320;
        this.h = 50;

        this.button = new Button({"active": true, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "",  "action":  this.showEquipment});

        this.buttons = [];
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 50, "y": 200, "w": 100, "h": 20, "text": "upgrade",  "action":  this.upgrade.bind(this)}));
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 180, "y": 200, "w": 100, "h": 20, "text": "enhance",  "action":  this.enhance}));
        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 350, "y": 200, "w": 100, "h": 20, "text": "equip",  "action":  this.equip}));
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "drawButton": true, "x": 475, "y": 550, "w": 100, "h": 50, "text": "scramble",  "action":  this.scramble.bind(this)}));


    }

    draw(x, y, size) {
        this.x = x;
        this.y = y;
        let textOffsetY = Math.round(this.h / 2);

        ctx.drawImage(itemHolderImages[0], x, y, itemHolderImages[0].width, this.h);       //left
        ctx.drawImage(itemHolderImages[2], x + itemHolderImages[0].width, y, this.w, this.h);       //middle
        ctx.drawImage(itemHolderImages[1], x + this.w + itemHolderImages[0].width, y, itemHolderImages[1].width, this.h);       //right

        ctx.textBaseline = "middle";
        ctx.fillStyle = Object.keys(this.colors)[this.quality];
        ctx.font = this.h/2 + "px Georgia";
        ctx.fillText(this.name, x + 10, y + textOffsetY);
        ctx.fillText("quality: " + this.quality, x + 100, y + textOffsetY);
        ctx.fillText("level: " + this.level, x + this.w - 50, y + textOffsetY);
    }

    showEquipment(self) {
        // if(researchManager.showingResearch) {   // already showing a research
        //     return;
        // }
        console.log(self);
        console.log("pressed an equipment");
        //researchManager.showingResearch = true;
        self.show = true;
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
            ctx.fillStyle = '#ffffff';
            ctx.fillText(this.name + " - Level: " + this.level + " - Quality: " + Object.keys(this.colors)[this.quality], 70, 180);

            this.buttons[0].draw();
            this.buttons[0].check(this);
            this.buttons[1].draw();
            this.buttons[1].check(this);
            this.buttons[2].draw();
            this.buttons[2].check(this);
            this.buttons[3].draw();
            this.buttons[3].check(this);
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
                ctx.fillStyle = '#4400ff';
                ctx.fillText("+" + level.enhanceGrowth + " %", 400, yOffset);
            }

            if(this.level < this.levels.length-1) {    //only display if not max level
                ctx.fillStyle = '#ffffff';
                ctx.fillText("Upgrade Chance is " + this.levels[this.level].upgradeChance + " %", 65, yOffset + 75);
                ctx.fillText("Enhance Chance is " + this.levels[this.level].enhanceChance + " %", 65, yOffset + 110);
                
                if(zennyStones<this.levels[this.level].upgradeStonesRequired) {
                    //console.log("not enough Zenny Stones");
                    this.buttons[0].active = false;
                    //setButtonState(this.buttons, "upgrade", false);
                    ctx.fillStyle = '#ff0000'
                } else {
                    this.buttons[0].active = true;
                    //setButtonState(this.buttons, "upgrade", true);
                    ctx.fillStyle = '#ffffff'
                }
                ctx.fillText("Zenny Stones Required: " + this.levels[this.level].upgradeStonesRequired + "/" + zennyStones, 65, yOffset + 155);
            }



        }
    }

    checkClickOutside() {
        if(this.show && clicked){
            if(mouse.x < 50*zoom.x || mouse.x > 550*zoom.x || mouse.y < 150*zoom.y || mouse.y > 650 *zoom.y) {
                    clicked = false;
                    this.show = false;
                    //researchManager.showingResearch = false;
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
                    console.log("upgrade succseful");
                    this.levels[x].activated = true;
                    this.level++;
                }
                console.log("upgrade not successful");
                return;
            }
        }
    }
    enhance() {
        console.log("enhance pressed");
    }
    equip() {
        console.log("equip pressed");
    }

    // get new buffs
    scramble() {
        for(let x=0; x< 6; x++) {
            let a = getRandom(0, 3);
            let newAttributes = this.levels[x];
            let attributes = {
                level: x+1, 
                buffType: this.availableBuffs[a].buffType, 
                text: this.availableBuffs[a].text, 
                activated: this.levels[x].activated, 
                buff: getRandom(1, x+2),
                upgradeChance: 60-((x)*10),       //percentages
                upgradeStonesRequired: (x+1) * 100, //(x*x*100)
                enhanceChance: 60-((x)*10),
                enhanceGrowth: this.level + 1
            }
            this.levels[x] = attributes;
        }

    }

}
var zennyStones = 10000;
class ThroneStatue extends ThroneEquipment {

    constructor() {

        super();

        this.type = 0;
        this.name = "Statue";
        this.level = 0;

        //this.quality = Object.keys(this.colors)[r];      // grey - green - blue - purple - orange - red
        this.quality = getRandom(0,5); // get a random start quality

        //buffs
        this.level = 0;
        this.levels = [];
        this.buff = getRandom(1, 1);

        this.availableBuffs = [
            {text: "Construction Speed", buffType: "construnctionspeed", buffRange: 1},
            {text: "Research Speed", buffType: "researchspeed", buffRange: 1},
            {text: "Resource Production", buffType: "resourceproduction", buffRange: 1}
        ]

        for(let x=0; x< 6; x++) {
            let a = getRandom(0, 3);
            let attributes = {
                level: x+1, 
                buffType: this.availableBuffs[a].buffType, 
                text: this.availableBuffs[a].text, 
                activated: false, 
                buff: getRandom(1, x+2),
                upgradeChance: 60-((x)*10),       //percentages
                upgradeStonesRequired: (x+1) * 100, //(x*x*100)
                enhanceChance: 60-((x)*10),
                enhanceGrowth: this.level + 1
            }
            this.levels.push(attributes);
        }

    }
}