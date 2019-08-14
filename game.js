window.onload = init;

var game = {};
var fps;
var opsys = "unknown";

var canvas, ctx;
var mouse = {"x": 0, "y": 0, "movement": {"x": 0, "y": 0}};
var camera = {"x": 0, "y": 0};
var cityCameraStart = {"x": 200, "y": 30};
var gridSize = {"x":128, "y": 128};

var player;

var resources = {};
var resourceManager = new ResourceManager();

var troopTrainingScreen = {"active": false};
var troops = {};
var troopList = [];
for(let x=0; x<10; x++) {
    //troopList[x] = {};
}
var troopManager = new TroopManager();

var buildings;
var buildingList = [];
var buildingHandler = new BuildingHandler();
var tempBuild;
var buildingInfoScreen = {"active": false};
var buildingDetailsScreen = {"active": false};
var buildingUpgradeScreen = {"active": false};

var researchScreen = {"active": false};
var researchTree;
var researchList = [];
var researchManager = new ResearchManager();

var buffManager = new BuffManager();

var currentCity = 0;
var thisCity;
//var cities = [{"name": "Bronx House", "coords": {"x": 9, "y": 8}, "active": true}];
var cities = [];
var cityScreen;
var city = {"name": "Bronx House", "coords": {"x": 9, "y": 8}, "active": true};
var tick = Date.now();
var screenManager;

var mapScreen = {"active": false};
var mapManager = new MapManager();
var startOnMap = false;
var worldMapScreen = {"active": false};

var marches = [];
var marchScreen = {"active": false};
var marchManager = new MarchManager();


var generals = [];
var generalImages = [];
var tavernScreen = {"active": false};

var itemScreen = {"active": false};
var items;
var itemList = [];
var itemManager = new ItemManager();

var speedScreen = {"active": false};

var buttonImages = [];
var mapImages = [];
var monsterImages = [];
var assets;

var promises = [];

var rp;
var clicked = false;
var scrolling = false;
var mouseDownFired = false;

var database;
var db;

var username
var lastLoop = Date.now();


var touchStart = {"x": 99999, "y": 0};
var distX, distY;
var elem;
var moving;


var load; 

