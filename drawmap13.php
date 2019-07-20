<!DOCTYPE html>
<?php echo("Hello, World!");

 /*----------------------- OPEN UP DATABASE ---------------------------------------------*/
$user="funkydun_funkyd";
$pass="funkyd666";          //eseSTIwie
$db="funkydun_bronxcraft";

//$link = mysql_connect( "91.208.99.2:1175", $user, $pass );    //10.168.1.60    91.208.99.2
$link = mysql_connect( "10.169.0.157", $user, $pass );    //10.168.1.60    91.208.99.2
if ( ! $link ) {
  die( "Couldn't connect to MySQL poo" );
}
$database = $db;
mysql_select_db( $database ) or die ( "Couldn't open $database" );
/*---------------------------------------------------------------------------------------*/
?>

<html>

<head>

  <title>Hello </title>
<script language="JavaScript">

function loadphpxml(phpxml,callback) {    // this one doesnt wait for data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };
    xhttp.open("GET", phpxml, true);
    xhttp.send();
}

function loadDoc2(xmlphp) {       // this one waits until data has been retrieved
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", xmlphp, false);
    xhttp.send();
    return xhttp;
}

function getmapdata(xml) {
//alert("ff");
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("tile");
    //alert(x.length);

    for (i = 0; i <x.length; i++) {
        tileimage = parseInt(x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue);
        map.tile[i] = tileimage;
    }
}
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    //var d = new Date();
    //document.getElementById("test").innerHTML = d.toLocaleTimeString();

}
function getmapoverlaydata(xml) {
//alert("ff");
    var i;
    var xmlDoc = xml.responseXML;
    //alert(xmlDoc.getElementsByTagName("tile")[1].childNodes[0].nodeValue);
    var x = xmlDoc.getElementsByTagName("tile");
    //alert("wow " + x.length);
    //overlayx=2;
    //overlayy=2;
    //map.overlay.tile[overlayx+(overlayy*map.width)]=50;
    //alert("wow " + map.overlay.tile[overlayx+(overlayy*map.width)]);

    for (i = 0; i <x.length; i++) {
        var xcoord = parseInt(x[i].getElementsByTagName("xcoord")[0].childNodes[0].nodeValue);
        ycoord = parseInt(x[i].getElementsByTagName("ycoord")[0].childNodes[0].nodeValue);
        tileimage = parseInt(x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue);
        map.overlay.tile[xcoord+(ycoord*map.width)] = tileimage;
    //alert("wow 3 " + tileimage);
    //alert("wow 4 " + tileimage);
    var d = new Date();
    document.getElementById("test").innerHTML = d.toLocaleTimeString();
        }
}
var opsys = "unknown";
map = {
    width : 20,
    height : 20,
    x : [],
    y : [],
    tile : [],
    xcoord : 0,
    ycoord : 0,
    xpos : 0,
    ypos : 0,
    zindex : 0,     //could use this for priority build overlaying others
    overlay : {tile:[]},
    }
    grid = [];
    //overlay = [map];
    //overlayx=dk_random(1,5);
    overlayx=3;
    overlayy=2;
    map.overlay.tile[overlayx+(overlayy*map.width)]=200;
    //overlayx=12;
    //overlayy=10;
    //map.overlay.tile[overlayx+(overlayy*map.width)]=200;
    //map.cities.tile[2]=200;

city = {
    xpos : -500,
    ypos : -150,
    
}
    touchtext1 = "a";
    touchtext2 = "a";

function dk_random(low,high){
    high = Math.floor((Math.random() * high) + 1);
    return high;
}
//generate random map 50 x 50
//mapheight = 200000;            //10x400000 = 4 million tiles - took about 2-3 seconds to genereate


for (y=0; y<map.height; y++){
    for (x=0; x<map.width; x++){
        map.x.push(x);
        map.y.push(y);

        map.tile.push(0);
    }
}
    mousecoords = {};
    fish = "bbb";
    mousepos = {};
    fn = "";
    mouseisdown=false;
    leftorright = 0;
    polytest="true or false";
//alert(Object.keys(map['x']).length);

//document.onreadystatechange = function(){
//    if(document.readyState === 'complete'){
//        init();
//    }
//}
 images = {};
