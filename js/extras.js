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
    var mainSlide = document.getElementById('slide-button-0');
    if (mainSlide){
     mainSlide.setAttribute('href', window.location.href);
    }
});
 

//main index interactions

jQuery('.childbearing').click(function(e) {
  e.preventDefault(); 
  jQuery('.active').removeClass('active');
  jQuery(this).parent().children('ul').toggleClass('active');
  jQuery(this).parentsUntil('.cell-main-index').addClass('active');

});


checkUrl();

function checkUrl(){
  var id = getQueryVariable("menu");
  if (id){
    jQuery('#'+id).parent().children('ul').addClass('active');
  }
  console.log('running url check');
}
//from https://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

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