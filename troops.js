class Troop {

   // type = {inf (load=10), arch, cav, sieg, boar, farmer (load = 200), settler {needed to build another city}}
    // level;
    // attack;
    // defence;
    // health
    // speed;
    // range;
    // power;
    // requirements = {"building": [{"type": 0, "level": 1}]}
    // resources = {"food": 100, "wood": 50, "stone": 10, "iron": 0}


    //tODO: the building requirements check only checks the first building of a particular type

    constructor(data) {
        console.log("this is the troops constructor");

        if(data) {
            for(let x=0; x<Object.keys(data).length; x++) {
                name = Object.keys(data)[x];// (data[x]).value;
                //console.log(data[name]);
                this[name] = data[name];
            }
        }

    }

    draw(level, position) {
        if(troops[this.type].levels[level].image) { // check image is available
            if(troops[this.type].levels[level].image.complete) {
                let troopimage = troops[this.type].levels[level].image;
                ctx.drawImage(troopimage, position.x + camera.x, position.y-80 + camera.y, troopimage.width / 8, troopimage.height / 8);
            }
        }
    }

    draw2(level, position) {
        if(troops[this.type].levels[level].image) { // check image is available
            if(troops[this.type].levels[level].image.complete) {
                let troopimage = troops[this.type].levels[level].image;
                ctx.drawImage(troopimage, position.x, position.y-80, troopimage.width / 8, troopimage.height / 8);
            }
        }
    }

}