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
	setInterval(function() {
		var current;
		checkForNewData(function(current) {
			if(current > count) {
				if(count > 0) {
					emitData();
				}
				count = current;
			}
		});
		
    }, 1000);
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

//Function that select values from the table and emits data to indexSensori.html
function emitData() {
	con.query("SELECT * FROM `valori`", function (err, result, fields) {
		getObjAsString(result)
		if (err) throw err;
	});
}
function getObjAsString(result) {
	var str = "";
	for(val in result) {
		str = str + result[val].IdCanarin;
		str = str + "***" + result[val].Value;
		str = str + ";";
	}
	str = str.slice(0, -1);
	console.log(result)
	namespace.emit('hi', str);
}
