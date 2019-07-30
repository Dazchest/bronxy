class March {

    constructor(tile, selectedTroops) {

        this.active = true;
        this.tile = tile;

        this.troops = selectedTroops;
        this.size = 0;
        this.speed = 0;         // tile per hour

        this.startCoords = new Vector3d(city.coords.x, city.coords.y);
        this.endCoords = tile.coords;

        let sp = mapScreen.mapTiles[city.coords.x][city.coords.y].getCenter();
        this.startPosition = new Vector3d(sp.x, sp.y);
        this.position = new Vector3d(sp.x, sp.y);
        let ep = tile.getCenter();
        this.endPostition = new Vector3d(ep.x, ep.y);

        //this.distance = 

        this.travelTime = 10;   // seconds
        this.elasped;
        this.startTime = Date.now();
        this.arriveTime = Date.now() + (this.travelTime*1000);

        this.marching = true;
        this.returning = false;
        this.arrived = false;

    }

    tick() {
        if(this.active) {
            if(this.arrived == false) {
                this.update();
                this.draw();
                this.checkArrived();
            }

            if(this.arrived == true) {
                this.process();
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

    }

    checkArrived() {
        if(this.elasped <= 0) {
            if(this.returning == false) {
                if(this.arrived == false) {
                    this.tile.buttons.push(new Button({"active": false, "name": "recall", "march": this, "drawButton": true, "offset" : {"x": 0, "y": 65}, "w": 75, "h": 30, "text": "recall", "screen": this, "action": marchManager.recallMarch}));
                }
                this.arrived = true;
            } else {
                this.processReturn();
            }
            //TODO: what to do here?????
        }
    }

    process() {
        if(this.tile.resources == true) {
            //console.log("gathering");

            //lets gather
            this.tile.gatheredAmount += (this.tile.baseGatheringSpeed / 3600) / fps;
            this.tile.availableAmount = this.tile.startAmount - this.tile.gatheredAmount;

            if(this.tile.availableAmount <= 0) {
                //lets return the roops
                //console.log("tile Complete");
                this.tile.availableAmount = 0;          // just in case it drops to a minus figure
                this.returning = true;
                this.arrived = false;

                // reverse some settings, and bring the march home
                this.travelTime = 10;   // seconds
                this.elasped = 0;
                this.startTime = Date.now();
                this.arriveTime = Date.now() + (this.travelTime*1000);
                let sp = this.endPostition;
                this.endPostition = this.startPosition;
                this.startPosition = sp;

                // clear/create a new blank tile in place of the resource tile
                let x = this.tile.coords.x;
                let y = this.tile.coords.y;

                this.tile.gatheredAmount = Math.round(this.tile.gatheredAmount, 0);
                this.resources = {"type": this.tile.type, "quantity": this.tile.gatheredAmount};

                let tileData = {};
                tileData.coords = {"x": x, "y":y};
                tileData.type = "grass1";
                let id = Number(x+(y*mapScreen.grid.width));
                firebase.database().ref("map" + "/" + id.toString()).set(tileData);
                
                //mapScreen.createTile(x, y, Tile);
                
        
            }
        }
    }

    //unload resources ect
    processReturn() {
        this.active = false;
        this.marching = false;

        let restype = this.resources.type;
        resources[restype].amount += this.resources.quantity;
        console.log(resources[restype]);
        //check if have resources
    }

    recallMarch() {
        console.log(this);
        this.returning = true;
        this.arrived = false;

        // reverse some settings, and bring the march home
        this.travelTime = 10;   // seconds
        this.elasped = 0;
        this.startTime = Date.now();
        this.arriveTime = Date.now() + (this.travelTime*1000);
        let sp = this.endPostition;
        this.endPostition = this.startPosition;
        this.startPosition = sp;

        this.tile.gatheredAmount = Math.round(this.tile.gatheredAmount, 0);
        this.resources = {"type": this.tile.type, "quantity": this.tile.gatheredAmount};

        // cleara the recall button
        setButtonState(this.tile.buttons, "recall", false);
        //this.tile.buttons.push(new Button({"active": false, "name": "recall", "march": this, "drawButton": true, "offset" : {"x": 0, "y": 65}, "w": 75, "h": 30, "text": "recall", "screen": this, "action": marchManager.recallMarch}));

    }
}