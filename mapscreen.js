class MapScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor(whichMap) {

        super();

        this.grid = {"width": 50, "height": 50};
        this.whichMap = whichMap;

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

                    let coords = [];
                    coords.push(new Vector3d(t + 50 + (x*100), p + 50 +(y*100)));
                    coords.push(new Vector3d(t + 100 + (x*100), p + 50 +(y*100)));
                    coords.push(new Vector3d(t + 150 + (x*100), p + 100 +(y*100)));
                    coords.push(new Vector3d(t + 100 + (x*100), p + 150 +(y*100)));
                    coords.push(new Vector3d(t + 50 + (x*100), p + 150 +(y*100)));
                    coords.push(new Vector3d(t + 0 + (x*100), p + 100 +(y*100)));
                    this.mapTiles[x][y].coords = coords;
                }
            }
        }   


        if(this.whichMap == 2) {
            for(let y=0; y<this.grid.height; y++) {
                for(let x=0; x<this.grid.width; x++) {
                    //ctx.translate(-50,0);
                    let t = (y % 2) * 75;

                    let coords = [];
                    coords.push(new Vector3d(t + 75 + (x*150), 50 +(y*75)));
                    coords.push(new Vector3d(t + 150 + (x*150), 75 +(y*75)));
                    coords.push(new Vector3d(t + 150 + (x*150), 125 +(y*75)));
                    coords.push(new Vector3d(t + 75 + (x*150), 150 +(y*75)));
                    coords.push(new Vector3d(t + 0 + (x*150), 125 +(y*75)));
                    coords.push(new Vector3d(t + 0 + (x*150), 75 +(y*75)));
                    this.mapTiles[x][y].coords = coords;
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

                    let coords = [];
                    coords.push(new Vector3d(t + 50 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
                    coords.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 50 +(y*50) + (x*50)));
                    coords.push(new Vector3d(t + 250 + (x*100) - (y*100), p + 100 +(y*50) + (x*50)));
                    coords.push(new Vector3d(t + 150 + (x*100) - (y*100), p + 150 +(y*50) + (x*50)));
                    this.mapTiles[x][y].coords = coords;
                }
            }
        }
    }

    tick() {
        draw();
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
                        let coords = this.mapTiles[x][y].coords;
                        ctx.beginPath();
                        ctx.moveTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        for(let j=1; j<6; j++) {
                            ctx.lineTo(coords[j].x + camera.x, coords[j].y + camera.y);
                        }
                        ctx.lineTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, coords[0].x + camera.x, coords[0].y + camera.y + 20);
                    }
                }
            }

            if(this.whichMap == 2) {
                // draw the second grid
                for(let y=0; y<this.grid.height; y++) {
                    for(let x=0; x<this.grid.width; x++) {
                        let coords = this.mapTiles[x][y].coords;    //skips the first row
                        
                        ctx.beginPath();
                        ctx.moveTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        for(let j=1; j<6; j++) {
                            ctx.lineTo(coords[j].x + camera.x, coords[j].y + camera.y);
                        }
                        ctx.lineTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, coords[0].x + camera.x, coords[0].y + camera.y + 20);
                    }
                }
            }

            // draw the third grid
            if(this.whichMap == 3) {
                //ctx.translate(200,0);
                for(let y=0; y<this.grid.height; y++) {
                    for(let x=0; x<this.grid.width; x++) {
                        let coords = this.mapTiles[x][y].coords;
                        ctx.beginPath();
                        ctx.moveTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        for(let j=1; j<4; j++) {
                            ctx.lineTo(coords[j].x + camera.x, coords[j].y + camera.y);
                        }
                        ctx.lineTo(coords[0].x + camera.x, coords[0].y + camera.y);
                        ctx.stroke();
                        ctx.fillStyle = '#44dd44';
                        ctx.fill();
                        ctx.fillStyle = '#ffffff';
                        ctx.fillText(x + ", " + y, coords[0].x + camera.x + 70, coords[0].y + camera.y + 0);
                    }
                }
            }


        // test draw a castle
        if(mapImages[0].image.complete && mapImages[1].image.complete) {
            let x = this.mapTiles[0][0].coords[0].x;
            let y = this.mapTiles[0][0].coords[0].y;
            ctx.drawImage(mapImages[0].image, x + camera.x, y + camera.y , 200, 155);
            x = this.mapTiles[3][2].coords[0].x;
            y = this.mapTiles[3][2].coords[0].y;
            ctx.drawImage(mapImages[1].image, x + camera.x, y + camera.y , 200, 155);
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

        popup(this.g[5][6], 10, 80);


        let inside = coordsAreInside(mouse, this.mapTiles[0][0].coords)
        //let inside = checkPoly(mouse);
       // popup(inside.x + ", " + inside.y, 300,300);
        popup(inside[0], 300,300);
        if(inside) {
            console.log(inside);
            
        }


        }   // end if active
    }


}
class Vector3d {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

//var mapTiles = [];

class Tile {

    constructor() {

        this.coords;
        this.monster = false;
        this.boss = false;
        this.city = false;
        this.food = false;
        this.wood = false;
        this.stone = false;
        this.iron = false;

        this.water = false;
        this.mountain = false;
        this.buildon = true;    // can we build on this site

    }
}

class Hex {

    constructor() {

        this.points = [];
    }
}





















// for(let y=0; y<this.grid.height; y++) {
//     for(let x=0; x<this.grid.width; x++) {
//         let t = (y % 2) * 100;

//         let coords = [];
//         coords.pustor3d(t + 50 + (x*200), 50 +(y*50)));
//         coords.pustor3d(t + 100 + (x*200), 50 +(y*50)));
//         coords.pustor3d(t + 150 + (x*200), 100 +(y*50)));
//         coords.pustor3d(t + 100 + (x*200), 150 +(y*50)));
//         coords.pustor3d(t + 50 + (x*200), 150 +(y*50)));
//         coords.pustor3d(t + 0 + (x*200), 100 +(y*50)));
        
//     }
// }



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
