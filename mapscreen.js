class MapScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(whichMap) {

        super();

        this.name = "Map";

        this.grid = {"width": 500, "height": 500};
        this.mapOffset = {"x":0, "y": 0};
        this.grid_x = 0;    // 
        this.grid_y = 0;    // 

        this.whichMap = whichMap;
        this.tileClicked;

        this.mapTiles = [];
        for(let x=0; x<this.grid.width; x++) {
                this.mapTiles[x] = new Array(this.grid.height);
        }

        // put Tile class into each mapTile array
        for(let y=0; y<this.grid.height; y++) {
            for(let x=0; x<this.grid.width; x++) {
                this.mapTiles[x][y] = new Tile(x, y);   // sets the cords as well
            }
        }
       

        
        this.buttons.push(new Button({"active": true, "x": 300, "y": 20, "w": 100, "h": 30, "text": "Exit Map", "screen": this, "action":  this.exitScreen}));
        this.buttons.push(new Button({"active": true, "x": 450, "y": 20, "w": 100, "h": 30, "text": "Home", "screen": this, "action":  this.gotoCity}));

        camera.x = 0;
        camera.y = 0;

        this.initMap();
        if(cities[currentCity]) {
            cities[currentCity].active = false;
        }
        buildingHandler.highlightGrid = false;
    }

    initMap() {
        Assets.loadMapImages();

        //lets create random res tiles
        for(let t=0; t<200; t++){
            let x = Math.floor(Math.random() * 100 + 1);
            let y = Math.floor(Math.random() * 100 + 1);
            let level = Math.floor(Math.random() * 3 + 1);
            this.mapTiles[x][y] = new FoodTile(level, x, y);

            x = Math.floor(Math.random() * 100 + 1);
            y = Math.floor(Math.random() * 100 + 1);
            level = Math.floor(Math.random() * 3 + 1);
            this.mapTiles[x][y] = new WoodTile(level, x, y);

            x = Math.floor(Math.random() * 100 + 1);
            y = Math.floor(Math.random() * 100 + 1);
            level = Math.floor(Math.random() * 3 + 1);
            this.mapTiles[x][y] = new StoneTile(level, x, y);

            x = Math.floor(Math.random() * 100 + 1);
            y = Math.floor(Math.random() * 100 + 1);
            level = Math.floor(Math.random() * 3 + 1);
            this.mapTiles[x][y] = new IronTile(level, x, y);
        }
        
    }

    gotoCity(self) {
        let x = cityCoords.x;
        let y = cityCoords.y;
        self.grid_x = x-4;    
        self.grid_y = y-4;    
        //camera.x = (y - x) * (mapScreen.tileDimensions . x / 2);
        camera.x = (y - x) * 100;
        camera.y = ((x-4 + y-4 + 1) * -50) - 50;
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
            this.tileDimensions = {"width": 200, "height": 100};

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
                        }
                    }
                }
            }
            //----------------------------



        // test draw a castle
        if(mapImages[0].image.complete && mapImages[1].image.complete) {
            //points[j] = pointsOrigin[j].addCamera(camera);
            let x = this.mapTiles[cityCoords.x][cityCoords.y].points[0].x;
            let y = this.mapTiles[cityCoords.x][cityCoords.y].points[0].y;
            //point
            ctx.drawImage(mapImages[0].image, x, y - 100, 200, 155);
            // x = this.mapTiles[3][2].points[0].x;
            // y = this.mapTiles[3][2].points[0].y;
            // ctx.drawImage(mapImages[1].image, x, y , 200, 155);
        }

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
        
        for(let y=0; y<45; y++) {
            for(let x=0; x<45; x++) {
                this.mapTiles[x][y].draw();
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
                            console.log(c);
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
        this.z = z;
    }

    addCamera(camera) {
        let x = this.x + camera.x;
        let y = this.y + camera.y;
        let z = this.z + camera.z;
        return new Vector3d(x, y);
    }
    subCamera(camera) {
        let x = this.x - camera.x;
        let y = this.y - camera.y;
        let z = this.z - camera.z;
        return new Vector3d(x, y);
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

    constructor(x, y) {

        this.buttons = [];

        this.coords = {"x": x, "y": y};
        this.points;

        this.level = 0;

        this.monster = false;
        this.boss = false;
        this.city = false;
    
        //this.resources.amount = 0;

        this.water = false;
        this.mountain = false;
        this.buildon = true;    // can we build on this site

        this.text = "";


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
            this.buttons[x].show();
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
        let points = this.points;
        ctx.strokeStyle = '#ff0000';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let j=1; j<4; j++) {
            ctx.lineTo(points[j].x, points[j].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.stroke();
        ctx.fillStyle = '#ffdd44';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.coords.x + ", " + this.coords.y, points[0].x + 70, points[0].y + 0);

        // draw line to it

        let sp = mapScreen.mapTiles[cityCoords.x][cityCoords.y].getCenter();
        ctx.beginPath();
        ctx.moveTo(sp.x + camera.x, sp.y + camera.y);
        let ep = this.getCenter();
        ctx.lineTo(ep.x + camera.x, ep.y + camera.y);
        ctx.stroke();

    }
}

class ResourceTile extends Tile {

    constructor(level, x, y) {
        super(x, y);

        this.level = level;
        this.amount = 0;
        this.resources = true;
    }
}

class FoodTile extends ResourceTile {

    constructor(level, x, y) {
        super(level, x, y);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.food = true;
        this.type = "food";
        this.text = "FOOD";

        switch (level) {
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

class WoodTile extends ResourceTile {

    constructor(level, x, y) {
        super(level, x, y);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.wood = true;
        this.type = "wood";
        this.text = "WOOD";

        switch (level) {
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

    constructor(level, x, y) {
        super(level, x, y);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.stone = true;
        this.type = "stone";
        this.text = "STONE";

        switch (level) {
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

    constructor(level, x, y) {
        super(level, x, y);

        this.startAmount = 0;
        this.baseGatheringSpeed = 0;    // gph - gathering per hour
        this.gatheredAmount = 0;
        this.iron = true;
        this.type = "iron";
        this.text = "IRON";

        switch (level) {
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
