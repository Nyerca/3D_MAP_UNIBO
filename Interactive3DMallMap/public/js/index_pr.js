/* Javascript pressure historical */
	$(document).ready(function() {
		document.querySelector('.contPr').style.setProperty('visibility', 'hidden');
		
/* Button to close info window */
		var cls = $("#btnClosePrInfos");
		cls.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'open_el');
			classie.add(document.querySelector('.contPr'), 'close_el');
			setTimeout(function () {
				document.querySelector('.contPr').style.setProperty('visibility', 'hidden');
			}, 400);
		});

		var bar2 = $(".two");
		var bar3 = $(".three");
		var bar4 = $(".four");
		var bar5 = $(".five");
		var bar6 = $(".six");
		var bar7 = $(".seven");
		var bar8 = $(".eight");

/* click called to show info window */
		bar2.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".two").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".two").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".two").attr('pres_min');
		});
		
		bar3.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".three").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".three").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".three").attr('pres_min');
		});

		bar4.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".four").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".four").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".four").attr('pres_min');
		});

		bar5.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".five").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".five").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".five").attr('pres_min');
		});

		bar6.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".six").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".six").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".six").attr('pres_min');
		});

		bar7.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".seven").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".seven").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".seven").attr('pres_min');
		});

		bar8.on("click", function() {
			classie.remove(document.querySelector('.contPr'), 'close_el');
			document.querySelector('.contPr').style.setProperty('visibility', 'visible');
			classie.add(document.querySelector('.contPr'), 'open_el');
			  
			document.getElementsByClassName("avgPr")[0].innerHTML = "" + $(".eight").attr('pres_avg');
			document.getElementsByClassName("maxPr")[0].innerHTML = "" + $(".eight").attr('pres_max');
			document.getElementsByClassName("minPr")[0].innerHTML = "" + $(".eight").attr('pres_min');
		});		

			
		var input = document.querySelector('.eight');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.seven');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.six');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.five');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.four');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.three');
		input.style.setProperty('visibility', 'hidden');
		var input = document.querySelector('.two');
		input.style.setProperty('visibility', 'hidden');
			
/* 
	On receiving new values from the node file 
		A new date is created
		then compared with the last 7 days
		The bars are then built up with those values.

*/		
		socket.on('temp_storico',function(data) {
			valore = data.hum_avg_val.split(';');
			for(var field in valore) {
				var line = valore[field].split('***');
				
				var d = new Date("" + line[3]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);

				if(str === day0) {
					var input = document.querySelector('.eight');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".eight").attr('pres_avg','' + line[0]);
					$(".eight").attr('pres_max','' + line[1]);
					$(".eight").attr('pres_min','' + line[2]);
				} else if(str == day1) {
					var input = document.querySelector('.seven');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".seven").attr('pres_avg','' + line[0]);
					$(".seven").attr('pres_max','' + line[1]);
					$(".seven").attr('pres_min','' + line[2]);
				} else if(str == day2) {
					var input = document.querySelector('.six');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".six").attr('pres_avg','' + line[0]);
					$(".six").attr('pres_max','' + line[1]);
					$(".six").attr('pres_min','' + line[2]);
				} else if(str == day3) {
					var input = document.querySelector('.five');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".five").attr('pres_avg','' + line[0]);
					$(".five").attr('pres_max','' + line[1]);
					$(".five").attr('pres_min','' + line[2]);
				} else if(str == day4) {
					var input = document.querySelector('.four');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".four").attr('pres_avg','' + line[0]);
					$(".four").attr('pres_max','' + line[1]);
					$(".four").attr('pres_min','' + line[2]);
				} else if(str == day5) {
					var input = document.querySelector('.three');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".three").attr('pres_avg','' + line[0]);
					$(".three").attr('pres_max','' + line[1]);
					$(".three").attr('pres_min','' + line[2]);
				} else if(str == day6) {
					var input = document.querySelector('.two');
					input.style.setProperty('height', line[0] + '%');
					input.style.setProperty('visibility', 'visible');
					$(".two").attr('pres_avg','' + line[0]);
					$(".two").attr('pres_max','' + line[1]);
					$(".two").attr('pres_min','' + line[2]);
				}
				console.log(str);

			}		
		});
	  
	});