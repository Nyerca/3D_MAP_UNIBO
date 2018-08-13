var colorInc = 100 / 3;
   
   	$(document).ready(function() {
	var valore, val1 = 0, val2 = 0, val3 = 0;
	
	/*
	var socket = io('/mySensorNamespace');
      socket.on('hi',function(data) {
		 valore = data.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			if(line[0] == "1") {
				val1 = line[1];
			} else if(line[0] == "2") {
				val2 = line[1];
			} else if(line[0] == "3") {
				val3 = line[1];
			}
		}		

      });
	  */
	  
		var $delay = 2000,
			vMin = 11.5,
			vMax = 15.5,
			cMin = .3,
			cMax = 2.5,
			mMin = 0,
			mMax = 5,
			totalPoints = 25,
			$voltageDisplay = $('div.volts'),
			$currentDisplay = $('div.amps'),
			$moistureDisplay = $('div.moisture');

		function getRandomInt(min, max) {
			let reading = (Math.random() * (max - min + 1) + min);
			return (Math.round(reading * 2) / 2)
		}
		function getRand(min, max) {
			let reading = 16;
			return (Math.round(reading * 2) / 2)
		}
		
		function updateVoltage(value) {
			
			var spn = document.createElement('span');
			var str = "" + value;
			$voltageDisplay.html(str.split(".")[0]);
			
			var n = str.includes(".");

			if(n != false) {
		spn.innerHTML = "." +  str.split(".")[1];
	document.getElementsByClassName('volts')[0].appendChild(spn);
	}
		}
		
		function updateCurrent(value) {
	
	var spn = document.createElement('span');
			var str = "" + value;
			$currentDisplay.html(str.split(".")[0]);
			
			var n = str.includes(".");

			if(n != false) {
		spn.innerHTML = "." +  str.split(".")[1];
	document.getElementsByClassName('amps')[0].appendChild(spn);
	}
			
		}
		
		function updateMoisture(value) {
			$moistureDisplay.html(value + '<span>%</span>');

			
			
      
      var valOrig = value;
      val = 100 - value;
      
      if(valOrig == 0)
      {
        $("#percent-box").val(0);
        $(".progress .percent").text(0 + "%");
      }
      else $(".progress .percent").text(valOrig + "%");
      
      $(".progress").parent().removeClass();
      $(".progress .water").css("top", val + "%");
      
      if(valOrig < colorInc * 1)
        $(".progress").parent().addClass("red");
      else if(valOrig < colorInc * 2)
        $(".progress").parent().addClass("orange");
      else
        $(".progress").parent().addClass("green");
			
			
			
			
			
		}
		
		function updateSensorDisplayValues(d) {
			updateVoltage(d[0]);
			updateCurrent(d[1]);
			updateMoisture(d[2]);
		}

		Highcharts.setOptions({
			global: {
				useUTC: false
			},
			plotOptions: {
				series: {
					marker: {
						enabled: false
					}
				}
			},
			tooltip: {
				enabled: false
			}
		});

		$('#sensorData').highcharts({
			chart: {
				type: 'spline',
				events: {
					load: function() {
						var voltage = this.series[0];
						var current = this.series[1];
						var moisture = this.series[2];
						var x, volts, amps, mPercent;

						// faking sensor data
						// data will be coming from sensors on the MKR1000
						setInterval(function() {
						/*
							x = (new Date()).getTime(),
								volts = getRandomInt(vMin, vMax),
								amps = getRandomInt(cMin, cMax),
								mPercent = getRandomInt(mMin, mMax);
								*/
							x = (new Date()).getTime(),
								volts = (Math.round(val1 * 2) / 2),
								amps = (Math.round(val2 * 2) / 2),
								mPercent = (Math.round(val3 * 2) / 2);
							
							voltage.addPoint([x, volts], false, true);
							current.addPoint([x, amps], false, true);
							moisture.addPoint([x, mPercent], true, true);
							
							
							updateSensorDisplayValues([volts, amps, mPercent]);
							
	
						}, $delay);
					}
				}
			},
			title: {
				text: 'Dati Canarin'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 500
			},
			yAxis: [{
				title: {
					text: 'GRADI',
					style: {
						color: '#2b908f',
						font: '13px sans-serif'
					}
				},
				min: 0,
				max: 15,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			}, {
				title: {
					text: 'UMIDITA',
					style: {
						color: '#90ee7e',
						font: '13px sans-serif'
					}
				},
				min: 0,
				max: 4,
				opposite: true,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			}, {
				title: {
					text: 'INQUINAMENTO',
					style: {
						color: '#f45b5b',
						font: '13px sans-serif'
					}
				},
				min: 0,
				max: 100,
				opposite: true,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			}],
			tooltip: {
				formatter: function() {
					var unitOfMeasurement = this.series.name === 'GRADI' ? ' °C' : ' A';
					return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.numberFormat(this.y, 1) + unitOfMeasurement;
				}
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'TEMPERATURA',
				yAxis: 0,
				style: {
					color: '#2b908f'
				},
				data: (function() {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;

					for (i = -totalPoints; i <= 0; i += 1) {
						data.push({
							x: time + i * $delay,
							y: getRandomInt(12, 12)
						});
					}
					return data;
				}())
			}, {
				name: 'UMIDITA',
				yAxis: 1,
				data: (function() {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;

					for (i = -totalPoints; i <= 0; i += 1) {
						data.push({
							x: time + i * $delay,
							y: getRandomInt(.7, .7)
						});
					}
					return data;
				}())
			}, {
				name: 'INQUINAMENTO',
				yAxis: 2,
				data: (function() {
					// generate an array of random data
					var data = [],
						time = (new Date()).getTime(),
						i;

					for (i = -totalPoints; i <= 0; i += 1) {
						data.push({
							x: time + i * $delay,
							y: getRandomInt(1, 1)
						});
					}
					return data;
				}())
			}]
		});
		
		
	
	});