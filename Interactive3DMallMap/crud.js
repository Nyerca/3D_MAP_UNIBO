var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res) {
   res.sendFile('CRUD_bootstrap.html', { root: __dirname });
});

app.post('/info', (req, res) => {
  insert_informazioni(req.body.Nome, req.body.Descrizione, req.body.Posti);
  res.redirect('/');
  res.end();
})
app.post('/datacategory', (req, res) => {
  insert_datacategory(req.body.Nome, req.body.Colore);
  res.redirect('/');
  res.end();
})
app.post('/dataspace', (req, res) => {
  insert_dataspace(req.body.IdDataSpace, req.body.IdInfo, req.body.IdFigura, req.body.IdDataCategory, req.body.IdPin);
  res.redirect('/');
  res.end();
})
app.post('/figura', (req, res) => {
  insert_figura(req.body.Tipo, req.body.Class, req.body.x, req.body.y, req.body.width, req.body.height, req.body.Points, req.body.Piano);
  res.redirect('/');
  res.end();
})
app.post('/pin', (req, res) => {
  insert_pin(req.body.Icon, req.body.Top_distance, req.body.Left_distance);
  res.redirect('/');
  res.end();
})

function insert_informazioni(Nome, Descrizione, Posti) {
	if(Posti == "" && Descrizione == "")	var sql = "INSERT INTO `informazioni` (`Nome`) VALUES ('" + Nome + "')";
	else if(Posti == "") var sql = "INSERT INTO `informazioni` (`Nome`, `Descrizione`) VALUES ('" + Nome + "','" + Descrizione + "')";
	else
		var sql = "INSERT INTO `informazioni` (`Nome`, `Descrizione`, `Posti`) VALUES ('" + Nome + "','" + Descrizione + "','" + Posti + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
}
function insert_datacategory(Nome, Colore) {
	var sql = "INSERT INTO `datacategory` (`Nome`, `Colore`) VALUES ('" + Nome + "','" + Colore + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
}
function insert_dataspace(IdDataSpace, IdInfo, IdFigura, IdDataCategory, IdPin) {
	if(IdPin == "")	var sql = "INSERT INTO `dataspace` (`IdDataSpace`, `IdInfo`, `IdFigura`, `IdDataCategory`) VALUES ('" + IdDataSpace + "','" + IdInfo + "','" 
						+ IdFigura + "','" + IdDataCategory + "')";
	else
		var sql = "INSERT INTO `dataspace` (`IdDataSpace`, `IdInfo`, `IdFigura`, `IdDataCategory`, `IdPin`) VALUES ('" + IdDataSpace + "','" + IdInfo + "','" 
			+ IdFigura + "','" + IdDataCategory + "','" + IdPin + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
}
function insert_figura(Tipo, Class, x, y, width, height, Points, Piano) {
	if( (Points == "" && height == "") || (Points == "null" && height == ""))	var sql = "INSERT INTO `figura` (`Tipo`, `Class`, `x`, `y`, `width`, `Piano`) VALUES ('" + Tipo + "','" + Class + "','" 
											+ x + "','" + y + "','" + width + "','" + Piano + "')";
	else if(width == "" && height == "") var sql = "INSERT INTO `figura` (`Tipo`, `Class`, `Points`, `Piano`) VALUES ('" + Tipo + "','" + Class + "','" + Points + "','" + Piano + "')";
	else
		var sql = "INSERT INTO `figura` (`Tipo`, `Class`, `x`, `y`, `width`, `height`, `Piano`) VALUES ('" + Tipo + "','" + Class + "','" 
	+ x + "','" + y + "','" + width + "','" + height + "','" + Piano + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
}
function insert_pin(Icon, Top_distance, Left_distance) {
	var sql = "INSERT INTO `pin` (`Icon`, `Top_distance`, `Left_distance`) VALUES ('" + Icon + "','" + Top_distance + "','" 
	+ Left_distance + "')";
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
}


app.post('/infoMod', (req, res) => {
  update_info(req.body.id, req.body.Nome, req.body.Descrizione, req.body.Posti);
  res.redirect('/');
  res.end();
})
app.post('/datacategoryMod', (req, res) => {
  update_datacategory(req.body.id, req.body.Nome, req.body.Colore);
  res.redirect('/');
  res.end();
})
app.post('/dataspaceMod', (req, res) => {
  update_dataspace(req.body.id, req.body.IdDataSpace, req.body.IdInfo, req.body.IdFigura, req.body.IdDataCategory, req.body.IdPin);
  res.redirect('/');
  res.end();
})
app.post('/figuraMod', (req, res) => {
  update_figura(req.body.id, req.body.Tipo, req.body.Class, req.body.x, req.body.y, req.body.width, req.body.height, req.body.Points, req.body.Piano);
  res.redirect('/');
  res.end();
})
app.post('/pinMod', (req, res) => {
  update_pin(req.body.id, req.body.Icon, req.body.Top_distance, req.body.Left_distance);
  res.redirect('/');
  res.end();
})

