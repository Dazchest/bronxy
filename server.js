// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('/app/'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});


//----------------------------------------------------------------------------------------------------
app.get('/checkLogin', urlencodedParser, function(request, response) {
  let username = request.query.username;
  //paramsFunction = this.smellpoop;
  let bob = poopy.hellopoop4();  // this is working - module.export is set to the class
  var ppp = "d";
  if(paramsFunction == "smellpoop") {
    ppp = poopy.smellpoop();  // this is not working
  }
  let c = new poopy.cat2();
  
  //let j = fs.readFile('streetview.json', 'utf8');
  //console.log("j = " );
  //j = JSON.parse(j);
  
  response.send("hello from the poop - calling " + paramsFunction + "\n" + "which will - " + ppp + "\n" + poopy.cat.type + "\n" +
               c.color + "\n");

});
//--------------------------------------------------------------------------
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


