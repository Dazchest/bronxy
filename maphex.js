
function drawHex() {

    // Make point and hex objects
    const target1 = new Point(130,130);
    const target2 = new Point(170,170);
    const hex = new Hexagon(200,300,100);

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

    // Test them
    //console.log("Target1 inside? ", hex.isPointInside(target1));
    //console.log("Target2 inside? ", hex.isPointInside(target2));

  
    // Format required by OP:
    function pointInHexagon(hexX, hexY, R, W, S, H, pointX, pointY)
    {
        // W, S and H are redundant for this design.
        const point = new Point(pointX, pointY);
        const origin = new Point(hexX + R, hexY + Math.sqrt(3) * R );
        const radius = R;
        const hex = new Hexagon(origin.x, origin.y, radius);
        return hex.isPointInside(point);
    }
    bob = pointInHexagon(100, 100, 100, 0, 0, 0, 200, 200);

    //console.log("pointInHexagon() function test: ", pointInHexagon(100, 100, 100, 0, 0, 0, 200, 200) );
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
        this.points = new Array(6);
        let vec = new Point(0, this.radius);
        vec.rotate(360 / 2);        //(360 / 12)
        for (var i = 0; i < this.points.length; i++) {
            this.points[i] = vec.clone().add(this.origin);
            vec.rotate(360 / 6);
        }
    }

    draw(ctx, color)
    {
        for (var i = 0; i < this.points.length; i++) {
            ctx.moveTo(this.points[i].x, this.points[i].y);
            ctx.lineTo(this.points[(i+1)%6].x, this.points[(i+1)%6].y);
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
        for (var i = 0; i < 6; i++) {
            // check for point inside, if so, return true for this function;
            if(pointInTriangle( this.origin.x, this.origin.y,
                                this.points[i].x, this.points[i].y,
                                this.points[(i+1)%6].x, this.points[(i+1)%6].y,
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
