var header = $('.stats__header');
var bar  = $('.stats__item-bar');
var nums = $('.stats__item-num');
var overlay = $('.stats__overlay');
var back = $('.stats__overlay-back');
var isOpen = false;

var vYear = $('#year');
var vAvg = $('#avg');
var vGames = $('#games');
var vGoal = $('#goals');

$(document).on('ready', function() {
  entrance();
});

bar.on('click', showOverlay);
back.on('click', showOverlay);

function entrance() {
  bar.addClass('active');
  header.addClass('active');
  header.on('transitionend webkitTransitionend', function() {
    nums.css('opacity', '1');
    bar.css('transition-delay', '0');
    header.off('transitionend webkitTransitionend');
  });
}

function showOverlay() {
  if (!isOpen) {
    overlay.addClass('active').removeAttr('style');
    bar.css('transition', 'all 0.4s cubic-bezier(0.86, 0, 0.07, 1)')
    .removeClass('active');
    header.removeClass('active');
    nums.css('opacity', '0');
    isOpen = true;
    
   updateInfo($(this).parent().index());
  } else {
    overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
    bar.addClass('active').removeAttr('style');
    header.addClass('active');
    nums.css('opacity', '1');
    isOpen = false;
  }
}

var data = [
  {
    year: '2007-2008',
    goals: '65',
    games: '82',
    avg: '0.79'
    
  },
  {
    year: '2008-2009',
    goals: '56',
    games: '79',
    avg: '0.7'
    
  },
  {
    year: '2009-2010',
    goals: '50',
    games: '72',
    avg: '0.69'
    
  },
  {
    year: '2010-2011',
    goals: '32',
    games: '79',
    avg: '0.40'
    
  },
  {
    year: '2011-2012',
    goals: '38',
    games: '78',
    avg: '0.48'
    
  },
  {
    year: '2012-2013',
    goals: '32',
    games: '48',
    avg: '0.66'
    
  },
  {
    year: '2013-2014',
    goals: '51',
    games: '78',
    avg: '0.65'
    
  },
  {
    year: '2014-2015',
    goals: '50',
    games: '76',
    avg: '0.66'
    
  }
];

function updateInfo(index) {
  vYear.text(data[index].year);
  vAvg.text(data[index].avg);
  vGoal.text(data[index].goals);
  vGames.text(data[index].games);
}



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
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
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