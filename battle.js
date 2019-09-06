class Battle {

    constructor(a, b) {
        this.a = {};
        this.b = {};

        // this.a.power = a.player1.power + a.player2.power etc

        this.a.power = 10000;
        this.b.power = 3000;

        this.a.attack = 10000;
        this.b.attack = 10600;

        this.a.defence = 10550;
        this.b.defence = 10000;

        this.a.health = 9999;
        this.b.health = 10000;

        this.a.wounded = 0;
        this.b.wounded = 0;

        this.turn = 0;
        this.maxTurns = 20;

        this.active = true;
        this.battleOver = false;

    }


    attack() {
        if(this.active) {
            while(this.battleOver == false) {
                console.log(this.a.health + " vs " + this.b.health)
                let diff;

                //a attack b
                diff = (this.a.attack * this.a.health) / (this.b.defence * this.b.health) * 10;
                this.b.health -= diff;

                //b attack a
                diff = (this.b.attack * this.b.health) / (this.a.defence * this.a.health) * 10;
                this.a.health -= diff;


                if(this.a.health <= 0 || this.b.health <= 0 || this.turn > 3000) {
                    this.battleOver = true;
                }
                this.turn++;
                console.log(this.turn);
            }

            return({a:this.a.health, b:this.b.health});
        }
    }

    
    start(a,b) {
        let winner = this.attack();
        console.log(winner);
        if(a > b) {
            console.log("winner A wines");
        }
    }



}