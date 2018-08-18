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
      socket.on('sens',function(data) {
		 valore = data.split(';');
		for(var field in valore) {
			var line = valore[field].split('***');
			
			var d = new Date("" + line[1]);
var str = $.datepicker.formatDate('yy-mm-dd', d);
			if(str === day0) {
			var input = document.querySelector('.one');
			input.style.setProperty('height', '1%')
			} else if(str == day1) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', '1%')
			} else if(str == day2) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', '1%')
			} else if(str == day3) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', '1%')
			} else if(str == day4) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', '1%')
			} else if(str == day5) {
			var input = document.querySelector('.two');
			input.style.setProperty('height', '1%')
			}
			console.log(str);

		}		
      });
	  });