images[0] = new Image();
images[0].src =  'mapgrafix/tile0.png';
images[1] = new Image();
images[1].src =  'mapgrafix/tile1.png';
images[2] = new Image();
images[2].src =  'mapgrafix/tile2.png';
images[3] = new Image();
images[3].src =  'mapgrafix/tile4.png';
images[10] = new Image();
images[10].src =  'mapgrafix/tile10.png';
images[11] = new Image();
images[11].src =  'mapgrafix/tile11.png';
images[12] = new Image();
images[12].src =  'mapgrafix/tile12.png';
images[13] = new Image();
images[13].src =  'mapgrafix/tile13.png';
images[14] = new Image();
images[14].src =  'mapgrafix/tile14.png';
images[15] = new Image();
images[15].src =  'mapgrafix/tile15.png';
images[16] = new Image();
images[16].src =  'mapgrafix/tile16.png';
images[17] = new Image();
images[17].src =  'mapgrafix/tile17.png';
images[50] = new Image();
images[50].src =  'mapgrafix/tile50.png';   //house
images[100] = new Image();
images[100].src =  'mapgrafix/eventcenter1.png';
images[200] = new Image();
images[200].src =  'mapgrafix/monster1.png';
images[300] = new Image();
images[300].src =  'mapgrafix/header2.png';
images[400] = new Image();
images[400].src =  'mapgrafix/tilehigh1.png';
images[500] = new Image();
images[500].src =  'mapgrafix/city1.png';
images[601] = new Image();
images[601].src =  'mapgrafix/tavern1.png';

