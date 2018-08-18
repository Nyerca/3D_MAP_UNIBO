var qin= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var avg_qin = [3, 3, 4, 7, 4, 3, 3];


	var day0, day1, day2, day3, day4, day5, day6;
	for(var i= 0; i < 7; i++) {
var day = new Date();
day.setDate(day.getDate() - i);

var month_n = day.getUTCMonth() + 1; //months from 1-12
var day_n = day.getUTCDate();
var year_n = day.getUTCFullYear();
var day = year_n
if(("" + month_n).length == 1) {
day += "-0" + month_n
} else {
day += "-" + month_n
}
if(("" +day_n).length == 1) {
day += "-0" + day_n
} else {
day += "-" + day_n
}

switch(i) {
	case 0: day0 = day; break;
	case 1: day1 = day; break;
	case 2: day2 = day; break;
	case 3: day3 = day; break;
	case 4: day4 = day; break;
	case 5: day5 = day; break;
	case 6: day6 = day; break;
}

}

	$(document).ready(function() {
	console.log("" + day0 + "   " + day1+ "   " + day2+ "   " + day3+ "   " + day4+ "   " + day5+ "   " + day6);
	var socket = io('/mySensorNamespace');	
	socket.on('hi',function(data) {	

		var valori = data.split(';');
		for(var field in valori) {
			var line = valori[field].split('***');

			if(line[2] == '1') {
						console.log(line[0]);
				var d = new Date("" + line[1]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					avg_tin[0] = parseFloat(line[0]);
				} else if(str == day1) {
					avg_tin[1] = parseFloat(line[0]);
				} else if(str == day2) {
					avg_tin[2] = parseFloat(line[0]);
				} else if(str == day3) {
					avg_tin[3] = parseFloat(line[0]);
				} else if(str == day4) {
					avg_tin[4] = parseFloat(line[0]);
				} else if(str == day5) {
					avg_tin[5] = parseFloat(line[0]);
				} else if(str == day6) {
					avg_tin[6] = parseFloat(line[0]);
				}
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
                "text":"Surf Height",
                "background-color":"none",
                "font-color":"#05636c",
                "font-size":"24px",
                "adjust-layout":true,
                "padding-bottom":25
            },
            "subtitle":{
                "y":"38.5px",
                "x":"-9.5px",
                "text":"Black's Beach - La Jolla",
                "background-color":"none",
                "font-color":"#05636c",
                "font-size":"14px",
                "height":"25px"
            },
            "backgroundColor":"#fff",
            "plotarea":{
                "margin":"dynamic"
            },
            "scaleX":{
			"zooming":"false",
                "placement":"opposite",
                "lineWidth":0,
                "item":{
                    "border-color":"none",
                    "size":"13px",
                    "font-color":"#05636c"
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
                "background-color":"#01579B",
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
                "background-color":"#01579B",
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
                    "font-color":"#05636c"
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
                        "rule":"%node-value > 6",
                        "backgroundColor":"#081D58",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 4 && %node-value <= 5",
                        "backgroundColor":"#253494",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 3 && %node-value <= 4",
                        "backgroundColor":"#225EA8",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 2 && %node-value <= 3",
                        "backgroundColor":"#1D91C0",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 1 && %node-value <= 2",
                        "backgroundColor":"#41B6C4",
                        "font-color":"#05636c"
                    },
                    {
                        "rule":"%node-value > 0 && %node-value <= 1",
                        "backgroundColor":"#7FCDBB",
                        "font-color":"#05636c"
                    }
                ]
            },
            "series":[
                {
                    "values":qin,
                    "text":"2-3 Ft",
                    "legend-marker":{
                        "backgroundColor":"#7FCDBB"
                    }
                },
                {
                    "values":[2,2,2,2,2,2,3,3,3,2,2,3,3,3,3,2,2,2,2,1,2,3,2,2],
                    "text":"3-4 Ft",
                    "legend-marker":{
                        "backgroundColor":"#41B6C4"
                    }
                },
                {
                    "values":[2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,3,3,3,2,2,2],
                    "text":"4-5 Ft",
                    "legend-marker":{
                        "backgroundColor":"#1D91C0"
                    }
                },
                {
                    "values":[2,3,3,2,3,3,3,4,5,4,4,5,4,4,5,4,4,3,3,3,3,3,2,2],
                    "text":"5-6 Ft",
                    "legend-marker":{
                        "backgroundColor":"#225EA8"
                    }
                },
                {
                    "values":[3,2,3,2,3,3,4,4,4,5,5,5,5,4,4,5,4,3,2,3,4,4,2,2],
                    "text":"6-7 Ft",
                    "legend-marker":{
                        "backgroundColor":"#253494"
                    }
                },
                {
                    "values":[2,3,5,6,5,6,5,6,5,6,6,6,6,5,6,5,6,4,5,4,4,4,2,2],
                    "text":"7-8 Ft",
                    "legend-marker":{
                        "backgroundColor":"#081D58"
                    }
                },
                {
                    "values":[3,2,3,2,3,3,4,4,4,5,5,5,5,4,4,5,4,3,2,3,4,4,2,2],
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
	id : 'myChart', 
	data : myConfig, 
	height: 500, 
	width: '100%' 
});
	});
	
	
	});
	