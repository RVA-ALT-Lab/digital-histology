(function($) {

$('.button').first().addClass('active');

$('.button').click(function(){
  var $this = $(this);
  $siblings = $this.parent().children(),
  position = $siblings.index($this);
  console.log (position);
  
  $('.subcontent div').removeClass('active').eq(position).addClass('active');
  
  $siblings.removeClass('active');
  $this.addClass('active');
})

})( jQuery );

//main index interactions

jQuery(".cell-main-index li:has(ul) > a").click(function (e) {
  e.preventDefault(); 
  jQuery("#hist-menu>ul").removeClass('active');
  jQuery(this).toggleClass('active');
  jQuery(this).parent().children('ul').toggleClass('active');
  console.log( 'parent- ' + jQuery("hist-menu>ul").eq(0));
});


//indent buttons that lead with a hyphen 

var buttons = document.getElementsByClassName('button');

for (var i =0; i < buttons.length; i++){
  var text =buttons[i].innerHTML;
  if(text[0]==='-'){
    buttons[i].style.paddingLeft = '1em';
  }
}