class Assets {

    constructor() {
        this.foodIcon = new Image();
        this.foodIcon.src = "images/icons/food.png";
    }

    loadIcons() {
        //return;
        for(let x=0; x<Object.keys(resources).length; x++) {
            name = Object.keys(resources)[x];
            //console.log(name);
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
        troops[0].levels[0].image = new Image;
        troops[0].levels[0].image.src = "images/troops/1/1_IDLE_000.png";
        troops[0].levels[1].image = new Image;
        troops[0].levels[1].image.src = "images/troops/2/1_IDLE_000.png";

        troops[1].levels[0].image = new Image;
        troops[1].levels[0].image.src = "images/troops/3/1_IDLE_000.png";
        troops[1].levels[1].image = new Image;
        troops[1].levels[1].image.src = "images/troops/3/5_ATTACK_007.png";

        troops[2].levels[0].image = new Image;
        troops[2].levels[0].image.src = "images/troops/cav/6.png";
        troops[2].levels[1].image = new Image;
        troops[2].levels[1].image.src = "images/troops/cav/4.png";

        troops[3].levels[0].image = new Image;
        troops[3].levels[0].image.src = "images/troops/siege/12.png";
        troops[3].levels[1].image = new Image;
        troops[3].levels[1].image.src = "images/troops/siege/10.png";

        troops[5].levels[0].image = new Image;
        troops[5].levels[0].image.src = "images/troops/settler/1_IDLE_000.png";
        troops[5].levels[1].image = new Image;
        troops[5].levels[1].image.src = "images/troops/settler/2_IDLE_000.png";

    }

    static loadMapImages() {
        mapImages[0] = {};
        mapImages[0].image  = new Image();
        mapImages[0].image.src = "images/buildings/castle_1.png"
        mapImages[1] = {};
        mapImages[1].image  = new Image();
        mapImages[1].image.src = "images/buildings/castle_3.png"
        mapImages[2] = {};
        mapImages[2].image  = new Image();
        mapImages[2].image.src = "images/buildings/hex_castle_1.png"
        mapImages[3] = {};
        mapImages[3].image  = new Image();
        mapImages[3].image.src = "images/map.png"

    }

    loadMonsterImages() {
        //monsterImages[0] = {};
        monsterImages[0] = new Image();
        monsterImages[0].src = "images/monsters/0.png";
        monsterImages[1] = new Image();
        monsterImages[1].src = "images/monsters/1.png";
        //monsterImages[0].onload = convertimage(monsterImages[0]);

    }

    loadGeneralImages() {
        let i = new Image();
        i.src = "images/generals/zod1.png";

        generalImages.push(i);


        itemListImages[0] = new Image();
        itemListImages[0].src = "images/panels/panel_top_left.png";
        itemListImages[1] = new Image();
        itemListImages[1].src = "images/panels/panel_top_middle.png";
        itemListImages[2] = new Image();
        itemListImages[2].src = "images/panels/panel_top_right.png";
        itemListImages[3] = new Image();
        itemListImages[3].src = "images/panels/panel_right_middle.png";
        itemListImages[4] = new Image();
        itemListImages[4].src = "images/panels/panel_bottom_right.png";
        itemListImages[5] = new Image();
        itemListImages[5].src = "images/panels/panel_bottom_middle.png";
        itemListImages[6] = new Image();
        itemListImages[6].src = "images/panels/panel_bottom_left.png";
        itemListImages[7] = new Image();
        itemListImages[7].src = "images/panels/panel_left_middle.png";

        itemListImages[10] = new Image();
        itemListImages[10].src = "images/panels/panel_full_1.png";

    }

}


