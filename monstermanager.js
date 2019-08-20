class MonsterManager {

    constructor() {
        let a, c, m;
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
    }

    clearLevel0() {
    }

    loadMonsterImages() {
        let animData;
        //------ level 0/1 monster setup
        monsters[0].animation.style = [];
        //action 0 - fly
        animData = { frameCount: 1, speed: 200, images: [] };
        monsters[0].animation.style.push(animData);
        for (let x = 0; x < monsters[0].animation.style[0].frameCount; x++) {
            monsters[0].animation.style[0].images[x] = new Image();
            monsters[0].animation.style[0].images[x].src = "images/monsters/0.png";
            monsters[0].animation.style[0].images[x].onload = convertImage;
        }
        //action 1 - idle
        animData = { frameCount: 1, speed: 200, images: [] };
        monsters[0].animation.style.push(animData);
        for (let x = 0; x < monsters[0].animation.style[1].frameCount; x++) {
            monsters[0].animation.style[1].images[x] = new Image();
            monsters[0].animation.style[1].images[x].src = "images/monsters/0.png";
            monsters[0].animation.style[1].images[x].onload = convertImage;
        }
        //----------------------
        //------ level 1/2 monster setup
        monsters[1].animation.style = [];
        //action 0 - fly
        animData = { frameCount: 1, speed: 200, images: [] };
        monsters[1].animation.style.push(animData);
        for (let x = 0; x < monsters[1].animation.style[0].frameCount; x++) {
            monsters[1].animation.style[0].images[x] = new Image();
            monsters[1].animation.style[0].images[x].src = "images/monsters/1.png";
            monsters[1].animation.style[0].images[x].onload = convertImage;
        }
        //action 1 - idle
        animData = { frameCount: 1, speed: 200, images: [] };
        monsters[1].animation.style.push(animData);
        for (let x = 0; x < monsters[1].animation.style[1].frameCount; x++) {
            monsters[1].animation.style[1].images[x] = new Image();
            monsters[1].animation.style[1].images[x].src = "images/monsters/1.png";
            monsters[1].animation.style[1].images[x].onload = convertImage;
        }
        //----------------------
        //------ level 2/3 monster setup
        monsters[2].animation.style = [];
        //action 0 - fly
        animData = { frameCount: 5, speed: 200, images: [] };
        monsters[2].animation.style.push(animData);
        for (let x = 0; x < monsters[2].animation.style[0].frameCount; x++) {
            monsters[2].animation.style[0].images[x] = new Image();
            monsters[2].animation.style[0].images[x].src = "images/monsters/2_" + x + ".png";
            monsters[2].animation.style[0].images[x].onload = convertImage;
        }
        //action 1 - idle
        animData = { frameCount: 5, speed: 200, images: [] };
        monsters[2].animation.style.push(animData);
        for (let x = 0; x < monsters[2].animation.style[1].frameCount; x++) {
            monsters[2].animation.style[1].images[x] = new Image();
            monsters[2].animation.style[1].images[x].src = "images/monsters/2_IDLE_" + x + ".png";
            monsters[2].animation.style[1].images[x].onload = convertImage;
        }
        //action 2 - attack
        animData = { frameCount: 5, speed: 200, images: [] };
        monsters[2].animation.style.push(animData);
        for (let x = 0; x < monsters[2].animation.style[2].frameCount; x++) {
            monsters[2].animation.style[2].images[x] = new Image();
            monsters[2].animation.style[2].images[x].src = "images/monsters/2_FLY_ATTACK_" + x + ".png";
            monsters[2].animation.style[2].images[x].onload = convertImage;
        }
        //----------------------
    }
}
