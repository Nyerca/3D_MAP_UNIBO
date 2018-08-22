
document.querySelector('.barra7').style.setProperty('visibility', 'hidden');
document.querySelector('.barra6').style.setProperty('visibility', 'hidden');
document.querySelector('.barra5').style.setProperty('visibility', 'hidden');
document.querySelector('.barra4').style.setProperty('visibility', 'hidden');
document.querySelector('.barra3').style.setProperty('visibility', 'hidden');
document.querySelector('.barra2').style.setProperty('visibility', 'hidden');
document.querySelector('.barra1').style.setProperty('visibility', 'hidden');

document.querySelector('#boxContainer').style.setProperty('visibility', 'hidden');

var cls = $("#btnCloseHumInfos");
cls.on("click", function() {
  document.querySelector('#boxContainer').style.setProperty('visibility', 'hidden');
});

var br1 = $(".barra1");
var br2 = $(".barra2");
var br3 = $(".barra3");
var br4 = $(".barra4");
var br5 = $(".barra5");
var br6 = $(".barra6");
var br7 = $(".barra7");

function openInfos (ele) {
	document.getElementsByClassName("avg_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_avg');
	document.getElementsByClassName("max_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_max');
	document.getElementsByClassName("min_span_val")[0].innerHTML = "" + $(".barra" + ele).attr('hum_min');
  document.querySelector('#boxContainer').style.setProperty('visibility', 'visible');
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
 
 socket.on('temp_storico',function(data) {
		 	var valori = data.hum_avg_val.split(';');
		for(var field in valori) {
			var line = valori[field].split('***');


				var d = new Date("" + line[3]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					$( ".barra7" ).height( parseFloat(line[0]) * 2 );
					$(".barra7").attr('hum_avg','' + line[0]);
					$(".barra7").attr('hum_max','' + line[1]);
					$(".barra7").attr('hum_min','' + line[2]);
					document.querySelector('.barra7').style.setProperty('visibility', 'visible');
				} else if(str == day1) {
					$( ".barra6" ).height( parseFloat(line[0]) * 2 );
					$(".barra6").attr('hum_avg','' + line[0]);
					$(".barra6").attr('hum_max','' + line[1]);
					$(".barra6").attr('hum_min','' + line[2]);
					document.querySelector('.barra6').style.setProperty('visibility', 'visible');
				} else if(str == day2) {
					$( ".barra5" ).height( parseFloat(line[0]) * 2 );
					$(".barra5").attr('hum_avg','' + line[0]);
					$(".barra5").attr('hum_max','' + line[1]);
					$(".barra5").attr('hum_min','' + line[2]);
					document.querySelector('.barra5').style.setProperty('visibility', 'visible');
				} else if(str == day3) {
					$( ".barra4" ).height( parseFloat(line[0]) * 2 );
					$(".barra4").attr('hum_avg','' + line[0]);
					$(".barra4").attr('hum_max','' + line[1]);
					$(".barra4").attr('hum_min','' + line[2]);
					document.querySelector('.barra4').style.setProperty('visibility', 'visible');
				} else if(str == day4) {
					$( ".barra3" ).height( parseFloat(line[0]) * 2 );
					$(".barra3").attr('hum_avg','' + line[0]);
					$(".barra3").attr('hum_max','' + line[1]);
					$(".barra3").attr('hum_min','' + line[2]);
					document.querySelector('.barra3').style.setProperty('visibility', 'visible');
				} else if(str == day5) {
					$( ".barra2" ).height( parseFloat(line[0]) * 2 );
					$(".barra2").attr('hum_avg','' + line[0]);
					$(".barra2").attr('hum_max','' + line[1]);
					$(".barra2").attr('hum_min','' + line[2]);
					document.querySelector('.barra2').style.setProperty('visibility', 'visible');
				} else if(str == day6) {
					$( ".barra1" ).height( parseFloat(line[0]) * 2 );
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
	console.log("hover");
  },
  mouseleave: function(){
	  console.log("fadeout");
     $('.pointer_height').fadeOut(50);
  }});
});
 });

jQuery(document).ready(function($){
 
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [4,6,8,10];
 
    // Push the header width values to bArray
    for (var i = 0; i < $('.bubbles').width() - 6; i++) {
		console.log($('.bubbles').width());
        bArray.push(i);
    }
     
    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){
         
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
		var valu = randomValue(bArray) + 27;
        if($( ".barra1" ).height() != "0") $('.bubbles').append('<div class="individual-bubble" style="left: ' + valu + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
		
		var size2 = randomValue(sArray);
		var valu2 = randomValue(bArray) + 75;
        if($( ".barra2" ).height() != "0") $('.bubbles2').append('<div class="individual-bubble" style="left: ' + valu2 + 'px; width: ' + size2 + 'px; height:' + size2 + 'px;"></div>');
		
		var size3 = randomValue(sArray);
		var valu3 = randomValue(bArray) + 130;
        if($( ".barra3" ).height() != "0") $('.bubbles3').append('<div class="individual-bubble" style="left: ' + valu3 + 'px; width: ' + size3 + 'px; height:' + size3 + 'px;"></div>');
		
		var size4 = randomValue(sArray);
		var valu4 = randomValue(bArray) + 185;
        if($( ".barra4" ).height() != "0") $('.bubbles4').append('<div class="individual-bubble" style="left: ' + valu4 + 'px; width: ' + size4 + 'px; height:' + size4 + 'px;"></div>');
		
		var size5 = randomValue(sArray);
        var valu5 = randomValue(bArray) + 245;
		if($( ".barra5" ).height() != "0") $('.bubbles5').append('<div class="individual-bubble" style="left: ' + valu5 + 'px; width: ' + size5 + 'px; height:' + size5 + 'px;"></div>');
        
		var size6 = randomValue(sArray);
		var valu6 = randomValue(bArray) + 296;
        if($( ".barra6" ).height() != "0") $('.bubbles6').append('<div class="individual-bubble" style="left: ' + valu6 + 'px; width: ' + size6 + 'px; height:' + size6 + 'px;"></div>');
		
		var size7 = randomValue(sArray);
        var valu7 = randomValue(bArray) + 345;
		if($( ".barra7" ).height() != "0") $('.bubbles7').append('<div class="individual-bubble" style="left: ' + valu7 + 'px; width: ' + size7 + 'px; height:' + size7 + 'px;"></div>');
		
        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );

 
 
    }, 350);
 
});