var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser= require('body-parser');
var express = require('express');



var con = mysql.createConnection({
	host: "canarin3-cluster-1.cluster-ro-ces11ksjxlw4.eu-central-1.rds.amazonaws.com",
	port     : "3306",
	user: "cesena",
	password: "cesensor",
	database: "canarinProj"
});

var num_canarin = 0;
var array_canarin = [];
con.connect(function(err) {
	if (err) throw err;
	console.log("connected");
	con.query("SELECT id FROM `cesena_nodes`", function (err, result, fields) {
		
		for(val in result) {
			array_canarin[num_canarin++] = "" + result[val].id;
			console.log("PRIMO: " + result[val].id);
			console.log("SECONDO: " + array_canarin[num_canarin - 1]);
		}
		if (err) throw err;
	});

});
