(function($) {

  $('.button').first().addClass('active');
  $('.button').click(function(){
    var $this = $(this);
    $siblings = $this.parent().children(),
    //console.log($siblings);
    position = $siblings.index($this)+1;
    //console.log (position);
    $('.subcontent div').removeClass('active').eq(position).addClass('active');
    
    $siblings.removeClass('active');
    $this.addClass('active');     
  })

})(jQuery);


 

//rewrite primary link on menu

jQuery( document ).ready(function() {
  if (document.getElementById('slide-button-0')){
    var mainSlide = document.getElementById('slide-button-0');
    mainSlide.setAttribute('href', window.location.href);
  }
});
 

//main index interactions

jQuery("#app li:has(ul) > a").click(function (e) {
  e.preventDefault(); 
  jQuery("#hist-menu>ul").removeClass('active');
  jQuery(this).toggleClass('active');
  jQuery(this).parent().children('ul').toggleClass('active');
  //console.log( 'parent- ' + jQuery("hist-menu>ul").eq(0));
});

console.log(jQuery("#app li:has(ul) > a"));

//indent buttons that lead with a hyphen 

var buttons = document.getElementsByClassName('button');

for (var i =0; i < buttons.length; i++){
  var text =buttons[i].innerHTML;
  if(text[0]==='-'){
    buttons[i].style.paddingLeft = '1em';
  }
}



function leftArrowPressed() {
   var url = document.getElementById('nav-arrow-left').parentElement.href;
   window.location.href = url;
}

function rightArrowPressed() {
   var url = document.getElementById('nav-arrow-right').parentElement.href;
   window.location.href = url;

}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};