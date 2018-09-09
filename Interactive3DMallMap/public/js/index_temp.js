/* Javascript temperature and humidity realtime graphs */
   	$(document).ready(function() {
		var valore_server, value1 = 0, value2 = 0, value3 = 0;
	  
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
		function getRand(min, max) {
			let reading = 16;
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
		
		function updateMoisture(value) {
			$moistureDisplay.html(value + '<span>%</span>');

			var valOrig = value;
			val = 100 - value;
      
			if(valOrig == 0) {
				$("#percent-box").val(0);
				$(".progress .percent").text(0 + "%");
			} else $(".progress .percent").text(valOrig + "%");
      
			$(".progress").parent().removeClass();
			$(".progress .water").css("top", val + "%");
      
			$(".progress").parent().addClass("green");
		}
		
		function updateSensorDisplayValues(d) {
			updateVoltage(d[0]);
			updateMoisture(d[1]);
		}
		
		var just_once = -1;
		var voltage;
		var current;
		var moisture;
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
				var x, volts, mPercent;
				x = (new Date()).getTime(),
					volts = (Math.round(value1 * 2) / 2),
					mPercent = (Math.round(value3 * 2) / 2);
								
					voltage.addPoint([x, volts], false, true);
					moisture.addPoint([x, mPercent], true, true);
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

		$('#sensorData').highcharts({
			chart: {
				type: 'spline',
				backgroundColor: '#e4c7c6',
				events: {
					load: function() {
						voltage = this.series[0];
						moisture = this.series[1];
						var x, volts, mPercent;
						
					
						setInterval(function() {
							x = (new Date()).getTime(),
								volts = (Math.round(value1 * 2) / 2),
								mPercent = (Math.round(value3 * 2) / 2);
								
							if(volts > max_graph) max_graph = volts;
							if(volts < min_graphh) min_graphh = volts;
							var chart_t = $('#sensorData').highcharts();
							chart_t .yAxis[0].setExtremes(min_graphh,max_graph);
							
							voltage.addPoint([x, volts], false, true);
							moisture.addPoint([x, mPercent], true, true);
							
							
							updateSensorDisplayValues([volts, mPercent]);
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
			},
			{
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
			}, {
				name: 'UMIDITA',
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