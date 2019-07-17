class ScreenManager {
    
    constructor(screen) {
        this.screen = screen;
        this.screen.active = true;
    }

    closeCurrentScreen() {
        this.screen.active = false;
    }

}

class ScreenView {
    
    constructor() {
        this.margin = 10;
        this.x = 10;
        this.y = 100;
        this.w = canvas.width - this.margin * 2;
        this.h = canvas.height - this.y - this.margin * 1;

        this.active = true;

        this.buttons = [];
        this.inputs = [];

        console.log("this is ScreenView constructor");

    }

    ticktock() {
        this.tick();
    }

    exitScreen = function(self) {
        console.log("closing the screen");

        // only reset the camera if exiing the map screen
        if(screenManager.screen == mapScreen) {
            camera.x = 0;
            camera.y = 0;
        }

        self.active = false;
        cities[currentCity].active = true;
        //screenManager.screen =    
        //cityScreen = new CityScreen();
        if(self.troopBuilding) {
            console.log("exiting - from a troop building");
            self.troopBuilding.trainingScreen = null;
        }

        for(let x=0; x<self.inputs.length; x++) {
            document.getElementById('maindiv').removeChild(self.inputs[x]);
        }
        screenManager = new ScreenManager(cityScreen);
        }

    drawButtons() {
        //console.log(this.buttons.length);
        for(let x=0; x<this.buttons.length; x++) {
             this.buttons[x].draw();
         }
    }

    checkButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                
                let b = this.buttons[x];
                if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
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



    bing() {
        console.log("pressed the bong");
    }
}