function init() {
    username = localStorage.getItem("username");
    if(username) {
        load = new loader();
        login = true;
        //Toast("logged in");
        load.start();
    } else {
        console.log("not logged in");
        return;
    }

    // if(!login) {
    //     console.log("not logged in");
    //     return;
    // }
    //-------------------------------------------
    console.log("initialising game");

    // get operating system - mobile etc
    opsys = getMobileOperatingSystem();
    console.log(opsys);
    let downtype, movetype, uptype;
    if (opsys=="unknown"){downtype = 'mousedown'; movetype = 'mousemove'; uptype = 'mouseup';}
    if (opsys!="unknown"){downtype = 'touchstart'; movetype = 'touchmove'; uptype = 'touchleave';}

    //init cavnas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    //resixe the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    canvas.addEventListener('mousemove', function(e) {
        //if (opsys=="unknown") {
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
            mouse.movement.x = e.movementX;
            mouse.movement.y = e.movementY;
        //} else {
            // var touchobj = e.changedTouches[0];    // get the first touch position
            // mouse.x = parseInt(touchobj.clientX);
            // mouse.y = parseInt(touchobj.clientY);
        //}
    });

    mouseDownFired = false;
    var pressTimer;
    
    canvas.addEventListener('mousedown', function(e) {
        //      pressTimer = window.setTimeout(function() {
                 // mouseDownFired = true;
        //         canvas.addEventListener('mousemove', scrollCity);
        //         //moving = true;
        //         // doClick();
        //  },250);
        canvas.addEventListener('mousemove', scrollCity);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', scrollCity);
            // clearTimeout(pressTimer);
            // moving = false;
            //mouseDownFired = false;
        })
        canvas.addEventListener('mouseout', function() {
            canvas.removeEventListener('mousemove', scrollCity);
        })
    }); 

    canvas.addEventListener("touchmove", scrollCity);
    // canvas.addEventListener('touchleave', function() {
    //     canvas.removeEventListener('touchmove', scrollCity);
    //     // clearTimeout(pressTimer);
    //     // moving = false;
    //     mouseDownFired = false;
    // })
    // canvas.addEventListener('mouseout', function() {
    //     canvas.removeEventListener('mousemove', scrollCity);
    // })



    // canvas.addEventListener("touchstart", function(e) {
    //     var touch = e.touches[0];
    //     touchStart.x = touch.clientX;
    //     touchStart.y = touch.clientY;

    //     e.preventDefault()
    // });
    // canvas.addEventListener("touchmove", function(e) {
    //     return;
    //     var touch = e.touches[0];
    //     if(touchStart.x == 99999) {
    //         touchStart.x = touch.clientX;   // reset current touch position
    //         touchStart.y = touch.clientY;
    //     }
    //     distX = touch.clientX - touchStart.x;
    //     distY = touch.clientY - touchStart.y;

    //     camera.x += distX;
    //     camera.y += distY;

    //     touchStart.x = touch.clientX;   // reset current touch position
    //     touchStart.y = touch.clientY;
    //     e.preventDefault()
    //     //alert("move");
    // });
    canvas.addEventListener("touchend", function(e) {
        touchStart.x = 99999;
    });




    canvas.addEventListener("click",  function(e) {
        console.log("click");
        doClick(e);
    });




    //window.addEventListener('keydown', getInput);

    //initilaiase the player
    player = new Player;

    if(startOnMap) {
        mapScreen = new MapScreen();
        screenManager = new ScreenManager(mapScreen);
    } else {
        cityScreen = new CityScreen();
        screenManager = new ScreenManager(cityScreen);
    }

    let jsonfile2 = "buildings.json";
    let promise2 = fetch(jsonfile2)
        .then(parseJsonData)
        .then(function(mj) {
            buildings = mj;
            //console.log(buildings);
        })
    promises.push(promise2);

    let jsonfile5 = "items.json";
    let promise5 = fetch(jsonfile5)
        .then(parseJsonData)
        .then(function(mj) {
            items = mj;
            //console.log(items);
        })
        .catch(gotErr);
    promises.push(promise5);

    let jsonfile9 = "troops.json";
    let promise9 = fetch(jsonfile9)
        .then(parseJsonData)
        .then(function(mj) {
            troops = mj;
            assets = new Assets();
            assets.loadTroopImages();
            //console.log(troops);
        })
        .catch(gotErr);
    promises.push(promise9);
    
        jsonfile6 = "researchtree.json";
    let promise6 = fetch(jsonfile6)
        .then(parseJsonData)
        .then(function(mj) {
            researchTree = mj;
            researchManager.initResearch();
            //console.log(researchTree);
        })
        .catch(gotErr);
    promises.push(promise6);
    


    initStageTwo();
   
    function parseJsonData(response) {
        //console.log("responded");
        return response.json();
    }
    function gotErr(err) {
        console.log(err);
    }
    //TODO: put all promises in an array, and then check them all before proceeding
    function initStageTwo(myJson) {

        buildingHandler.loadImages();
        assets = new Assets();
        assets.loadIcons();
        assets.loadGeneralImages();
        assets.loadMonsterImages();
       
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDyF4fVz_XN-R1fujOhFwEMmxNeufLlvM8",
            authDomain: "bronxcraft-54554.firebaseapp.com",
            databaseURL: "https://bronxcraft-54554.firebaseio.com",
            projectId: "bronxcraft-54554",
            storageBucket: "",
            messagingSenderId: "1086695219970",
            appId: "1:1086695219970:web:03bf35a0e8983a58"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        //----------------------------------

        //db = firebase.firestore();
        //---------------

    //     db.collection("cities").where("capital", "==", true)
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });

    // db.collection("map").doc("0")
    //     .onSnapshot(function(doc) {
    //     console.log("Current data: ", doc.data());
    //     //mapScreen.mapTiles[0][0].type = doc.data().type;
    // });

    // db.collection("map")
    //     .onSnapshot(function(doc) {
    //     console.log("Current data: ", doc.docs[0].data());
    //     //mapScreen.mapTiles[0][0].type = doc.data().type;
    // });

    //db.collection("map").doc("0").update({"type":"trees"});
    //--------------------

    // db.collection("cities").where("state", "==", "CA")
    // .onSnapshot(function(querySnapshot) {
    //     var cities = [];
    //     querySnapshot.forEach(function(doc) {
    //         cities.push(doc.data().name);
    //     });
    //     console.log("Current cities in CA: ", cities.join(", "));
    // });

    //---------------------------
    // this works great
    // var commentsRef = firebase.database().ref('map/');
    // commentsRef.on('child_changed', function(data) {
    //     //console.log(data.key, data.val().id, data.val().type);
    //     let c = data.val().coords;
    //     if(data.val().type == "food") {
    //         mapScreen.mapTiles[c.x][c.y] = new FoodTile(1, c.x, c.y);
    //     } else {
    //         mapScreen.mapTiles[c.x][c.y] = new Tile(c.x, c.y);

    //     }
    //     console.log(data.val());
    // });
    //------------------------

        mapScreen = new MapScreen(3);
        let currentUser = database.ref(username);
        
       // console.log("userdata", currentUser.val());
        currentUser.once('value', function(data) {
            if (data.hasChild("city")) {
                loadMap2();
                
                console.log('exists');
                return;
            } else {
                let jsonfile = "city.json";
                let promise = fetch(jsonfile)
                    .then(parseJsonData)
                    .then(startNewGame)
                    .catch(gotErr);
                promises.push(promise);
            
           
                console.log("doesnt excist");
                return;
            }
        });
        return;
        //loadMap2();
        
        // loadGame();

         elem = document.documentElement;


        //generals.push(new General());

        // setTimeout(draw, 2000);
        //draw();
        
    }
}

