



window.onload = init;

var game = {};

var canvas, ctx;
var mouse = {};
var camera = {"x": 0, "y": 0};
var gridSize = {"x":64, "y": 64};
var currentCity = 0;
var thisCity;
var cities = [];
var player;
var resources = {};

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

var cityScreen;
var city = {"name": "city", "active": true};
var tick = Date.now();
var screenManager;

var mapScreen = {"active": false};
var startOnMap = false;

var itemScreen = {"active": false};
var items;
var itemList = [];
var itemManager = new ItemManager();

var buttonImages = [];
var mapImages = [];
var assets;

var promises = [];

var rp;
var clicked = false;
var scrolling = false;
var mouseDownFired = false;

var database;

var username



function init() {
    username = localStorage.getItem("username");
    if(username) {
        login = true;
    }
    if(!login) {
        console.log("not logged in");
        return;
    }
    //-------------------------------------------
    console.log("initialising game");

    //init cavnas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    });

   // mouseDownFired = false;
    canvas.addEventListener('mousedown', function(e) {
        mouseDownFired = false;
        canvas.addEventListener('mousemove', scrollCity);
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', scrollCity);
        })
        canvas.addEventListener('mouseout', function() {
            canvas.removeEventListener('mousemove', scrollCity);
        })
    }); 

    canvas.addEventListener('click', doClick); 

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
            console.log(buildings);
        })
    promises.push(promise2);

    let jsonfile5 = "items.json";
    let promise5 = fetch(jsonfile5)
        .then(parseJsonData)
        .then(function(mj) {
            items = mj;
            console.log(items);
        })
        .catch(gotErr);

    let jsonfile9 = "troops.json";
    let promise9 = fetch(jsonfile9)
        .then(parseJsonData)
        .then(function(mj) {
            troops = mj;
            a = new Assets();
            a.loadTroopImages();

            console.log(troops);
        })
        .catch(gotErr);
    
        jsonfile6 = "researchtree.json";
    let promise6 = fetch(jsonfile6)
        .then(parseJsonData)
        .then(function(mj) {
            researchTree = mj;
            researchManager.initResearch();
            console.log(researchTree);
        })
        .catch(gotErr);
    

    let jsonfile = "city.json";
    let promise = fetch(jsonfile)
        .then(parseJsonData)
        .then(initBuildingData)
        .catch(gotErr);
   
    function parseJsonData(response) {
        console.log("responded");
        return response.json();
    }
    function gotErr(err) {
        console.log(err);
    }
    //TODO: put all promises in an array, and then check them all before proceeding
    function initBuildingData(myJson) {
        console.log(myJson[currentCity].buildings);
        cityData = myJson[currentCity] || "";
        buildingData = cityData.buildings || "";
        resourceData = cityData.resources || "";
        troopData = cityData.troops || "";
        let itemData = cityData.items || "";
        console.log(resourceData);
    
        researchData = cityData.research;
        //researchManager.initResearch();

        cities.push(new City(cityData.citydata));

        for(var x=0; x<buildingData.length; x++) {
            buildingList.push(new Building(buildingData[x]));
        }

        for(var x=0; x<itemData.length; x++) {
            itemList.push(new Item(itemData[x]));
        }

        for(var x=0; x<troopData.length; x++) {
            troopList.push(new Troop(troopData[x]));
        }
        //troops = new Troop(troopsData);


        //for(var x=0; x<resourceData.length; x++) {
            //store the Resource class in individual objects within resources
            resources.food = new Resource(resourceData.food);
            resources.wood = new Resource(resourceData.wood);
            resources.stone = new Resource(resourceData.stone);
            resources.iron = new Resource(resourceData.iron);
            resources.gold = new Resource(resourceData.gold);
            resources.gems = new Resource(resourceData.gems);
            // resources.food.add = function() {
            //     resources.food = resources.food.amount + Number(1000);
            // }
        //}
        buildingHandler.loadImages();
        assets = new Assets();
        assets.loadIcons();
        assets.loadTroopImages();

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
        console.log(firebase);
        database = firebase.database();
        console.log(database.ref('users'));
        //return;
        var ref = database.ref('users');
        var data = {
            ID: "3",
            Name: "hello world"
        }
        //ref.push(data); 

        ref.on('value', gotData, errData);

        
        loadGame();

        setTimeout(draw, 2000);
        //draw();
        
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

function saveList(listToSave) {
    var listName = Object.keys(listToSave)[0];
    var listToSave = listToSave[listName];
    console.log(listName);        //prints foo
    console.log(listToSave);       //prints bar

    console.log("saving to database???");
    //userName = document.getElementById('savename').value;
    saveData = JSON.stringify(listToSave);
    firebase.database().ref(username + "/" + listName).set(saveData);
}

function saveGame2() {
    game.buildingList = buildingList;
    game.researchList = researchList;
    game.itemList = itemList;
    game.troopList = troopList;
    game.resources = resources;

   // userName = document.getElementById('savename').value;
    //if(!userName) { userName = "Bronxy";}

    for(let x=0; x<Object.keys(game).length; x++) {
        listName = Object.keys(game)[x];
        data = game[listName];
        saveData = JSON.stringify(data);
        firebase.database().ref(username + "/" + listName).set(saveData);
    }
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
        
        let jb = JSON.parse(gameData.buildingList);

        for(let x=0; x<jb.length; x++) {
            if(jb[x].troopProduction) {
                buildingList[x] = new troopTrainingBuilding(jb[x]);
            } else {
                buildingList[x] = new Building(jb[x]);
            }
        }

        jb = JSON.parse(gameData.researchList);
        for(let x=0; x<jb.length; x++) {
             researchList[x] = new Research(jb[x]);
        }

        jb = JSON.parse(gameData.troopList);
        for(let x=0; x<jb.length; x++) {
             if(jb[x]) {
                troopList[x] = new Troop(jb[x]);
             }
        }

        //return;

        jb = JSON.parse(gameData.itemList);
        for(let x=0; x<jb.length; x++) {
            itemList[x] = new Item(jb[x]);
        }

        jb = JSON.parse(gameData.resources);
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

  
}

function doClick() {
    console.log("mouseDownFired = " + mouseDownFired);
    if(mouseDownFired) {
        clicked = false;
        console.log("clicked = " + clicked);
        return;
    }

    clicked = true;
    console.log("clicked = " + clicked);
    console.log("clicked at " + mouse.x + " , " + mouse.y);
}


function d2() {
    console.log("mouse over canvas");
}

var zoom = {"x": 1, "y": 1};
// --- MAIN GAME LOOP ---
function draw() {

    ctx.save();
    
    //ctx.scale(zoom.x, zoom.y);

    ctx.fillStyle = "#cccc66";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    popup(mouse.x + ", " + mouse.y, 10, 20);
    let gridCoord = convertMouseXYtoGridXY();
    popup(gridCoord.x + ", " + gridCoord.y, 10, 50);


    screenManager.screen.draw();

    buildingHandler.checkBuildingUpgrades();
    buildingHandler.update();

    researchManager.checkResearchUpgrades();

    troopManager.checkTroopTraining();



    clicked = false;

    ctx.restore();
    requestAnimationFrame(draw);    
}

