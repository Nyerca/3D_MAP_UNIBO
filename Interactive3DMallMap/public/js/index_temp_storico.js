/* Javascript temperature historical */
	var avg_tin = [0,0,0,0,0,0,0];
	var avg_tout = [0,0,0,0,0,0,0];
	var max;
	var min;
	
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
					avg_tin[6] = parseFloat(line[0]);
				} else if(str == day1) {
					avg_tin[5] = parseFloat(line[0]);
				} else if(str == day2) {
					avg_tin[4] = parseFloat(line[0]);
				} else if(str == day3) {
					avg_tin[3] = parseFloat(line[0]);
				} else if(str == day4) {
					avg_tin[2] = parseFloat(line[0]);
				} else if(str == day5) {
					avg_tin[1] = parseFloat(line[0]);
				} else if(str == day6) {
					avg_tin[0] = parseFloat(line[0]);
				}
			}
			if(line[2] == '2') {
						console.log(line[0]);
				var d = new Date("" + line[1]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					avg_tout[6] = parseFloat(line[0]);
				} else if(str == day1) {
					avg_tout[5] = parseFloat(line[0]);
				} else if(str == day2) {
					avg_tout[4] = parseFloat(line[0]);
				} else if(str == day3) {
					avg_tout[3] = parseFloat(line[0]);
				} else if(str == day4) {
					avg_tout[2] = parseFloat(line[0]);
				} else if(str == day5) {
					avg_tout[1] = parseFloat(line[0]);
				} else if(str == day6) {
					avg_tout[0] = parseFloat(line[0]);
				}
			}
		}
		
		var valori = data.temp_min_val.split(';');
		for(var field in valori) {
			min = valori[field];
		}
		
		var valori = data.temp_max_val.split(';');
		for(var field in valori) {
			max = valori[field];
		}	
		
		// Chart Configuration
		var chartData = {
			type: "area",
			globals: {
				fontFamily: "Poppins",
				fontColor: "white",
			},
			"background-color":"#3d3d3d",
			title: {
				text: "Temperature medie",
				align: "center",
				fontColor: "white",
				padding: "5px",
			},
			subtitle: {
				text:
					"Il grafico mostra le temperature medie interne ed esterne degli ultimi 7 giorni, la temperatura massima raggiunta è: <b style='color:#ce5050;'>" + max + "</b> la minima: <b style='color:#8cd7ff;'>" +min +"</b>",
				align: "center",
				fontSize: "16px",
				padding: "10px",
				"font-family": "'Roboto Slab', Georgia, serif",
				"font-weight": 700,
			},
			legend: {
				align: "center",
				verticalAlign: "bottom",
				marginBottom: "120px",
				"background-color":"#3d3d3d",
				layout: "1x2",
				border: "none",
				item: {
					fontSize: "18px"
				},
				marker: {
					type: "circle"
				}
			},
			plot: {
				aspect: "spline"
			},
			gui:{
				behaviors:[ //default contextMenu behaviors
					{
						id: "Reload", //built-in id
						enabled:"none" //sets visibility to show 
					},
					{
						id: "SaveAsImage",
						enabled:"none"
					},
					{
						id: "DownloadPDF", //built-in id
						enabled: "none" //sets visibility to show
					},
					{
						id: "DownloadSVG",
						enabled: "none"
					},
					{
						id: "Print", 
						enabled: "none"
					},
					{
						id: "ViewSource", //built-in id 
						enabled: "none" //sets visibility to hide
					},
					{
						id: "HideGuide", //built-in id 
						enabled: "none" //sets visibility to hide
					}
				] 
			},
			scaleX: {
				labels: [
				  "Jul 16",
				  "Aug 16",
				  "Sep 16",
				  "Oct 16",
				  "Nov 16",
				  "Dec 16",
				  "Jan 17"
				],
			},
			"plotarea":{  
				"background-color": 'rgba(45, 45, 45, 1.0)',
				marginTop: "80px",
			}, 
			crosshairX:{
				lineColor: "#565656",
				lineStyle: "dashed",
				lineWidth: 2,
				alpha : 0.5,
				plotLabel:{ //label assoicated to data points
					backgroundColor : "#ffffff",
					borderColor : "#d2d2d2",
					borderRadius : "5px",
					bold : true,
					fontSize : "12px",
					fontColor : "#111",
					shadow : true,
					shadowDistance : 2,
					shadowAlpha : 0.4
				},
				scaleLabel:{ //label associated to scaleX index
					bold : true,
					backgroundColor : "#787878",
					borderRadius : 3,
					fontColor : "#eaeaea",
					fontSize : "12px",
					callout : true,
					paddingTop : 2
				}
			},
			scaleY: {
				values: min +":"+ max + ":2",
				guide: {
					  visible: false
				}
			},
			series: [
				{
					values: avg_tin,
					text: "Temperatura esterna",
				},
				{
					values: avg_tout,
					text: "Temperatura interna",
					fontColor: "white"
				}
			]
		};
/* 
	zingchart library used to create the chart.
*/	
		zingchart.render({
			id: "myChart",
			data: chartData,
			height: 500, 
			width: '100%'
		});
    });
	  