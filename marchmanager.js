class MarchManager {

    constructor() {
        this.slots = 5;
        this.usedSlots = 0;
        this.queue = [];

        this.marchSize = 100;

    }

    tick() {
        this.checkMarches();
        this.updateMarches();
        //this.drawMarches();
        this.displayMarchDetails();
    }

    addMarch(tile, selectedTroops) {
        //addMarch(marchData) {
            console.log("adding a NEW march in marchManager");
            let marchData = {"tile": tile, "troops": selectedTroops};
            //marchData = JSON.parse(JSON.stringify(marchData));
            marches.push(new NewMarch(marchData));
            //marches.push(new March(marchData));
            this.usedSlots ++;
            saveGame2();
        }
    addMarch2(data) {
        //addMarch(marchData) {
            console.log("adding a NEW march in marchManager");
            //let marchData = {"tile": tile, "troops": selectedTroops};
            //marchData = JSON.parse(JSON.stringify(marchData));
            marches.push(new NewMarch(data));
            //marches.push(new March(marchData));
            this.usedSlots ++;
            saveGame2();
        }
            
    deleteMarch(march) {
        for(let x=marches.length-1; x>=0; x--) {
            if(marches[x] == march) {
                marches.splice(x, 1);
            }
        }

    }


    updateMarches() {
        for(let x=0; x<marches.length; x++) {
            marches[x].tick();
        }
    }

    // drawMarches() {
    //     if(mapScreen.active) {
    //         for(let x=0; x<marches.length; x++) {
    //             marches[x].draw();
    //         }
    //     }
    // }

    checkMarches() {

    }

    displayMarchDetails() {
        for(let x=0; x<marches.length; x++) {
            ctx.fillStyle = '#000000'
            ctx.fillText(marches[x].elasped, 10, 450 + (x*25));
        }
    }

    hideOuterButtons() {
        for(let y=0; y<mapScreen.grid.height; y++) {
            for(let x=0; x<mapScreen.grid.width; x++) {
                mapScreen.mapTiles[x][y].hideButtons();
            }
        }
    }

    recallMarch(self, b) {
        console.log("recalllll");
        console.log(self);
        console.log(b);

        for(let x=0; x<marches.length; x++) {
            if(marches[x].endCoords.x == self.coords.x && marches[x].endCoords.y == self.coords.y ) {
                console.log("now were recalling");
                marches[x].recallMarch(marches[x]);
            }
        }
    }

}