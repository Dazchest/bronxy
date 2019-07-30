function convertMouseXYtoGridXY() {
    let x = Math.floor(((mouse.x - camera.x)/ gridSize.x));
    let y = Math.floor(((mouse.y - camera.y)/ gridSize.y));
     x = Math.floor(((mouse.x - camera.x* zoom.x)/ (gridSize.x * zoom.x)));
     y = Math.floor(((mouse.y - camera.y * zoom.y)/ (gridSize.y * zoom.y)));
    return {"x": x, "y": y};
}

function getRandom(value) {

}


function setButtonActive(buttons, type) {
    for(let x=0; x< buttons.length; x++) {
        if(buttons[x].type == type) {
            buttons[x].active = true;
        }
    }
}
/**
 * ALLOWS YOU TO SET THE STATE OF A BUTTON, AS TRUE OR FALSE
 * @param {object} buttons 
 * @param {string} name 
 * @param {boolean} state 
 */
function setButtonState(buttons, name, state) {
    if(Array.isArray(buttons)) {    // we have a list/array of buttons to check through
        for(let x=0; x< buttons.length; x++) {
            if(buttons[x].name == name) {
                buttons[x].active = state;
            }
        }
    } else {    // just 1 button to change
        //buttons[typeCheck].active = state;
    }
}

function getInput(e) {
    console.log(e.keyCode);
}
function checkInput() {
    //console.log("key = " + e.keyCode);
    if(document.getElementById('quantityInput').value < 0) {
        document.getElementById('quantityInput').value = 1;
    }
}


function zoomScreen(inout) {
    if(inout == "in") {
        var zoomlevel = .01
    } else {
        var zoomlevel = -.01
    }

    zoom.x += zoomlevel;
    zoom.y += zoomlevel;
}




// var polyVerts = [];
// polyVerts.push(Vec2(50, 100));
// polyVerts.push(Vec2(150, 50));
// polyVerts.push(Vec2(250, 100));
// polyVerts.push(Vec2(150, 150));
// var grid = [];
// grid.push(polyVerts);

//----------------- detect which tile we are clicking/pessing on
function Vec2(x, y) {
    return {"x": x, "y": y};
    //return [x, y]
  }
  Vec2.nsub = function (v1, v2) {
      //popup("nsub", 200, 400);
    return Vec2(v1.x - v2.x, v1.y - v2.y);
    //return Vec2(v1[0]-v2[0], v1[1]-v2[1])
  }
  // aka the "scalar cross product"
  Vec2.perpdot = function (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
    //return v1[0]*v2[1] - v1[1]*v2[0]
  }
  


  // Determine if a point is inside a polygon.
  //
  // point     - A Vec2 (2-element Array).
  // polyVerts - Array of Vec2's (2-element Arrays). The vertices that make
  //             up the polygon, in clockwise order around the polygon.
  //
  function pointInside(point, coords) {
    let i, len, v1, v2, edge, x;
    let polyVerts = [...coords];
    // add the camera position to the 
    for (i = 0, len = polyVerts.length; i < len; i++) {
        // polyVerts[i].x += camera.x;
        // polyVerts[i].y += camera.y;
    }
        l = [];
    for (i = 0, len = polyVerts.length; i < len; i++) {
      v1 = Vec2.nsub(polyVerts[i], point)
      v2 = Vec2.nsub(polyVerts[i+1 > len-1 ? 0 : i+1], point)
      edge = Vec2.nsub(v1, v2)
        
      // Note that we could also do this by using the normal + dot product
      x = Vec2.perpdot(edge, v1)
      // If the point lies directly on an edge then count it as in the polygon
      if (x < 0) {
          return false; //polyVerts.length;
        }
        l.push(edge);
    }
    return true;
  }
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  



  class newInput {

    // inputs = [];

    constructor(id) {
        this.i = document.createElement('input');
        this.i.id = 'input';
        this.i.style.position = 'absolute';
        this.i.style.left = ((268) * zoom.x) + 'px';
        this.i.style.top =  (365 * zoom.y) + 'px';
        this.i.style.width = '48px';
        //this.i.type = 'hidden';
        this.i.style.opacity = .5;
       
        //i.type = 'number';  
        // i.min = 1;
        // i.value = 1;
        //this.i.addEventListener('keydown', getInput);
        //this.i.addEventListener('change', this.updateInput); 

        // console.log(i);
        // this.inputs.push(i);
        document.getElementById('maindiv').appendChild(this.i);
        //document.getElementById('input').focus();
        this.i.focus();
    }

        draw() {
            let text = this.i.value;
            ctx.fillStyle = '#000000';
            ctx.fillText(text, 400, 200);
        }

  }

  function getInput() {
      //alert("f");
      ctx.fillStyle = '#000000';
      ctx.fillText("wahsfsefwefwefweefooo", 400, 200);
      ctx.font = "20px Georgia";
      ctx.fillStyle = '#ffffff';
      ctx.fillText("fps: " + fps, 400, 300);
  
}