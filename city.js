class City {

    constructor(data) {
        console.log("this is the city constructor");

        // for(let x=0; x<Object.keys(data).length; x++) {
        //     name = Object.keys(data)[x];// (data[x]).value;
        //     //console.log(data[name]);
        //     this[name] = data[name];
        // }
    }
}

var scrollMovement = {x:0, y:0};

function scrollCity(e) {
    //mouseDownFired = true;    //TODO: this works, but makes clicks a bit harder
    listScroll = true;
    scrolling = false;
    chatPen.touch = false;
    //console.log("mouse moving");
    if(e.touches) {
        //ctx.fillText("chatpen:" + chatPen.x + ", " + chatPen.y, 150, 100);
        console.log("touch");
        var touch = e.touches[0];
        //console.log(touch);
        if(touchStart.x == 99999) {
            touchStart.x = touch.clientX;   // reset current touch position
            touchStart.y = touch.clientY;
        }
        distX = touch.clientX - touchStart.x;
        distY = touch.clientY - touchStart.y;

        // camera.x += distX;
        // camera.y += distY;
        // mapScreen.mapOffset.y += distX;
        // mapScreen.mapOffset.x += distX;
        e.movementX = distX;
        e.movementY = distY;

        touchStart.x = touch.clientX;   // reset current touch position
        touchStart.y = touch.clientY;
        e.preventDefault()
        
        chatPen.touch = true;
        chatPen.x = touch.clientX;
        chatPen.y = touch.clientY;
        chatPen.distX = distX;
        chatPen.distY = distY;

        chatPen.x = Math.floor(touch.clientX / screenZoom.x);
        chatPen.y = Math.floor(touch.clientY / screenZoom.y);

        // canvas.addEventListener("touchend", function(e) {
        // touchStart.x = 99999;
        // });
    }
    //TODO: does this need to be here???
    chatPen.active = false;
    if(itemScreen.active || researchScreen.active || buildingScreen.active || equipmentScreen.active) {
        camera.x += e.movementX;
        camera.y += e.movementY;
    };


    if(chatScreen.active) {
        if(chatPen.touch) {
            // console.log("chatpen: xy" + chatPen.x + ", " + chatPen.y);
            // console.log("chatpen: dist" + chatPen.distX + ", " + chatPen.distY);
            chatPen.active = false;
            if(chatPen.x > 400 && chatPen.x < 550 && chatPen.y > 400 && chatPen.y < 550) {
                chatPen.x += chatPen.distX;
                chatPen.y += chatPen.distY;
                // chatPen.x = touch.clientX;
                // chatPen.y = touch.clientY;
                chatPen.active = true;
            } else {
                camera.x += e.movementX;
                camera.y += e.movementY;
            }
            return;
        }
    

        chatPen.x = mouse.x;
        chatPen.y = mouse.y;
    
        chatPen.active = false;
        if(mouse.x > 400 && mouse.x < 550 && mouse.y > 400 && mouse.y < 550) {
            chatPen.x = mouse.x;
            chatPen.y = mouse.y;
            chatPen.active = true;
        } else {
            //camera.x += e.movementX;
            chatPen.active = false;
            camera.y += e.movementY;
        }
        return;
    }

    //mouseDownFired = true;
    if(cities[currentCity].active) {
        //if(camera.x + e.movementX >= 0) {
        camera.x += e.movementX;
        //}
        camera.y += e.movementY;

        scrollMovement.x = e.movementX;
        scrollMovement.y = e.movementY;
    }

    if(worldMapScreen.active) {
        //scrolling = true;
        camera.x += e.movementX;
        camera.y += e.movementY;

    }


    if(mapScreen.active) {

        if(e.movementX > 0  && mapScreen.grid_x > -2) {
            //return;
        }

        //scrolling = true;
        camera.x += e.movementX;
        camera.y += e.movementY;

        scrollMovement.x = e.movementX;
        scrollMovement.y = e.movementY;

        // if(e.movementX > 0 && mapScreen.grid_x == 0 && mapScreen.mapOffset.x >= 0) {   // stop movement to the left
        //     mapScreen.mapOffset.x = 0;
        // } else {
        //     mapScreen.mapOffset.x += e.movementX;
        // }

        // if(e.movementX > 0 && mapScreen.grid_Y > 0) {   // stop movement to the left
        //     mapScreen.mapOffset.x += e.movementX;
        // }
        mapScreen.mapOffset.x += e.movementX;
        mapScreen.mapOffset.y += e.movementY;

        if(mapScreen.mapOffset.x > mapScreen.tileDimensions.width) {
            mapScreen.grid_x -= 1;
            mapScreen.grid_y += 1;
            let r = mapScreen.mapOffset.x - mapScreen.tileDimensions.width;    // get the remainder left after 200
            mapScreen.mapOffset.x = r;
        }
        if(mapScreen.mapOffset.x < -mapScreen.tileDimensions.width) {
            mapScreen.grid_x += 1;
            mapScreen.grid_y -= 1;
            let r = mapScreen.mapOffset.x + mapScreen.tileDimensions.width;
            mapScreen.mapOffset.x = r;
        }
        if(mapScreen.mapOffset.y > mapScreen.tileDimensions.height) {
            mapScreen.grid_x -= 1;
            mapScreen.grid_y -= 1;
            let r = mapScreen.mapOffset.y - mapScreen.tileDimensions.height
            mapScreen.mapOffset.y = r;
        }
        if(mapScreen.mapOffset.y < -mapScreen.tileDimensions.height) {
            mapScreen.grid_x += 1;
            mapScreen.grid_y += 1;
            let r = mapScreen.mapOffset.y + mapScreen.tileDimensions.height
            mapScreen.mapOffset.y = r;
        }

        // mapScreen.grid_x = Math.floor(camera.x / 200);
        // mapScreen.grid_y = Math.floor(camera.y / 100);
        // if(mapScreen.grid_x < 0) {
        //     mapScreen.grid_x = 0;
        //     mapScreen.mapOffset.x = 0;
        // };
        // if(mapScreen.grid_y < 0) {
        //     mapScreen.grid_y = 0;
        //     mapScreen.mapOffset.y = 0;
        // };
        // if(mapScreen.grid_x > 15) {
        //     mapScreen.grid_x = 15
        //     mapScreen.mapOffset.x = 0;
        // };
        // if(mapScreen.grid_y > 19) {
        //     mapScreen.grid_y = 19
        //     mapScreen.mapOffset.y = 0;
        // };
        


        // if (camera.x>200){  // map moved to the right one tile
        //     mapScreen.gridOffset.x = mapScreen.gridOffset.x-1;
        //     mapScreen.gridOffset.y = mapScreen.gridOffset.y+1;
        //     camera.x = 0;
        // }
        // if (camera.x<-200){  // map moved to the left
        //     mapScreen.gridOffset.x = mapScreen.gridOffset.x+1;
        //     mapScreen.gridOffset.y = mapScreen.gridOffset.y-1;
        //     camera.x = 0;
        // }
        // if (camera.y>100){  // map moved to the left
        //     mapScreen.gridOffset.x = mapScreen.gridOffset.x-1;
        //     mapScreen.gridOffset.y = mapScreen.gridOffset.y-1;
        //     camera.y = 0;
        // }
        // if (camera.y<-100){  // map moved to the left
        //     mapScreen.gridOffset.x = mapScreen.gridOffset.x+1;
        //     mapScreen.gridOffset.y = mapScreen.gridOffset.y+1;
        //     camera.y = 0;
        // }

    }

}
linearTween = function (t, b, c, d) {
	return c*t/d + b;
};
function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
easeOutQuad = function (t, b, c, d) {
	t /= d;
	return -c * t*(t-2) + b;
};
function continueScroll() {
    return;
    //console.log("scrollmovement = " + scrollMovement.x + ", " + scrollMovement.y);
    if(scrolling) {
        let duration = 2;
        if(scrollMovement.y != 0) {
            let l;
            let t = scrollMovement.t;
            let start = scrollMovement.start.y;
            let endY = scrollMovement.endY
            let change = endY - start;
            
            scrollMovement.diry = "up";
            //camera.y += scrollMovement.y;
            camera.y = easeOutQuad(t, start, change, duration);


        }
        if(scrollMovement.x != 0) {
            let l;
            let t = scrollMovement.t;
            let start = scrollMovement.start.x;
            let endX = scrollMovement.endX
            let change = endX - start;
                        
            scrollMovement.dirx = "up";
            //camera.y += scrollMovement.y;
            camera.x = easeOutQuad(t, start, change, duration);
        }

        scrollMovement.t += .1;
        if(scrollMovement.t >= duration) {
            scrolling = false;
        }
        }



}