class MapScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(whichMap) {

        super();

        this.name = "Map";
        this.active = false;

        this.grid = {"width": 200, "height": 200};
        this.tileDimensions = {"width": 160, "height": 80};
        this.mapOffset = {"x":0, "y": 0};
        this.grid_x = 0;    // 
        this.grid_y = 0;    // 

        this.whichMap = whichMap;
        this.tileClicked;
        clicked = false;

        this.mapTiles = [];
        for(let x=0; x<this.grid.width; x++) {
                this.mapTiles[x] = new Array(this.grid.height);
        }

        // put blank Tile class into each mapTile array
        for(let y=0; y<this.grid.height; y++) {
            for(let x=0; x<this.grid.width; x++) {
                let tileData = {"coords": new Tile(new Vector3d(x,y))}
                this.mapTiles[x][y] = new Tile(tileData);   // sets the cords as well
            }
        }
       

        
        this.buttons.push(new Button({"active": true, "x": 150, "y": 20, "w": 100, "h": 30, "text": "World Map", "screen": this, "action":  this.worldMapScreen}));
        this.buttons.push(new Button({"active": true, "x": 300, "y": 20, "w": 100, "h": 30, "text": "Exit Map", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "x": 450, "y": 20, "w": 100, "h": 30, "text": "Home", "screen": this, "action":  this.gotoCity}));
        
        this.buttons.push(new Button({"active": false, "drawButton": true, "x": 20, "y": 160, "w": 100, "h": 30, "text": "Save map", "color": '#aa2244', "screen": this, "action":  saveMap}));
        this.buttons.push(new Button({"active": false, "drawButton": true, "x": 20, "y": 200, "w": 100, "h": 30, "text": "Load map", "color": '#aa3355', "screen": this, "action":  loadMap2}));

        this.buttons.push(new Button({"active": true, "drawButton": true, "x": 20, "y": 240, "w": 100, "h": 30, "text": "add food", "color": '#aa3355', "screen": this, "action":  addFood}));

        camera.x = 0;
        camera.y = 0;

        this.initMap();
        if(cities[currentCity]) {
            cities[currentCity].active = false;
        }
        buildingHandler.highlightGrid = false;

