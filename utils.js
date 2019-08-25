function convertMouseXYtoGridXY() {
    let x = Math.floor(((mouse.x - camera.x)/ gridSize.x));
    let y = Math.floor(((mouse.y - camera.y)/ gridSize.y));
     x = Math.floor(((mouse.x - camera.x* zoom.x)/ (gridSize.x * zoom.x)));
     y = Math.floor(((mouse.y - camera.y * zoom.y)/ (gridSize.y * zoom.y)));
    return {"x": x, "y": y};
}

/**
 * Gets a whole random number, inclusive of start and end
 * @param {int} start 
 * @param {int} end 
 */
function getRandom(start, end) {
    return Math.floor(Math.random() * (end) + start);
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
var progress = 0;
var progcoords = {};
function progressBar() {
    //console.log("progress");
    progcoords.x = canvas.width / 2 - 25;
    progcoords.y = canvas.height / 2 - (50 + progress*5)/2;
    progcoords.w = 50;
    progcoords.h = 50 + progress*5;

    ctx.save()

    ctx.fillStyle = '#ffffff';
    
    ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - (50 + progress*5)/2, 50, 50 + progress*5);
    //ctx.arc(100,100, 100, Math.PI, Math.PI * 1.2);
    progress++;
    ctx.restore();
}

function expandIntro() {
    //ctx.save();
    
    ctx.fillRect(progcoords.x, progcoords.y, progcoords.w, progcoords.h);
    if(progcoords.x >= 0) {
        progcoords.x--;
    }
    if(progcoords.y >= 0) {
        progcoords.y--;
    }
    if(progcoords.w <= canvas.width) {
        progcoords.w++;
    }
    if(progcoords.h <= canvas.height) {
        progcoords.h++;
    }
    ctx.clip();
    //ctx.restore();
    //clearTimeout(expand);
}


  class newInput {

    // inputs = [];

    constructor(id) {
        return;
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
            return;
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

function addFoodtoBronxy() {
    var adaNameRef = firebase.database().ref('Bronxy/resources/food');
    // Modify the 'first' and 'last' properties, but leave other data at
    // adaNameRef unchanged.
    adaNameRef.update({ "amount": 85400});

}

/**
 * DISPLAY A TOAST MESSAGE ON SCREEN
 * @param {string} message 
 * @param {number} delay in seconds - default 500ms
 * @param {number} speed in seconds - default 2s
 */
function Toast(message, delay, speed) {
    delay = delay || 500;
    speed = speed || '2s';
    //console.log(arguments);
    toastdiv = document.getElementById('toast');
    toasttext = document.getElementById('toasttext');

    toasttext.innerHTML = message;
    toastdiv.style.visibility = "visible";

    toastdiv.style.transition = 'none';
    toastdiv.style.opacity = '1';
    setTimeout(function(){
        toastdiv.style.transition = speed;
        toastdiv.style.opacity = '0';
    }, delay);
    toastdiv.addEventListener("transitionend", function(){
        //console.log("tran end");
        if(toastdiv.style.transition == 'none') {
            return;
        } else {
            toastdiv.style.visibility = 'hidden';
        }
    });
}

class loader {
    constructor() {
        this.loading = false;
        this.bob;
    }

    start() {
        return;
        this.loading = true;
        this.bob = setInterval(function() {
            let toastdiv = document.getElementById('toastdiv');
            let toasttext = document.getElementById('toasttext');
            toastdiv.style.visibility = "visible";
            toasttext.innerHTML = Date.now();
            toastdiv.style.transition = 'none';
            toastdiv.style.opacity = '1';
                
            //Toast(Date.now(), 100, 1);
        }, 1000);
    }

    end() {
        return;
        clearInterval(this.bob);
        this.loading = false;
    }

}

function convertImage() {
    var buffer = document.createElement('canvas');
    var bufferctx = buffer.getContext('2d');
 
    var img = this;
    //console.log("converting image = ", img.src);
    buffer.width = img.width;
    buffer.height = img.height;;

    bufferctx.drawImage(img, 0, 0);
    
    var imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
            if(data[i] == 255 && data[i + 1] == 0 && data[i + 2] == 255) {  // find magenta
                data[i + 3] = 0; // alpha
            }
        }
    img.onload = null;          // remove the onload event so it doesnt loop
    bufferctx.putImageData(imageData, 0, 0);
    img.src = buffer.toDataURL();
}

function logout() {
    localStorage.setItem("username", "");
    location.reload();
}

function banner(text, x, y, size) {

    ctx.save();
    ctx.font = size + 'px Arial';
    let textWidth = ctx.measureText(text).width;

    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = .7;
    ctx.fillRect(x - textWidth/2, y, textWidth + 2, size + 2);
    ctx.globalAlpha = 1;
    ctx.strokeRect(x - textWidth/2, y, textWidth + 2, size + 2);

    ctx.fillStyle = '#000000';
    ctx.fillText(text, x - textWidth/2, y + size - 2, gridSize.x);

    ctx.restore();
}
// class Classes {
    
//     constructor() {

//     }
// }


var classes = {};
classes.city_text = {font_size: 20, color: '#ff0000'};
classes.resource_tile_text = {font_family: "Arial", font_size: 20, color: '#ffffff', background: '#ff0000', opacity:.7, padding: 3};
//TODO: can i load and parse a standard scss file ????

class Banner {
    
    constructor(_class) {
        this.class = _class;
    }
    static setup(data) {
        for (let x = 0; x < Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
    }
    static draw(_class, text, x, y, w, h, fitText) {
        ctx.save();
        this.setup(classes[_class])
        if(this.font_size > h - this.padding*2) {
            this.font_size = h - this.padding*2;
        }
        ctx.font = this.font_size + 'px ' + this.font_family + ' ' + 'bold';
        // 'italic bold 14px Arial'
        
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = this.background;
        ctx.lineWidth = 2;

        //ctx.translate(x - w/2, y - h/2)
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(x - w/2, y - h/2, w, h);
        ctx.globalAlpha = 1;
        ctx.strokeRect(x - w/2, y - h/2, w, h);

        //let textWidth = ctx.measureText(text).width;
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y + this.padding, w - this.padding*2);

        ctx.restore();
    }
}




//---------------------------------------------------
//console.clear();
// class test {
//     constructor() {
//         this.b = new b({"cat": "fish", "from": "list1", "action": "add"});
//     }

//     add() {
//         console.log("add called");

//     }
// }
// class b {
//     constructor(data) {
//         this.data = data;
//         this.cat = data.cat;
//         this.action = data.action;
//         this.from = data.from;
//         //this.my_possible_functions = {};
//         //this.my_possible_functions.add = this.add;
//         //this.my_possible_functions.add = data.from[this.action];
//         //data.from[this.action];
//         //console.log(this.my_possible_functions);
//         }


//     cal() {
        
//         let c = this.action;
//         console.log(c);
//         //this.my_possible_functions[c]();
//         //this.from[this.action]();
//         //c();
//     }
//     add() {
//         console.log("b cal");
//     }
// }
// function add() {
//     console.log("function add");
// }
// var list1 = new test();
// console.log(list1.b);
// var cal = list1.b.cal();
// var s = JSON.stringify(list1);
// list1.add();
// //cal();

// console.log(s);

/**
 * 
 * @param {float} value the value you want to map
 * @param {float} a start range
 * @param {float} b end range
 * @param {float} c start map
 * @param {float} d end map
 * @param return float
 */
function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}
// let startAmount = 4;
// let baseGatheringSpeed = 100000;

// let seconds = 60;
// let newval = mapRange(startAmount, 1, 14, 50000, 1000000);
// console.log(newval);

//     let f = false;
//     while(f==false) {   
//         console.log(f);        
//         f = true;
//     }
//     console.log(f);

// function bob() {
//     this.cat = "chedder";
//     this.dog = "rush";

//     function jack() {
//         return this.cat + " " + this.dog;
//     }
// }
// bob.prototype.jack2 = function() {return "hello";}

// let fido = new bob();
// console.log(fido.jack2());

// function b() {
//     console.log(this.id);
// }
// var t;

// t[0] = new Image();
// t[0].id = "hello world";
// t[0].onload = b;
// t[0].src = "images/panels/item_holder_left.png";


// let t = 1;
// let b = 0;
// for(let x=0; x<10; x++) {
//     b += 1;
//     b = b % 5;
//     console.log(b);
// }


