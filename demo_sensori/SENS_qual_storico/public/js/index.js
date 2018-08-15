var myConfig = {
  "globals":{
    "font-family":"Roboto",
  },
  "graphset":[
        {
            "type":"piano",
            "theme":"classic",
			'zooming':"false",
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
                "values":["2a","3a","4a","5a","6a","7a","8a","9a","10a","11a","12a","1p","2p","3p","4p","5p","6p","7p","8p","9p","10p","11p"],
                "zooming":true,
                "zoom-snap": true,
                //"zoomTo": [2,5]
            },
            "zoom" : {
                  "preserve-zoom" : true,
                  "background-color":"#e5e8ea",
                  "border-color":"#009",
                  "border-width":2,
                  "alpha":0.75
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
                "zooming":true,
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
                    "values":[1,1,1,2,2,2,2,2,2,2,2,1,2,2,2,1,2,1,2,2,1,2],
                    "text":"2-3 Ft",
                    "legend-marker":{
                        "backgroundColor":"#7FCDBB"
                    }
                },
                {
                    "values":[2,2,2,2,2,2,3,3,3,2,2,3,3,3,3,2,2,2,2,1,2,3],
                    "text":"3-4 Ft",
                    "legend-marker":{
                        "backgroundColor":"#41B6C4"
                    }
                },
                {
                    "values":[2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,3,3,3,2],
                    "text":"4-5 Ft",
                    "legend-marker":{
                        "backgroundColor":"#1D91C0"
                    }
                },
                {
                    "values":[2,3,3,2,3,3,3,4,5,4,4,5,4,4,5,4,4,3,3,3,3,3],
                    "text":"5-6 Ft",
                    "legend-marker":{
                        "backgroundColor":"#225EA8"
                    }
                },
                {
                    "values":[3,2,3,2,3,3,4,4,4,5,5,5,5,4,4,5,4,3,2,3,4,4],
                    "text":"6-7 Ft",
                    "legend-marker":{
                        "backgroundColor":"#253494"
                    }
                },
                {
                    "values":[2,3,5,6,5,6,5,6,5,6,6,6,6,5,6,5,6,4,5,4,4,4],
                    "text":"7-8 Ft",
                    "legend-marker":{
                        "backgroundColor":"#081D58"
                    }
                },
                {
                    "values":[3,2,3,2,3,3,4,4,4,5,5,5,5,4,4,5,4,3,2,3,4,4],
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