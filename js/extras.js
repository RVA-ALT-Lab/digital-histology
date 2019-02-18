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



//indent buttons that lead with a hyphen 
var buttons = document.getElementsByClassName('button');

for (var i =0; i < buttons.length; i++){
  var text =buttons[i].innerHTML;
  if(text[0]==='-'){
    buttons[i].style.paddingLeft = '1em';
  }  
}


//KEY BINDING for nav
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


//HIDE AND SEEK FOR QUIZ YOURSELF STUFF
function hideSlideTitles(){
    var mainSlide = document.getElementById('slide-button-0'); 
    if (mainSlide){
      var buttons = document.getElementsByClassName('button');
      var subslides = document.getElementsByClassName('sub-deep');
      for (var i = 0; i < buttons.length; i++){
        var original = buttons[i].innerHTML;
        buttons[i].innerHTML = '<span class="hidden">' + original + '</span>* * *';        
        }
      for (var i = 0; i < subslides.length; i++){
            subslides[i].classList.add('nope')
        }
        document.getElementById('the_slide_title').classList.add('nope')
        document.getElementById('the_slide_content').classList.add('nope')
        document.getElementById('quizzer').dataset.quizstate = 'hidden'
        document.getElementById('quizzer').innerHTML = 'Show'
    }
}


function showSlideTitles(){
  var mainSlide = document.getElementById('slide-button-0'); 
    if (mainSlide){
      var buttons = document.getElementsByClassName('button');

      for (var i =0; i < buttons.length; i++){
        var hidden = buttons[i].firstChild.innerHTML;
          buttons[i].innerHTML = hidden;       
        }
        document.getElementById('the_slide_title').classList.remove('nope')
        document.getElementById('the_slide_content').classList.remove('nope')
        document.getElementById('quizzer').dataset.quizstate = 'visible'
        document.getElementById('quizzer').innerHTML = 'Hide'
        var subslides = document.getElementsByClassName('sub-deep');
        for (var i = 0; i < subslides.length; i++){
            subslides[i].classList.remove('nope')
        }
    }
}


function setQuizState(){
  var state = document.getElementById('quizzer').dataset.quizstate
  if (state === 'hidden'){
    showSlideTitles()
  } else {
    hideSlideTitles()
  }
}

function retainQuizState(){
  var state = document.getElementById('quizzer').dataset.quizstate
  if (state === 'hidden'){
    hideSlideTitles()
  } else if (state === 'visible'){
    showSlideTitles()
  }
}


jQuery( document ).ready(function() {
  document.getElementById('quizzer').addEventListener("click", setQuizState);
});
