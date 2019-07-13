



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

var itemScreen = {"active": false};
var items;
var itemList = [];
var itemManager = new ItemManager();

var promises = [];

var rp;
var clicked = false;
var scrolling = false;
var mouseDownFired = false;

var database;



function init() {
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
    cityScreen = new CityScreen();
    screenManager = new ScreenManager(cityScreen);

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
            console.log(troops);
        })
        .catch(gotErr);
    
        jsonfile6 = "researchtree.json";
    let promise6 = fetch(jsonfile6)
        .then(parseJsonData)
        .then(function(mj) {
            researchTree = mj;
            console.log(items);
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
        researchManager.initResearch();

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
            console.log(resources.food.amount);
            // resources.food.add = function() {
            //     resources.food = resources.food.amount + Number(1000);
            // }
        //}
        buildingHandler.loadImages();
        assets = new Assets();
        assets.loadIcons();

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

    saveName = document.getElementById('savename').value;
    writeUserData(saveName, saveData);

    function writeUserData(userId, saveData) {
        firebase.database().ref('users/' + userId).set(saveData);
    }
}


/**
 * FIRST TIME LOADING OF THE GAME
 * INITIALISES EVERYTHING AS FRESH
 * TODO: NEED TO HAVE A SEPERATE LOADER, JUST FOR INFORMATION TO UPDATE CURRENT OBJECTS (BUILDINGLIST ETC)
 */
var jb;
function loadGame() {   
    saveName = document.getElementById('savename').value;
    var ref = database.ref('users/' + saveName);
    ref.once('value', function(data) {
        //b = data.val().buildingList;
        b = data.val().game;
        jb = JSON.parse(b);
        console.log(jb);

        for(let x=0; x<jb.buildingList.length; x++) {
            if(jb.buildingList[x].troopProduction) {
                buildingList[x] = new troopTrainingBuilding(jb.buildingList[x]);
            } else {
                buildingList[x] = new Building(jb.buildingList[x]);
            }
        }

        for(let x=0; x<jb.researchList.length; x++) {
            researchList[x] = new Research(jb.researchList[x]);
        }
        console.log("troop list length = " + jb.troopList.length);
        for(let x=0; x<jb.troopList.length; x++) {
             if(jb.troopList[x]) {
                troopList[x] = new Troop(jb.troopList[x]);
             }
             //console.log(x);
        }
        console.log(jb.troopList);

        for(let x=0; x<jb.itemList.length; x++) {
            itemList[x] = new Item(jb.itemList[x]);
        }

        resources = jb.resources;


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

function draw() {
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
    requestAnimationFrame(draw);    
}

