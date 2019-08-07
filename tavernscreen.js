class TavernScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();

        this.name = "Tavern";

        this.availableGenerals = [];

        console.log("this is Tavern constructor");

        this.buttons = [];

        this.buttons.push(new Button({"active": true, "x": 630, "y": 110, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "name": "refresh", "x": 280, "y": 550, "w": 100, "h": 30, "text": "Refresh", "screen": this, "action":  this.refresh}));
        this.buttons.push(new Button({"active": true, "name": "recruit", "x": 460, "y": 550, "w": 100, "h": 30, "text": "Recruit", "screen": this, "action":  this.recruit}));
        
        
        //this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "left", "name": "troopleft", "x": 75, "y": 200, "w": 128, "h": 128, "text": "Left", "screen": this, "action":  this.viewTiers}));
        // this.buttons.push(new Button({"active": true, "drawButton": false, "direction": "right", "name": "troopright", "x": 420, "y": 200, "w": 128, "h": 128, "text": "Right", "screen": this, "action":  this.viewTiers}));

     

        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;

        this.refresh(this);
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
    
            this.displayGeneral();
            this.drawButtons();
            this.checkButtons();

            Resource.drawAll(); // draw resources at the top of the screen
            ctx.restore();

            this.checkRequirements();

        }
    }   

    displayGeneral() {

        let counter = 0;
        for(let x=0; x<this.availableGenerals.length; x++) {
            this.availableGenerals[x].draw(250, 150);
                
        }
    }

    refresh(self) {
        let generalLevel = getRandom(1,6);
        self.availableGenerals[0] = new General();
        self.availableGenerals[0].createNew(generalLevel);
    }
  
    checkRequirements() {
        this.requirementsMet = true;
        //console.log(resources.gold);
        if(resources.gold.amount < this.availableGenerals[0].cost) {
            this.requirementsMet = false;
        }

        if(this.requirementsMet) {
            setButtonState(this.buttons, "recruit", true);
        } else {
            setButtonState(this.buttons, "recruit", false);
        }


    }

    recruit(self) {


        if(self.requirementsMet) {
            let t = {};
            let g = Object.assign(t, self.availableGenerals[0])
            //generals.push(self.availableGenerals[0]);
            //generals.push(g);
            generals.push(new General(g));
            let r = resourceManager.use("gold", self.availableGenerals[0].cost);
            console.log(r);
            saveList("generals", true);
        } else {
            return;
        }

    }



}