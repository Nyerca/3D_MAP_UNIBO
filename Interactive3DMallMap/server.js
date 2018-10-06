var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser= require('body-parser');
var express = require('express');
var path = require('path');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/kiosk', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '/../../demo/Interactive3DMallMap/') });
});



var con = mysql.createConnection({
	host: "localhost",
	user: "admin",
	password: "123abc",
	database: "db_unibo"
});
var con2 = mysql.createConnection({
	host: "canarin3-cluster-1.cluster-ro-ces11ksjxlw4.eu-central-1.rds.amazonaws.com",
	port     : "3306",
	user: "cesena",
	password: "cesensor",
	database: "canarinProj"
});


con.connect(function(err) {
	if (err) throw err;
});

var num_canarin = 0;
var array_canarin = [];

con2.connect(function(err) {
	if (err) throw err;

	con2.query("SELECT id FROM `cesena_nodes`", function (err, result, fields) {

		for(val in result) {
			array_canarin[num_canarin++] = "" + result[val].id;
		}
		if (err) throw err;
	});
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
	var o_data = "";
	con.query("SELECT NomeTabellaOpenData FROM `toopendata`", function (err, result, fields) {
		for(val in result) {
			o_data = o_data + result[val].NomeTabellaOpenData;
			o_data = o_data + ";";
		}
		o_data = o_data.slice(0, -1);
		if (err) throw err;
	});
	namespace.emit('o_data', o_data);
	
	setInterval(function() {
		var current;
		emitSensData();
		checkForNewData(function(current) {
			if(current > count) {
				if(count > 0) {
					emitSensData();
				}
				count = current;
			}
		});

    }, 60000);
	emitStoricoData();
	setInterval(function() {
		emitStoricoData();

    }, 60000);

    socket.on('opendata_emit', function(data) {
		console.log(data[3]);

		con.query("SELECT IdDataSpace, Piano FROM `view_content` WHERE Nome IN (SELECT Nome FROM informazioni WHERE IdInfo IN ( SELECT IdInfo FROM toopendata WHERE NomeTabellaOpenData = '" + data[3] + "'))", function (err, result, fields) {
		for(val in result) {
				singleData = singleData + result[val].IdDataSpace;
				singleData = singleData + "***" + result[val].Piano;
				singleData = singleData + "***" + data[2];
				singleData = singleData + "*** " + data[1].substring(11);
				singleData = singleData + "*** " + data[0].substring(11);
				singleData = singleData + ";";
		}
		ind = ind + 1;
		if(ind == dim) singleData = singleData.slice(0, -1);
		if (err) throw err;
		});
	});
	socket.on('dimValue', function(data) {
		console.log("DIM");
		dim = data;
	});

	emitData();
   //console.log('someone connected');
});

