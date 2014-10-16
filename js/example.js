$(document).ready(function(){
                $(".contactLink").click(function(){
                    if ($("#contactForm").is(":hidden")){
                        $("#contactForm").slideDown("slow");
                    }
                    else{
                        $("#contactForm").slideUp("slow");
                    }
                });
            });
            function closeForm(){
                $("#messageSent").show("slow");
                setTimeout('$("#messageSent").hide();$("#contactForm").slideUp("slow")', 2000);
           }

$(document).ready(function() {
  function filterPath(string) {
    return string
      .replace(/^\//,'')
      .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
      .replace(/\/$/,'');
  }
  $('a[href*=#]').each(function() {
    if ( filterPath(location.pathname) == filterPath(this.pathname)
    && location.hostname == this.hostname
    && this.hash.replace(/#/,'') ) {
      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
       if ($target) {
         var targetOffset = $target.offset().top;
         $(this).click(function() {
           $('html, body').animate({scrollTop: targetOffset}, 1000);
           var d = document.createElement("div");
        d.style.height = "101%";
        d.style.overflow = "hidden";
        document.body.appendChild(d);
        window.scrollTo(0,scrollToM);
        setTimeout(function() {
        d.parentNode.removeChild(d);
            }, 10);
           return false;
         });
      }
    }
  });
});
/*! Smooth Scroll - v1.4.5 - 2012-07-22
* Copyright (c) 2012 Karl Swedberg; Licensed MIT, GPL */


// variable to hold current window state - small, medium, or large
var windowState = 'large';

// check intital width of the screen, respond with appropriate menu
$(document).ready(function() {
    var sw = document.body.clientWidth;
    if (sw < 481) {
       smMenu();
    } else if (sw >= 481 && sw <= 768) {
		medMenu();
	} else {
		lgMenu();
	}
});

// take care of resizing the window
$(window).resize(function() {
	var sw = document.body.clientWidth;
    if (sw < 481 && windowState != 'small') {
       smMenu();
    }
	if (sw > 480 && sw < 769 && windowState != 'medium') {
       medMenu();
    }  
    if (sw > 768 && windowState != 'large') {
       lgMenu();
    } 
});
//handle menu for small screens
function smMenu() {
	 //create the menu toggle
     $('.topMenu').before('<div class="menuToggle"><a href="#">menu<span class="indicator">+</span></a></div>');
    // append the + indicator
     $('.topMenu h3').append('<span class="indicator">+</span>');
    // wire up clicks and changing the various menu states
	//we'll use clicks instead of touch in case a smaller screen has a pointer device
	//first, let's deal with the menu toggle
	$('.menuToggle a').click(function() {
		//expand the menu
		$('.topMenu').toggleClass('expand');
		// figure out whether the indicator should be changed to + or -
		var newValue = $(this).find('span.indicator').text() == '+' ? '-' : '+';
		// set the new value of the indicator
		$(this).find('span.indicator').text(newValue);
	});
	//indicate current window state
	windowState = 'small';
}

//handle menu for medium screen sizes
function medMenu() {
	//check to see if the device supports touch
	//we'll use touch events instead of click as it will allow us
	//to support both a CSS-driven hover and touch enabled
	//menu for this screen range
	if ('ontouchstart' in document.documentElement)
    {
		//find all 'hover' class and strip them
		 $('.topMenu').find('li.hover').removeClass('hover');
		 //add touch events to submenu headings
		 $(".topMenu h3").bind('touchstart', function(e){
			//find the current submenu
			var currentItem = $(this).siblings('.submenu');
			//remove the expand class from other submenus to close any currently open submenus
			$('ul.submenu').not(currentItem).removeClass('expand');
			//open the selected submenu
			$(this).siblings('.submenu').toggleClass('expand');
		});
		//close submenus if users click outside the menu
		$('html').bind('touchstart', function(e) {
			$('.topMenu').find('ul.submenu').removeClass('expand');
		});
		//stop clicks on the menu from bubbling up
		$('#mainNav').bind('touchstart', function(e){
          	e.stopPropagation();
       });
	}
	//indicate current window state
	windowState = 'medium';
}

//handle menu for large screens
function lgMenu() {
	 //largely what we'll do here is simple remove functionality that
	//may be left behind by other screen sizes
	//at this size the menu will function as a pure-css driven dropdown
	//advances in touch screen are beginning to make us re-think
	//this approach
    // unbind click and touch events    
    $('.menuToggle a').off('click');
    $('.topMenu h3').off('click touchstart');
	$('html').off('touchstart');
	$('#mainNav').off('touchstart');
    
    // remove any expanded submenus
    $('.topMenu').find('ul.submenu').removeClass('expand');
    
    // remove the span tags inside the menu
    $('.topMenu h3').find('span.indicator').remove();
    
    // remove the "menu" element
    $('.menuToggle').remove();
	
    //indicate current window state
    windowState = 'large';
}