        //this.loadMap();
    }

    initMap() {
        Assets.loadMapImages();

        //lets create random res tiles
        // for(let t=0; t<500; t++){
        //     let x = Math.floor(Math.random() * this.grid.width);
        //     let y = Math.floor(Math.random() * this.grid.height);
        //     let level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new FoodTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new WoodTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new StoneTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new IronTile(level, x, y);
        // }
    }

    loadMap() {

    }

    setup() {
        this.grid_x = 0;    // 
        this.grid_y = 0;    // 
        this.tileClicked = null;

        camera.x = 0;
        camera.y = 0;

        if(cities[currentCity]) {
            cities[currentCity].active = false;
        }
        buildingHandler.highlightGrid = false;

        this.active = true;
        this.gotoCity2(city.coords.x, city.coords.y);

    }
    gotoFromWorldMap(x,y) {
        this.grid_x = 0;    // 
        this.grid_y = 0;    // 
        this.tileClicked = null;

        camera.x = 0;
        camera.y = 0;

        if(cities[currentCity]) {
            cities[currentCity].active = false;
        }
        buildingHandler.highlightGrid = false;

        this.active = true;
        this.gotoCity2(x, y);

    }

    worldMapScreen(self) {
        self.active = false;
        console.log("going to the world map");
        camera.x = 0;
        camera.y = 0;
        worldMapScreen = new WorldMapScreen();
        screenManager.screen = worldMapScreen;
        //mapScreen.setup();
    }
    gotoCity(self) {
        let x = city.coords.x;
        let y = city.coords.y;
        let cw = Math.floor(canvas.width / mapScreen.tileDimensions.width);
        let ch = Math.floor(canvas.height / mapScreen.tileDimensions.height) / 2;
        self.grid_x = x-cw;    
        self.grid_y = y-ch;    
        //camera.x = (y - x) * (mapScreen.tileDimensions . x / 2);
        camera.x = (y - x) * mapScreen.tileDimensions.width/2;
        camera.y = ((x-cw + y-ch + 1) * -mapScreen.tileDimensions.height/2) - mapScreen.tileDimensions.height/2;
    }

    gotoCity2(x, y) {
        let cw = Math.floor(canvas.width / mapScreen.tileDimensions.width);
        let ch = Math.floor(canvas.height / mapScreen.tileDimensions.height) / 2;
        this.grid_x = x-cw;    
        this.grid_y = y-ch;    
        //camera.x = (y - x) * (mapScreen.tileDimensions . x / 2);
        camera.x = (y - x) * mapScreen.tileDimensions.width/2;
        camera.y = ((x-cw + y-ch + 1) * -mapScreen.tileDimensions.height/2) - mapScreen.tileDimensions.height/2;
    }

    createTile(x, y, which, level) {
        this.mapTiles[x][y] = new which(level);
        let coords = new Vector3d(x, y);
        this.mapTiles[x][y].coords = coords;

        let t = 0;
        let p = 0;

        let points = [];
        points.push(new Vector3d(t + 50 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
        points.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 50 +(y*50) + (x*50)));
        points.push(new Vector3d(t + 250 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
        points.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 150 +(y*50) + (x*50)));
        this.mapTiles[x][y].points = points;
        let pointsOrigin = [];
        pointsOrigin.push(new Vector3d(t + 50 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
        pointsOrigin.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 50 +(y*50) + (x*50)));
        pointsOrigin.push(new Vector3d(t + 250 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
        pointsOrigin.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 150 +(y*50) + (x*50)));
        this.mapTiles[x][y].pointsOrigin = pointsOrigin;

    }

    tick() {
        this.draw();
    }

    draw() {
        if(this.active) {

            ctx.save();
            ctx.scale(1, 1);


            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x, this.y, this.w * 2, this.h * 2);

            ctx.fillStyle = '#ffffff';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            ctx.strokeStyle = "#ff0000";

            //----------------------------------
            // draw the grid
            //----------------------------------

            this.gridOffset = new Vector3d(this.grid_x, this.grid_y);
            this.gridDisplay = {"width": 22, "height": 22};

            // this.grid_x = Math.floor(camera.x / 200);    // 200 is tile width
            // this.grid_y = Math.floor(camera.y / 100);    // 100 is tile height

            for(let y=-5+this.grid_y; y<this.gridDisplay.height+this.grid_y-5; y++) {
                for(let x=-5+this.grid_x; x<this.gridDisplay.width+this.grid_x-5; x++) {
                    //add points for the tiles we want to view first
    
                    let points = createPoints(x, y);
                    //-----------

                    ctx.beginPath();
                    //points[0] = points[0].addCamera(this.mapOffset);
                    points[0] = points[0].addCamera(camera);
                    ctx.moveTo(points[0].x, points[0].y);
                    for(let j=1; j<4; j++) {
                        //points[j] = points[j].addCamera(this.mapOffset);
                        points[j] = points[j].addCamera(camera);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.stroke();
                    if(x < 1 || x > this.grid.width-1 || y < 1 || y > this.grid.height-1) {
                        ctx.fillStyle = '#7777ff';
                    } else {
                        ctx.fillStyle = '#44dd44';
                    }
                    ctx.fill();

                    if(x >= 0 && x<this.grid.width && y >= 0 && y<this.grid.height) {
                        this.mapTiles[x][y].points = points;

                        ctx.fillStyle = '#ffffff';
                        //console.log(x + " , " + y);
                        let tile = this.mapTiles[x][y];
                        ctx.fillText(tile.coords.x + ", " + tile.coords.y, points[0].x + 70, points[0].y + 0);
                        //ctx.fillText(t.coords.x + ", " + t.coords.y,  70 + 200,  0 -100);
                        if(tile.resources) {
                            ctx.fillStyle = '#0000ff';
                            ctx.fillText(tile.text, points[0].x + 70, points[0].y - 20);
                            ctx.fillText("Level: " + tile.level, points[0].x + 65, points[0].y + 20);
                        } else 
                        if(tile.city) {
                            ctx.drawImage(mapImages[0].image, points[0].x-15, points[0].y - 105, 195, 150);
                            ctx.fillStyle = '#ffee44';
                            ctx.fillText(tile.name, points[0].x + 20, points[0].y);
                        }
                        if(tile.monster) {
                            //console.log("monsteer");
                            ctx.drawImage(monsterImages[0], points[0].x-15, points[0].y - 105, 195, 150);
                            //ctx.fillStyle = '#ffee44';
                            //ctx.fillText(tile.name, points[0].x + 20, points[0].y);
                        }
                    }
                }
            }
            //----------------------------

        ctx.fillStyle = '#000000';
        ctx.fillText(this.grid_x + " , " + this.grid_y, 650, 20);
        ctx.fillText(camera.x + " , " + camera.y, 650, 45);
        ctx.fillText(this.mapOffset.x + " , " + this.mapOffset.y, 650, 70);
        ctx.fillText(mouse.movement.x + " , " + mouse.movement.y, 650, 100);

        ctx.restore();

        Resource.drawAll();

        //return;

        this.drawButtons();
        this.checkButtons();
        
        for(let y=-5+this.grid_y; y<this.gridDisplay.height+this.grid_y-5; y++) {
            for(let x=-5+this.grid_x; x<this.gridDisplay.width+this.grid_x-5; x++) {
                if(x >= 0 && x<this.grid.width && y >= 0 && y<this.grid.height) {
                    this.mapTiles[x][y].draw();
                }
            }
        }

        this.checkClick();
                
        if(this.tileClicked) {
            let t = this.mapTiles[this.tileClicked.x][this.tileClicked.y]
            t.highlight();
            if(t.availableAmount) {
                let g = Math.floor(t.availableAmount);
                ctx.fillStyle = '#ff00ff';
                ctx.fillText("Available =  " + g, t.points[0].x + 30, t.points[0].y + 30);
            }
        }

        }   // end if active
    }

    checkClick() {
        if(clicked) {
            for(let y=-5+this.grid_y; y<this.gridDisplay.height+this.grid_y-5; y++) {
                for(let x=-5+this.grid_x; x<this.gridDisplay.width+this.grid_x-5; x++) {
                    if(x >= 0 && x<this.grid.width && y >= 0 && y<this.grid.height) {

                        let inside = false;
                        inside = pointInside(mouse, this.mapTiles[x][y].points);
                        if(inside) {
                            marchManager.hideOuterButtons();
                            this.mapTiles[x][y].highlight();
                            this.mapTiles[x][y].showButtons();
                            console.log("clicked at " + x + ", " + y);
                            this.tileClicked = new Vector3d(x, y);
                            let c = this.mapTiles[x][y].getCenter();
                            console.log(this.mapTiles[x][y]);
                            return;
                        }
                    }
                }
            }
        }
    }

}
class Vector3d {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = 0;
    }

    addCamera(camera) {
        let x = this.x + camera.x;
        let y = this.y + camera.y;
        let z = this.z + camera.z;
        return new Vector3d(x, y, 0);
    }
    subCamera(camera) {
        let x = this.x - camera.x;
        let y = this.y - camera.y;
        let z = this.z - camera.z;
        return new Vector3d(x, y, 0);
    }
    add(x, y) {
        this.x += x;
        this.y += y;
    }
}