//Function that checks for new deta into the table
function checkForNewData (callback) {
	con2.query("SELECT COUNT(*) AS num FROM `cesena_data`", function (err, result, fields) {
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
	if(info.length > 0 && figura.length > 0 && datacategory.length > 0 && pin.length > 0 && css.length > 0 && singleData.length > 0) {

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
		console.log("emit MAPPA");
		clearInterval(interval);
	}
}

var interval2;
var day_avg_val="";
var hum_avg_val="";
var hour_avg_val="";
var temp_max_val="";
var temp_min_val="";

function checkSens() {
	if(day_avg_val.length > 0 && hour_avg_val.length > 0) {
			var vals_storico_temp = {
			day_avg_val: day_avg_val,
			qual_avg_val: hour_avg_val,
		}


		day_avg_val = "", temp_max_val = "",temp_min_val = "";
		hum_avg_val = "";
		hour_avg_val = "";
		namespace.emit('storico', vals_storico_temp);
		console.log("HO NUOVI VALORIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
		clearInterval(interval2);
	}
}

//Function that select values from the table and emits data to indexSensori.html
function emitData() {
	console.log("emitting");
	con.query("SELECT * FROM `entrancecss` WHERE IdEntrance = " + IdEntrance, function (err, result, fields) {
		for(val in result) {
			css = css + result[val].Css;
			css = css + ";";
		}
		css = css.slice(0, -1);
		if (err) throw err;
	});
	info = "";
	con.query("SELECT * FROM `view_content` WHERE IdEntrance = " + IdEntrance + " order by IdDataCategory, Nome ", function (err, result, fields) {
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

    datacategory = "";

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
/*
var num_canarin = 0;
var array_canarin = [];
*/
var comp = 0;
function emitSensData() {
	var query_realtime = "";

		for(var k = 0; k < num_canarin; k++) {
			query_realtime += "(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '" + array_canarin[k] + "' ORDER BY server_timestamp DESC LIMIT 6)";
			if(k<num_canarin -1) query_realtime += " UNION ";

		}
		var now_day = new Date();
		now_day.setDate(now_day.getDate() - 1);


		var startOfDay_day = new Date(now_day.getFullYear(), now_day.getMonth(), now_day.getDate());
		var timestamp_day = startOfDay_day / 1000;

		//con2.query("(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '43152552221341348' AND server_timestamp > " + timestamp_day + " ORDER BY server_timestamp DESC LIMIT 6)", function (err, resultx, fields) {
	con2.query("(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '4315255231541348' AND server_timestamp > " + timestamp_day + " ORDER BY server_timestamp DESC LIMIT 6)UNION(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '4315255231839348' AND server_timestamp > " + timestamp_day + " ORDER BY server_timestamp DESC LIMIT 6)UNION(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '43152552143841348' AND server_timestamp > " + timestamp_day + " ORDER BY server_timestamp DESC LIMIT 6)UNION(SELECT node_id, value_num, type_id FROM `cesena_data` WHERE type_id BETWEEN 4 AND 9 AND node_id = '43152552221341348' AND server_timestamp > " + timestamp_day + " ORDER BY server_timestamp DESC LIMIT 6)", function (err, resultx, fields) {

		var sensor_val = "";
		for(val in resultx) {
		sensor_val = sensor_val + resultx[val].node_id;
		sensor_val = sensor_val + "***" + resultx[val].value_num;
		sensor_val = sensor_val + "***" + resultx[val].type_id;
		sensor_val = sensor_val + ";";
		console.log("RRR: " + sensor_val);
		}

		if (err) throw err;
		sensor_val = sensor_val.slice(0, -1);


	namespace.emit('realtime_vals', sensor_val);
	});

}

function emitStoricoData () {
var query_stor1 = "", query_stor2 = "";
var i;
	var t = 0;
for(i= 0; i < 7; i++) {
	var now = new Date();
		now.setDate(now.getDate() - i);
		var after = new Date();
		after.setDate(now.getDate() + 1);


		var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		var endOfDay = new Date(after.getFullYear(), after.getMonth(), after.getDate());
		var timestamp = startOfDay / 1000;
		var timestamp2 = endOfDay / 1000;

	query_stor1 += "(SELECT AVG(value_num) As media, type_id, server_timestamp FROM `cesena_data` WHERE type_id BETWEEN 4 AND 6 AND server_timestamp BETWEEN " + timestamp + " AND " + timestamp2 + " GROUP BY type_id)";
			if(i < 6) query_stor1 += " UNION ";





for(var j= 0; j < 24; j++) {
	var nowh = new Date();
	nowh.setDate(nowh.getDate() - i);
var startOfDay2 = new Date(nowh.getFullYear(), nowh.getMonth(), nowh.getDate());
startOfDay2.setHours(j);
var timestamp3 = startOfDay2 / 1000;
var timestamp4 = (startOfDay2 / 1000) + 3600;

query_stor2 += "(SELECT AVG(value_num) As media, type_id, server_timestamp FROM `cesena_data` WHERE type_id BETWEEN 7 AND 9 AND server_timestamp BETWEEN " + timestamp3 + " AND " + timestamp4 + " GROUP BY type_id)";
			if(!(j == 23 && i == 6)) query_stor2 += " UNION ";

		/*
	con2.query("SELECT AVG(value_num) As media, type_id FROM `cesena_data` WHERE type_id BETWEEN 7 AND 9 AND server_timestamp BETWEEN " + timestamp3 + " AND " + timestamp4 + " GROUP BY type_id", function (err, result, fields) {
		for(val in result) {
			hour_avg_val = hour_avg_val + result[val].media;
			hour_avg_val = hour_avg_val + "***" + now.getDate + "/" + now.getMonth;
			hour_avg_val = hour_avg_val + "***" + result[val].type_id;
			hour_avg_val = hour_avg_val + ";";
		}
		if (err) throw err;
	});
	*/
}


    }
	//("query_stor2" + query_stor2);
	con2.query("" + query_stor1, function (err, result, fields) {

		for(val in result) {
			day_avg_val = day_avg_val + result[val].media;

			var now2 = new Date(result[val].server_timestamp*1000);

			var month_n = now2.getMonth() + 1; //months from 1-12
            var day_n = now2.getDate();
            var year_n = now2.getFullYear();
            var day = year_n
            if(("" + month_n).length == 1) {
                day += "-0" + month_n
            } else {
                day += "-" + month_n
            }
            if(("" +day_n).length == 1) {
                day += "-0" + day_n
            } else {
                day += "-" + day_n
            }
			console.log("dayYYYYYYYYYYYYYYYY: " + day);
			day_avg_val = day_avg_val + "***" + day;
			day_avg_val = day_avg_val + "***" + result[val].type_id;
			day_avg_val = day_avg_val + ";";
		}

		if (err) throw err;
	});

	con2.query("" + query_stor2, function (err, result, fields) {
		for(val in result) {
			hour_avg_val = hour_avg_val + result[val].media;



            var now2 = new Date(result[val].server_timestamp*1000);
			var hour_n = now2.getHours();
			var month_n = now2.getMonth() + 1; //months from 1-12
            var day_n = now2.getDate();
            var year_n = now2.getFullYear();
            var day = year_n
            if(("" + month_n).length == 1) {
                day += "-0" + month_n
            } else {
                day += "-" + month_n
            }
            if(("" +day_n).length == 1) {
                day += "-0" + day_n
            } else {
                day += "-" + day_n
            }

			hour_avg_val = hour_avg_val + "***" + day;
			hour_avg_val = hour_avg_val + "***" + hour_n;
			hour_avg_val = hour_avg_val + "***" + result[val].type_id;
			hour_avg_val = hour_avg_val + ";";
		}
		if (err) throw err;
	});


	day_avg_val = day_avg_val.slice(0, -1);
hour_avg_val = hour_avg_val.slice(0, -1);


	interval2 = setInterval(checkSens, 250);
}
 
