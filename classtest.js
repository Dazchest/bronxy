
function ClassTest() {

    this.one = "one";
    console.log(this.one);
    
    this.method = function() {
        this.two = "two";
        let three = "three";
        return this.two;
    }

}



function BuildingScreen(build) {
    this.building = build;
    this.eagle = "has landed";
}
function TroopBuildingScreen(build) {
    BuildingScreen.call(this);
    this.troop = "archer";
    this.building = build;

    this.upgrade = function() {

    }
}

var b = new BuildingScreen("camp site");
var b2 = new TroopBuildingScreen("tOWN HALL");
console.log(b.building);
console.log(b2.building);
console.log(b2.eagle);

