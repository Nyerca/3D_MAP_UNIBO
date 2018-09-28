var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser= require('body-parser');
var express = require('express');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res) {
   res.sendFile('index.html', { root: __dirname });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "canarin",
  password: "123abc",
  database: "sensori"
});

con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});

var count = 0 //Number of values read
var namespace = io.of('/mySensorNamespace'); //To set up a custom namespace, we can call the ‘of’ function on the server side
namespace.on('connection', function(socket) { //Executed everytime someone connects to localhost:3000
	emitData();
   //console.log('someone connected');
});

http.listen(3000, function() {
   console.log('listening on localhost:3000');
});

//Function that checks for new deta into the table
function checkForNewData (callback) {
  con.query("SELECT COUNT(*) AS num FROM `valori`", function (err, result, fields) {
    if (err) throw err;
	callback(result[0].num); //callback function
  });
}

var interval;
var str = "", max = "", min = "";
function check() {
	if(str.length > 0 && max.length > 0 && min.length > 0) {
		var vals = { 
			str: str,
			max: max,
			min: min,
		}
		str = "", max = "", min = "";
		namespace.emit('hi', vals);
		//console.log("emit");
		clearInterval(interval);
	}
	
}


//Function that select values from the table and emits data to indexSensori.html
function emitData() {
	
	con.query("SELECT * FROM `temp_avg`", function (err, result, fields) {
		
		for(val in result) {
			str = str + result[val].media;
			str = str + "***" + result[val].Giorno;
			str = str + "***" + result[val].IdCanarin;
			str = str + ";";
		}
		str = str.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT MAX(Value) AS Max FROM `valori`", function (err, result, fields) {
		for(val in result) {
			max = max + result[val].Max;
			max = max + ";";
		}
		max = max.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT MIN(Value) AS Min FROM `valori`", function (err, result, fields) {
		for(val in result) {
			min = min + result[val].Min;
			min = min + ";";
		}
		min = min.slice(0, -1);
		if (err) throw err;
	});
	
	interval = setInterval(check, 250);
}


