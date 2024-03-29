
console.log("ekjhsdfwww");

window.onload = init;

var game = {};
var fps;
var opsys = "unknown";

var canvas, ctx;
var mouse = {"x": 0, "y": 0, "movement": {"x": 0, "y": 0}};
var camera = {"x": 0, "y": 0};
var cityCameraStart = {"x": 200, "y": 30};
var gridSize = {"x":100, "y": 100};

var user;

var equipmentScreen = {"active": false};
var equipmentList = [];
var throneRoomScreen = {"active": false};
var throneRoom = new ThroneRoom();
var throneImages = [];

var resources = {};
var resourceManager = new ResourceManager();

var troopTrainingScreen = {"active": false};
var troops = {};
var troopList = [];
var troopManager = new TroopManager();

var monsters = [];
var monsterManager = new MonsterManager();

var buildings;
var buildingList = [];
var buildingHandler = new BuildingHandler();
var tempBuild;
var buildingInfoScreen = {"active": false};
var buildingDetailsScreen = {"active": false};
var buildingUpgradeScreen = {"active": false};
var buildingScreen = {"active": false};

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
var mapTileImages = [];
var worldMapScreen = {"active": false};

var marches = [];
var marchScreen = {"active": false};
var marchManager = new MarchManager();

var allianceList = [];
var alliance;
var allianceScreen = {"active": false};

var generals = [];
var generalImages = [];
var tavernScreen = {"active": false};

var itemScreen = {"active": false};
var items;
var itemList = [];
var itemManager = new ItemManager();
var itemListImages = [];
var itemHolderImages = [];

var listBox, listCanvas, listCtx;
var listScroll;

var speedScreen = {"active": false};

var optionScreen = {"active": false};
var optionList = [];

var buttonImages = [];
var mapImages = [];
var assets;

var promises = [];

var chat;
var chatScreen = {"active": false};
var chatPen = {};

var socket;

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

var prog;
var expand;
var load; 

var originalCanvas = {width: 0, height: 0};
var screenZoom = new Vector3d(.5, .5);
var ratioW = 1;
var ratioH = 1;