function startNewGame(myJson) {
    console.log(myJson);
    //return;
    newCityData = myJson[0];
    //cities.push(new City(newCityData.citydata));
    cities[0] = new City(newCityData.citydata);

    city = newCityData.citydata;
    city.name = username;
    let tileData = {};
    let x = Math.floor(Math.random() * mapScreen.grid.width);
    let y = Math.floor(Math.random() * mapScreen.grid.height);
    tileData.coords = {"x": x, "y": y};
    city.coords = {"x": x, "y": y};
    tileData.type = "city";
    tileData.user = username;
    tileData.city = true;
    tileData.name = username + " House";
    tileData.buildon = false;
    let id = Number(x + (y * mapScreen.grid.width));
    firebase.database().ref("map" + "/" + id.toString()).set(tileData);

    resources = newCityData.resources;
    buildingList = newCityData.buildings;

    let jb = newCityData.resources
    for(let x=0; x<jb.length; x++) {
        resources[x] = new Resource(jb[x]);
    }

    itemList = newCityData.items;

    console.log("STARTING NEW GAME");
    saveGame2();
    location.reload();
    //loadMap2();
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
                return "Windows Phone";
        }
        if (/android/i.test(userAgent)) {
                return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "iOS";
        }
        return "unknown";
}

function fullScreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      

}

function gotData(data) {
    var users = data.val();
    //console.log(users);
}
function errData() {
    return false;
}

function saveGame() {
    return;
    var ref = database.ref('users');
    let saveData = {};
    //saveData.id = document.getElementById('savename').value;
    game.buildingList = buildingList;
    game.researchList = researchList;
    game.troopList = troopList;
    game.resources = resources;
    game.itemList = itemList;
    let gameData = JSON.stringify(game);

    let buildingData = JSON.stringify(buildingList);
    //saveData.buildingList = buildingData;
    saveData.game = gameData;
   // ref.push(saveData); 

    userName = document.getElementById('savename').value;
    writeUserData(userName, saveData);

    function writeUserData(userName, saveData) {
        firebase.database().ref('users/' + userName).set(saveData);
    }
}

let getVarNameFromObject = (nameObject) => {
    for(let varName in nameObject) {
        return varName;
    }
    }
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//-------------------------------------------------------------------
function saveList(listToSave, noStringy) {
    
    // var listName = Object.keys(listToSave)[0];
    // var listToSave = listToSave[listName];
    var listName = listToSave;
    var listToSave = window[listToSave];
    console.log(listName);        //
    console.log(listToSave);       //

    console.log("saving to database???");
    if(noStringy) {   // some lists, like resources, do not need to be stringifief
        saveData = JSON.parse(JSON.stringify(listToSave));
    } else {
        saveData = JSON.stringify(listToSave);
    }
    firebase.database().ref(username + "/" + listName).set(saveData);
}

