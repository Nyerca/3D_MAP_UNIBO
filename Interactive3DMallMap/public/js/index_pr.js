
		$(document).ready(function() {
      socket.on('temp_storico',function(data) {
		 valore = data.hum_avg_val.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			
			var d = new Date("" + line[1]);
var str = $.datepicker.formatDate('yy-mm-dd', d);
console.log("DAAAAAAAAAAAAAAAAAAAA: " + day0);
			if(str === day0) {
			var input = document.querySelector('.eight');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day1) {
			var input = document.querySelector('.seven');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day2) {
			var input = document.querySelector('.six');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day3) {
			var input = document.querySelector('.five');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day4) {
			var input = document.querySelector('.four');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day5) {
			var input = document.querySelector('.three');
			input.style.setProperty('height', line[0] + '%')
			} else if(str == day6) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', line[0] + '%')
			}
			console.log(str);

		}		
      });
	  });