function SaveDatFileBro(localstorage) {
    localstorage.root.getDirectory("demo", {create: true}, function() {});

    localstorage.root.getFile("info.txt", {create: true}, function(DatFile) {
        DatFile.createWriter(function(DatContent) {
          var blob = new Blob(["Lorem Ipsum"], {type: "text/plain"});
          DatContent.write(blob);
        });
      });    
      
    return;
}

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
    //--------
    console.log("initialising game");
    //init cavnas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    var loaderImage = [];
    loaderImage[0] = new Image();
    loaderImage[0].onload = function() {
        ctx.save();
        ctx.arc(300, 300, 300, 0, 2 * Math.PI);
        ctx.stroke();
        //ctx.arc(this.x, this.y, height, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(loaderImage[0], 0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.restore();
    };
    loaderImage[0].src = "images/med.jpg";
    console.log("canvas width at the start = ", canvas.width);
    console.log("window outer width at the start = ", window.outerWidth);
    console.log("window inner width at the start = ", window.innerWidth);
    originalCanvas.width = 600;
    originalCanvas.height = 900;

    //resixe the canva
    if(window.innerWidth<600) {
        //set screenZoom
        ratioW = window.innerWidth / originalCanvas.width;
        ratioW = ratioW.toFixed(2);
        console.log("ratio = ", ratioW , " by ", ratioH);
        //-------------
        canvas.width = window.innerWidth;
    }  else {
        canvas.width = originalCanvas.width;
    }
    if(window.innerHeight<900) {
        //set screenZoom
        ratioH = window.innerHeight / originalCanvas.height;
        ratioH = ratioH.toFixed(2);
        console.log("ratio = ", ratioW , " by ", ratioH);
        //-------------
        canvas.height = window.innerHeight;
    }  else {
        canvas.height = originalCanvas.height;
    }
    console.log("ratio = ", ratioW , " by ", ratioH);

    //screenZoom.x = .67;
    screenZoom.x = ratioW;
    screenZoom.y = ratioH;
    //------------------------------------------------
    //-----------------------------------------

    navigator.webkitPersistentStorage.requestQuota(1024*1024, function() {
        window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, SaveDatFileBro);
      })
    //--------------------------
    //--------------------------------------------
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
    
        navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
        console.log('Service Worker is registered', swReg);
    
        swRegistration = swReg;
        })
        .catch(function(error) {
        console.error('Service Worker Error', error);
        });
    } else {
        console.warn('Push messaging is not supported');
        //pushButton.textContent = 'Push Not Supported';
    }
    //----------------------------------------------------
    SETTINGS_ENABLE_APP_INSTALL = true;
    if(SETTINGS_ENABLE_APP_INSTALL) {
        console.log("setting up install");
        inst = document.getElementById('installbutton');
  
        window.addEventListener('beforeinstallprompt', function(e) {
          // Prevent Chrome 67 and earlier from automatically showing the prompt
          //e.prompt();
          console.log("Meets criteria to install");
          //inst.value = "would you like to install";
          e.preventDefault();
          // Stash the event so it can be triggered later.
          installPromptEvent = e;
  
        });
      }
      //-----------------------------------------------------------
  


    // get operating system - mobile etc
    opsys = getMobileOperatingSystem();
    console.log(opsys + " operating system");
    let downtype, movetype, uptype;
    if (opsys=="unknown"){downtype = 'mousedown'; movetype = 'mousemove'; uptype = 'mouseup';}
    if (opsys!="unknown"){downtype = 'touchstart'; movetype = 'touchmove'; uptype = 'touchleave';}



    //ctx.fillStyle = "#ff0000";
    //ctx.fillRect(0,0,canvas.width,canvas.height);



    //--- show progress bar
    progressBar();
    prog = setInterval(progressBar, 100);
    //-----------

    canvas.addEventListener('mousemove', function(e) {
        //if (opsys=="unknown") {
            mouse.x = Math.floor(e.offsetX / screenZoom.x);
            mouse.y = Math.floor(e.offsetY / screenZoom.y);
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
    chatPen.active = false;

    canvas.addEventListener('mousedown', function(e) {
        scrolling = false;
        //      pressTimer = window.setTimeout(function() {
                 // mouseDownFired = true;
        //         canvas.addEventListener('mousemove', scrollCity);
        //         //moving = true;
        //         // doClick();
        //  },250);
        canvas.addEventListener('mousemove', scrollCity);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', scrollCity);
            chatPen.active = false;
            listScroll = false;
            scrolling = true;
            scrollMovement.startTime = Date.now();
            scrollMovement.start = camera;
            //scrollMovement.end = 
            scrollMovement.endY = scrollMovement.start.y + (mouse.movement.y * 5);
            scrollMovement.endX = scrollMovement.start.x + (mouse.movement.x * 5);
            scrollMovement.t = 0;
            //scrollMovement.startTime = Date.now() + Math.abs(scrollMovement.y * 1000);

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
        //console.log("clickeee");
        doClick();
        //console.log("clclclclclclclc");
    });




    //window.addEventListener('keydown', getInput);

    //initilaiase the player
    user = new User();



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
        })
    promises.push(promise2);

    let jsonfile5 = "items.json";
    let promise5 = fetch(jsonfile5)
        .then(parseJsonData)
        .then(function(mj) {
            items = mj;
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
        })
        .catch(gotErr);
    promises.push(promise9);
    
        jsonfile6 = "researchtree.json";
    let promise6 = fetch(jsonfile6)
        .then(parseJsonData)
        .then(function(mj) {
            researchTree = mj;
            researchManager.initResearch();
        })
        .catch(gotErr);
    promises.push(promise6);
    
    Promise.all(promises).then(() => {
        console.log("All json loaded");
        initStageTwo();
    })

    //initStageTwo();

    //---------------------------
   
    function parseJsonData(response) {
        //console.log("responded");
        return response.json();
    }
    function gotErr(err) {
        console.log(err);
    }
    //TODO: put all promises in an array, and then check them all before proceeding
    function initStageTwo(myJson) {

        options = [
            {   text: "Log Out",
                button: {"active": true, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "Logout",  "action":  logout}
            },
            {   text: "Full Screen",
                button: {"active": true, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "Full Screen",  "action":  fullScreen}
            },
            {   text: "Install as App",
                button: {"active": true, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "Install as App",  "action":  installApp}
            },
            {   text: "Get Push Notifications",
                button: {"active": false, "drawButton": false, "x": 50, "y": 200, "w": 100, "h": 30, "text": "Get Push Notifications",  "action":  askPermission}
            }
        ]

        //blankOption.text = "Log Out"
        for(let x=0; x<options.length; x++) {
            let blankOption = new Option(options[x]);
            blankOption.button =  new Button(options[x].button);
            optionList.push(blankOption);
        }

        buildingHandler.loadImages();
        assets = new Assets();
        assets.loadIcons();
        assets.loadGeneralImages();
        monsterManager.loadMonsterImages();
       
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
                //loadMap2();

                console.log("Waiting for map");
                let p = [];
                // let p1 = loadMap2();
                // p.push(p1);
                let p2 = loadGame();
                p.push(p2);
                chat = new Chat();

                Promise.all(p).then( result => {
                    clearInterval(prog);
                    //  ctx.rect(progcoords.x, progcoords.y, progcoords.w, progcoords.h);
                    //  ctx.clip();

                    // expand = setInterval(expandIntro, 100);

                    // add a few throne room equipment to start with
                    //let te = new ThroneEquipment(0);
                    equipmentList.push(new ThroneEquipment(getRandom(0,1)));
                    //equipmentList.push(new ThroneEquipment(1));
                    //----------------------------------------------

                    setTimeout(draw, 100);
                });

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

    console.log("saving list to database???");
    if(noStringy) {   // some lists, like resources, do not need to be stringified
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
    return new Promise(resolve => {

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
            let ground = "grass1";
            let i = getRandom(0, 50);
            if(i == 20){
                ground = "water1";
            }
            md.ground = ground;
            mapManager.processTile(md);
        });

        console.log("done loading map tiles in " + (Math.round(Date.now()/1000 - startSaveTime)) + " seconds");
        //console.log(Date.now()/1000 - startSaveTime);

        //loadGame();

        elem = document.documentElement;

        load.end();
        //setTimeout(draw, 100);
        console.log(Date.now()/1000 - startSaveTime);

        //---------------------------
        // this works great //TODO: needs to be async
        var commentsRef = firebase.database().ref('map/');
        commentsRef.on('child_changed', function(data) {
            console.log("time = ", Date.now());
            //console.log(data.key, data.val().id, data.val().type);
            let c = data.val();
            mapManager.loadTile(c);
        });
        //------------------------
        resolve("done");
        });


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
    return new Promise(resolve => {
        
        
    var id;
    firebase.database().ref("users").once('value', function(data) {
        data.forEach(function(childSnapshot) {
            console.log(childSnapshot.val().username);
            if(childSnapshot.val().username == username) { 
                id = childSnapshot.val().id;
                console.log("found user ", id);
                parseGameData(id);
            }
        });
     })

    function parseGameData(id) {
        var ref = firebase.database().ref("users" + "/" + id.toString());
        console.log(id);
        ref.once('value', function(data) {
            gameData = data.val();
            console.log(gameData);
            //return;
            let jb;

            jb = gameData.city;
            city = jb;    
            cities[0] = city;
            cities[0].active = true;

            user.id = gameData.id;
            user.name = gameData.name
            if(gameData.alliance) {
                user.allianceID = gameData.alliance.id;

                var ally = database.ref("allianceList" + "/" + user.allianceID.toString());
                ally.once('value', function(allyData) {
                    if(allyData.val()) {
                        alliance = new Alliance(allyData.val());
                    }
                });
            }
            
            jb = gameData.researchList;
            for(let x=0; x<jb.length; x++) {
                researchList[x] = new Research(jb[x]);
            }

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

            jb = gameData.researchList;
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

            jb = gameData.equipmentList;
            if(jb) {
                for(let x=0; x<jb.length; x++) {
                    equipmentList.push(new ThroneEquipment(jb[x]));
                }
            }
            //throneRoom = new ThroneRoom;        // needs to be setup after equipment has been loaded
            throneRoom.init();
            saveList("throneRoom", true);

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

        //---------------------------
        // this works great - checking if resources have changed, and load new amounts
        var resourceRef = firebase.database().ref(username + '/' + 'resources');
        resourceRef.on('child_changed', function(data) {
            console.log(data.key);
            console.log(data.val().amount);
            let rss = data.key;
            resources[rss].amount = data.val().amount;
            console.log(data.val());
        });
        //------------------------

        resolve(true);

        });
    }

    });


  
}

