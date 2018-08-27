/* Air quality bar function which moves icon accordingly to percentage */
	$(document).ready(function() {
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