window.onload = function(){
    init();
    images[0].onload = convertimage(images[0]);
    images[1].onload = convertimage(images[1]);
    images[2].onload = convertimage(images[2]);
    images[3].onload = convertimage(images[3]);
    images[10].onload = convertimage(images[10]);
    images[11].onload = convertimage(images[11]);
    images[12].onload = convertimage(images[12]);
    images[13].onload = convertimage(images[13]);
    images[14].onload = convertimage(images[14]);
    images[15].onload = convertimage(images[15]);
    images[16].onload = convertimage(images[16]);
    images[17].onload = convertimage(images[17]);
    images[50].onload = convertimage(images[50]);
    images[100].onload = convertimage(images[100]);
    images[200].onload = convertimage(images[200]);
    images[300].onload = convertimage(images[300]);
    images[400].onload = convertimage(images[400]);
    images[500].onload = convertimage(images[500]);
    images[601].onload = convertimage(images[601]);
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
//alert(bob);


function dk_change_html(oldhtml,newhtml){
    document.getElementById(oldhtml).innerHTML = newhtml;
}


function getmousepos(canvas,event){

    if (opsys=="unknown") {
    return {
    xp: event.offsetX,
    yp: event.offsetY
    };
    } else {

    var touchobj = event.changedTouches[0];    // get the first touch position
    return {
        xp: parseInt(touchobj.clientX),
        yp: parseInt(touchobj.clientY)
    };

    }
}
function init() {
    canvasheader = document.getElementById("canvasheader");
    canvasheaderctx = canvasheader.getContext("2d");

    messagecanvas = document.getElementById("messagecanvas");
    messagectx = messagecanvas.getContext('2d');

    c=document.getElementById("canvas");
    ctx=c.getContext("2d");

    opsys = getMobileOperatingSystem();
    message.addmessage = opsys;

    //message.addmessage = "--- MESSAGES HERE ---";
    initcityview();
    //initmap();
};

function initmap() {
    //message.addmessage = opsys;

    cityclick = function(event) {
        alert('sdf');//checkpoly();
     };
    //c.addEventListener('click',cityclick);
    fn="";
    if (opsys=="unknown"){downtype = 'mousedown'; movetype = 'mousemove'; uptype = 'mouseup';}
    if (opsys!="unknown"){downtype = 'touchstart'; movetype = 'touchmove'; uptype = 'touchleave';}
    mapmousedown = c.addEventListener(downtype, function(event) {
    //mapmousedown = c.addEventListener('touchstart', function(event) {
//c.requestPointerLock = c.requestPointerLock || c.mozRequestPointerLock || c.webkitRequestPointerLock;
//c.requestPointerLock();

        mouseposoriginal = getmousepos(c,event);
        // only get mos position if not at the edge of the maps x/y
            //check for edge of the map

        fn = function(event) {
            event.preventDefault();
                //c.removeEventListener('click',cityclick)

                mousepos = getmousepos(c,event);
                leftorright = mousepos.xp - mouseposoriginal.xp;

            if (map.xcoord==0 && leftorright>0 && map.xpos >= 0){  // stop movement to the left
                map.xpos = 0;
               // do nothing
            } else {
                map.xpos = map.xpos + mousepos.xp - mouseposoriginal.xp;
            }
                map.ypos = map.ypos + mousepos.yp - mouseposoriginal.yp;
                mouseposoriginal = getmousepos(c,event);

            //check if moved the width/height of a tile and update x/y coords
            if (map.xpos>320){  // map moved to the right one tile
                map.xcoord = map.xcoord-1;
                map.ycoord = map.ycoord+1;
                map.xpos = 0;
            }
            if (map.xpos<-320){  // map moved to the left
                map.xcoord = map.xcoord+1;
                map.ycoord = map.ycoord-1;
                map.xpos = 0;
            }
            if (map.ypos>191){  // map moved to the left
                map.xcoord = map.xcoord-1;
                map.ycoord = map.ycoord-1;
                map.ypos = 0;
            }
            if (map.ypos<-191){  // map moved to the left
                map.xcoord = map.xcoord+1;
                map.ycoord = map.ycoord+1;
                map.ypos = 0;
            }
        }
        c.addEventListener(movetype, fn);

        c.addEventListener(uptype, function(event) {
            c.removeEventListener(movetype,fn)
    //c.addEventListener('click',cityclick);
        });
        c.addEventListener('mouseout', function(event) {
            c.removeEventListener(movetype,fn)
    //c.addEventListener('click',cityclick);
        });
    });

        displaycoords = function(event){   // display the mouse coords
            mousecoords = getmousepos(c,event);
            polytest = checkpoly(mousecoords);
        }
        c.addEventListener(movetype, displaycoords);

        checktouch = function(event){   // display the mouse coords
            mousecoords = getmousepos(c,event);
            polytest = checkpoly(mousecoords);
        }
        c.addEventListener(downtype, checktouch);

    bob = loadDoc2("getmap1.php");
    getmapdata(bob);
    //alert(bob);
    var refreshoverlaytimer = setInterval("loadphpxml('getoverlay1.php', getmapoverlaydata)",5000)  // (data to load, function to handle data)
    drawmap();
};

String.prototype.distance = function (char) {
    var index = this.indexOf(char);

    if (index === -1) {
        alert(char + " does not appear in " + this);
    } else {
        alert(char + " is " + (this.length - index) + " characters from the end of the string!");
    }
};
function getijjd() {
    //return document.getElementById(id);
}

function displaybuildinglist() {
    //buildid = document.getElementById("buildingdropdown");
    //buildid.style.display = "block";
}
mouseclicks = {
    xp : [],
    yp : []
}
function initcityview() {

    cityclick = function(event) {
        //alert('sdf');//checkpoly();
        mousepos = getmousepos(c,event);
        mouseclicks.xp.push((mousepos.xp * 2)+Math.abs(city.xpos));
        mouseclicks.yp.push((mousepos.yp * 2)+Math.abs(city.ypos));
        //mouseclicks.xp = ((mousepos.yp * 2)+Math.abs(city.ypos));
        //mouseclicks.yp = ((mousepos.yp * 2)+Math.abs(city.ypos));
        //displaybuildinglist(mouseclicks.xp, mouseclicks.yp);
     };
    c.addEventListener('click',cityclick);

    if (opsys=="unknown"){downtype = 'mousedown'; movetype = 'mousemove'; uptype = 'mouseup';}
    if (opsys!="unknown"){downtype = 'touchstart'; movetype = 'touchmove'; uptype = 'touchleave';}

    fn="";
    citymousedown = c.addEventListener(downtype, function(event) {

        //mousepos = getmousepos(c,event);
        //message.addmessage = mousepos.xp + ", " + mousepos.yp;
        mouseposoriginal = getmousepos(c,event);

        fn = function(event) {
            event.preventDefault();

                mousepos = getmousepos(c,event);
                leftorright = mousepos.xp - mouseposoriginal.xp;

                city.xpos = city.xpos + mousepos.xp - mouseposoriginal.xp;
            if (city.xpos >= -288){  // stop movement to the left
                city.xpos = -288;
                }
            if (city.xpos <= -1536){  // stop movement to the left
                city.xpos = -1536;
                }

                city.ypos = city.ypos + mousepos.yp - mouseposoriginal.yp;
            if (city.ypos >= -204){  // stop movement to the up
                city.ypos = -204;
                }
            if (city.ypos <= -835){  // stop movement to the up
                city.ypos = -835;
                }
                mouseposoriginal = getmousepos(c,event);

        }
        c.addEventListener(movetype, fn);

        c.addEventListener(uptype, function(event) {
            c.removeEventListener(movetype,fn)
        });
        c.addEventListener('mouseout', function(event) {
            c.removeEventListener(movetype,fn)
        });
    });

        displaycoords = function(event){   // display the mouse coords
            mousecoords = getmousepos(c,event);
        }
        c.addEventListener(movetype, displaycoords);

    drawcity();

}

function convertimage(img){

    //alert('image loaded');
    var buffer = document.createElement('canvas');
    var bufferctx = buffer.getContext('2d');

    buffer.width = img.width;
    buffer.height = img.height;
    //alert(img.width);
    //alert(img.height);

    bufferctx.drawImage(img, 0, 0);
    var imageData = bufferctx.getImageData(0,0,buffer.width, buffer.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
            if(data[i]+ data[i + 1] + data[i + 2] == 0){  // find black
                data[i + 3] = 0; // alpha
            }
        }

    bufferctx.putImageData(imageData, 0, 0);
    img.src = buffer.toDataURL('image/png');
    //alert('image converted');

}

function gotoxy(x,y){

    map.xpos = 0;
    map.ypos = 0;
    map.xcoord = x;
    map.ycoord = y;

}
grid = [];
function drawmap(){

    ctx.clearRect(0, 0, c.width, c.height);  // clear canvas
    ctx.save() ;
    ctx.scale(.5,.5);

    for(y=-4; y<10-4; y++){
    for(x=-4; x<10-4; x++){
        mapx = map.xcoord+x;
        mapy = map.ycoord+y;
        if (mapx<0 || mapy<0 || mapx>map.width-1 || mapy>map.height-1) {
            tileimage = 0;
            } else {
            tileimage = 1;
            tileimage = map.tile[mapx+(mapy*map.width)];
            }

        tilex = (x*162)-y*162 + (c.width/2)-162 + map.xpos;
        tiley = x*96 + y*96 + ((c.height/2)-96) + map.ypos + (192-images[tileimage].height);  // allign if mountain etc
    ctx.drawImage(images[tileimage], tilex, tiley);
    //ctx.drawImage(images[tileimage], tilex + (c.width/2)-162 + map.xpos, tiley + (c.height/2)-96 + map.ypos);

    message.xy(ctx, mapx+","+mapy, tilex + 160, tiley +91 - (192-images[tileimage].height));



    }
    }
    drawcities();
    ctx.restore();
    //draw shape
    //polyVerts.push(Vec2(443,268));
    //polyVerts.push(Vec2(507,231));
    //co = {x:[507],y:[231]}
    //ctx.moveTo(co.x[0],co.y[0]);

    grid = [];
    ctx.save() ;
    //ctx.scale(.5,.5);
    for(y=-4; y<10-4; y++){
    for(x=-4; x<10-4; x++){
        gridposx = (x*162)-y*162 + (c.width/2)-162 + map.xpos;
        gridposy = x*96 + y*96 + ((c.height/2)-96) + map.ypos;  // allign if mountain etc
    polyVerts = [];
    polyVerts.push(Vec2(gridposx+162, gridposy));
    polyVerts.push(Vec2(gridposx+324, gridposy+96));
    polyVerts.push(Vec2(gridposx+162, gridposy+192));
    polyVerts.push(Vec2(gridposx, gridposy+96));
    grid.push(polyVerts);
    }
    }
    for (z=0; z<100; z++){
    ctx.beginPath();
    ctx.moveTo(grid[z][0][0], grid[z][0][1]);
    for(v=1; v<4; v++){
    ctx.lineTo(grid[z][v][0], grid[z][v][1]);
    }
    ctx.lineTo(grid[z][0][0], grid[z][0][1]);
    ctx.stroke();
    }
    ctx.restore();

    drawtilehighlight();

    drawicons();
            //mousecoords = getmousepos(c,event);
            polytest = "poo";
            //polytest = checkpoly(mousecoords);

    message.xy(ctx,"hello world",100,300);

    message.addmessage = "MapXYgridOffset = " + map.xpos + "," + map.ypos;
    message.addmessage = "left or right = " + leftorright;
    message.addmessage = "MouseXY = " + mousecoords.xp + "," + mousecoords.yp;
    message.addmessage = "GridXY = " + polytest;
    message.addmessage = "map.XYcoord = " + map.xcoord+","+map.ycoord;
    message.list();        // display all messages in the list

    requestAnimationFrame(drawmap);

}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
function drawcity(){

    ctx.clearRect(0, 0, c.width, c.height);  // clear canvas
    ctx.save() ;
    ctx.scale(.5,.5);

    cityx = ((c.width/2)-162) + city.xpos;
    cityy = ((c.height/2)-96) + city.ypos;  // allign if mountain etc
    ctx.drawImage(images[500], cityx, cityy);

    ctx.restore();

    grid = [];
    ctx.save() ;

    gridposx = city.xpos;
    gridposy = city.ypos;  //

    polyVerts = [];
    polyVerts.push(Vec2(1735 + gridposx, 678 + gridposy));
    polyVerts.push(Vec2(1739 + gridposx, 282 + gridposy));
    polyVerts.push(Vec2(1957 + gridposx, 210 + gridposy));
    polyVerts.push(Vec2(2159 + gridposx, 302 + gridposy));
    polyVerts.push(Vec2(2153 + gridposx, 682 + gridposy));
    polyVerts.push(Vec2(1957 + gridposx, 800 + gridposy));
    grid.push(polyVerts);
    polyVerts = [];
    polyVerts.push(Vec2(1385 + gridposx, 657 + gridposy));
    polyVerts.push(Vec2(1519 + gridposx, 703 + gridposy));
    polyVerts.push(Vec2(1395 + gridposx, 785 + gridposy));
    polyVerts.push(Vec2(1219 + gridposx, 731 + gridposy));
    grid.push(polyVerts);
    polyVerts = [];
    polyVerts.push(Vec2(1009 + gridposx, 853 + gridposy));
    polyVerts.push(Vec2(1141 + gridposx, 907 + gridposy));
    polyVerts.push(Vec2(1013 + gridposx, 1017 + gridposy));
    polyVerts.push(Vec2(867 + gridposx, 943 + gridposy));
    grid.push(polyVerts);
    polyVerts = [];
    polyVerts.push(Vec2(1691 + gridposx, 923 + gridposy));
    polyVerts.push(Vec2(1827 + gridposx, 979 + gridposy));
    polyVerts.push(Vec2(1719 + gridposx, 1039 + gridposy));
    polyVerts.push(Vec2(1567 + gridposx, 993 + gridposy));
    grid.push(polyVerts);

    for (z=0; z<grid.length; z++){
    ctx.beginPath();
    ctx.moveTo(grid[z][0][0], grid[z][0][1]);
    for(v=1; v<grid[z].length; v++){
    ctx.lineTo(grid[z][v][0], grid[z][v][1]);
    }
    ctx.lineTo(grid[z][0][0], grid[z][0][1]);
    ctx.stroke();
    }
    ctx.restore();

    //drawtilehighlight();
    coordtext = ""
    for (m=0; m<mouseclicks.xp.length; m++){                          //mouseclicks.xp.length
        message.addmessage = mouseclicks.xp[m] + ", " + mouseclicks.yp[m];
    coordtext += "polyVerts.push(Vec2("+mouseclicks.xp[m]+" + gridposx, "+mouseclicks.yp[m]+" + gridposy));<br>";
    }
        document.getElementById("coords").innerHTML = coordtext
   // message.addmessage = "left or right = " + leftorright;
    message.addmessage = "CityXYgridOffset = " + city.xpos + "," + city.ypos;
    message.addmessage = "MouseXY = " + mousecoords.xp + "," + mousecoords.yp;
    polytest = checkpoly(mousecoords);
    message.addmessage = "GridXY = " + polytest;
    //message.addmessage = "map.XYcoord = " + map.xcoord+","+map.ycoord;
    message.list();        // display all messages in the list
    //city.xpos--;
    requestAnimationFrame(drawcity);

}
//--------------------------------------------------------------------
//--------------------------------------------------------------------
message = {
    set addmessage(text){
        this.messagelist.push(text);
    },

    list :  function (){
            messagectx.clearRect(0, 0, messagecanvas.width, messagecanvas.height);  // clear canvas
            messagectx.font = '12pt Calibri ';
            messagectx.fillStyle = 'black';
            for (x=0; x<this.messagelist.length; x++){
                messagectx.fillText(this.messagelist[x], 10, (x+1)*20);
            }
            this.messagelist.length = 1;  //clear list except "message here" text
    },

    messagelist : [],

    xy : function(ctx, text, x, y, fontcolour, backcolour){    //works a treat
        if (backcolour=='black'){
        ctx.save();
        ctx.font = 'bold 28pt Calibri';
        textwidth = ctx.measureText(text).width; //parseInt(ctx.measureText(txt).width);
        ctx.fillStyle = 'black';
        ctx.fillRect(x-5, y-28, textwidth+5, 30);
        ctx.restore();
         }
        ctx.save();
        ctx.font = 'bold 28pt Calibri';
        ctx.fillStyle = 'white';
        ctx.fillText(text, x, y);
        ctx.restore();
    },
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------

function drawcities(){

    for(y=-4; y<10-4; y++){
    for(x=-4; x<10-4; x++){
        mapx = map.xcoord+x;
        mapy = map.ycoord+y;
        if (mapx<0 || mapy<0 || mapx>map.width-1 || mapy>map.height-1) {
            tileimage = 0;
            } else {
            tileimage = map.overlay.tile[mapx+(mapy*map.width)];
            }

        if (tileimage){ //if there is something at this location, draw it
    tilewidth = images[tileimage].width;
    tileheight = images[tileimage].height;
        tilex = (x*162)-y*162;
        tiley = x*96 + y*96 + (192-images[tileimage].height);  // allign if mountain etc

    ctx.drawImage(images[tileimage], tilex + (c.width/2)-(tilewidth/2) + map.xpos, tiley + (c.height/2)-96 + map.ypos + (192-tileheight));
        }
    }
    }
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
mapposition=-1;
gridx=0;
gridy=0;
tilehighlightalpha = 1;             // 0=full trans - 1 = no trans
tilehighlightalpha = parseFloat(tilehighlightalpha).toFixed(1);
tilehighlightalphalightdark = 1;    // 0=light - 1=dark
tilehighlightalphareset = gridx+gridy;
function drawtilehighlight(){
    ctx.save() ;
    ctx.scale(.5,.5);
    message.addmessage = "tilehighlightAlpha = " + tilehighlightalpha;
    ctx.globalAlpha = tilehighlightalpha;
        if (mapposition>=0){ //if there is something at this location, highlight it
            tilex = ((gridx-map.xcoord)*162)-((gridy-map.ycoord)*162) + ((c.width/2)-162) + map.xpos;
            tiley = ((gridx-map.xcoord)*96) + ((gridy-map.ycoord)*96) + ((c.height/2)-96) + map.ypos;  // allign if mountain etc

            ctx.drawImage(images[400], tilex, tiley);
        ctx.restore();
    ctx.save() ;
    ctx.scale(.5,.5);
            message.xy(ctx, "X:" + gridx + " Y:" + gridy, tilex+90, tiley+200,'white','black');
        }
        ctx.restore();
        if (tilehighlightalphalightdark==1){
            tilehighlightalpha = (tilehighlightalpha*10 - .1*10) / 10;
            if (tilehighlightalpha<=0){
                tilehighlightalpha=0;    // set it to min alpha incase -.12 etc
                tilehighlightalphalightdark=0;
            }

        } else {
            tilehighlightalpha = (tilehighlightalpha*10 + .1*10) / 10;
            if (tilehighlightalpha>=1){
                tilehighlightalpha=1;     // set it to max alpha incase 1.2 etc
                tilehighlightalphalightdark=1;
            }
        }
        if (tilehighlightalphareset != gridx+gridy){
            tilehighlightalpha=1;
            tilehighlightalphalightdark=1;
            tilehighlightalphareset = gridx+gridy;
        }
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

function drawicons(){

    iconx = c.width-images[100].width;
    icony = 200;
    ctx.drawImage(images[100], iconx, icony);

    //canvasheaderctx.clearRect(0, 0, canvasheader.width, canvasheader.height);  // clear canvas
    //canvasheaderctx.drawImage(images[300], 0, 0);
    ctx.drawImage(images[300], 0, 0);

}

//----------------- detect which tile we are clicking/pessing on
function Vec2(x, y) {
  return [x*.5, y*.5]
}
Vec2.nsub = function (v1, v2) {
  return Vec2(v1[0]-v2[0], v1[1]-v2[1])
}
// aka the "scalar cross product"
Vec2.perpdot = function (v1, v2) {
  return v1[0]*v2[1] - v1[1]*v2[0]
}

// Determine if a point is inside a polygon.
//
// point     - A Vec2 (2-element Array).
// polyVerts - Array of Vec2's (2-element Arrays). The vertices that make
//             up the polygon, in clockwise order around the polygon.
//
function coordsAreInside(point, polyVerts) {
  var i, len, v1, v2, edge, x
  // First translate the polygon so that `point` is the origin. Then, for each
  // edge, get the angle between two vectors: 1) the edge vector and 2) the
  // vector of the first vertex of the edge. If all of the angles are the same
  // sign (which is negative since they will be counter-clockwise) then the
  // point is inside the polygon; otherwise, the point is outside.
  for (i = 0, len = polyVerts.length; i < len; i++) {
    v1 = Vec2.nsub(polyVerts[i], point)
    v2 = Vec2.nsub(polyVerts[i+1 > len-1 ? 0 : i+1], point)
    edge = Vec2.nsub(v1, v2)
    // Note that we could also do this by using the normal + dot product
    x = Vec2.perpdot(edge, v1)
    // If the point lies directly on an edge then count it as in the polygon
    if (x < 0) { return polyVerts.length }
  }
  return "hello";
}

function checkpoly(mousecoords){
    mapposition=-1;
    gridx=-1;
    gridy=-1;
    point=Vec2(mousecoords.xp*2,mousecoords.yp*2);
    //alert('hmmm');

    for (g=0; g<grid.length; g++) { //loop through grid
    colly = coordsAreInside(point, grid[g]);
        if (colly=="hello"){
            // this works a charm
            colly = "grid";
            return g;
            gridy = parseInt(g/10)-4+map.ycoord;
            gridx = g-(parseInt(g/10))-(parseInt(g/10)*10)+parseInt(g/10)-4+map.xcoord;    //grid is 10x10
            mapposition = (gridy*map.width)+gridx;
            return gridx + "," + gridy + " - pos = " + mapposition;  //+"-"+(map.xcoord)+","+(map.ycoord);
        }
    }
    return colly;

    //alert(colly);
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

function tasks() {    // this one doesnt wait for data    task,callback
    alert(arguments.length);
    var args = Array.slice(arguments);
    alert(args);
    task = args[0];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('taskstext').innerHTML = this.responseText;
            //callback(this);
        }
    };
    var parameters = "whichtask="+task;
    parameters += "&xcoord=5";
    xhttp.open("POST", "tasks.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhttp.send(parameters);
}
//--------------------------------------------------------------------
//--------------------------------------------------------------------

</script>
</head>

<body>
    <div id=coords>coords here</div>
    <div id=test>text goes here </div>
    <div id=map>map goes here

    <input type=button onclick=checkpoly()>
    <input type=button value=goto onclick=loadDoc()>
    <br>
    <input type=button value=tasks jack=5 onclick="tasks('insertmonster',this.jack,2)">
    <span id=taskstext>here</span>

    <canvas id="canvas"
    width="900"
    height="600"
    style="border: 1px solid black;
    z-index: 1;
    position:absolute;
    left:0px;
    top:125px;"
    >
    </canvas>

    <canvas id="canvasheader"
    width="900"
    height="600"
    style="border: 1px solid black;
    z-index: 0;
    position:absolute;
    opacity:0.5;
    left:0px;
    top:125px;"
    >
    </canvas>

    <canvas id="messagecanvas"
    width="300"
    height="600"
    style="border: 1px solid black;
    z-index: 0;
    position:absolute;
    left:905px;
    top:125px;"
    >
    </canvas>

    </div>

    <div id=buildingdropdown style="display:none;position:absolute; left:200px; top200px">buildings</div>


</body>
</html>