function createPoints(x, y) {
    let points = [];
    let tileW = mapScreen.tileDimensions.width;
    let tileH = mapScreen.tileDimensions.height;
    points.push(new Vector3d(-tileW/2 + (x*tileW/2) - (y*tileW/2) + canvas.width/2, 0 +(y*tileH/2) + (x*tileH/2)));
    points.push(new Vector3d(0 + (x*tileW/2) - (y*tileW/2) + canvas.width/2, -tileH/2 +(y*tileH/2) + (x*tileH/2)));
    points.push(new Vector3d(tileW/2 + (x*tileW/2) - (y*tileW/2) + canvas.width/2, 0 +(y*tileH/2) + (x*tileH/2)));
    points.push(new Vector3d(0 + (x*tileW/2) - (y*tileW/2) + canvas.width/2, tileH/2 +(y*tileH/2) + (x*tileH/2)));

    return points;
}

class Tile {

    constructor(data) {

        this.user = ""; // enter user name here

        this.type = "grass1";
        this.points;

        this.level = 0;
        this.monster = false;
        this.boss = false;
        this.city = false;
    
        this.water = false;
        this.mountain = false;
        this.buildon = true;    // can we build on this site

        this.text = "";
        this.highlightAlpha = 1;
        this.highlightDir = .05;

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }
        //this.id = this.coords.x + (this.coords.y * mapScreen.grid.width);    // TODO: needs to be inserted on create new tile
        //this.coords = {"x": this.coords.x, "y": this.coords.y};

