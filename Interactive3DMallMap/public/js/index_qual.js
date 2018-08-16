$(document).ready(function() {
	var valore, val1 = 0;
	

      socket.on('sens',function(data) {
		 valore = data.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			if(line[0] == "2") {
				val1 = 	Math.round(line[1]);
				
				document.getElementById("prog_q").setAttribute("data-perc", val1);

			}
		}		
      });

	  $(function() {
			   $('#prog_q').each(function(){
		var t = $(this);
		t.find('.label_q').append('<div class="perc"></div>');
		
		function perc() {
		var dataperc = t.attr('data-perc'),
				barperc = Math.round(dataperc*3.56);
		t.find('.bar_q').animate({width:barperc}, dataperc*25);
		
		
			var length = t.find('.bar_q').css('width'),
				perc = Math.round(parseInt(length)/3.56),
				labelpos = (parseInt(length)-2);
			t.find('.label_q').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}
		perc();
		setInterval(perc, 100); 
	});
	
});

	  });