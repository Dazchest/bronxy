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
//------------------
app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });

// app.get('/', function(req, res, next){
// console.log('get route', req.testing);
// res.end();
// });

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    console.log('get route', req.testing);
  response.sendFile(__dirname + '/index.html');
});


//---------------------
var clients = [];
var messageList = [];
//---------------------
app.ws('/', function(ws, req) {
    clients.push(ws);
    //sendMessageHistory(ws); // send the message history when first connected to chat
    //ws.send("Welcome to the chat.");
    //console.log("hello");
    ws.on('message', function(msg) {        // check for a data message
      //console.log(msg);
      // console.log(msg.length);
      // ws.send(msg);
      //return;
      console.log("receiving message");
      try {
        let parsedmsg = JSON.parse(msg);    // get the whole message (emitname, id, message etc)
        if(parsedmsg.emitName) {
            ws.emit(parsedmsg.emitName, msg, parsedmsg);
        }
      } catch (err) {
        sendAll(msg);

      }
    });

    ws.onclose = function(){
        //socketstate = 0
        ws.close()
    };

    ws.on('chat', function(msg, parsedmsg) {
        //console.log(msg, parsedmsg);
        sendAll(msg);
        messageList.push(msg);
    });
    ws.on('chatimage', function(msg, parsedmsg) {
        //console.log(msg);
        // sendAll(msg);
        // messageList.push(msg);
        sendAll(msg);
        //ws.send(msg);
    });

});



function sendMessageHistory(ws) {
    for(let x=0; x<messageList.length; x++) {
        ws.send(messageList[x]);
    }
}
function sendAll(message) {
  for (var i=0; i<clients.length; i++) {
      if(clients[i].readyState != 3) {
        clients[i].send(message);
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
const listener = app.listen(3005, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