        this.buttons = [];


    }

    getCenter() {
        let point;
        let x = this.coords.x;
        let y = this.coords.y;
        let tileW = mapScreen.tileDimensions.width;
        let tileH = mapScreen.tileDimensions.height;
            
        point = new Vector3d((x*tileW/2) - (y*tileW/2) + canvas.width/2, (y*tileH/2) + (x*tileH/2));
    
        return point;
    }

    draw() {
        //this.showButtons();
        this.drawButtons();
        this.checkButtons();
    }

    drawButtons() {
        //return;
        for(let x=0; x<this.buttons.length; x++) {
            let b = this.buttons[x];
            if(b.active) {
                b.x = b.offset.x + this.points[0].x;
                b.y = b.offset.y + this.points[0].y;
                b.draw();
            }
        }
    }

    showButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            if(this.gathering && this.buttons[x].name == "gather") {
                // do nothing
            } else {
                this.buttons[x].show();
            }
        }
    }

    hideButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            this.buttons[x].hide();
        }
    }

    checkButtons() {
        this.buttonClicked = false;
        var b;
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                //console.log(this.buttons.length);
                b = this.buttons[x];
                //console.log("action = " + b.action);
                //console.log("active = " + b.active);
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                    //console.log("presssssss " + x);
                    if(b.action && b.active) {
                        this.buttonClicked = b;
                    }
                }
            }
        }
        if(this.buttonClicked) {
            clicked = false;
            console.log(this.buttonClicked.text + " pressed");
            let callback = this.buttonClicked.action;
            callback(this, this.buttonClicked);
        }
    }

    highlight() {
        ctx.save();

        let points = this.points;
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let j=1; j<4; j++) {
            ctx.lineTo(points[j].x, points[j].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.stroke();

        if(this.highlightAlpha >= 1) {
            this.highlightDir *= -1;
        }
        if(this.highlightAlpha <= .1) {
            this.highlightDir *= -1;
        }
        this.highlightAlpha += this.highlightDir;
        ctx.globalAlpha = this.highlightAlpha;

        ctx.fillStyle = '#ffdd44';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.coords.x + ", " + this.coords.y, points[0].x + 70, points[0].y + 0);

        // draw line to it
        ctx.globalAlpha = 1;
        let sp = mapScreen.mapTiles[city.coords.x][city.coords.y].getCenter();
        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.moveTo(sp.x + camera.x, sp.y + camera.y);
        let ep = this.getCenter();
        ctx.lineTo(ep.x + camera.x, ep.y + camera.y);
        ctx.stroke();

        ctx.restore();

    }
}

class CityTile extends Tile{

    constructor(data) {
        super(data);

        this.city = true;

        if(this.user == username) {
            this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "Enter", "screen": this, "action": mapScreen.exitScreen}));
        } else {
            this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "ATTACK", "screen": this, "action": this.attack}));
        }

    }

    attack() {
        alert("ATTACKKKKK!!!");
    }
}

class MonsterTile extends Tile{

    constructor(data) {
        super(data);

        this.monster = true;
        this.monsterName = "Zuko";
        this.power = 5000;

        this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "ATTACK", "screen": this, "action": this.attack}));
        
    }

    drawMonster() {

    }

    attack(self) {
        mapScreen.tileClicked = false;
        console.log("attacking monster");
        marchScreen = new MarchScreen(self);
        screenManager.screen = marchScreen;
    
    }
}

class ResourceTile extends Tile {

    constructor(data) {
        super(data);

        //this.level = level;
        this.amount = 0;
        this.resources = true;

        this.gathering = false;

    }


}

class FoodTile extends ResourceTile {

    constructor(data) {
        super(data);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.food = true;
        this.type = "food";
        this.text = "FOOD";

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }

