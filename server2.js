// server.js
// where your node app starts
console.log("hello world");
// init project
const express = require('express');
//import * as express from 'express';

const app = express();
var expressWs = require('express-ws')(app);

// var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('./'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

//------------------
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
//---------------------
var clients = [];
var messageList = [];
//---------------------
app.ws('/', function(ws, req) {
    clients.push(ws);
    console.log('socket', req.testing);
    console.log("connected??? " + clients.length);
    sendMessageHistory(ws);
    //sendAll("new user has joined the chat");
    ws.send("Welcome to the chat.");
    ws.on('message', function(msg) {
      try {
        let parsedmsg = JSON.parse(msg);
        clients[clients.length-1].userid = parsedmsg.userid;
        sendAll(msg);
        messageList.push(msg);
        //msg = JSON.parse(msg);
        // console.log(msg.length);
        // console.log(msg[0].action);
        // ws.emit(msg.action, 'listId')
      } catch (err) {
        //msg = "not valid JSON";
        //console.log(msg);
        sendAll(msg);
      }
    });

    ws.onclose = function(){
        //socketstate = 0
        ws.close()
    };

    ws.on('get-list', function(msg) {
        console.log(msg);
        ws.send("hello fromdddddddddddd the server");
    });

    console.log('socket', req.testing);
    //ws.send("hello from the server again");
    //ws.emit('get-list', 'listId')
});

app.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
    ws.send("hello from the echo server");
  });
  // console.log('socket', req.testing);
  // ws.send("hello from the server again");
});

function sendMessageHistory(ws) {
    for(let x=0; x<messageList.length; x++) {
        ws.send(messageList[x]);
    }
}
function sendAll(message) {
  for (var i=0; i<clients.length; i++) {
      if(clients[i].readyState != 3) {
        clients[i].send(message); //clients[i].userid + ": " + 
      }
  }
}

//----------------------------------------------------------------------------------------------------
// app.get('/checkLogin', urlencodedParser, function(request, response) {
//   let username = request.query.username;
//   //paramsFunction = this.smellpoop;
//   let bob = poopy.hellopoop4();  // this is working - module.export is set to the class
//   var ppp = "d";
//   if(paramsFunction == "smellpoop") {
//     ppp = poopy.smellpoop();  // this is not working
//   }
//   let c = new poopy.cat2();
  
//   //let j = fs.readFile('streetview.json', 'utf8');
//   //console.log("j = " );
//   //j = JSON.parse(j);
  
//   response.send("hello from the poop - calling " + paramsFunction + "\n" + "which will - " + ppp + "\n" + poopy.cat.type + "\n" +
//                c.color + "\n");

// });
//--------------------------------------------------------------------------
// listen for requests :)
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


