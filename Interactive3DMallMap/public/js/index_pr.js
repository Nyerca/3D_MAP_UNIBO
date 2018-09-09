	/* Javascript himidity historical */
	var avg_pin = [0,0,0,0,0,0,0];
	
   	$(document).ready(function() {

/* 
	On receiving new values from the node file 
		the current value is inserted in the variables
		the charts realtime values are then updated
*/	
		socket.on('temp_storico',function(data) {
			var valori = data.temp_avg_val.split(';');
			for(var field in valori) {
			var line = valori[field].split('***');
			if(line[2] == '1') {
				var d = new Date("" + line[1]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					avg_pin[6] = parseFloat(line[0]);
				} else if(str == day1) {
					avg_pin[5] = parseFloat(line[0]);
				} else if(str == day2) {
					avg_pin[4] = parseFloat(line[0]);
				} else if(str == day3) {
					avg_pin[3] = parseFloat(line[0]);
				} else if(str == day4) {
					avg_pin[2] = parseFloat(line[0]);
				} else if(str == day5) {
					avg_pin[1] = parseFloat(line[0]);
				} else if(str == day6) {
					avg_pin[0] = parseFloat(line[0]);
				}
			}

		}
		
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
				enabled: true
			}
		});

		var min_graphh = 0;
		var max_graph = 0;

		$('#myPresChart').highcharts({
			title: {
    text: 'Pressione media',
	style: {
         color: '#515158',
      }
  },
  subtitle: {
    text: 'Il grafico mostra la pressione media settimanale registrata dai sensori',
	style: {
         color: '#515158',
      }
  },
chart: {
	type: 'bar',
		plotBackgroundColor: '#e4c7c6',
		backgroundColor: '#e4c7c6',
    },
  yAxis: {
    title: {
      text: 'Pressione',
	  style: {
         color: '#515158',
      }
    },
	gridLineColor: 'white'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
    }
  },
line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: false
    },
  series: [{
    name: 'Gradi',
    data: avg_tin,
	dataLabels: {
        enabled: true
      },
  }],
xAxis: {
    categories: [day6_graphLabel,
					day5_graphLabel,
					day4_graphLabel,
					day3_graphLabel,
					day2_graphLabel,
					day1_graphLabel,
					day0_graphLabel],
	  lineColor: 'white',
                gridLineColor: 'white',
  },
  legend:{ enabled:false },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
    }]
  }

	});
	
		});
		

	});