function saveGame2() {
    console.log("saving game");
    //game.city = city;
    game.buildingList = buildingList;
    //game.researchList = researchList;
    game.itemList = itemList;
    game.troopList = troopList;
    //game.resources = resources;
    game.marches = marches;
    //game.generals = generals;

   // userName = document.getElementById('savename').value;
    //if(!userName) { userName = "Bronxy";}

    for(let x=0; x<Object.keys(game).length; x++) {
        listName = Object.keys(game)[x];
        data = game[listName];
        saveData = JSON.stringify(data);
        //saveData = data;
        firebase.database().ref(username + "/" + listName).set(saveData);
    }
    firebase.database().ref(username + "/" + "resources").set(resources);

    firebase.database().ref(username + "/" + "city").set(city);

    let g;
    g = JSON.parse(JSON.stringify(researchList));   //TODO: this is great
    console.log(g);
    console.log(g.length);
    for(let x=0; x<g.length; x++) {
        g[x].buttons = "";
        g[x].upgradebutton = "";
    }
    firebase.database().ref(username + "/" + "researchList").set(g);
    
    g = JSON.parse(JSON.stringify(marches));   //TODO: this is great
    console.log(g);
    console.log(g.length);
    for(let x=0; x<g.length; x++) {
        g[x].buttons = "";
        //g[x].upgradebutton = "";
    }
    firebase.database().ref(username + "/" + "marches").set(g);

    // save buildings
    g = JSON.parse(JSON.stringify(buildingList));   //TODO: this is great
    console.log(g);
    console.log(g.length);
    for(let x=0; x<g.length; x++) {
        g[x].buttons = "";
    }
    firebase.database().ref(username + "/" + "buildingList").set(g);

}

function saveMap() {
    return;
    // let saveData;
    // saveData = [];
    // let s = {"type": "food"};
    // //saveData.push(s);
    // s = {"type": "wood"};
    // //saveData.push(s);
    // saveData.push(mapScreen.mapTiles[0][0]);
    // saveData.push(mapScreen.mapTiles[1][0]);
    //firebase.database().ref("map" + "/").set(saveData);
//return;
    let startSaveTime = Date.now()/1000;
    console.clear();
    console.log(startSaveTime);


    let mapData = [];

    let start = 180;
    let end = 200;  

    for(let y=0; y<mapScreen.grid.height; y++) {
        for(let x=start; x<end; x++) {
            let tileData = {};
            tileData.coords = mapScreen.mapTiles[x][y].coords;
            tileData.type = mapScreen.mapTiles[x][y].type;
            //tileData.buildon = mapScreen.mapTiles[x][y].buildon;
            if(mapScreen.mapTiles[x][y].resources) {
                //tileData.amount = mapScreen.mapTiles[x][y].amount;
                tileData.availableAmount = mapScreen.mapTiles[x][y].availableAmount;
                //tileData.buildon = false;
                tileData.type = mapScreen.mapTiles[x][y].type;
                tileData.level = mapScreen.mapTiles[x][y].level;
            }
            let id = Number(x + (y * mapScreen.grid.width));
            firebase.database().ref("map" + "/" + id.toString()).set(tileData);
            //mapData.push(tileData);
        }
    }
    //saveData = JSON.stringify(tileData);
    //firebase.database().ref("map" + "/" + x+(y*mapScreen.grid.width)).set(mapData);
    //firebase.database().ref("map" + "/").set(mapData);


    let endSaveTime = Date.now()/1000 - startSaveTime;
    console.log(endSaveTime);
}
function addFood() {
            //lets create random res tiles
        // for(let t=0; t<500; t++){
        //     let x = Math.floor(Math.random() * this.grid.width);
        //     let y = Math.floor(Math.random() * this.grid.height);
        //     let level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new FoodTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new WoodTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new StoneTile(level, x, y);

        //     x = Math.floor(Math.random() * this.grid.width);
        //     y = Math.floor(Math.random() * this.grid.height);
        //     level = Math.floor(Math.random() * 3 + 1);
        //     this.mapTiles[x][y] = new IronTile(level, x, y);
        // }

        for(let t=0; t<100; t++){
            let tileData = {};
            let x = Math.floor(Math.random() * mapScreen.grid.width);
            let y = Math.floor(Math.random() * mapScreen.grid.height);
            tileData.coords = {"x": x, "y":y};
            tileData.type = "food";
            tileData.level = Math.floor(Math.random() * 3 + 1);
            let id = Number(x + (y * mapScreen.grid.width));
            firebase.database().ref("map" + "/" + id.toString()).set(tileData);
        }
}

