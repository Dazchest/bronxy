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

function scrollCity(e) {
   // mouseDownFired = true;    //TODO: this works, but makes clicks a bit harder
    //console.log("mouse moving");
    if(e.touches) {
        var touch = e.touches[0];
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
        
        // canvas.addEventListener("touchend", function(e) {
        // touchStart.x = 99999;
        // });
    }


    //mouseDownFired = true;
    if(cities[currentCity].active) {
        scrolling = true;
        //if(camera.x + e.movementX >= 0) {
            camera.x += e.movementX;
        //}
        camera.y += e.movementY;
    }

    if(worldMapScreen.active) {
        scrolling = true;
        camera.x += e.movementX;
        camera.y += e.movementY;

    }


    if(mapScreen.active) {

        if(e.movementX > 0  && mapScreen.grid_x > -2) {
            //return;
        }

        scrolling = true;
        camera.x += e.movementX;
        camera.y += e.movementY;

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