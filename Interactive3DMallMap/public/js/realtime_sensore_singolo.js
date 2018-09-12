/* Javascript sensors realtime graphs */
   	$(document).ready(function() {
		var valore_server, value1 = 0, value2 = 0, value3 = 0;
	  	
		var elem = {name:"SENS1", vals:[1,2,3,4,5,6]};
		//alert("" + elem["vals"][0]);
			
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
		
/* Function which update the number visualization inside the three circles */	
		function updateVoltage(value) {
			
			var spn = document.createElement('span');
			var str = "" + value;
			$voltageDisplay.html(str.split(".")[0]);
			
			var n = str.includes(".");

			if(n != false) {
				spn.innerHTML = "." +  str.split(".")[1];
				document.getElementsByClassName('volts')[0].appendChild(spn);
			}
	
			changeColor(value,1);
		}
		
		
		function updateSensorDisplayValues(d) {
			updateVoltage(d[0]);
		}
		
		var just_once = -1;
		var voltage;
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
				} else if(line[0] == "3") {
					value3 = line[1];
				}
			}	

			if(just_once == -1) {
				just_once = 0;
				updateSensorDisplayValues([value1,value3]);
				var x, volts;
				x = (new Date()).getTime(),
					volts = (Math.round(value1 * 2) / 2);
							if(voltage !== undefined)	
					voltage.addPoint([x, volts], false, true);
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

		$('#temp_real').highcharts({
			chart: {
				type: 'spline',
				backgroundColor: '#e4c7c6',
				events: {
					load: function() {
						voltage = this.series[0];
						var x, volts;
						
					
						setInterval(function() {
							x = (new Date()).getTime(),
								volts = (Math.round(value1 * 2) / 2);
								
							if(volts > max_graph) max_graph = volts;
							if(volts < min_graphh) min_graphh = volts;
							var chart_t = $('#sensorData').highcharts();
							chart_t .yAxis[0].setExtremes(min_graphh,max_graph);
							
							voltage.addPoint([x, volts], false, true);
							
							
							updateSensorDisplayValues([volts]);
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
					text: 'GRADI',
					style: {
						color: '#2b908f',
						font: '13px sans-serif'
					}
				},
				min: 0,
				max: 45,
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
				name: 'TEMPERATURA',
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
			}]
		});
	});