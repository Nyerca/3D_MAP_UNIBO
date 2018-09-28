var mysql = require('mysql');
var random = require('random');

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

sendValues()
function sendValues() {
	setInterval(function() {
		sendData1();
		sendData2();
		sendData3();
    }, 2000);
}

function getRandomInt(min, max) {
			let reading = (Math.random() * (max - min + 1) + min);
			return (Math.round(reading * 2) / 2)
		}

		
		var vMin = 11.5,
			vMax = 15.5,
			cMin = .3,
			cMax = 2.5,
			mMin = 0,
			mMax = 5;
			
function sendData1() {
	var val = getRandomInt(vMin, vMax);
	var sql = "INSERT INTO `valori` (idcanarin, value) VALUES (1,'" + val + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	//console.log("sent " + val);
}

function sendData2() {
	var val = getRandomInt(cMin, cMax);
	var sql = "INSERT INTO `valori` (idcanarin, value) VALUES (2,'" + val + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	//console.log("sent " + val);
}

function sendData3() {
	var val = getRandomInt(mMin, mMax);
	var sql = "INSERT INTO `valori` (idcanarin, value) VALUES (3,'" + val + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	//console.log("sent " + val);
}