        switch (this.level) {
            case 1:
                this.startAmount = 1000;
                this.baseGatheringSpeed = 150000;     // per hour
                break;
            case 2:
                this.startAmount = 2000;
                this.baseGatheringSpeed = 390000;
                break;
            case 3:
                this.startAmount = 3000;
                this.baseGatheringSpeed = 520000;
                break;
                    
            default:
                break;
        }
        this.availableAmount = this.startAmount - this.gatheredAmount;

        this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "Gather", "screen": this, "action": this.gather}));

    }

    gather(self) {
        mapScreen.tileClicked = false;
        console.log("gathering");
        marchScreen = new MarchScreen(self);
        screenManager.screen = marchScreen;

    }
}

class WoodTile extends ResourceTile {

    constructor(data) {
        super(data);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.wood = true;
        this.type = "wood";
        this.text = "WOOD";

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }

        switch (this.level) {
            case 1:
                this.startAmount = 1000;
                this.baseGatheringSpeed = 60000;     // per hour
                break;
            case 2:
                this.startAmount = 2000;
                this.baseGatheringSpeed = 90000;
                break;
            case 3:
                this.startAmount = 3000;
                this.baseGatheringSpeed = 120000;
                break;
                    
            default:
                break;
        }
        this.availableAmount = this.startAmount - this.gatheredAmount;

        this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "Gather", "screen": this, "action": this.gather}));

    }

    gather(self) {
        mapScreen.tileClicked = false;
        console.log("gathering");
        marchScreen = new MarchScreen(self);
        screenManager.screen = marchScreen;

    }
}

class StoneTile extends ResourceTile {

    constructor(data) {
        super(data);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.stone = true;
        this.type = "stone";
        this.text = "STONE";

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }

        switch (this.level) {
            case 1:
                this.startAmount = 1000;
                this.baseGatheringSpeed = 60000;     // per hour
                break;
            case 2:
                this.startAmount = 2000;
                this.baseGatheringSpeed = 90000;
                break;
            case 3:
                this.startAmount = 3000;
                this.baseGatheringSpeed = 120000;
                break;
                    
            default:
                break;
        }
        this.availableAmount = this.startAmount - this.gatheredAmount;

        this.buttons.push(new Button({"active": false, "drawButton": true, "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "Gather", "screen": this, "action": this.gather}));

    }

    gather(self) {
        mapScreen.tileClicked = false;
        console.log("gathering");
        marchScreen = new MarchScreen(self);
        screenManager.screen = marchScreen;

    }
}
class IronTile extends ResourceTile {

    constructor(data) {
        super(data);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.iron = true;
        this.type = "iron";
        this.text = "IRON";

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];
                this[name] = data[name];
            }
        }

        switch (this.level) {
            case 1:
                this.startAmount = 500;
                this.baseGatheringSpeed = 120000;     // per hour
                break;
            case 2:
                this.startAmount = 2000;
                this.baseGatheringSpeed = 90000;
                break;
            case 3:
                this.startAmount = 3000;
                this.baseGatheringSpeed = 120000;
                break;
                    
            default:
                break;
        }
        this.availableAmount = this.startAmount - this.gatheredAmount;

        this.buttons.push(new Button({"active": false, "name": "gather", "offset" : {"x": 0, "y": 40}, "w": 75, "h": 30, "text": "Gather", "screen": this, "action": this.gather}));

    }

    gather(self) {
        mapScreen.tileClicked = false;
        console.log("gathering");
        marchScreen = new MarchScreen(self);
        screenManager.screen = marchScreen;

    }
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
class MapManager {
    
    constructor() {

    }

    saveTile(tile) {
        let id = Number(tile.coords.x+(tile.coords.y*mapScreen.grid.width));
        let tileData = JSON.parse(JSON.stringify(tile));
        tileData.buttons = [];
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
    }

    updateTile(tile) {
        let id = Number(tile.coords.x+(tile.coords.y*mapScreen.grid.width));
        let tileData = JSON.parse(JSON.stringify(tile));
        tileData.buttons = [];
        tileData = {};
        tileData.user = username;
        tileData.fish = "salmon";
        firebase.database().ref("map" + "/" + id.toString()).update(tileData);
        console.log(tileData);
    }

