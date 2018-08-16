$(document).ready(function() {
	var valore, val1 = 0;
	
	function percent() {
		var dataperc =  $('#prog_q').attr('data-perc'),
				barperc = Math.round(dataperc*5.56);
		
		
			var length =  $('#prog_q').find('.bar_q').css('width'),
				perc = Math.round(parseInt(length)/5.56),
				labelpos = (parseInt(length)-2);
			 $('#prog_q').find('.label_q').css('left', labelpos);
			 $('#prog_q').find('.perc').text(perc+'%');

		}
	
	var socket = io('/mySensorNamespace');
      socket.on('hi',function(data) {
		 valore = data.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			if(line[0] == "2") {
				val1 = 	Math.round(line[1]);
				document.getElementById("prog_q").setAttribute("data-perc", val1);
				percent();
			}
		}		
      });

	  $(function() {
			   $('#prog_q').each(function(){
		var t = $(this);
		t.find('.label_q').append('<div class="perc"></div>');
		
		function perc() {
		var dataperc = t.attr('data-perc'),
				barperc = Math.round(dataperc*5.56);
		t.find('.bar_q').animate({width:barperc}, dataperc*25);
		
		
			var length = t.find('.bar_q').css('width'),
				perc = Math.round(parseInt(length)/5.56),
				labelpos = (parseInt(length)-2);
				console.log("VALOREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: " +length);
			t.find('.label_q').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}
		perc();
		setInterval(perc, 100); 
	});
	
});

	  });