(function($) {

  $('.button').first().addClass('active');

  $('.button').click(function(){
    var $this = $(this);
    $siblings = $this.parent().children(),
    console.log($siblings);
    position = $siblings.index($this)+1;
    console.log (position);
    
    $('.subcontent div').removeClass('active').eq(position).addClass('active');
    
    $siblings.removeClass('active');
    $this.addClass('active');
  })

})(jQuery);


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


//full size h5p images


document.querySelector('iframe').addEventListener("load", ev => {
    // your stuff

if (document.getElementsByClassName('h5p-iframe')){
  var iframe = document.getElementById('h5p-iframe-1');
  var one = iframe.contentWindow.document.querySelectorAll('.h5p-question-image-wrap.h5p-question-image-scalable')[0].style.width = '100%';
  var two = iframe.contentWindow.document.querySelectorAll('.h5p-question-image-wrap.h5p-question-image-scalable')[1].style.width = '100%';
 console.log(one);
  console.log(two);
 
}

})


/* var div = innerDoc.document.getElementById('h5p-mcq0');
  console.log('div-'+div);
   var image = innerDoc.querySelector('.h5-question-image');
   console.log(image);
   image.classList.add("h5p-question-image-fill-width");
   */
