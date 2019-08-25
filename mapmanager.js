//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
class MapManager {
    constructor() {
    }
    getDatabaseTile(x, y) {
        let id = Number(x + (y * mapScreen.grid.width));
        let ref = firebase.database().ref("map" + "/" + id.toString());
        ref.once('value', function (data) {
            data.forEach(function (info) {
                console.log(info.val());
                // md = info.val();
                // md.buttons = [];
                // mapManager.processTile(md);
            });
        });
    }
    returnBlankTile(x, y) {
        let tileData = {};
        tileData.coords = new Vector3d(x, y);
        tileData.id = Number(x + (y * mapScreen.grid.width));
        tileData.resources = false;
        tileData.monster = false;
        tileData.city = false;
        tileData.buttons = [];
        tileData.type = "grass1";
        tileData.text = "";
        tileData.user = "";
        return tileData;
    }
    saveTile(tile) {
        let id = Number(tile.coords.x + (tile.coords.y * mapScreen.grid.width));
        let tileData = JSON.parse(JSON.stringify(tile));
        tileData.buttons = [];
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
    }
    updateTile(tile) {
        let id = Number(tile.coords.x + (tile.coords.y * mapScreen.grid.width));
        let tileData = JSON.parse(JSON.stringify(tile));
        tileData.buttons = [];
        tileData = {};
        tileData.user = username;
        tileData.fish = "salmon";
        firebase.database().ref("map" + "/" + id.toString()).update(tileData);
        console.log(tileData);
    }
    loadTile(tileData) {
        console.log("tile", tileData);
        for (let x = 0; x < Object.keys(tileData).length; x++) {
            name = Object.keys(tileData)[x]; // (data[x]).value;
            console.log("tileData[name] ", tileData[name]);
            mapScreen.mapTiles[tileData.coords.x][tileData.coords.y][name] = tileData[name];
        }
        console.log("time = ", Date.now());
    }
    processTile(data) {
        let tileData = JSON.parse(JSON.stringify(data));
        tileData.buttons = [];
        switch (tileData.type) {
            case "food":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new FoodTile(tileData);
                break;
            case "wood":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new WoodTile(tileData);
                break;
            case "stone":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new StoneTile(tileData);
                break;
            case "iron":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new IronTile(tileData);
                break;
            case "city":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new CityTile(tileData);
                break;
            case "monster":
                mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new MonsterTile(tileData);
                break;
            default:
                //mapScreen.mapTiles[tileData.coords.x][tileData.coords.y] = new Tile(tileData);
                break;
        }
    }
    addRssTile(type, level, x, y) {
        let tileData = {};
        tileData.type = type,
            tileData.level = level;
        tileData.coords = new Vector3d(x, y);
        let id = Number(x + (y * mapScreen.grid.width));
        this.processTile(tileData);
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
    }
    addMonsterTile(level, x, y) {
        let tileData = {};
        tileData.type = "monster";
        tileData.monster = true;
        tileData.name = "Zuko";
        tileData.level = level;
        tileData.power = 5000;
        tileData.coords = new Vector3d(x, y);
        let id = Number(x + (y * mapScreen.grid.width));
        this.processTile(tileData);
        firebase.database().ref("map" + "/" + id.toString()).set(tileData);
    }
    updateTileData(x, y, data) {
        let id = Number(x + (y * mapScreen.grid.width));
        firebase.database().ref("map" + "/" + id.toString()).update(data);
    }
    
    addMonsters(level, quantity) {
        //lets add some random res tiles
        console.log("adding some monsters");
        for (let t = 0; t < quantity; t++) {
            let tileData = {};
            var foundEmptyTile = false;
            let x, y;
            while (foundEmptyTile == false) {
                // x = Math.floor(Math.random() * mapScreen.grid.width + 1);
                // y = Math.floor(Math.random() * mapScreen.grid.height + 1);
                x = Math.floor(Math.random() * 20 + 1);
                y = Math.floor(Math.random() * 20 + 1);
                if (mapScreen.mapTiles[x][y].type == "grass1") { //TODO: need to change how to define tiles better
                    foundEmptyTile = true;
                }
            }
            tileData.coords = { "x": x, "y": y };
            tileData.type = "monster";
            tileData.monster = true;
            tileData.level = level;
            let id = Number(x + (y * mapScreen.grid.width));
            tileData.id = id;
            this.processTile(tileData);
            firebase.database().ref("map" + "/" + id.toString()).set(tileData);
        }
    }
    addResources(type, quantity) {
        //lets add some random res tiles
        console.log("adding some resources");
        for (let t = 0; t < quantity; t++) {
            let tileData = {};
            var foundEmptyTile = false;
            let x, y;
            while (foundEmptyTile == false) {
                x = Math.floor(Math.random() * mapScreen.grid.width);
                y = Math.floor(Math.random() * mapScreen.grid.height);
                if (mapScreen.mapTiles[x][y].type == "grass1") { //TODO: need to change how to define tiles better
                    foundEmptyTile = true;
                }
            }
            tileData.coords = { "x": x, "y": y };
            tileData.type = type;
            tileData.level = Math.floor(Math.random() * 3 + 1);
            let id = Number(x + (y * mapScreen.grid.width));
            tileData.id = id;
            this.processTile(tileData);
            firebase.database().ref("map" + "/" + id.toString()).set(tileData);
        }
    }
}