function doClick() {
    console.log("mouseDownFired = " + mouseDownFired);
    if(mouseDownFired) {
        clicked = false;
        //console.log("clicked = " + mouseDownFired);
        mouseDownFired = false;
        return;
    }
    console.log("doclick clicked");
    mouseDownFired = false;
    clicked = true;
    chatPen.x = mouse.x;
    chatPen.y = mouse.y;

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
    
    ctx.scale(screenZoom.x, screenZoom.y);

    ctx.fillStyle = "#cccc00";
    ctx.fillRect(0, 0, canvas.width / screenZoom.x, canvas.height / screenZoom.y);
    //ctx.restore();
    // requestAnimationFrame(draw);    
    // return;
    let gridCoord = convertMouseXYtoGridXY();
    popup(gridCoord.x + ", " + gridCoord.y, 10, 50);

    buildingHandler.checkBuildingUpgrades();
    buildingHandler.update();

    screenManager.screen.draw();


    researchManager.checkResearchUpgrades();

    troopManager.checkTroopTraining();

    marchManager.tick();


    continueScroll();

    clicked = false;


    ctx.font = "20px Georgia";
    ctx.fillStyle = '#ffffff';
    ctx.fillText("fps: " + Math.floor(fps), 320, 25);

    ctx.fillStyle = '#ffffff';
    popup(mouse.x + ", " + mouse.y, 10, 50);
    popup(Math.floor(camera.x) + ", " + camera.y, 100, 20);
    //popup(distX + ", " + distY, 10, 200)


    ctx.restore();

    requestAnimationFrame(draw);    
}

