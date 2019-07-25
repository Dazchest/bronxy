class MapScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(whichMap) {

        super();

        this.grid = {"width": 10, "height": 10};
        this.whichMap = whichMap;
        this.tileClicked;

        this.mapTiles = [];
        for(let x=0; x<this.grid.width; x++) {
            //for(let y=0; y<this.grid.height; y++) {
                this.mapTiles[x] = new Array(this.grid.height);
            //this.mapTiles[(y * this.grid.width) * x] = [];
            //}
        }
        // put Tile class into each mapTile array
        for(let y=0; y<this.grid.height; y++) {
            for(let x=0; x<this.grid.width; x++) {
                this.mapTiles[x][y] = new Tile();
                this.mapTiles[x][y].gridXY = {"x": x, "y": y};
            }
        }
        this.mapTiles[4][1] = new FoodTile(1);
        this.mapTiles[2][3] = new FoodTile(1);
        //this.mapTiles[4][1].food = true;
        //this.mapTiles[4][1].text = "Food";

        
        // this.buttons = [];
        this.name = "Map";
        // this.currentTree = "City";

        // console.log("this is Research Screen constructor");
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
        //this.mapTiles = [];

        //this.active = false;
        Assets.loadMapImages();


        console.log(this.whichMap);
        if(this.whichMap == 1) {
            for(let y=0; y<this.grid.height; y++) {
                for(let x=0; x<this.grid.width; x++) {
                    //ctx.translate(-50,0);
                    let t = (x % 2) * -50;
                    t=0;
                    let p = (x % 2) * 50;

                    let points = [];
                    points.push(new Vector3d(t + 50 + (x*100), p + 50 +(y*100)));
                    points.push(new Vector3d(t + 100 + (x*100), p + 50 +(y*100)));
                    points.push(new Vector3d(t + 150 + (x*100), p + 100 +(y*100)));
                    points.push(new Vector3d(t + 100 + (x*100), p + 150 +(y*100)));
                    points.push(new Vector3d(t + 50 + (x*100), p + 150 +(y*100)));
                    points.push(new Vector3d(t + 0 + (x*100), p + 100 +(y*100)));
                    this.mapTiles[x][y].points = points;
                }
            }
        }   


        if(this.whichMap == 2) {
            for(let y=0; y<this.grid.height; y++) {
                for(let x=0; x<this.grid.width; x++) {
                    //ctx.translate(-50,0);
                    let t = (y % 2) * 75;

                    let points = [];
                    points.push(new Vector3d(t + 75 + (x*150), 50 +(y*75)));
                    points.push(new Vector3d(t + 150 + (x*150), 75 +(y*75)));
                    points.push(new Vector3d(t + 150 + (x*150), 125 +(y*75)));
                    points.push(new Vector3d(t + 75 + (x*150), 150 +(y*75)));
                    points.push(new Vector3d(t + 0 + (x*150), 125 +(y*75)));
                    points.push(new Vector3d(t + 0 + (x*150), 75 +(y*75)));
                    this.mapTiles[x][y].points = points;
                }
            }
        }

        if(this.whichMap == 3) {
            for(let y=0; y<this.grid.height; y++) {
                for(let x=0; x<this.grid.width; x++) {
                    //ctx.translate(-50,0);
                    let t = (x % 2) * -100;
                    t=0;
                    let p = (x % 2) * 50;
                    p = 0;

                    let coords = new Vector3d(x, y);
                    this.mapTiles[x][y].coords = coords;

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
            }
        }
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
    
            ctx.fillText("WHOOP", 100 + this.x + camera.x, 200 + this.y + camera.y);

            ctx.strokeStyle = "#ff0000";

            if(this.whichMap == 1) {
                for(let y=0; y<this.grid.height; y++) {
                    for(let x=0; x<this.grid.width; x++) {
                        let points = this.mapTiles[x][y].points;
                        
                        ctx.beginPath();
                        ctx.moveTo(points[0].x + camera.x, points[0].y + camera.y);
                        for(let j=1; j<6; j++) {
                            ctx.lineTo(points[j].x + camera.x, points[j].y + camera.y);
                        }
                        ctx.lineTo(points[0].x + camera.x, points[0].y + camera.y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, points[0].x + camera.x, points[0].y + camera.y + 20);
                    }
                }
            }

            if(this.whichMap == 2) {
                // draw the second grid
                for(let y=0; y<this.grid.height; y++) {
                    for(let x=0; x<this.grid.width; x++) {
                        let points = this.mapTiles[x][y].points;    //skips the first row
                        
                        ctx.beginPath();
                        ctx.moveTo(points[0].x + camera.x, points[0].y + camera.y);
                        for(let j=1; j<6; j++) {
                            ctx.lineTo(points[j].x + camera.x, points[j].y + camera.y);
                        }
                        ctx.lineTo(points[0].x + camera.x, points[0].y + camera.y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, points[0].x + camera.x, points[0].y + camera.y + 20);
                    }
                }
            }

            // draw the third grid
            if(this.whichMap == 3) {
                //ctx.translate(200,0);
                for(let y=0; y<this.grid.height; y++) {
                    for(let x=0; x<this.grid.width; x++) {
                        let points = this.mapTiles[x][y].points;
                        let pointsOrigin = this.mapTiles[x][y].pointsOrigin;
                        ctx.beginPath();
                        points[0] = pointsOrigin[0].addCamera(camera);
                        //this.mapTiles[x][y].points[0].addCamera(camera); 
                        //ctx.moveTo(points[0].x + camera.x, points[0].y + camera.y);
                        //console.log(points);
                        ctx.moveTo(points[0].x, points[0].y);
                        for(let j=1; j<4; j++) {
                            points[j] = pointsOrigin[j].addCamera(camera);
                            //ctx.lineTo(points[j].x + camera.x, points[j].y + camera.y);
                            ctx.lineTo(points[j].x, points[j].y);
                        }
                        //ctx.lineTo(points[0].x + camera.x, points[0].y + camera.y);
                        ctx.lineTo(points[0].x, points[0].y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, points[0].x + 70, points[0].y + 0);
                        ctx.fillText(this.mapTiles[x][y].text, points[0].x + 70, points[0].y - 20);
                        ctx.fillText("Level: " + this.mapTiles[x][y].level, points[0].x + 65, points[0].y + 20);
                    }
                }
            }


        // test draw a castle
        if(mapImages[0].image.complete && mapImages[1].image.complete) {
            //points[j] = pointsOrigin[j].addCamera(camera);
            let x = this.mapTiles[0][0].points[0].x;
            let y = this.mapTiles[0][0].points[0].y;
            ctx.drawImage(mapImages[0].image, x , y , 200, 155);
            x = this.mapTiles[3][2].points[0].x;
            y = this.mapTiles[3][2].points[0].y;
            ctx.drawImage(mapImages[1].image, x, y , 200, 155);
        }
        // if(mapImages[2].image.complete) {
        //     let x = mapTiles[0].coords[0].x;
        //     let y = mapTiles[0].coords[0].y;
        //     ctx.drawImage(mapImages[2].image, x + camera.x, y + camera.y , 200, 155);
        // }
        // if(mapImages[3].image.complete) {
        //     let x = mapTiles[2].coords[0].x;
        //     let y = mapTiles[2].coords[0].y;
        //     ctx.drawImage(mapImages[3].image, x + camera.x, y + camera.y , 200, 155);
        // }

        ctx.restore();

        Resource.drawAll();

        //drawHex();

        this.drawButtons();
        this.checkButtons();
        
        this.g = [];
        //for(let x=0; x<10; x++) {
            for(let y=0; y<100; y++) {
                this.g[y] = [];
                }
        //    }

        for(let y=0; y<10; y++) {
            for(let x=0; x<10; x++) {
                this.g[x][y] = x + ", " + y;
            }
        }

        //popup(this.g[5][6], 10, 80);

        

        for(let y=0; y<this.grid.height; y++) {
            for(let x=0; x<this.grid.width; x++) {
                this.mapTiles[x][y].draw();
            }
        }

        this.checkClick(mouse.x, mouse.y);
                
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

    checkClick(x, y) {
        if(clicked) {
           // this.mapTiles[x][y].hideButtons();
            for(let y=0; y<this.grid.height; y++) {
                for(let x=0; x<this.grid.width; x++) {
                    let inside = false;
                    inside = pointInside(mouse, this.mapTiles[x][y].points);
                    //popup(inside, 300, 300);
                    if(inside) {
                        marchManager.hideOuterButtons();
                        this.mapTiles[x][y].highlight();
                        this.mapTiles[x][y].showButtons();
                        console.log("clicked at " + x + ", " + y);
                        //this.checkClick(x, y);
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
}

//var mapTiles = [];

class Tile {

    constructor() {

        this.buttons = [];

        this.coords;
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

    }
}

class ResourceTile extends Tile {

    constructor(level) {
        super();

        this.level = level;
        this.amount = 0;
        this.resources = true;
    }
}

class FoodTile extends ResourceTile {

    constructor(level) {
        super(level);

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



















class Hex {

    constructor() {

        this.points = [];
    }
}







function drawHex() {

    let coords = [];
    coords.push(new Vector3d(400, 200));
    coords.push(new Vector3d(100 + (200), 50 +(50)));
    coords.push(new Vector3d(150 + (200), 100 +(50)));
    coords.push(new Vector3d(100 + (200), 150 +(50)));
    coords.push(new Vector3d(50 + (200), 150 +(50)));
    coords.push(new Vector3d(0 + (200), 100 +(50)));


    // Make point and hex objects
    const target1 = new Point(130,130);
    const target2 = new Point(mouse.x, mouse.y);
    const hex = new Hexagon(180,120,100);

    let jack;
    jack = hex.isPointInside(target2);
    color = "red";
    if(jack) {
        //console.log("jack");
        color = "white";
    }
    // Draw them
    hex.draw(ctx, color);
    target1.draw(ctx, "red");
    target2.draw(ctx, "green");

}

// Hex class (you can convert to prototype syntax if you want browser support)
class Hexagon {
    constructor(originX, originY, radius)
    {
        this.origin = new Point(originX, originY);
        this.radius = radius;
        this.makePoints();
    }

    makePoints()
    {    
        // let coords = [];
        // coords.push(new Vector3d(300, 350));
        // coords.push(new Vector3d(400, 300));
        // coords.push(new Vector3d(500, 350));
        // coords.push(new Vector3d(500, 400));
        // coords.push(new Vector3d(400, 450));
        // coords.push(new Vector3d(300, 400));
        let coords = [];
        coords.push(new Vector3d(50, 100));
        coords.push(new Vector3d(150, 50));
        coords.push(new Vector3d(250, 100));
        coords.push(new Vector3d(286, 201));
        coords.push(new Vector3d(150, 150));

        this.points = coords;
        // let vec = new Point(0, this.radius);
        // vec.rotate(360 / 2);        //(360 / 12)
        // for (var i = 0; i < this.points.length; i++) {
        //     this.points[i] = vec.clone().add(this.origin);
        //     vec.rotate(360 / 6);
        // }
    }

    draw(ctx, color)
    {
        for (var i = 0; i < this.points.length; i++) {
            ctx.moveTo(this.points[i].x, this.points[i].y);
            ctx.lineTo(this.points[(i+1)%5].x, this.points[(i+1)%5].y);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    isPointInside(point)
    {
        // Point in triangle algorithm from https://totologic.blogspot.com.au/2014/01/accurate-point-in-triangle-test.html
        function pointInTriangle(x1, y1, x2, y2, x3, y3, x, y)
        {
            const denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
            const a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denominator;
            const b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denominator;
            const c = 1 - a - b;

            return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
        }

        // A Hex is composite of 6 trianges, lets do a point in triangle test for each one.
        // Step through our triangles
        for (var i = 0; i < 4; i++) {
            // check for point inside, if so, return true for this function;
            //console.log(i);
            if(pointInTriangle( this.origin.x, this.origin.y,
                                this.points[i].x, this.points[i].y,
                                this.points[(i+1)%5].x, this.points[(i+1)%5].y,
                                point.x, point.y))
                return true;
        }
        // Point must be outside.
        return false;
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