function update_info(IdInfo, Nome, Descrizione, Posti) {
	if(Posti == "" && Descrizione == "")	var sql = "UPDATE `informazioni` SET `Nome` = '" + Nome + "', `Descrizione` = NULL, `Posti` = NULL  WHERE `IdInfo` = " + IdInfo;
	else if(Posti == "") var sql = "UPDATE `informazioni` SET `Nome` = '" + Nome + "', `Descrizione` = '" + Descrizione + "', `Posti` = NULL  WHERE `IdInfo` = " + IdInfo;
	else
		var sql = "UPDATE `informazioni` SET `Nome` = '" + Nome + "', `Descrizione` = '" + Descrizione + "', `Posti` = " + Posti + "  WHERE `IdInfo` = " + IdInfo;
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	correcttab = 1;
	emitData();
}
function update_datacategory(IdDataCategory, Nome, Colore) {
	var sql = "UPDATE `datacategory` SET Nome = '" + Nome + "', Colore = '" + Colore + "'  WHERE IdDataCategory = " + IdDataCategory;

	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	correcttab = 2;
	emitData();
}
function update_dataspace(oldIdDataSpace, IdDataSpace, IdInfo, IdFigura, IdDataCategory, IdPin) {
	if(IdPin == "")	var sql = "UPDATE `dataspace` SET IdDataSpace = " + IdDataSpace + ", IdInfo = " + IdInfo + ", IdFigura = " + IdFigura + ", IdDataCategory = " + IdDataCategory + ", IdPin = NULL  WHERE IdDataSpace = " + oldIdDataSpace;
	else
		var sql = "UPDATE `dataspace` SET IdDataSpace = " + IdDataSpace + ", IdInfo = " + IdInfo + ", IdFigura = " + IdFigura + ", IdDataCategory = " + IdDataCategory + ", IdPin = " + IdPin + "  WHERE IdDataSpace = " + oldIdDataSpace;

	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	correcttab = 3;
	emitData();
}
function update_figura(IdFigura, Tipo, Class, x, y, width, height, Points, Piano) {

	
	if( (Points == "" && height == "") || (Points == "null" && height == ""))	var sql = "UPDATE `figura` SET Tipo = '" + Tipo + "', Class = '" + Class + "', x = " + x + ", y = " + y + ", width = " + width + ", height = NULL, Points = NULL, `Piano` = " + Piano + " WHERE IdFigura = " + IdFigura;
	else if(width == "" && height == "") var sql = "UPDATE `figura` SET Tipo = '" + Tipo + "', Class = '" + Class + "', x = null, y = null, width = null, height = null, Points = '" + Points + "', `Piano` = " + Piano + " WHERE IdFigura = " + IdFigura;
	else
		var sql = "UPDATE `figura` SET Tipo = '" + Tipo + "', Class = '" + Class + "', x = " + x + ", y = " + y + ", width = " + width + ", height = " + height + ", Points = null, `Piano` = " + Piano + " WHERE IdFigura = " + IdFigura;
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	correcttab = 4;
	emitData();
}
function update_pin(IdPin, Icon, Top_distance, Left_distance) {
	var sql = "UPDATE `pin` SET Icon = '" + Icon + "', Top_distance = " + Top_distance + ", Left_distance = " + Left_distance + "  WHERE IdPin = " + IdPin;
	con.query(sql, function (err, result) {
		if (err) throw err;
	});
	correcttab = 5;
	emitData();
}





var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "123abc",
  database: "db_unibo"
});

con.connect(function(err) {
  if (err) throw err;
  //console.log("Connected!");
});

function checka() {
	var current;
		checkForNewData(function(current) {
			if(current != count) {
				if(count > 0) {
					emitData();
				}
				count = current;
			}
		});
}

var count_info = 0 //Number of values read
var count_datacategory = 0 
var count_dataspace = 0 
var count_figura = 0 
var count_pin = 0 

var namespace = io.of('/mySensorNamespace'); //To set up a custom namespace, we can call the ‘of’ function on the server side
namespace.on('connection', function(socket) { //Executed everytime someone connects to localhost:3000
	socket.on('deleteValue', function(data) {
		var sql;
		switch (data.tab) {
			case "c1":
				sql = "DELETE FROM `informazioni` WHERE IdInfo = " + data.id;
				break;
			case "c2":
				sql = "DELETE FROM `datacategory` WHERE IdDataCategory = " + data.id;
				break;
			case "c3":
				sql = "DELETE FROM `dataspace` WHERE IdDataSpace = " + data.id;
				break;
			case "c4":
				sql = "DELETE FROM `figura` WHERE IdFigura = " + data.id;
				break;
			case "c5":
				sql = "DELETE FROM `pin` WHERE IdPin = " + data.id;
				break;
		}
		con.query(sql, function (err, result) {
			if (err) throw err;
			checkForNewData();
		});
	});
	socket.on('modifyValue', function(data) {
		var sql = "UPDATE `unified-data` SET node_id = " + data.nodeid + ", server_timestamp = " + data.server_timestamp + ", timestamp = " + data.timestamp + ", type_id = " + data.typeid + ", value_num = " + data.value + "  WHERE id = " + data.id;
		con.query(sql, function (err, result) {
			if (err) throw err;
			checkForNewData();
		});
	});

   emitData();
	setInterval(check, 1000);
   //console.log('someone connected');
});


