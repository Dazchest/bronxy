class MarchManager {

    constructor() {
        this.slots = 3;
        this.usedSlots = 0;
        this.queue = [];

    }

    addMarch(tile, selectedTroops) {
        console.log("adding a march in marchManager");
        marches.push(new March(tile, selectedTroops));
        this.usedSlots ++;
    }

    tick() {
        this.checkMarches();
        this.updateMarches();
        //this.drawMarches();
        this.displayMarchDetails();
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
            ctx.fillText(marches[x].elasped, 10, 160 + (x*25));
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
            if(marches[x] == b.march) {
                console.log("now were recalling");
                marches[x].recallMarch();
            }
        }
    }

}