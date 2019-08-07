class ResearchScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Research";
        this.currentTree = "City";

        console.log("this is Research Screen constructor");
        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));


        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }


    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffbbdd";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.displayResearch();
            this.drawButtons();
            this.checkButtons();
            Resource.drawAll(); // draw resources at the top of the screen
            this.checkDisplayResearch();

            // for(let x=0; x<researchList.length; x++) {
            //     researchList[x].checkResearchButtons();
            // }
            this.checkResearchButtons();

           
        }
    }

    displayResearch() {
        for(let x=0; x<researchList.length; x++) {
            researchList[x].draw();
        }
    }
    checkDisplayResearch() {
        for(let x=0; x<researchList.length; x++) {
            researchList[x].displayResearch();
        }
    }

    checkResearchButtons() {
        for(let x=0; x<researchList.length; x++) {
            if(researchManager.showingResearch == false) {  //not showing reseach, so can pick another
                if(clicked) {   //mouse is clicked, check if it was on a research button
                    let b = researchList[x].button;
                    if(mouse.x > b.x*zoom.x && mouse.x < b.x*zoom.x + b.w*zoom.x && mouse.y > b.y*zoom.y && mouse.y < b.y*zoom.y + b.h*zoom.y) {
                        if(b.action && b.active) {
                            clicked = false;
                            console.log(b.text + " pressed");
                            let callback = b.action;
                            callback(researchList[x], b);
                        }
                    }
                }
            }
        }
    }


}