http.listen(3000, function() {
   console.log('listening on localhost:3000');
});

var correcttab = 0;
//Function that checks for new deta into the table
function checkForNewData () {
  con.query("SELECT COUNT(*) AS num FROM `informazioni`", function (err, result, fields) {
    if (err) throw err;
	if(result[0].num != count_info) {
		if(count_info > 0) {
			correcttab = 1;
			emitData();
		}
		count_info = result[0].num;
	}
  });
  con.query("SELECT COUNT(*) AS num FROM `datacategory`", function (err, result, fields) {
    if (err) throw err;
	if(result[0].num != count_datacategory) {
		if(count_datacategory > 0) {
			correcttab = 2;
			emitData();
		}
		count_datacategory = result[0].num;
	}
  });
  con.query("SELECT COUNT(*) AS num FROM `dataspace`", function (err, result, fields) {
    if (err) throw err;
	if(result[0].num != count_dataspace) {
		if(count_dataspace > 0) {
			correcttab = 3;
			emitData();
		}
		count_dataspace = result[0].num;
	}
  });
  con.query("SELECT COUNT(*) AS num FROM `figura`", function (err, result, fields) {
    if (err) throw err;
	if(result[0].num != count_figura) {
		if(count_figura > 0) {
			correcttab = 4;
			emitData();
		}
		count_figura = result[0].num;
	}
  });
  con.query("SELECT COUNT(*) AS num FROM `pin`", function (err, result, fields) {
    if (err) throw err;
	if(result[0].num != count_pin) {
		if(count_pin > 0) {
			correcttab = 5;
			emitData();
		}
		count_pin = result[0].num;
	}
  });
}

//Function that select values from the table and emits data to indexSensori.html
var interval;
var info = "", figura = "", datacategory = "", pin = "", dataspace = "", svg = "";
function check() {
	if(info.length > 0 && figura.length > 0 && datacategory.length > 0 && pin.length > 0 && dataspace.length > 0 && svg.length > 0) {
		var vals = { 
			info: info, 
			figura: figura, 
			datacategory: datacategory, 
			pin: pin,
			dataspace: dataspace,
			correcttab: correcttab,
			svg: svg
		}
		info = "", figura = "", datacategory = "", pin = "", dataspace = "", svg = "";
		namespace.emit('hi', vals);
		console.log("emit");
		clearInterval(interval);
	}
}

//Function that select values from the table and emits data to indexSensori.html
function emitData() {
	info = "", figura = "", datacategory = "", dataspace = "", pin="", svg = "";
	con.query("SELECT * FROM `informazioni`", function (err, result, fields) {
		for(val in result) {
			info = info + result[val].IdInfo;
			info = info + "***" + result[val].Nome;
			info = info + "***" + result[val].Descrizione;
			info = info + "***" + result[val].Posti;
			info = info + ";";
		}
		info = info.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `figura`", function (err, result, fields) {
		for(val in result) {
			figura = figura + result[val].IdFigura;
			figura = figura + "***" + result[val].Tipo;
			figura = figura + "***" + result[val].Class;
			figura = figura + "***" + result[val].x;
			figura = figura + "***" + result[val].y;
			figura = figura + "***" + result[val].width;
			figura = figura + "***" + result[val].height;
			figura = figura + "***" + result[val].Points;
			figura = figura + "***" + result[val].Piano;
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
			datacategory = datacategory + ";";
		}
		datacategory = datacategory.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `pin`", function (err, result, fields) {
		for(val in result) {
			pin = pin + result[val].IdPin;
			pin = pin + "***" + result[val].Icon;
			pin = pin + "***" + result[val].Top_distance;
			pin = pin + "***" + result[val].Left_distance;
			pin = pin + ";";
		}
		pin = pin.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `dataspace`", function (err, result, fields) {
		for(val in result) {
			dataspace = dataspace + result[val].IdDataSpace;
			dataspace = dataspace + "***" + result[val].IdInfo;
			dataspace = dataspace + "***" + result[val].IdFigura;
			dataspace = dataspace + "***" + result[val].IdDataCategory;
			dataspace = dataspace + "***" + result[val].IdPin;
			dataspace = dataspace + ";";
		}
		dataspace = dataspace.slice(0, -1);
		if (err) throw err;
	});
	con.query("SELECT * FROM `view_svg`", function (err, result, fields) {
		for(val in result) {
			svg = svg + result[val].IdDataSpace;
			svg = svg + "***" + result[val].Tipo;
			svg = svg + "***" + result[val].Class;
			svg = svg + "***" + result[val].x;
			svg = svg + "***" + result[val].y;
			svg = svg + "***" + result[val].width;
			svg = svg + "***" + result[val].height;
			svg = svg + "***" + result[val].Points;
			svg = svg + "***" + result[val].Piano;
			svg = svg + ";";
		}
		svg = svg.slice(0, -1);
		if (err) throw err;
	});
	
	
	 interval = setInterval(check, 250);
	setInterval(checkForNewData, 1000);
}

