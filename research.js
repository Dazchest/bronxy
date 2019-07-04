class Research {
    //each research node has its own button... lets see if we can get this working
    constructor() {
        this.button = new Button({"active": true, "drawButton": true, "x": 50, "y": 300 + (x * 35), "w": 100, "h": 30, "text": "r1", "screen": this, "action":  this.showResearch});
 
    }


    showResearch() {
        console.log(this);
    }


}