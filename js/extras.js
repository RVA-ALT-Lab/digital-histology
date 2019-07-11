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


 
//NOW DONE VIA THE TEMPLATE IN PHP
// //rewrite primary link on menu
// jQuery( document ).ready(function() {
//     var mainSlide = document.getElementById('slide-button-0');
//     if (mainSlide){
//      mainSlide.setAttribute('href', window.location.href);
//     }
// });
 

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
    window.location.hash = 'hidden';     
    let list = document.querySelector('.button-wrap');
    shuffleNodes(list);//shuffle the overlays
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
  window.location.hash = '';
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
  var state = document.getElementById('quizzer').dataset.quizstate;
  if (state === 'hidden'){
    showSlideTitles();
  } else {
    hideSlideTitles();
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

//read hash and look for button click
jQuery( document ).ready(function() {
  if ( document.getElementById('quizzer')){
    document.getElementById('quizzer').addEventListener("click", setQuizState);
  } 
  if (window.location.hash.substring(1) === 'hidden'){
      let mainSlide = document.getElementById('slide-button-0');
      if (mainSlide){
        console.log(mainSlide.setAttribute('href', mainSlide.href+'#hidden'));
      }

    hideSlideTitles();
  }
});


//shuffle overlay elements from https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
 function shuffleNodes(list) {
        var nodes = list.children, i = 0;
        nodes = Array.prototype.sort.call(nodes);
        while(i < nodes.length) {
           list.appendChild(nodes[i]);
           ++i;
        }
    }

//remove hash from url
//from https://stackoverflow.com/a/5298684/3390935
function removeHash () { 
    history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}


  var _paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://stats.rampages.us/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '8']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();



//SLIDER NAVIGATION
if (document.getElementById('slide-the-pages')){
  let slider = document.getElementById('slide-the-pages');
  slider.oninput = function() {
    //console.log(slider.value);
    var urlArray = window.location.href.split('/');
    var lastSegment = urlArray.pop() || urlArray.pop();  
    //console.log(lastSegment)
    let newPage = lastSegment.replace(/\d/g, '')+slider.value;
    console.log(newPage);
    window.location.assign(urlArray.join('/')+'/'+newPage);
  }
}


