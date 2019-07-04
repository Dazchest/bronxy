class Screenn {

    constructor() {
        this.x = 10;
        this.y = 20;
    }
}

class TV extends Screenn {

    constructor(bob) {
        super();

        console.log(bob);
    }
}
class dvd extends Screenn {

    constructor(bob) {
        super();

        console.log(bob);
    }
}

bob = new TV("fishcake");
bob = new dvd("ggggg");


class i {

    constructor() {
        this.x = 10;
    }

}

class b {
    constructor(x) {
        this.x = iii.x;
    }
}
iii = new i();
but = new b(iii.x);

console.log(iii.x);
console.log(but.x);
iii.x = 40;
console.log(but.x);

