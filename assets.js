class Assets {

    constructor() {
        this.foodIcon = new Image();
        this.foodIcon.src = "images/icons/food.png";
    }

    loadIcons() {
        //return;
        for(let x=0; x<Object.keys(resources).length; x++) {
            name = Object.keys(resources)[x];
            console.log(name);
            //resources[name].images = new Image();
            let imageSrc = "images/icons/" + name + ".png";
            resources[name].icon.src = imageSrc;
        }

        buttonImages[0] = {};
        buttonImages[0].icon  = new Image();
        buttonImages[0].icon.src = "images/icons/button_arrow_left_hover.png"
        buttonImages[1] = {};
        buttonImages[1].icon  = new Image();
        buttonImages[1].icon.src = "images/icons/button_arrow_right_hover.png"
    }

    loadTroopImages() {
        //console.log(troops[0].levels[0]);
        troops[0].levels[0].image = new Image;
        troops[0].levels[0].image.src = "images/troops/1/1_IDLE_000.png";
        troops[0].levels[1].image = new Image;
        troops[0].levels[1].image.src = "images/troops/2/1_IDLE_000.png";
        troops[1].levels[0].image = new Image;
        troops[1].levels[0].image.src = "images/troops/3/1_IDLE_000.png";


        // for(let x=0; x<Object.keys(troops).length; x++) {
        //     name = Object.keys(troopList)[x];
        //     let imageSrc = "images/icons/" + name + ".png";
        //     resources[name].icon.src = imageSrc;
        // }
    }

}