    loadTile(tileData) {
        console.log("tile",tileData);
        for(let x=0; x<Object.keys(tileData).length; x++) {
            name = Object.keys(tileData)[x];// (data[x]).value;
            console.log(tileData[name]);
            mapScreen.mapTiles[tileData.coords.x][tileData.coords.y][name] = tileData[name];
        }
    }

    processTile(data) {
        let tileData = JSON.parse(JSON.stringify(data));
        tileData.buttons = [];
        switch (tileData.type) {
            case "food":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new FoodTile(tileData); 
                break;
            case "wood":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new WoodTile(tileData);
                break;
            case "stone":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new StoneTile(tileData);
                break;
            case "iron":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new IronTile(tileData); 
                break;

            case "city":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new CityTile(tileData); 
                break;

            case "monster":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new MonsterTile(tileData); 
                break;
    
            default:
                //mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new Tile(tileData);
                break;
         }
    }

    addRssTile(type, level, x, y) {
        let tileData = {};
        tileData.type = type,
        tileData.level = level;
        tileData.addednew = "newww tileee";
        tileData.coords = new Vector3d(x, y);
        let id = Number(x + (y * mapScreen.grid.width));
        this.processTile(tileData);
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
    }

    updateTileData(x, y, data) {
        let id = Number(x + (y * mapScreen.grid.width));
        firebase.database().ref("map" + "/" + id.toString()).update(data);
    }
}




//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// Point class based on https://github.com/studiomoniker/point
class Point {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    clone() {
      return new Point(this.x, this.y);
    }

    add(point) {
      this.x += point.x;
      this.y += point.y;
      return this;
    }

    rotate(angle) {
      if (angle === 0)
          return this;
      const radians = angle * 0.0174533;
      const s = Math.sin(radians);
      const c = Math.cos(radians);
      const x = this.x;
      const y = this.y;
      const x1 = x * c - y * s;
      const y1 = x * s + y * c;
      this.x = x1;
      this.y = y1;
      return this;
    }

    draw(ctx, color)
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}



class WorldMapScreen extends ScreenView {
    constructor() {
        super();

        this.active = true;
        this.name = "World Map";
        camera.x = 0;
        camera.y = 0;

        this.buttons.push(new Button({"active": true, "x": 300, "y": 20, "w": 100, "h": 30, "text": "Exit World Map", "screen": this, "action":  this.exitScreen}));

        this.angle = 0;
    }

