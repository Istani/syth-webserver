
var debug = require("@istani/debug")(require('./package.json').name);
debug.log("Started");

var PORT = 5000;


var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();
var server = require("http").createServer(app);

// Einstellungen für den Express Webserver
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));


app.use(function(req, res, next) {
  // Damit wir eine Variable haben wo wir spaeter rein schreiben können
  if (typeof(req.custom_data) == "undefined") {req.custom_data={};}

  debug.log("Request: " + req.url);
  next();
});

// Static File Routen
app.use('/rpg/overlay/', express.static(path.join(__dirname, '../../packages/web-rp-frontend/')));

// Import Routen von Packages
var RP_API = require("@syth/web-api-rpg");
app.use('/rpg/api/:channel/', RP_API);

// Routen des Express Webserver
app.get('*', (req, res) => {
  res.send({ error: 'Wrong URL' });
})

server.listen(PORT, () => debug.log("Webinterface running! Port: " + PORT));