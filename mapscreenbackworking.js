class MapScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(whichMap) {

        super();

        this.name = "Map";

        this.grid = {"width": 150, "height": 150};
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
                this.mapTiles[x][y] = new Tile(x, y);
                //this.mapTiles[x][y].coords = {"x": x, "y": y};
            }
        }
       
        this.mapTiles[4][1] = new FoodTile(1, 4, 1);
        this.mapTiles[8][12] = new FoodTile(1, 8, 12);
        this.mapTiles[35][41] = new FoodTile(1, 35, 41);
        //this.mapTiles[4][1].coords = {"x": 4, "y": 1};
       // this.mapTiles[2][3] = new FoodTile(1);
        
        this.buttons.push(new Button({"active": true, "x": 300, "y": 20, "w": 100, "h": 30, "text": "Exit Map", "screen": this, "action":  this.exitScreen}));

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
            //camera.x = 500;
            //camera.y = 500;
            this.tileDimensioins = {"width": 200, "height": 100};
            // let grid_x = Math.floor(mapScreen.mapOffset.x / 200);    // 200 is tile width
            // let grid_y = Math.floor(mapScreen.mapOffset.y / 100);    // 100 is tile height
            // if(camera.x > 500) {
            //     camera.x = 500;
            // };
            this.gridOffset = new Vector3d(this.grid_x, this.grid_y);
            this.gridDisplay = {"width": 15, "height": 15};

            for(let y=-1; y<this.gridDisplay.height; y++) {
                for(let x=-1; x<this.gridDisplay.width; x++) {
                    //add points for the tiles we want to view first
    
                    let points = [];
                    points.push(new Vector3d(0 + (x*100) - (y*100), 50 +(y*50) + (x*50)));
                    points.push(new Vector3d(100 + (x*100) - (y*100), 0 +(y*50) + (x*50)));
                    points.push(new Vector3d(200 + (x*100) - (y*100), 50 +(y*50) + (x*50)));
                    points.push(new Vector3d(100 + (x*100) - (y*100), 100 +(y*50) + (x*50)));
                    // points[0].add(200+100, 300-50);  // centre
                    // points[1].add(200+100, 300-50);
                    // points[2].add(200+100, 300-50);
                    // points[3].add(200+100, 300-50);
                    //-----------

                    ctx.beginPath();
                    points[0] = points[0].addCamera(this.mapOffset);
                    //points[0] = points[0].addCamera(camera);
                    ctx.moveTo(points[0].x, points[0].y);
                    for(let j=1; j<4; j++) {
                        points[j] = points[j].addCamera(this.mapOffset);
                        //points[j] = points[j].addCamera(camera);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.stroke();
                    if(x + this.grid_x < 1 || y + this.grid_y < 1) {
                        ctx.fillStyle = '#7777ff';
                    } else {
                        ctx.fillStyle = '#44dd44';
                    }
                    ctx.fill();

                    // if(x + this.grid_x >= 0 && y + this.grid_y >= 0) {
                    //     this.mapTiles[x+this.grid_x][y+this.grid_y].points = points;

                    //     ctx.fillStyle = '#ffffff';
                    //     //console.log(x + " , " + y);
                    //     let tile = this.mapTiles[x+this.grid_x][y+this.grid_y];
                    //     ctx.fillText(tile.coords.x + ", " + tile.coords.y, points[0].x + 70, points[0].y + 0);
                    //     //ctx.fillText(t.coords.x + ", " + t.coords.y,  70 + 200,  0 -100);
                    //     ctx.fillText(tile.text, points[0].x + 70, points[0].y - 20);
                    //     //ctx.fillText("Level: " + this.mapTiles[x][y].level, points[0].x + 65 + 200, points[0].y + 20 -100);
                    // }
                }
            }
            //----------------------------



        // test draw a castle
        if(mapImages[0].image.complete && mapImages[1].image.complete) {
            //points[j] = pointsOrigin[j].addCamera(camera);
            // let x = this.mapTiles[0][0].points[0].x;
            // let y = this.mapTiles[0][0].points[0].y;
            // ctx.drawImage(mapImages[0].image, x , y , 200, 155);
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

        //Resource.drawAll();
        
        return;

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
                let g = t.availableAmount;
                ctx.fillText("g =  " + g, t.points[0].x + 30, t.points[0].y + 30);
            }
        }

        }   // end if active
    }

    checkClick() {
        if(clicked) {
            //return;
           // this.mapTiles[x][y].hideButtons();
           let offset = {"x": 0, "y": 0};

            //if(this.grid_x >= 0 && this.grid_y >= 0) {
            //if(this.grid_x < 4 && this.grid_x >= 0 &&this.grid_x - 4 >= 0 && this.grid_y - 4 >= 0) {

            if(this.grid_x > 4) {
                offset.x = this.grid_x - 4;
            }
            if(this.grid_x < 0 ) {
                offset.x = 0;
            }
            if(this.grid_y > 4) {
                offset.y = this.grid_y - 4;
            }
            if(this.grid_y < 0 ) {
                offset.y = 0;
            }
    
            for(let y=offset.y; y<this.gridDisplay.height + offset.y; y++) {
                for(let x=offset.x; x<this.gridDisplay.width + offset.x; x++) {
                    let inside = false;
                    //console.log(this.mapTiles[x][y].coords);
                    inside = pointInside(mouse, this.mapTiles[x][y].points);
                    //popup(inside, 300, 300);
                    if(inside) {
                        marchManager.hideOuterButtons();
                        this.mapTiles[x][y].highlight();
                        this.mapTiles[x][y].showButtons();
                        console.log("clicked at " + x + ", " + y);
                        this.tileClicked = new Vector3d(x, y);
                        return;
                    }
                }
            }
            // console.log("clicked at " + x + ", " + y);
            // this.mapTiles[x][y].showButtons();
            // this.mapTiles[x][y].highlight();
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
    points.push(new Vector3d(0 + (x*100) - (y*100), 50 +(y*50) + (x*50)));
    points.push(new Vector3d(100 + (x*100) - (y*100), 0 +(y*50) + (x*50)));
    points.push(new Vector3d(200 + (x*100) - (y*100), 50 +(y*50) + (x*50)));
    points.push(new Vector3d(100 + (x*100) - (y*100), 100 +(y*50) + (x*50)));
    // points[0].add(200+100, 300-50);  // centre
    // points[1].add(200+100, 300-50);
    // points[2].add(200+100, 300-50);
    // points[3].add(200+100, 300-50);

    return points;
}

//var mapTiles = [];

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
        let startPoints = createPoints(6, 2);
        //startPoints[0].addCamera(camera);
        startPoints[0].add(camera.x, camera.y);
        //startPoints[1].addCamera(camera);
        //startPoints[2].addCamera(camera);
        //startPoints[3].addCamera(camera);

        ctx.beginPath();
        ctx.moveTo(startPoints[0].x, startPoints[0].y);
        // for(let j=1; j<4; j++) {
        //     ctx.lineTo(points[j].x, points[j].y);
        // }
        ctx.lineTo(points[0].x, points[0].y);
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
                this.baseGatheringSpeed = 3000;
                break;
            case 3:
                this.startAmount = 3000;
                this.baseGatheringSpeed = 5000;
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
