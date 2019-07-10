



window.onload = init;

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
        cityData = myJson[currentCity];
        buildingData = cityData.buildings;
        resourceData = cityData.resources;
        troopData = cityData.troops;
        let itemData = cityData.items;
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
        setTimeout(draw, 1000);
        //draw();
        
    }
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

