class TroopManager {

    constructor() {


    }

    checkTroopTraining() {
        for(let x=0; x<buildingList.length; x++) {
            if(buildingList[x].training) {
                buildingList[x].checkTraining();
                buildingList[x].displayTrainingTimer();
                //c++;
            }
        }
    }

}