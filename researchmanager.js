class ResearchManager {

    constructor() {
        this.slots = 1;
        this.usedSlots = 0;
        this.queueAmount = 3;
        this.queue = [];

        this.showingResearch = false;
        this.upgrading = false;
    }

    // in here, we can collect ALL the research done for, e.g. Food production, and apply it as 1 whole buff
    // rather than having to cycle through when we need to use the buff



    initResearch() {
        for(let x=0; x<researchTree.length; x++) {
            let r = new Research(researchTree[x]);
            researchList.push(r);
        }
    }


    checkResearchUpgrades() {
        let c = 0;
        for(let x=0; x<researchList.length; x++) {
            if(researchList[x].upgrading) {
                researchList[x].checkUpgrading();
                researchList[x].displayUpgradeTimer(c);
                c++;
            }
        }
    
        // // do this routine every second
        // if(Date.now() - tick > 1000) {
        //     tick = Date.now();
        //     for(let x=0; x<researchList.length; x++) {
        //         researchList[x].checkProduction();
        //     }
        // }

    }


    
}