function saveMap2() {
    return;
    let startSaveTime = Date.now()/1000;
    console.clear();
    console.log(startSaveTime);
    let mapData = [];

    for(let y=0; y<mapScreen.grid.height; y++) {
        for(let x=0; x<mapScreen.grid.width; x++) {
            let tileData = {};
            tileData.type = mapScreen.mapTiles[x][y].type;
            tileData.buildon = mapScreen.mapTiles[x][y].buildon;
            tileData.id = Number(x+(y*mapScreen.grid.width));
            if(mapScreen.mapTiles[x][y].resources) {
                tileData.amount = mapScreen.mapTiles[x][y].amount;
                tileData.availableAmount = mapScreen.mapTiles[x][y].availableAmount;
                tileData.buildon = false;
                tileData.type = mapScreen.mapTiles[x][y].type;
                tileData.level = mapScreen.mapTiles[x][y].level;
            }
            saveData = JSON.stringify(tileData);
            let doc = x+(y*mapScreen.grid.width);
            db.collection("map").doc(doc.toString()).set(tileData)
            .then(function(docRef) {
                //console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }
    let endSaveTime = Date.now()/1000 - startSaveTime;
    console.log(endSaveTime);
}

function loadMap() {   // this uses firestore
    //return;
    db.collection("map").where("id", "<", 50)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


}

var md;
function loadMap2() {
    let startSaveTime = Date.now()/1000;
    //console.clear();
    console.log("start = " + startSaveTime);

    let retrieveQuantity = 40000;

    //var ref = firebase.database().ref('map').limitToFirst(retrieveQuantity);
    var ref = firebase.database().ref('map');

    ref.once('value', function(data) {
        data.forEach(function(info){
            //console.log(info.val());
            md = info.val();
            md.buttons = [];
            mapManager.processTile(md);
        });

        console.log("done loading map tiles in " + (Math.round(Date.now()/1000 - startSaveTime)) + " seconds");
        //console.log(Date.now()/1000 - startSaveTime);
        loadGame();

        elem = document.documentElement;

        load.end();
        setTimeout(draw, 100);
        console.log(Date.now()/1000 - startSaveTime);

        //---------------------------
        // this works great
        var commentsRef = firebase.database().ref('map/');
        commentsRef.on('child_changed', function(data) {
            //console.log(data.key, data.val().id, data.val().type);
            let c = data.val();
            mapManager.loadTile(c);
            // if(data.val().type == "food") {
            //     mapScreen.mapTiles[c.coords.x][c.coords.y] = new FoodTile(c);
            // } else {
            //     mapScreen.mapTiles[c.coords.x][c.coords.y] = new Tile(c);
            // }
            //console.log(data.val());
        });
        //------------------------
    });

    //console.log(Date.now()/1000 - startSaveTime);

}

/**
 * FIRST TIME LOADING OF THE GAME
 * INITIALISES EVERYTHING AS FRESH
 * TODO: NEED TO HAVE A SEPERATE LOADER, JUST FOR INFORMATION TO UPDATE CURRENT OBJECTS (BUILDINGLIST ETC)
 */

function loadGame() {   
    //userName = document.getElementById('savename').value;
    //if(!userName) { userName = "Bronxy";}

    var ref = firebase.database().ref(username);

    ref.once('value', function(data) {
        gameData = data.val();
        let jb;

        //jb = JSON.parse(gameData.city);
        jb = gameData.city;
        city = jb;    
        //cities.push(city);
        cities[0] = city;
        cities[0].active = true;


        //jb = JSON.parse(gameData.buildingList);
        jb = gameData.buildingList;
        for(let x=0; x<jb.length; x++) {
            if(jb[x].troopProduction) {
                buildingList[x] = new troopTrainingBuilding(jb[x]);
            } else if(jb[x].type == 14) {
                buildingList[x] = new TavernBuilding(jb[x]);
            } else if(jb[x].type == 15) {
                buildingList[x] = new AcademyBuilding(jb[x]);
            } else {
                buildingList[x] = new Building(jb[x]);
            }
        }

        //jb = JSON.parse(gameData.researchList);
        jb = gameData.researchList;
        //researchList = [];
        for(let x=0; x<jb.length; x++) {
             researchList[x] = new Research(jb[x]);
        }

        if(gameData.troopList) {
            jb = JSON.parse(gameData.troopList);
            for(let x=0; x<jb.length; x++) {
                if(jb[x]) {
                    troopList[x] = new Troop(jb[x]);
                }
            }
        }

        //console.log(gameData.generals);
        //jb = JSON.parse(gameData.generals);
        if(gameData.generals) {
            jb = gameData.generals;
            generals = [];  // clear it ready for any full new list
            for(let x=0; x<jb.length; x++) {
                //console.log(jb[x]);
                if(jb[x]) {
                    generals.push(new General(jb[x]));
                }
            }
        }

        //return;

        jb = gameData.marches;
        if(jb) {
            marches = [];
            for(let x=0; x<jb.length; x++) {
                marches.push(new March(jb[x]));
            }
        }

        jb = JSON.parse(gameData.itemList);
        for(let x=0; x<jb.length; x++) {
            itemList[x] = new Item(jb[x]);
        }

        //this doesnt need parsing
        jb = gameData.resources;
        resources.food = new Resource(jb.food);
        resources.wood = new Resource(jb.wood);
        resources.stone = new Resource(jb.stone);
        resources.iron = new Resource(jb.iron);
        resources.gold = new Resource(jb.gold);
        resources.gems = new Resource(jb.gems);
        assets.loadIcons();
        //todo:: this needs to be optimised
        //resources = jb;



    });
    //let keys = Object.keys(ref);
    //console.log(keys);
    // let saveData = {};
    // saveData.id = "Lilly";
    // let buildingData = JSON.stringify(buildingList);
    // saveData.buildingList = buildingData;
    // ref.push(saveData); 

    //---------------------------
    // this works great - checking if resources have changed, and load new amounts
    var resourceRef = firebase.database().ref(username + '/' + 'resources');
    resourceRef.on('child_changed', function(data) {
        console.log(data.key);
        console.log(data.val().amount);
        let rss = data.key;
        resources[rss].amount = data.val().amount;
        // let c = data.val().coords;
        // if(data.val().type == "food") {
        //     //mapScreen.mapTiles[c.x][c.y] = new FoodTile(1, c.x, c.y);
        // } else {
        //     //mapScreen.mapTiles[c.x][c.y] = new Tile(c.x, c.y);

        // }
        console.log(data.val());
    });
    //------------------------

  
}

function doClick() {
    //console.log("mouseDownFired = " + mouseDownFired);
    if(mouseDownFired) {
        clicked = false;
        //console.log("clicked = " + mouseDownFired);
        mouseDownFired = false;
        return;
    }
    console.log("doclick clicked");
    mouseDownFired = false;
    clicked = true;
    //console.log("clicked = " + clicked);
    //console.log("clicked at " + mouse.x + " , " + mouse.y);
}


function d2() {
    console.log("mouse over canvas");
}

var zoom = {"x": 1, "y": 1};


// ----------------------------------------------------------
// --- MAIN GAME LOOP ---
function draw() {
    var thisLoop = new Date();
    fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    ctx.save();
    
    //ctx.scale(zoom.x, zoom.y);

    ctx.fillStyle = "#cccc66";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    let gridCoord = convertMouseXYtoGridXY();
    popup(gridCoord.x + ", " + gridCoord.y, 10, 50);

    buildingHandler.checkBuildingUpgrades();
    buildingHandler.update();

    screenManager.screen.draw();


    researchManager.checkResearchUpgrades();

    troopManager.checkTroopTraining();

    marchManager.tick();



    clicked = false;

    ctx.restore();

    ctx.font = "20px Georgia";
    ctx.fillStyle = '#ffffff';
    ctx.fillText("fps: " + Math.floor(fps), 400, 70);

    ctx.fillStyle = '#000000';
    popup(mouse.x + ", " + mouse.y, 10, 20);
    popup(camera.x + ", " + camera.y, 100, 20);
    popup(distX + ", " + distY, 10, 200)

    requestAnimationFrame(draw);    
}

