/* Air quality and pressure realtime graphs */
   	$(document).ready(function() {
		var valore_server, value1 = 0, value2 = 0, value3 = 0, value4 = 0;
	  
		var $delay = 60000,
			vMin = 11.5,
			vMax = 15.5,
			cMin = .3,
			cMax = 2.5,
			mMin = 0,
			mMax = 5,
			totalPoints = 25,
			$voltageDisplay = $('div.volts2'),
			$currentDisplay = $('div.amps2'),
			$currentDisplay2 = $('div.pm_25_r'),
			$moistureDisplay = $('div.moisture2');

		function getRandomInt(min, max) {
			let reading = (Math.random() * (max - min + 1) + min);
			return (Math.round(reading * 2) / 2)
		}
		function getRand(min, max) {
			let reading = 16;
			return (Math.round(reading * 2) / 2)
		}
		
/* Function which update the number visualization inside the three circles */	
		function updateVoltage(value) {
			$voltageDisplay.html(value);
		}
		
		function updateMoisture(value) {
			$moistureDisplay.html(value);
		}
		
		function updateSensorDisplayValues(d) {
			updateVoltage(parseFloat(d[0]).toFixed(2));
			$currentDisplay.html(parseFloat(d[3]).toFixed(2));
			$currentDisplay2.html(parseFloat(d[1]).toFixed(2));
			updateMoisture(parseFloat(d[2]).toFixed(2));
		}
		
		var just_once = -1;
		var pres_v;
		var pm25_v;
		var pm10_v;
		var pm1_v;
/* 	
	On receiving new values from the node file 
		the current value is inserted in the variables
		the charts realtime values are then updated
*/	
		socket.on('realtime_vals',function(data) {
			valore_server = data.split(';');
			var numb_values = 0;
			var sum_values = 0;
			var numb_values2 = 0;
			var sum_values2 = 0;
			var numb_values3 = 0;
			var sum_values3 = 0;
			var numb_values4 = 0;
			var sum_values4 = 0;
			
			for(var field in valore_server) {
				var line = valore_server[field].split('***');
				if(line[2] == 6) {
					sum_values += parseFloat(line[1]);
					numb_values++;
					console.log("SUM: " + sum_values);
				} else if(line[2] == 7) {
					sum_values2 += parseFloat(line[1]);
					numb_values2++;
				} else if(line[2] == 8) {
					sum_values3 += parseFloat(line[1]);
					numb_values3++;
				} else if(line[2] == 9) {
					sum_values4 += parseFloat(line[1]);
					numb_values4++;
				}
			}	
			value1 = sum_values / numb_values;
			value2 = sum_values2 / numb_values2;
			value3 = sum_values3 / numb_values3;
			value4 = sum_values4 / numb_values4;
	updateSensorDisplayValues([value1, value2,value3,value4]);
	
			if(just_once == -1) {
				just_once = 0;
				var x, pres_r, pm25_r, pm10_r, pm1_r;
				x = (new Date()).getTime(),
					pres_r = (Math.round(value1 * 2) / 2),
					pm25_r = (Math.round(value2 * 2) / 2),
					pm10_r = (Math.round(value3 * 2) / 2),
					pm1_r = (Math.round(value4 * 2) / 2);
								
					pres_v.addPoint([x, pres_r], false, true);
					pm25_v.addPoint([x, pm25_r], false, true);
					pm10_v.addPoint([x, pm10_r], false, true);
					pm1_v.addPoint([x, pm1_r], true, true);
			}
		});
		
/* 
	highcharts library used to create the chart.
*/	
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

		var min_graphh = 0;
		var max_graph = 0;

		$('#sensorData2').highcharts({
			chart: {
				type: 'spline',
				backgroundColor: '#e4c7c6',
				events: {
					load: function() {
						pres_v = this.series[0];
						pm25_v = this.series[1];
						pm10_v = this.series[2];
						pm1_v = this.series[3];
						var x, volts, mPercent;
						
					
						setInterval(function() {
							x = (new Date()).getTime(),
								pres_r = (Math.round(value1 * 2) / 2),
								pm25_r = (Math.round(value2 * 2) / 2),
								pm10_r = (Math.round(value3 * 2) / 2),
								pm1_r = (Math.round(value4 * 2) / 2);
								
								/*
							if(volts > max_graph) max_graph = volts;
							if(volts < min_graphh) min_graphh = volts;
							var chart_t = $('#sensorData2').highcharts();
							chart_t .yAxis[0].setExtremes(min_graphh,max_graph);
							*/
							
							pres_v.addPoint([x, pres_r], false, true);
							pm25_v.addPoint([x, pm25_r], false, true);
							pm10_v.addPoint([x, pm10_r], false, true);
							pm1_v.addPoint([x, pm1_r], true, true);
							
							
							updateSensorDisplayValues([value1, value2,value3,value4]);
						}, $delay);
					}
				}
			},

			title: {
				text: 'Dati medi sensori'
			},
			xAxis: {
				type: 'datetime',
				lineColor: 'white',
                gridLineColor: 'white',
				tickPixelInterval: 50
			},
			yAxis: [{
				title: {
					text: 'PRESSIONE',
					style: {
						color: '#2b908f',
						font: '13px sans-serif'
					}
				},
				min: 870,
				max: 1085,
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				gridLineColor: 'white'
			},
			{
				title: {
					text: 'PM 2.5',
					style: {
						color: '#90ee7e',
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
				}],
				gridLineColor: 'white'
			},
			{
				title: {
					text: 'PM 10',
					style: {
						color: '#90ee7e',
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
				}],
				gridLineColor: 'white'
			},
			{
				title: {
					text: 'PM 1.0',
					style: {
						color: '#90ee7e',
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
				}],
				gridLineColor: 'white'
			}],
			tooltip: {
				formatter: function() {
					var unitOfMeasurement = this.series.name === 'GRADI' ? ' °C' : ' A';
					return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.numberFormat(this.y, 1) + unitOfMeasurement;
				},
				
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'PRESSIONE',
				yAxis: 0,
				color: '#2b908f',
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
				name: 'PM 2.5',
				yAxis: 1,
				color: '#90ee7e',
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
			}, {
				name: 'PM 10',
				yAxis: 1,
				color: '#90ee7e',
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
			}, {
				name: 'PM 1.0',
				yAxis: 1,
				color: '#90ee7e',
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