 socket.on('temp_storico',function(data) {
		 	var valori = data.hum_avg_val.split(';');
		for(var field in valori) {
			var line = valori[field].split('***');


				var d = new Date("" + line[1]);
				var str = $.datepicker.formatDate('yy-mm-dd', d);
				if(str === day0) {
					$( ".barra7" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day1) {
					$( ".barra6" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day2) {
					$( ".barra5" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day3) {
					$( ".barra4" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day4) {
					$( ".barra3" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day5) {
					$( ".barra2" ).height( parseFloat(line[0]) * 2 );
				} else if(str == day6) {
					$( ".barra1" ).height( parseFloat(line[0]) * 2 );
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
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + valu + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
		var size2 = randomValue(sArray);
		var valu2 = randomValue(bArray) + 75;
         $('.bubbles2').append('<div class="individual-bubble" style="left: ' + valu2 + 'px; width: ' + size2 + 'px; height:' + size2 + 'px;"></div>');
		 var size3 = randomValue(sArray);
		var valu3 = randomValue(bArray) + 130;
         $('.bubbles3').append('<div class="individual-bubble" style="left: ' + valu3 + 'px; width: ' + size3 + 'px; height:' + size3 + 'px;"></div>');
		  var size4 = randomValue(sArray);
		var valu4 = randomValue(bArray) + 185;
         $('.bubbles4').append('<div class="individual-bubble" style="left: ' + valu4 + 'px; width: ' + size4 + 'px; height:' + size4 + 'px;"></div>');
		 var size5 = randomValue(sArray);
        var valu5 = randomValue(bArray) + 245;
         $('.bubbles5').append('<div class="individual-bubble" style="left: ' + valu5 + 'px; width: ' + size5 + 'px; height:' + size5 + 'px;"></div>');
		  var size6 = randomValue(sArray);
        var valu6 = randomValue(bArray) + 296;
         $('.bubbles6').append('<div class="individual-bubble" style="left: ' + valu6 + 'px; width: ' + size6 + 'px; height:' + size6 + 'px;"></div>');
		var size7 = randomValue(sArray);
        var valu7 = randomValue(bArray) + 345;
         $('.bubbles7').append('<div class="individual-bubble" style="left: ' + valu7 + 'px; width: ' + size7 + 'px; height:' + size7 + 'px;"></div>');
		
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