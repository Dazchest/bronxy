class March {

    constructor(data) {

        this.gatheredAmount = 0;

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }
        this.troops = new Troop(this.selectedTroops);
        if(this.tile) {
            this.tile = mapScreen.mapTiles[this.tile.coords.x][this.tile.coords.y];
            setButtonState(this.tile.buttons, "gather", false);
        }

        this.buttons = [];
        this.buttons.push(new Button({"active": true,  "name": "recall", "offset" : {"x": 0, "y": 65}, "w": 75, "h": 30, "text": "recall", "screen": this, "action": this.recallMarch}));
        if(this.user && this.tile) {
            this.tile.buttons.push(new Button({"active": false,  "name": "recall", "drawButton": true, "offset" : {"x": 0, "y": 65}, "w": 75, "h": 30, "text": "recall", "screen": this, "action": marchManager.recallMarch}));
        }


    }

    init(tile, selectedTroops) {

    }

    tick() {
        if(this.active) {
            if(this.arrived == false) {
                this.update();
                this.checkArrived();
                this.draw();
            }

            if(this.arrived == true) {
                this.processArrived();
            }
        }
    }

    update() {
        this.position.x += ((this.endPostition.x - this.startPosition.x) / this.travelTime) / fps;
        this.position.y += ((this.endPostition.y - this.startPosition.y) / this.travelTime) / fps;
        this.elasped = this.arriveTime - Date.now();
    }

    draw() {
        this.troops.draw(1, this.position);
        //console.log(marches);

        ctx.save();
        // draw a march line
        ctx.strokeStyle = '#0000ff';
        ctx.lineWidth = '3'
        let sp = this.startPosition;
        ctx.beginPath();
        ctx.moveTo(sp.x + camera.x, sp.y + camera.y);
        let ep = this.endPostition;
        ctx.lineTo(ep.x + camera.x, ep.y + camera.y);
        ctx.stroke();

        ctx.restore();

        this.drawButtons();
        this.checkButtons();

    }

    drawButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            let b = this.buttons[x];
            if(b.active) {
                b.x = b.offset.x + this.position.x + camera.x;
                b.y = b.offset.y + this.position.y + camera.y;
                b.draw();
            }
        }
    }
    checkButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                
                let b = this.buttons[x];
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
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


    checkArrived() {
        if(this.elasped <= 0) {
            if(this.returning == false) {
                if(this.arrived == false) {
                    //this.tile.march = this; // TODO: need another type of id to find march in tile
                    this.tile.buttons.push(new Button({"active": false,  "name": "recall", "drawButton": true, "offset" : {"x": 0, "y": 65}, "w": 75, "h": 30, "text": "recall", "screen": this, "action": marchManager.recallMarch}));
                }
                this.arrived = true;
                this.tile.user = username;
                mapManager.updateTile(this.tile);
                saveList("marches", true);
            } else {
                this.processReturn();
            }
            //TODO: what to do here?????
            console.log(this);
        }
    }

    processArrived() {
        if(this.tile.resources == true && this.arrived) {
            //console.log("gathering");

            //we've arrived so lets gather
            this.gatheredAmount += Math.ceil((this.tile.baseGatheringSpeed / 3600) / fps);
            this.tile.availableAmount = this.tile.startAmount - this.tile.gatheredAmount - this.gatheredAmount;
            this.tile.gathering = true;

            if(this.tile.availableAmount <= 0) {
                this.tile.gatheredAmount += this.gatheredAmount;
                //lets return the troops
                //console.log("tile Complete");
                this.tile.availableAmount = 0;          // just in case it drops to a minus figure
                this.returning = true;
                this.arrived = false;
                this.tile.gathering = false;

                // reverse some settings, and bring the march home
                this.travelTime = 10;   // seconds
                this.elasped = 0;
                this.startTime = Date.now();
                this.arriveTime = Date.now() + (this.travelTime*1000);
                let sp = this.endPostition;
                this.endPostition = this.startPosition;
                this.startPosition = sp;

                this.gatheredAmount = Math.round(this.gatheredAmount, 0);
                this.resources = {"type": this.tile.type, "quantity": this.gatheredAmount};

                //----------------------------
                // clear/create a new blank tile in place of the resource tile
                let x = this.tile.coords.x;
                let y = this.tile.coords.y;

                // save the res type for later 
                let tileData = JSON.parse(JSON.stringify(this.tile));
                tileData = {};
                tileData.resources = false;
                tileData.monkey = "chimp2";
                tileData.buttons = [];
                tileData.type = "grass1";
                tileData.coords = {"x": x, "y":y};
                tileData.text = "";
                tileData.user = "";
                let id = Number(x+(y*mapScreen.grid.width));
                mapScreen.mapTiles[x][y] = new Tile(tileData);
                firebase.database().ref("map" + "/" + id.toString()).set(tileData);
                
                //mapScreen.createTile(x, y, Tile);
                
        
            } else {            
                if(this.gatheredAmount >= this.load) { // load is full, return the march
                    this.tile.gatheredAmount += this.gatheredAmount;
                    this.recallMarch(this);
                return;
                }
            }
        }
    }

    //unload resources ect
    processReturn() {
        this.active = false;
        this.marching = false;

        console.log(this.resources);

        if(this.tile.resources) {        // are there resources to return
            console.log(this.resources);
            resourceManager.add(this.resources.type, this.resources.quantity);
        }
        marchManager.deleteMarch(this);

        saveList("marches", true);
    }

    recallMarch(self) {
        console.log(self);

        // reverse some settings, and bring the march home
        self.travelTime = 5;   // seconds
        self.elasped = 0;
        self.startTime = Date.now();
        self.arriveTime = Date.now() + (self.travelTime*1000);
        let sp = self.endPostition;
        self.endPostition = self.startPosition;
        if(self.arrived) {  //clicked recall on tile
            self.startPosition = sp;
        } else {            //clicked recall on march
            self.startPosition = new Vector3d(self.position.x, self.position.y);
        }
        self.carrot = "orange";
        self.gatheredAmount = Math.round(self.gatheredAmount, 0);
        self.resources = {"type": self.tile.type, "quantity": self.gatheredAmount};

        self.returning = true;
        self.arrived = false;

        // cleara the recall button
        setButtonState(self.tile.buttons, "recall", false);
        setButtonState(self.buttons, "recall", false);
        self.tile.gathering = false;

        self.update();
        console.log(self);
        //mapScreen.mapTiles[x][y] = new Tile(tileData);
        //firebase.database().ref("map" + "/" + id.toString()).set(tileData);
        let tileData = JSON.parse(JSON.stringify(self.tile));
        tileData.buttons = [];
        let x = self.tile.coords.x;
        let y = self.tile.coords.y;
        let id = Number(x+(y*mapScreen.grid.width));
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
        saveList("marches", true);

    }
}

class NewMarch extends March {

    constructor(data) {
        super(data);

        this.active = true;
        //this.tile = tile;

        //this.troops = selectedTroops;
        this.size = 0;
        this.speed = 0;         // tile per hour

        //this.distance = 

        this.travelTime = 5;   // seconds
        this.elasped;
        this.startTime = Date.now();
        this.arriveTime = Date.now() + (this.travelTime*1000);

        this.marching = true;
        this.returning = false;
        this.arrived = false;

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }
        this.tile = mapScreen.mapTiles[this.tile.coords.x][this.tile.coords.y];

        this.startCoords = new Vector3d(city.coords.x, city.coords.y);
        this.endCoords = this.tile.coords;

        let sp = mapScreen.mapTiles[city.coords.x][city.coords.y].getCenter();
        this.startPosition = new Vector3d(sp.x, sp.y);
        this.position = new Vector3d(sp.x, sp.y);
        let ep = this.tile.getCenter();
        this.endPostition = new Vector3d(ep.x, ep.y);

    }
}