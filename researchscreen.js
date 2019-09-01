class ResearchScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();
        
        this.buttons = [];
        this.name = "Research";
        this.currentTree = "City";

        console.log("this is Research Screen constructor"); 
        this.buttons.push(new Button({"active": true, "style": "circle", "radius": 50, "x": 550, "y": 100, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));

        this.listBox = new ListBox(100, 150, 400, 400, true, false);

        
        cities[currentCity].active = false;
        cityScreen.active = false;
        buildingHandler.highlightGrid = false;
    }


    tick() {
        draw();
    }

    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffbbdd";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, 20, 130);
    
            this.displayResearchList();
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

    displayResearchList() {
        //console.log("f");
        this.listBox.draw(researchList);

        // for(let x=0; x<researchList.length; x++) {
        //    // researchList[x].draw();
        // }
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