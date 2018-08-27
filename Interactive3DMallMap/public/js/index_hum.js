/* Javascript humidity historical */

	document.querySelector('.barra7').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra6').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra5').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra4').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra3').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra2').style.setProperty('visibility', 'hidden');
	document.querySelector('.barra1').style.setProperty('visibility', 'hidden');

	document.querySelector('#boxContainer').style.setProperty('visibility', 'hidden');

/* Button to close info window */
	var cls = $("#btnCloseHumInfos");
	cls.on("click", function() {
		classie.remove(document.querySelector('#boxContainer'), 'open_el');
		classie.add(document.querySelector('#boxContainer'), 'close_el');
		setTimeout(function () {
		document.querySelector('#boxContainer').style.setProperty('visibility', 'hidden');
		}, 400);
	});

	var br1 = $(".barra1");
	var br2 = $(".barra2");
	var br3 = $(".barra3");
	var br4 = $(".barra4");
	var br5 = $(".barra5");
	var br6 = $(".barra6");
	var br7 = $(".barra7");

/* function called to show info window */
	function openInfos (ele) {
		classie.remove(document.querySelector('#boxContainer'), 'close_el');
		document.querySelector('#boxContainer').style.setProperty('visibility', 'visible');
		classie.add(document.querySelector('#boxContainer'), 'open_el');
		  
		document.getElementsByClassName("avg_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_avg');
		document.getElementsByClassName("max_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_max');
		document.getElementsByClassName("min_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_min');
	}
	
	br1.on("click", function() {
		openInfos(1);
	});
	br2.on("click", function() {
		openInfos(2);
	});
	br3.on("click", function() {
		openInfos(3);
	});
	br4.on("click", function() {
		openInfos(4);
	});
	br5.on("click", function() {
		openInfos(5);
	});
	br6.on("click", function() {
		openInfos(6);
	});
	br7.on("click", function() {
		openInfos(7);
	});

/* 
	On receiving new values from the node file 
		A new date is created
		then compared with the last 7 days
		The bars are then built up with those values.

*/
	socket.on('temp_storico',function(data) {
		var valori = data.hum_avg_val.split(';');
		for(var field in valori) {
			var line = valori[field].split('***');

			var d = new Date("" + line[3]);
			var str = $.datepicker.formatDate('yy-mm-dd', d);
			if(str === day0) {
				$(".barra7").height( parseFloat(line[0]) * 2 );
				$(".barra7").attr('hum_avg','' + line[0]);
				$(".barra7").attr('hum_max','' + line[1]);
				$(".barra7").attr('hum_min','' + line[2]);
				document.querySelector('.barra7').style.setProperty('visibility', 'visible');
			} else if(str == day1) {
				$(".barra6").height( parseFloat(line[0]) * 2 );
				$(".barra6").attr('hum_avg','' + line[0]);
				$(".barra6").attr('hum_max','' + line[1]);
				$(".barra6").attr('hum_min','' + line[2]);
				document.querySelector('.barra6').style.setProperty('visibility', 'visible');
			} else if(str == day2) {
				$(".barra5").height( parseFloat(line[0]) * 2 );
				$(".barra5").attr('hum_avg','' + line[0]);
				$(".barra5").attr('hum_max','' + line[1]);
				$(".barra5").attr('hum_min','' + line[2]);
				document.querySelector('.barra5').style.setProperty('visibility', 'visible');
			} else if(str == day3) {
				$(".barra4").height( parseFloat(line[0]) * 2 );
				$(".barra4").attr('hum_avg','' + line[0]);
				$(".barra4").attr('hum_max','' + line[1]);
				$(".barra4").attr('hum_min','' + line[2]);
				document.querySelector('.barra4').style.setProperty('visibility', 'visible');
			} else if(str == day4) {
				$(".barra3").height( parseFloat(line[0]) * 2 );
				$(".barra3").attr('hum_avg','' + line[0]);
				$(".barra3").attr('hum_max','' + line[1]);
				$(".barra3").attr('hum_min','' + line[2]);
				document.querySelector('.barra3').style.setProperty('visibility', 'visible');
			} else if(str == day5) {
				$(".barra2").height( parseFloat(line[0]) * 2 );
				$(".barra2").attr('hum_avg','' + line[0]);
				$(".barra2").attr('hum_max','' + line[1]);
				$(".barra2").attr('hum_min','' + line[2]);
				document.querySelector('.barra2').style.setProperty('visibility', 'visible');
			} else if(str == day6) {
				$(".barra1").height( parseFloat(line[0]) * 2 );
				$(".barra1").attr('hum_avg','' + line[0]);
				$(".barra1").attr('hum_max','' + line[1]);
				$(".barra1").attr('hum_min','' + line[2]);
				document.querySelector('.barra1').style.setProperty('visibility', 'visible');
			}
		}
		
		$('.pointer_height').fadeOut(50);
		$('.barra').each(function(i, el){
			$(el).on({
				mousemove: function(e){
					$('.pointer_height').fadeIn(50).offset({
						top: e.pageY - 45,
						left: e.pageX -20
					});
					$('.data-height').text( $(el).height() );
				},
				mouseleave: function(){
					$('.pointer_height').fadeOut(50);
				}
			});
		});
	});
