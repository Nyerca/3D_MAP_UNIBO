/* Air quality and pressure realtime graphs */
	$(document).ready(function() {
		var valore_server, value1 = 0, value2 = 0;

		var $delay = 60000,
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

		
/* Function which update the number visualization inside the pressure circle bar and air quality horizontal bar */
		function updateCurrent(value) {
			document.getElementById("prog_q").setAttribute("data-perc", "" + value);
		}
		

		
		function updateSensorDisplayValues(d) {
			updateCurrent(d[1]);
		}
		
		var just_once = -1;
		var voltage;
		var current;
		
/* 
	On receiving new values from the node file 
		the current value is inserted in the variables
		the charts realtime values are then updated
*/	
		socket.on('realtime_vals',function(data) {
			valore_server = data.split(';');
			for(var field in valore_server) {
				var line = valore_server[field].split('***');
				if(line[0] == "1") {
					value1 = line[1];
				} else if(line[0] == "2") {
					value2 = line[1];
				}
			}	

			if(just_once == -1) {
				just_once = 0;
				updateSensorDisplayValues([value1,value2]);
				var x, volts, amps;
				x = (new Date()).getTime(),
					volts = (Math.round(value1 * 2) / 2),
					amps = (Math.round(value2 * 2) / 2);
										
				voltage.addPoint([x, volts], true, false);
				current.addPoint([x, amps], true, false);
			}
		});

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

/* 
	highcharts library used to create the chart.
*/	
		$('#sensorData2').highcharts({
			chart: {
				type: 'spline',
				events: {
					load: function() {
						voltage = this.series[0];
						current = this.series[1];
						var x, volts, amps;
						
						setInterval(function() {
							x = (new Date()).getTime(),
								volts = (Math.round(value1 * 2) / 2),
								amps = (Math.round(value2 * 2) / 2);
							
							voltage.addPoint([x, volts], false, true);
							current.addPoint([x, amps], true, true);

							updateSensorDisplayValues([volts, amps]);
						}, $delay);
					}
				}
			},
			title: {
				text: 'Dati Canarin'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 50
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

					for (i = -totalPoints; i < 0; i += 1) {
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

					for (i = -totalPoints; i < 0; i += 1) {
						data.push({
							x: time + i * $delay,
							y: getRandomInt(.7, .7)
						});
					}
					return data;
				}())
			}]
		});
	});