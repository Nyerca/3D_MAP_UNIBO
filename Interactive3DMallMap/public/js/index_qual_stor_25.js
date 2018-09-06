/* Javascript air quality historical */

	var qin_day0_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day1_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day2_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day3_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day4_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day5_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var qin_day6_graph2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	$(document).ready(function() {

/* 
	On receiving new values from the node file 
		those values are inserted in the correspondents variables
		the chart is after that re-built up.

*/
		socket.on('temp_storico',function(data) {	

			var valori = data.qual_avg_val.split(';');
			for(var field in valori) {
				var line = valori[field].split('***');
				
				
			}

		
		
		
// Chart Configuration
			var myConfig = {
				"globals":{
					"font-family":"Roboto",
				},
				"graphset":[
					{
						"type":"piano",
						"theme":"classic",
						'zooming':false,
						"title":{
							"text":"Inquinamento dell'aria",
							"background-color":"none",
							"font-color":"white",
							"font-size":"24px",
							"adjust-layout":true,
							"padding-bottom":25
						},
						"subtitle":{
							"y":"38.5px",
							"x":"-9.5px",
							"text":"Valori medi di inquinamento settimanali",
							"background-color":"none",
							"font-color":"white",
							"font-size":"14px",
							"height":"25px"
						},
						"backgroundColor":"#3d3d3d",
						"plotarea":{
							"background-color": 'rgba(45, 45, 45, 1.0)'
						},
						"scaleX":{
							"zooming":"false",
							"placement":"opposite",
							"lineWidth":0,
							"item":{
								"border-color":"none",
								"size":"13px",
								"font-color":"white"
							},
							"guide":{
								"visible":false
							},
							"tick":{
								"visible":false
							},
							"values":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
						},
						"scroll-x": {
							"bar":{
								"border-radius":3,
								"background-color":"white",
								"alpha":.5
							},
							"handle":{
								"border-radius":5,
								"background-color":"#01579B",
								"border-top":"none",
								"border-right":"none",
								"border-bottom":"none",
								"border-left":"none"
							}
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
						"scroll-y": {
							"bar":{
								"border-radius":3,
								"background-color":"white",
								"alpha":.5
							},
							"handle":{
								"border-radius":5,
								"background-color":"#01579B",
								"border-top":"none",
								"border-right":"none",
								"border-bottom":"none",
								"border-left":"none"
							}
						},
						"scaleY":{
							"lineWidth":0,
							"mirrored":true,
							"tick":{
								"visible":false
							},
							"guide":{
								"visible":false
							},
							"item":{
								"border-color":"none",
								"size":"13px",
								"font-color":"white"
							},
							"values":["Mo","Tu","We","Th","Fr","Sa","Su"]
						},
						"legend":{
							"layout":"x6",
							"width":"80%",
							"shadow":false,
							"border-width":0,
							"align":"center",
							"vertical-align":"bottom",
							"toggle-action":"none",
							"backgroundColor":"#3d3d3d",
							"item":{
								"border-color":"none",
								"size":"13px",
								"font-color":"white"
							},
							"marker":{
								"type":"square",
								"border-radius":"8",
								"border-color":"none",
								"size":"13px"
							},
							"footer":{
								"border-color":"none",
								"background-color":"none",
								"text-align":"center",
								"font-size":"14px",
								"font-color":"white"
							}
						},
						"plot":{
							"aspect":"none",
							"borderWidth":2,
							"borderColor":"#eeeeee",
							"borderRadius":7,
							"tooltip":{
								"font-size":"14px",
								"font-color":"white",
								"text":" La qualità è: %v.",
								"text-align":"left"
							},
							"rules":[
								{
									"rule":"%node-value >= 6",
									"backgroundColor":"#2A0000",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value > 4 && %node-value <= 6",
									"backgroundColor":"#460303",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value > 3 && %node-value <= 4",
									"backgroundColor":"#6B0000",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value > 2 && %node-value <= 3",
									"backgroundColor":"#910000",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value > 1 && %node-value <= 2",
									"backgroundColor":"#D41C1C",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value > 0 && %node-value <= 1",
									"backgroundColor":"#E34848",
									"font-color":"#05636c"
								},
								{
									"rule":"%node-value == 0",
									"backgroundColor":"#FF9A9A",
									"font-color":"#05636c"
								},
							]
						},
						"series":[
							{
								"values":qin_day0_graph2,
								"text":"0-1",
								"legend-marker":{
									"backgroundColor":"#E34848",
								}
							},
							{
								"values":qin_day1_graph2,
								"text":"1-2",
								"legend-marker":{
									"backgroundColor":"#D41C1C"
								}
							},
							{
								"values":qin_day2_graph2,
								"text":"2-3",
								"legend-marker":{
									"backgroundColor":"#910000"
								}
							},
							{
								"values":qin_day3_graph2,
								"text":"3-4",
								"legend-marker":{
									"backgroundColor":"#6B0000"
								}
							},
							{
								"values":qin_day4_graph2,
								"text":"5-6",
								"legend-marker":{
									"backgroundColor":"#460303"
								}
							},
							{
								"values":qin_day5_graph2,
								"text":">6",
								"legend-marker":{
									"backgroundColor":"#2A0000"
								}
							},
							{
								"values":qin_day6_graph2,
								"text":"1-2 Ft",
								"legend-marker":{
									"backgroundColor":"#fff"
								},
								"legend-item":{
									"visible":false
								}
							}
						]
					}
				]
			};
/* 
	Zingchart library used to create the chart.
*/	
			zingchart.render({ 
				id : 'myChart_q25_storico', 
				data : myConfig, 
				height: 400, 
				width: '100%' 
			});
		});
	});
	