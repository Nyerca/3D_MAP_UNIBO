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
  database: "db_unibo"
});
var con2 = mysql.createConnection({
  host: "localhost",
  user: "canarin",
  password: "123abc",
  database: "sensori"
});

con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});
con2.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});

var IdEntrance = 1;

var dim;
var count = 0 //Number of values read
var ind = 0;
var opendata = [];
var singleData = "";
var namespace = io.of('/mySensorNamespace'); //To set up a custom namespace, we can call the ‘of’ function on the server side
namespace.on('connection', function(socket) { //Executed everytime someone connects to localhost:3000
emitSensData();
setInterval(function() {
		var current;
		checkForNewData(function(current) {
			if(current > count) {
				if(count > 0) {
					emitSensData();
				}
				count = current;
			}
		});
		
    }, 60000);
	
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

//Function that checks for new deta into the table
function checkForNewData (callback) {
  con2.query("SELECT COUNT(*) AS num FROM `valori`", function (err, result, fields) {
    if (err) throw err;
	callback(result[0].num); //callback function
  });
}


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
var interval2;
var temp_avg_val="";
var hum_avg_val="";
var qual_avg_val="";
	var temp_max_val="";
	var temp_min_val="";
function checkSens() {
	if(temp_avg_val.length > 0 && temp_max_val.length > 0 && temp_min_val.length > 0 && hum_avg_val.length > 0&& qual_avg_val.length > 0) {
			var vals_storico_temp = { 
			temp_avg_val: temp_avg_val, 
			temp_min_val: temp_min_val, 
			temp_max_val: temp_max_val, 
			hum_avg_val: hum_avg_val,
			qual_avg_val: qual_avg_val,
		}
		
		
		temp_avg_val = "", temp_max_val = "",temp_min_val = "";
		hum_avg_val = "";
		qual_avg_val = "";
		namespace.emit('temp_storico', vals_storico_temp);
		console.log("emit2");
		clearInterval(interval2);
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


function emitSensData() {
	
	con2.query("SELECT * FROM `valori` ORDER  BY IdValue DESC LIMIT 3", function (err, result, fields) {
		var sensor_val="";
		for(val in result) {
		sensor_val = sensor_val + result[val].IdCanarin;
		sensor_val = sensor_val + "***" + result[val].Value;
		sensor_val = sensor_val + ";";
	}
	sensor_val = sensor_val.slice(0, -1);
	namespace.emit('realtime_vals', sensor_val);
		if (err) throw err;
	});

	
	
	
	 con2.query("SELECT * FROM `temp_avg`", function (err, result, fields) {
		
		for(val in result) {
			temp_avg_val = temp_avg_val + result[val].media;
			temp_avg_val = temp_avg_val + "***" + result[val].Giorno;
			temp_avg_val = temp_avg_val + "***" + result[val].IdCanarin;
			temp_avg_val = temp_avg_val + ";";
		}
		temp_avg_val = temp_avg_val.slice(0, -1);
		if (err) throw err;
	});
	
	con2.query("SELECT MAX(Value) AS Max FROM `valori`", function (err, result, fields) {
		for(val in result) {
			temp_max_val = temp_max_val + result[val].Max;
			temp_max_val = temp_max_val + ";";
		}
		temp_max_val = temp_max_val.slice(0, -1);
		console.log("MAX: " + temp_max_val);
		if (err) throw err;
	});

	con2.query("SELECT MIN(Value) AS Min FROM `valori`", function (err, result, fields) {
		
		for(val in result) {
			temp_min_val = temp_min_val + result[val].Min;
			temp_min_val = temp_min_val + ";";
		}
		temp_min_val = temp_min_val.slice(0, -1);
		if (err) throw err;
	});
	
 con2.query("SELECT * FROM `hum_avg`", function (err, result, fields) {
		
		for(val in result) {
			hum_avg_val = hum_avg_val + result[val].media;
			hum_avg_val = hum_avg_val + "***" + result[val].Giorno;
			hum_avg_val = hum_avg_val + ";";
		}
		hum_avg_val = hum_avg_val.slice(0, -1);
		if (err) throw err;
	});
	
	 con2.query("SELECT * FROM `qual_avg`", function (err, result, fields) {
		
		for(val in result) {
			qual_avg_val = qual_avg_val + result[val].media;
			qual_avg_val = qual_avg_val + "***" + result[val].Giorno;
			qual_avg_val = qual_avg_val + "***" + result[val].Ora;
			qual_avg_val = qual_avg_val + ";";
		}
		qual_avg_val = qual_avg_val.slice(0, -1);
		if (err) throw err;
	});
	
		interval2 = setInterval(checkSens, 250);
		
		
	
}

