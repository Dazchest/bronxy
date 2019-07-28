class City {

    constructor(data) {
        console.log("this is the city constructor");
        //console.log(data);
        // this.data = data;
        // let r = "res";
        // this[r] = data.resources;
        //console.log(this.resources.gold);
        //console.log(this.data.resources.wood);

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }
    }
}

function scrollCity(e) {
    //mouseDownFired = true;
    if(cities[currentCity].active) {
        scrolling = true;
        if(camera.x + e.movementX >= 0) {
            camera.x += e.movementX;
        }
        camera.y += e.movementY;
    }
    if(mapScreen.active) {
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
        mapScreen.mapOffset.y += e.movementY;
        mapScreen.mapOffset.x += e.movementX;

        if(mapScreen.mapOffset.x > 200) {
            mapScreen.grid_x -= 1;
            mapScreen.grid_y += 1;
            mapScreen.mapOffset.x = 0;
            console.log(mapScreen.grid_x);
        }
        if(mapScreen.mapOffset.x < -200) {
            mapScreen.grid_x += 1;
            mapScreen.grid_y -= 1;
            mapScreen.mapOffset.x = 0;
        }
        if(mapScreen.mapOffset.y > 100) {
            mapScreen.grid_x -= 1;
            mapScreen.grid_y -= 1;
            mapScreen.mapOffset.y = 0;
        }
        if(mapScreen.mapOffset.y < -100) {
            mapScreen.grid_x += 1;
            mapScreen.grid_y += 1;
            mapScreen.mapOffset.y = 0;
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