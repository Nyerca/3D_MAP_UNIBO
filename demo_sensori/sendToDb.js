var mysql = require('mysql');
var random = require('random');

var con = mysql.createConnection({
  host: "localhost",
  user: "sens",
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
    }, 60000);
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
			
var day = new Date();
day.setDate(day.getDate());

var month_n = day.getUTCMonth() + 1; //months from 1-12
var day_n = day.getUTCDate();
var year_n = day.getUTCFullYear();
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
			
function sendData1() {
	var val = getRandomInt(vMin, vMax);
	var sql = "INSERT INTO `valori` (idcanarin, value, Giorno, Ora) VALUES (1,'" + val + "','" + day + "','" + new Date().getHours() + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	console.log("sent " + val);
}

function sendData2() {
	var val = getRandomInt(cMin, cMax);
	var sql = "INSERT INTO `valori` (idcanarin, value, Giorno, Ora) VALUES (2,'" + val + "','" + day + "','" + new Date().getHours() + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	console.log("sent " + val);
}

function sendData3() {
	var val = getRandomInt(mMin, mMax);
	var sql = "INSERT INTO `valori` (idcanarin, value, Giorno, Ora) VALUES (3,'" + val + "','" + day + "','" + new Date().getHours() + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	console.log("sent " + val + " date: " + day + " " + new Date().getHours());
}