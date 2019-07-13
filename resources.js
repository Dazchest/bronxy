var rss,t;
class Resource {

    constructor(data) {
        console.log("this is resources constructor");
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }

        this.icon = new Image();
    }

    static drawAll() {
        for(let x=0; x<Object.keys(resources).length; x++) {
            t = Object.keys(resources)[x];
            if(t == "gold") {
                ctx.fillText(resources[t].text + ": " + resources[t].amount.toString(), 470, 30);
            } else 
            if(t == "gems") {
                ctx.fillText(resources[t].text + ": " + resources[t].amount.toString(), 470, 55);
            } else {
                if(resources[t].icon.complete) {
                ctx.drawImage(resources[t].icon, 10 + (x*80), 80-16, 32, 32);
                }
                ctx.fillText(resources[t].amount.toString(), 50 + (x*80), 80);
            }
        }
    }

    getFood() {
        return cities[currentCity].resources.food.amount;
    }
    draw() {
        ctx.fillText("Wood: " + this.amount, 100, 200);

    }
    getA() {
        return this.amount;
    }
    static getStone() {
        return cities[currentCity].resources.stone.amount;
    }
    static getIron() {
        return cities[currentCity].resources.iron.amount;
    }
    static getGold() {
        return cities[currentCity].resources.gold.amount;
    }
    static getGems() {
        return cities[currentCity].resources.gems.amount;
    }
}