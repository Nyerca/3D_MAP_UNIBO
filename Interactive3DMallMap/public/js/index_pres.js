   	$(document).ready(function() {
	var valore, val1 = 0;
	

      socket.on('sens',function(data) {
		 valore = data.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			if(line[0] == "1") {
				val1 = line[1];
			}
		}		
      });

window.feed = function(callback) {
  var tick = {};
  tick.plot0 = Math.ceil(350 + parseFloat(val1));
  callback(JSON.stringify(tick));
};

var myConfig = {
 	type: "gauge",
 	globals: {
 	  fontSize: 20
 	},
	"background-color":"#3d3d3d",
 	plotarea:{
 	  marginTop:80
 	},
 	plot:{
 	  size:'100%',
 	  valueBox: {
 	    placement: 'center',
 	    text:'%v', //default
 	    fontSize:24,
 	    rules:[
 	      {
 	        rule: '%v >= 700',
 	        text: '%v<br>EXCELLENT'
 	      },
 	      {
 	        rule: '%v < 700 && %v > 640',
 	        text: '%v<br>Good'
 	      },
 	      {
 	        rule: '%v < 640 && %v > 580',
 	        text: '%v<br>Fair'
 	      },
 	      {
 	        rule: '%v <  580',
 	        text: '%v<br>Bad'
 	      }   
 	    ]
 	  }
 	},
  tooltip:{
    borderRadius:5
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
  "plotarea":{  
    "background-color":"#3d3d3d",
}, 
 	scaleR:{
	  aperture:180,
	  minValue:300,
	  maxValue:850,
	  step:50,
	  center:{
	    visible:false
	  },
	  tick:{
	    visible:false
	  },
	  item:{
	    offsetR:0,
	    rules:[
	      {
	        rule:'%i == 9',
	        offsetX:15
	      }
	    ]
	  },
	  labels:['300','','','','','','580','640','700','750','','850'],
	  paddingTop:80,
	  ring:{
	    size:30,
	    rules:[
	      {
	        rule:'%v <= 580',
	        backgroundColor:'#E53935'
	      },
	      {
	        rule:'%v > 580 && %v < 640',
	        backgroundColor:'#EF5350'
	      },
	      {
	        rule:'%v >= 640 && %v < 700',
	        backgroundColor:'#FFA726'
	      },
	      {
	        rule:'%v >= 700',
	        backgroundColor:'#29B6F6'
	      }      
	    ]
	  }
 	},
  refresh:{  
      type:"feed",
      transport:"js",
      url:"feed()",
      interval:100
  },
	series : [
		{
			values : [755], // starting value
			backgroundColor:'black',
	    indicator:[10,10,10,10,0.75],
	    animation:{  
        effect:2,
        method:1,
        sequence:4,
        speed: 900
     },
		}
	]
};

zingchart.render({ 
	id : 'pChart', 
	data : myConfig, 
	height: 220, 
	width: '100%'
});
	});