$('.barra').each(function(i, el){
  $(el).on({
  mousemove: function(e){
    $('.pointer').fadeIn(50).offset({
      top: e.pageY - 45,
      left: e.pageX -20
    });
    $('.data-height').text( $(el).height() );
  },
  mouseleave: function(){
     $('.pointer').fadeOut(50);
  }});
});