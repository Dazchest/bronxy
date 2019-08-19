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




    loadGeneralImages() {
        let i = new Image();
        i.src = "images/generals/zod1.png";

        generalImages.push(i);


        //setup ## blank images
        // for(let x=0; x<11; x++) {
        //     itemListImages[x] = new Image();
        //     itemListImages[x].onload = convertImage;
        // }
        itemListImages[0] = new Image();
        itemListImages[0].onload = convertImage;
        itemListImages[0].src = "images/panels/panel_top_left.png";
        itemListImages[1] = new Image();
        itemListImages[1].onload = convertImage;
        itemListImages[1].src = "images/panels/panel_top_middle.png";
        itemListImages[2] = new Image();
        itemListImages[2].onload = convertImage;
        itemListImages[2].src = "images/panels/panel_top_right.png";
        itemListImages[3] = new Image();
        itemListImages[3].onload = convertImage;
        itemListImages[3].src = "images/panels/panel_right_middle.png";
        itemListImages[4] = new Image();
        itemListImages[4].onload = convertImage;
        itemListImages[4].src = "images/panels/panel_bottom_right.png";
        itemListImages[5] = new Image();
        itemListImages[5].onload = convertImage;
        itemListImages[5].src = "images/panels/panel_bottom_middle.png";
        itemListImages[6] = new Image();
        itemListImages[6].onload = convertImage;
        itemListImages[6].src = "images/panels/panel_bottom_left.png";
        itemListImages[7] = new Image();
        itemListImages[7].onload = convertImage;
        itemListImages[7].src = "images/panels/panel_left_middle.png";

        itemListImages[10] = new Image();
        itemListImages[10].src = "images/panels/panel_full_1.png";

        //setup ## blank images
        for(let x=0; x<3; x++) {
            itemHolderImages[x] = new Image();
            itemHolderImages[x].onload = convertImage;
        }
        itemHolderImages[0].src = "images/panels/item_holder_left.png";
        itemHolderImages[1].src = "images/panels/item_holder_right.png";
        itemHolderImages[2].src = "images/panels/item_holder_middle.png";

        mapTileImages[0] = new Image();
        mapTileImages[0].onload = convertImage;
        mapTileImages[0].src = "images/maptiles/grass1.png";
        mapTileImages[1] = new Image();
        mapTileImages[1].onload = convertImage;
        mapTileImages[1].src = "images/maptiles/water1.png";

    }

}

class Monster {

    constructor(data) {
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }

    }
}
let a, c, m;
var monsters = [];
//level 0
a = {animate: true, style: [{frameCount: 5, speed:200, images:[]}]};
c = [{"type" : 40, "level": 2, "quantity": 1}];
m = {type: 0, level:0, power: 5000, name: "Zappy", animation: a, contents: c};
monsters.push(new Monster(m));

//level 1
a = {animate: true, style: [{frameCount: 5, speed:200, images:[]}]};
c = [{"type" : 40, "level": 2, "quantity": 1}];
m = {type: 1, level:1, power: 10000, name: "Zuko", animation: a, contents: c};
monsters.push(new Monster(m));

//level 2
a = {animate: true, style: [{frameCount: 5, speed:200, images:[]}]};
c = [{"type" : 40, "level": 2, "quantity": 1}];
m = {type: 2, level:2, power: 15000, name: "Fairy", animation: a, contents: c};
monsters.push(new Monster(m));

class MonsterManager {

    constructor() {

    }

    clearLevel0() {

    }

    loadMonsterImages() {
        let animData;

        //------ level 2 monster setup
        monsters[2].animation.style = [];

        //action 0 - fly
        animData = {frameCount: 5, speed:200, images:[]}
        monsters[2].animation.style.push(animData);
        
        for(let x=0; x<monsters[2].animation.style[0].frameCount; x++) {
            monsters[2].animation.style[0].images[x] = new Image();
            monsters[2].animation.style[0].images[x].src = "images/monsters/2_" + x + ".png";
            //monsters[2].animation.style[0].images[x].onload = convertImage;
        }
        //action 1 - idle
        animData = {frameCount: 5, speed:200, images:[]}
        monsters[2].animation.style.push(animData);
        
        for(let x=0; x<monsters[2].animation.style[1].frameCount; x++) {
            monsters[2].animation.style[1].images[x] = new Image();
            monsters[2].animation.style[1].images[x].src = "images/monsters/2_IDLE_" + x + ".png";
            //monsters[2].animation.style[0].images[x].onload = convertImage;
        }
        //----------------------
    
        monsterImages[0] = new Image();
        monsterImages[0].onload = convertImage;
        monsterImages[0].src = "images/monsters/0.png";
    
        monsterImages[1] = new Image();
        monsterImages[1].src = "images/monsters/1.png";
    
        monsterImages[2] = [];
        monsterImages[2].frameCount = 5;
        for(let x=0; x<monsterImages[2].frameCount; x++) {
            monsterImages[2][x] = new Image();
            monsterImages[2][x].src = "images/monsters/2_" + x + ".png";
        }
        
    
    }
}



