class General {

    constructor(data) {

        this.id;
        this.name = "Zod";
        this.level = 1; // 1=grey 2=green 3=blue 4=purple 5=orange 6=gold
        this.assensionLevel = 80;   // a grey can be upgraded to a gree, but level goes back to zero, but stats get better

        this.exp;
        this.power;
        this.cost;

        this.attack;
        this.defence;
        this.health
        this.range;
        this.speed;
        this.growth;

        this.load;
        this.power;

        this.politics;      // used as mayor etc
        this.leadership;    // use for battle
        this.hunting;       // used for bosses and monsters etc
        this.gathering;     //used for farmers

        this.image;

        this.talents;       // list of buffs... e.g atk+10%, gathering+5%
        this.city;          //which city the gen is currently in

        this.equipment;     // list of equipment attached to the gen

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];// (data[x]).value;
                //console.log(data[name]);
                this[name] = data[name];
            }
        }

        this.buttons = [];

        this.colours = ['', '#888888', '#33dd33', '#3333dd', '#9370DB', '#FFA500', '#dd3333']


    }

    createNew(generalLevel) {
        this.id;
        this.name = "zod";
        this.level = generalLevel; // 1=grey 2=green 3=blue 4=purple 5=orange 6=gold
        this.assensionLevel = 80;   // a grey can be upgraded to a gree, but level goes back to zero, but stats get better

        this.exp = 0;
        this.power = generalLevel * 100;
        this.cost = generalLevel * generalLevel * 3 * 100000;

        this.attack = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);
        this.defence = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);
        this.health = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);
        this.range = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);
        this.speed = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);

        this.growth = generalLevel * getRandom(generalLevel * generalLevel, generalLevel * generalLevel + 5);

        this.load = generalLevel * 20;

        this.politics = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);      // used as mayor etc
        this.leadership = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);    // use for battle
        this.hunting = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);       // used for bosses and monsters etc
        this.gathering = generalLevel * getRandom(generalLevel * .5 * 20, generalLevel * 40);     //used for farmers

        this.image;

        this.talents;       // list of buffs... e.g atk+10%, gathering+5%
        this.city;          //which city the gen is currently in

        this.equipment;     // list of equipment attached to the gen


    }


    tick() {
        //this.draw;
    }

    draw(x, y) {

        ctx.save();


        ctx.fillStyle = '#dddddd';
        ctx.fillRect(x, y, 275, 400);

        if(generalImages[0].complete) {
            ctx.drawImage(generalImages[0], x, y, 275, 400);
        }

        let nameText = ["I am General ", "no, I am General ", "Kneel before ", "Who is General ", "He is General ", "Zod Zod "];

        ctx.font = '28px Arial';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        let n = nameText[this.level-1];
        ctx.strokeText(n + this.name, x+10, y+80);
        ctx.fillStyle = this.colours[this.level];
        ctx.fillText(n + this.name, x+10, y+80);

        
    // ctx.font = '80px Sans-serif';
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 8;
    // ctx.strokeText(text, x, y);
    // ctx.fillStyle = 'white';
    // ctx.fillText(text, x, y);
        let yoff = 140;
        ctx.font = '24px Arial';
        ctx.fillStyle = this.colours[this.level];
        let counter = 0;
        ctx.fillText("Level " + this.level, x+10, y+yoff + (counter*30));
        counter+=2
        ctx.fillText("Attack " + this.attack, x+10, y+yoff + (counter*30));
        counter++
        ctx.fillText("Defence " + this.defence, x+10, y+yoff + (counter*30));
        counter++
        ctx.fillText("Health " + this.health, x+10, y+yoff + (counter*30));
        counter++
        ctx.fillText("Range " + this.range, x+10, y+yoff + (counter*30));
        counter++
        ctx.fillText("Speed " + this.speed, x+10, y+yoff + (counter*30));
        counter++
        ctx.fillText("Cost " + this.cost + " gold", x+10, y+yoff + (counter*30));
        counter++

        ctx.restore();

        //this.drawButtons();

    }

}