    draw() {
        if(this.active) {
            this.drawButtons();
            this.checkButtons();
            this.checkClick();

            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.fillRect(this.x, this.y, this.w * 2, this.h * 2);

            ctx.fillStyle = '#ffffff';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);

            var posX, posY;
            var tileSize = 1;
            var mapYoffset = 200;

            ctx.save();
            ctx.fillStyle = '#ff0000';
            ctx.translate((canvas.width/2) + camera.x, 200 + camera.y + mapScreen.grid.height/2)
            ctx.rotate(45 * Math.PI / 180);
            ctx.translate(-((canvas.width/2) + camera.x), -(200 + camera.y + mapScreen.grid.height/2));

            ctx.beginPath();
            ctx.moveTo((canvas.width/2) + camera.x - mapScreen.grid.width/2, mapYoffset + camera.y);
            ctx.lineTo((canvas.width/2) + camera.x + mapScreen.grid.width/2, mapYoffset + camera.y);
            ctx.lineTo((canvas.width/2) + camera.x + mapScreen.grid.width/2, mapYoffset + camera.y + mapScreen.grid.height);
            ctx.lineTo((canvas.width/2) + camera.x - mapScreen.grid.width/2, mapYoffset + camera.y + mapScreen.grid.height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.save();

    
            ctx.fillStyle = "#00bb00";

            //draw big map  
            this.mapYoffset = 200;
            ctx.translate((canvas.width/2) + camera.x, 200 + camera.y + mapScreen.grid.height/2)
            //ctx.scale(2, 2);
            ctx.rotate(45 * Math.PI / 180);
            ctx.translate(-((canvas.width/2) + camera.x), -(200 + camera.y + mapScreen.grid.height/2));

            ctx.beginPath();
            ctx.moveTo((canvas.width/2) + camera.x - mapScreen.grid.width/2, this.mapYoffset + camera.y);
            ctx.lineTo((canvas.width/2) + camera.x + mapScreen.grid.width/2, this.mapYoffset + camera.y);
            ctx.lineTo((canvas.width/2) + camera.x + mapScreen.grid.width/2, this.mapYoffset + camera.y + mapScreen.grid.height);
            ctx.lineTo((canvas.width/2) + camera.x - mapScreen.grid.width/2, this.mapYoffset + camera.y + mapScreen.grid.height);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            for(let y=0; y<mapScreen.grid.height; y++) {
                for(let x=0; x<mapScreen.grid.width; x++) {

                    posX = (x - y) * tileSize;
                    posY = (y + x) * tileSize;
                    posX = x;
                    posY = y;
                    let tile = mapScreen.mapTiles[x][y];
                    if(tile.city) {
                        ctx.fillStyle = "#0000ff";
    ctx.fillRect(posX + (canvas.width/2) + camera.x - mapScreen.grid.width/2, posY + this.mapYoffset + camera.y, 2, 2);
                    }
                }
            }
            //----------------------------
            function toDegrees (angle) {
                return angle * (180 / Math.PI);
              }

            ctx.restore();
            let x, y, mx=0, my=0;

            x = (mouse.x - (canvas.width/2) - camera.x + mapScreen.grid.width/2);
            y = (mouse.y - this.mapYoffset - camera.y);
            //x=100;
            //y=-40;
            //ctx.translate((canvas.width/2) + camera.x, 200 + camera.y + mapScreen.grid.height/2)
            mx = x*Math.cos(toDegrees(45)) - y*Math.sin(toDegrees(45));
            my = y*Math.cos(toDegrees(45)) + x*Math.sin(toDegrees(45));
            mx = x*Math.cos(this.angle) - y*Math.sin(this.angle);
            my = y*Math.cos(this.angle) + x*Math.sin(this.angle);

            this.angle -= .005;
            //mx = (mouse.x - (canvas.width/2) - camera.x + mapScreen.grid.width/2);
            //my = (mouse.y - this.mapYoffset - camera.y);
            ctx.fillText("map " + mx + ", " + my, 10, 80);
            ctx.fillText("map " + x + ", " + y, 10, 180);

            x = 100-(mouse.x - (canvas.width/2) - camera.x + mapScreen.grid.width/2);
            y = 100-(mouse.y - this.mapYoffset - camera.y);

            this.angle = -3.946;
            //x = 100-(100);
            //y = 100-(-40);
            mx = x*Math.cos(this.angle) - y*Math.sin(this.angle) + 100;
            my = y*Math.cos(this.angle) + x*Math.sin(this.angle) + 100;
            //mx = x*Math.cos(22.5 * Math.PI / 180) - y*Math.sin(22.5 * Math.PI / 180) + 100;
            //my = y*Math.cos(22.5 * Math.PI / 180) + x*Math.sin(22.5 * Math.PI / 180) + 100;
           // mx = x;
            //my = y;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(mx + (canvas.width/2) + camera.x - mapScreen.grid.width/2, my + this.mapYoffset + camera.y, 6, 6);
            ctx.fillText("map " + mx + ", " + my, 10, 280);
            ctx.fillText("a " + this.angle, 10, 320);
        }

    }

    checkClick() {
        let x, y, mx, my;
        if(clicked) {
            x = 100-(mouse.x - (canvas.width/2) - camera.x + mapScreen.grid.width/2);
            y = 100-(mouse.y - this.mapYoffset - camera.y);

            this.angle = -3.946;
            //x = 100-(100);
            //y = 100-(-40);
            mx = x*Math.cos(this.angle) - y*Math.sin(this.angle) + 100;
            my = y*Math.cos(this.angle) + x*Math.sin(this.angle) + 100;
            if(mx < 0) {
                mx = 0;
            }
            if(mx > 200) {
                mx = 200;
            }
            if(my < 0) {
                my = 0;
            }
            if(my > 200) {
                my = 200;
            }
            console.log(mx + ", " + my);
           // mapScreen3() {
                console.log("going to the map");
                //mapScreen = new MapScreen(3);
                this.active = false;
                screenManager.screen = mapScreen;
                mapScreen.gotoFromWorldMap(Math.floor(mx), Math.floor(my));
            //}
        }
    }

}