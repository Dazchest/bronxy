class ScreenManager {
    
    constructor(screen) {
        this.screen = screen;
        this.screen.active = true;

        document.getElementById('buildingDiv').style.visibility = "hidden";
    }

    closeCurrentScreen() {
        this.screen.active = false;
    }

}

class ScreenView {
    
    constructor() {
        this.margin = 0;
        this.x = 0;
        this.y = 0;
        this.w = canvas.width - this.margin * 2;
        this.h = canvas.height - this.y - this.margin * 1;

        this.active = true;

        this.buttons = [];
        this.inputs = [];

        //console.log("this is ScreenView constructor");
        document.getElementById('buildingDiv').style.visibility = "hidden";
    }

    ticktock() {
        this.tick();
    }

    exitScreen(self) {
        console.log("closing the screen");

        // only reset the camera if exiing the map screen
        if(screenManager.screen == mapScreen) {   // TODO: need a better way to keepe track of previous screens
            camera.x = -200;
            camera.y = -200;
        }
        if(screenManager.screen == marchScreen || screenManager.screen == worldMapScreen) {   // TODO: need a better way to keepe track of previous screens
            mapScreen.active = true;
            screenManager.screen == mapScreen;
            mapScreen.setup();
            screenManager = new ScreenManager(mapScreen);

        } else {
            cities[currentCity].active = true;
            screenManager = new ScreenManager(cityScreen);

        }

        self.active = false;
        //screenManager.screen =    
        //cityScreen = new CityScreen();
        if(self.troopBuilding) {
            //console.log("exiting - from a troop building");
            self.troopBuilding.trainingScreen = null;
        }
        if(self.inputs) {
            for(let x=0; x<self.inputs.length; x++) {
                document.getElementById('maindiv').removeChild(self.inputs[x]);
            }
        }
        if(self.listBox) {
            console.log("closing listbox");
            self.listBox.close();
        }
    }

    drawButtons() {
        //console.log(this.buttons.length);
        for(let x=0; x<this.buttons.length; x++) {
             this.buttons[x].draw();
         }
    }

    checkButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            let b = this.buttons[x];
            if(clicked) {   //mouse is clicked, check if it was on a button
                if(b.style != "circle") {
                    console.log("cliecked in checkbuttons");
                    if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                        if(b.action && b.active) {
                            clicked = false;
                            console.log(b.text + " pressed");
                            let callback = b.action;
                            callback(this, b);
                        }
                    }
                } else
                if(b.style == "circle") {
                    let dx = mouse.x - b.x;
                    let dy = mouse.y - b.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    console.log("circle dist = ", dist);
                    if(dist < b.h) {
                        if(b.action && b.active) {
                            clicked = false;
                            console.log(b.text + " pressed");
                            let callback = b.action;
                            callback(this, b);
                        }
                    }
                }
            }
        }
    }



    bing() {
        //console.log("pressed the bong");
    }
}