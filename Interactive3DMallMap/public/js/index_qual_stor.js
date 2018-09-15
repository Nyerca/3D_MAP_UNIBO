/* Javascript air quality historical */

	var qin_day0 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

   	$(document).ready(function() {

/* 
	On receiving new values from the node file 
		the current value is inserted in the variables
		the charts realtime values are then updated
*/	
		socket.on('temp_storico',function(data) {
			var valori = data.qual_avg_val.split(';');
			for(var field in valori) {
				var line = valori[field].split('***');
				if(line[3] == 9) {
					var d = new Date("" + line[1]);
					var str = $.datepicker.formatDate('yy-mm-dd', d);
					console.log(str + " COMP " + day0);
					console.log(str + " COMP " + day1);
					if(str === day0) {
						qin_day0[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day1) {
						qin_day1[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day2) {
						qin_day2[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day3) {
						qin_day3[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day4) {
						qin_day4[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day5) {
						qin_day5[line[2]] = parseFloat(line[0]).toFixed(2);
					} else if(str == day6) {
						qin_day6[line[2]] = parseFloat(line[0]).toFixed(2);
					}
				}
				
				
				
				
				
				
				
				
				
				
			}
		
		/* 
	highcharts library used to create the chart.
*/	


		var min_graphh = 0;
		var max_graph = 0;

		$('#myChart_q15_storico').highcharts({
chart: {
        type: 'heatmap',
        marginTop: 60,
        marginBottom: 80,
        plotBorderWidth: 1,
		plotBackgroundColor: '#e4c7c6',
		backgroundColor: '#e4c7c6',
    },


    title: {
        text: "Qualità dell'aria media",
		style: {
         color: '#515158',
		 "fontSize": "30px",
      }
    },

    xAxis: {
        categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		style: {
         color: '#515158',
		 "fontSize": "15px",
      }
    },

    yAxis: {
        categories: [day6_graphLabel,
					day5_graphLabel,
					day4_graphLabel,
					day3_graphLabel,
					day2_graphLabel,
					day1_graphLabel,
					day0_graphLabel],
        title: null,
		style: {
         color: '#515158',
      }
    },

    

  colorAxis: {
    stops: [
      [0, '#3060cf'],
      [0.5, '#fffbbc'],
      [0.9, '#c4463a']
    ],
	min: -5,
	max: 30

  },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return 'Quantità: <b>' +
                this.point.value + '</b><br><b>' + this.series.yAxis.categories[this.point.y] + '</b> ore: <b>' + this.series.xAxis.categories[this.point.x] + ':00</b>';
        }
    },

    series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: [
		[0, 0, qin_day6[0]], [0, 1, qin_day5[0]], [0, 2, qin_day4[0]], [0, 3, qin_day3[0]], [0, 4, qin_day2[0]], [0, 5, qin_day1[0]], [0, 6, qin_day0[0]], 
		[1, 0, qin_day6[1]], [1, 1, qin_day5[1]], [1, 2, qin_day4[1]], [1, 3, qin_day3[1]], [1, 4, qin_day2[1]], [1, 5, qin_day1[1]], [1, 6, qin_day0[1]], 
		[2, 0, qin_day6[2]], [2, 1, qin_day5[2]], [2, 2, qin_day4[2]], [2, 3, qin_day3[2]], [2, 4, qin_day2[2]], [2, 5, qin_day1[2]], [2, 6, qin_day0[2]], 
		[3, 0, qin_day6[3]], [3, 1, qin_day5[3]], [3, 2, qin_day4[3]], [3, 3, qin_day3[3]], [3, 4, qin_day2[3]], [3, 5, qin_day1[3]], [3, 6, qin_day0[3]], 
		
		[4, 0, qin_day6[4]], [4, 1, qin_day5[4]], [4, 2, qin_day4[4]], [4, 3, qin_day3[4]], [4, 4, qin_day2[4]], [4, 5, qin_day1[4]], [4, 6, qin_day0[4]], 
		[5, 0, qin_day6[5]], [5, 1, qin_day5[5]], [5, 2, qin_day4[1]], [5, 3, qin_day3[5]], [5, 4, qin_day2[5]], [5, 5, qin_day1[5]], [5, 6, qin_day0[5]], 
		[6, 0, qin_day6[6]], [6, 1, qin_day5[6]], [6, 2, qin_day4[1]], [6, 3, qin_day3[6]], [6, 4, qin_day2[6]], [6, 5, qin_day1[6]], [6, 6, qin_day0[6]], 
		[7, 0, qin_day6[7]], [7, 1, qin_day5[7]], [7, 2, qin_day4[1]], [7, 3, qin_day3[7]], [7, 4, qin_day2[7]], [7, 5, qin_day1[7]], [7, 6, qin_day0[7]], 
		[8, 0, qin_day6[8]], [8, 1, qin_day5[8]], [8, 2, qin_day4[1]], [8, 3, qin_day3[8]], [8, 4, qin_day2[8]], [8, 5, qin_day1[8]], [8, 6, qin_day0[8]], 
		[9, 0, qin_day6[9]], [9, 1, qin_day5[9]], [9, 2, qin_day4[1]], [9, 3, qin_day3[9]], [9, 4, qin_day2[9]], [9, 5, qin_day1[9]], [9, 6, qin_day0[9]], 
		[10, 0, qin_day6[10]], [10, 1, qin_day5[10]], [10, 2, qin_day4[10]], [10, 3, qin_day3[10]], [10, 4, qin_day2[10]], [10, 5, qin_day1[10]], [10, 6, qin_day0[10]], 
		[11, 0, qin_day6[11]], [11, 1, qin_day5[11]], [11, 2, qin_day4[11]], [11, 3, qin_day3[11]], [11, 4, qin_day2[11]], [11, 5, qin_day1[11]], [11, 6, qin_day0[11]], 
		[12, 0, qin_day6[12]], [12, 1, qin_day5[12]], [12, 2, qin_day4[12]], [12, 3, qin_day3[12]], [12, 4, qin_day2[12]], [12, 5, qin_day1[12]], [12, 6, qin_day0[12]], 
		[13, 0, qin_day6[13]], [13, 1, qin_day5[13]], [13, 2, qin_day4[13]], [13, 3, qin_day3[13]], [13, 4, qin_day2[13]], [13, 5, qin_day1[13]], [13, 6, qin_day0[13]], 
		[14, 0, qin_day6[14]], [14, 1, qin_day5[14]], [14, 2, qin_day4[14]], [14, 3, qin_day3[14]], [14, 4, qin_day2[14]], [14, 5, qin_day1[14]], [14, 6, qin_day0[14]], 
		[15, 0, qin_day6[15]], [15, 1, qin_day5[15]], [15, 2, qin_day4[15]], [15, 3, qin_day3[15]], [15, 4, qin_day2[15]], [15, 5, qin_day1[15]], [15, 6, qin_day0[15]], 
		[16, 0, qin_day6[16]], [16, 1, qin_day5[16]], [16, 2, qin_day4[16]], [16, 3, qin_day3[16]], [16, 4, qin_day2[16]], [16, 5, qin_day1[16]], [16, 6, qin_day0[16]], 
		[17, 0, qin_day6[17]], [17, 1, qin_day5[17]], [17, 2, qin_day4[17]], [17, 3, qin_day3[17]], [17, 4, qin_day2[17]], [17, 5, qin_day1[17]], [17, 6, qin_day0[17]], 
		[18, 0, qin_day6[18]], [18, 1, qin_day5[18]], [18, 2, qin_day4[18]], [18, 3, qin_day3[18]], [18, 4, qin_day2[18]], [18, 5, qin_day1[18]], [18, 6, qin_day0[18]], 
		[19, 0, qin_day6[19]], [19, 1, qin_day5[19]], [19, 2, qin_day4[19]], [19, 3, qin_day3[19]], [19, 4, qin_day2[19]], [19, 5, qin_day1[19]], [19, 6, qin_day0[19]], 
		[20, 0, qin_day6[20]], [20, 1, qin_day5[20]], [20, 2, qin_day4[20]], [20, 3, qin_day3[20]], [20, 4, qin_day2[20]], [20, 5, qin_day1[20]], [20, 6, qin_day0[20]], 
		[21, 0, qin_day6[21]], [21, 1, qin_day5[21]], [21, 2, qin_day4[21]], [21, 3, qin_day3[21]], [21, 4, qin_day2[21]], [21, 5, qin_day1[21]], [21, 6, qin_day0[21]], 
		[22, 0, qin_day6[22]], [22, 1, qin_day5[22]], [22, 2, qin_day4[22]], [22, 3, qin_day3[22]], [22, 4, qin_day2[22]], [22, 5, qin_day1[22]], [22, 6, qin_day0[22]], 
		[23, 0, qin_day6[23]], [23, 1, qin_day5[23]], [23, 2, qin_day4[23]], [23, 3, qin_day3[23]], [23, 4, qin_day2[23]], [23, 5, qin_day1[23]], [23, 6, qin_day0[23]], 
		],
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]

	});
	
		});
		

	});
	