var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser= require('body-parser');
var express = require('express');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res) {
   res.sendFile('prova.html', { root: __dirname });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "123abc",
  database: "db_map"
});

con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});

var IdEntrance = 1;

var dim;
var ind = 0;
var opendata = [];
var singleData = "";
var namespace = io.of('/mySensorNamespace'); //To set up a custom namespace, we can call the ‘of’ function on the server side
namespace.on('connection', function(socket) { //Executed everytime someone connects to localhost:3000
    socket.on('deleteValue', function(data) {
		console.log(data[2]);
		
		con.query("SELECT IdDataSpace, Piano FROM `view_content` WHERE Nome IN (SELECT Nome FROM informazioni WHERE IdInfo = 1)", function (err, result, fields) {
		for(val in result) {
				singleData = singleData + result[val].IdDataSpace;
				singleData = singleData + "***" + result[val].Piano;
				singleData = singleData + "***" + data[2];
				singleData = singleData + "*** " + data[1].substring(11);;
				singleData = singleData + ";";
		}
		ind = ind + 1;
		if(ind == dim) singleData = singleData.slice(0, -1);
		if (err) throw err;
		});
	});
	socket.on('dimValue', function(data) {
		dim = data;
	});
	emitData();
   //console.log('someone connected');
});


http.listen(3000, function() {
   console.log('listening on localhost:3000');
});


var interval;
var info = "", figura = "", datacategory = "", pin = "", css = "";
function check() {
	if(info.length > 0 && figura.length > 0 && datacategory.length > 0 && pin.length > 0 && css.length > 0) {
		var vals = { 
			info: info, 
			figura: figura, 
			datacategory: datacategory, 
			pin: pin,
			css: css,
			opendata : singleData,
		}
		info = "", figura = "", datacategory = "", pin = "", dataspace = "", singleData="", css="";
		namespace.emit('hi', vals);
		console.log("emit");
		clearInterval(interval);
	}
	
}

//Function that select values from the table and emits data to indexSensori.html
function emitData() {
	
	con.query("SELECT * FROM `entrancecss` WHERE IdEntrance = " + IdEntrance, function (err, result, fields) {
		for(val in result) {
			css = css + result[val].Css;
			css = css + ";";
		}
		css = css.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `view_content` WHERE IdEntrance = " + IdEntrance, function (err, result, fields) {
		for(val in result) {
			info = info + result[val].IdDataSpace;
			info = info + "***" + result[val].IdDataCategory;
			info = info + "***" + result[val].Nome;
			info = info + "***" + result[val].Descrizione;
			info = info + "***" + result[val].Posti;
			info = info + "***" + result[val].Piano;
			info = info + ";";
		}
		info = info.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `view_svg`", function (err, result, fields) {
		for(val in result) {
			figura = figura + result[val].IdDataSpace;
			figura = figura + "***" + result[val].Tipo;
			figura = figura + "***" + result[val].Class;
			figura = figura + "***" + result[val].x;
			figura = figura + "***" + result[val].y;
			figura = figura + "***" + result[val].width;
			figura = figura + "***" + result[val].height;
			figura = figura + "***" + result[val].Points;
			figura = figura + "***" + result[val].Piano;
			figura = figura + "***" + result[val].Colore;
			figura = figura + ";";
			
		}
		figura = figura.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `datacategory`", function (err, result, fields) {
		for(val in result) {
			datacategory = datacategory + result[val].IdDataCategory;
			datacategory = datacategory + "***" + result[val].Nome;
			datacategory = datacategory + "***" + result[val].Colore;
			datacategory = datacategory + "***" + result[val].Icon;
			datacategory = datacategory + ";";
		}
		datacategory = datacategory.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `level_pins` WHERE IdEntrance = " + IdEntrance, function (err, result, fields) {
		for(val in result) {
			pin = pin + result[val].IdDataSpace;
			pin = pin + "***" + result[val].IdFigura;
			pin = pin + "***" + result[val].IdDataCategory;
			pin = pin + "***" + result[val].Icon;
			pin = pin + "***" + result[val].Top_distance;
			pin = pin + "***" + result[val].Left_distance;
			pin = pin + "***" + result[val].Piano;
			pin = pin + ";";
		}
		pin = pin.slice(0, -1);
		if (err) throw err;
	});

	
	
	 interval = setInterval(check, 250);
	
}

