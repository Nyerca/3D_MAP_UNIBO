var qin_day0 = [30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var qin_day6 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];



	$(document).ready(function() {


	socket.on('temp_storico',function(data) {	

		var valori = data.qual_avg_val.split(';');
		for(var field in valori) {
			var line = valori[field].split('***');

			var d = new Date("" + line[1]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					qin_day0[line[2]] = parseFloat(line[0]);
				} else if(str == day1) {
					qin_day1[line[2]] = parseFloat(line[0]);
				} else if(str == day2) {
					qin_day2[line[2]] = parseFloat(line[0]);
				} else if(str == day3) {
					qin_day3[line[2]] = parseFloat(line[0]);
				} else if(str == day4) {
					qin_day4[line[2]] = parseFloat(line[0]);
				} else if(str == day5) {
					qin_day5[line[2]] = parseFloat(line[0]);
				} else if(str == day6) {
					qin_day6[line[2]] = parseFloat(line[0]);
				}

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
                "margin":"dynamic",
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
                "item":{
                    "border-color":"none",
                    "size":"13px",
                    "font-color":"#05636c"
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
                    "font-color":"#05636c"
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
                    "text":" The surf will be about %v feet.",
                    "text-align":"left"
                },
                "rules":[
                    {
                        "rule":"%node-value >= 6",
                        "backgroundColor":"#2A0000",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 4 && %node-value <= 5",
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
                    "values":qin_day0,
                    "text":"2-3 Ft",
                    "legend-marker":{
                        "backgroundColor":"#7FCDBB"
                    }
                },
                {
                    "values":qin_day1,
                    "text":"3-4 Ft",
                    "legend-marker":{
                        "backgroundColor":"#41B6C4"
                    }
                },
                {
                    "values":qin_day3,
                    "text":"4-5 Ft",
                    "legend-marker":{
                        "backgroundColor":"#1D91C0"
                    }
                },
                {
                    "values":qin_day3,
                    "text":"5-6 Ft",
                    "legend-marker":{
                        "backgroundColor":"#225EA8"
                    }
                },
                {
                    "values":qin_day4,
                    "text":"6-7 Ft",
                    "legend-marker":{
                        "backgroundColor":"#253494"
                    }
                },
                {
                    "values":qin_day5,
                    "text":"7-8 Ft",
                    "legend-marker":{
                        "backgroundColor":"#081D58"
                    }
                },
                {
                    "values":qin_day6,
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
 
zingchart.render({ 
	id : 'myChart_q_storico', 
	data : myConfig, 
	height: 500, 
	width: '100%' 
});
	});
	
	
	});
	