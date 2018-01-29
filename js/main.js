$(document).ready(function($) {

	"use strict";

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			stagePadding: 5,
			nav: false,
			navText: ['<span class="icon-chevron-left">', '<span class="icon-chevron-right">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});
	};
	carousel();

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.ftco-number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();
	
	

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// navigation
	var OnePageNav = function() {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function(e) {
		 	e.preventDefault();

		 	var hash = this.hash,
		 			navToggler = $('.navbar-toggler');
		 	$('html, body').animate({
		    scrollTop: $(hash).offset().top
		  }, 700, 'easeInOutExpo', function(){
		    window.location.hash = hash;
		  });


		  if ( navToggler.is(':visible') ) {
		  	navToggler.click();
		  }
		});
		$('body').on('activate.bs.scrollspy', function () {
		  console.log('nice');
		})
	};
	OnePageNav();

	$(".btn-main").click(function() {
    $('html,body').animate({
        scrollTop: $(".books").offset().top},
        'slow');
});
	$("#nav-home").click(function() {
    $('html,body').animate({
        scrollTop: $("#section-home").offset().top},
        'slow');
});
		$("#nav-books").click(function() {
    $('html,body').animate({
        scrollTop: $(".books").offset().top},
        'slow');
});

	$("#nav-characters").click(function() {
    $('html,body').animate({
        scrollTop: $(".characters").offset().top},
        'slow');
});
	$("#nav-houses").click(function() {
    $('html,body').animate({
        scrollTop: $(".houses").offset().top},
        'slow');
});

// $("#nav-books").click(function() {
// 	alert("click to kaam kar raha hai.");
// 	$("#nav-books").css("color", "red");
// });
var home = $('#section-home').offset().top - 100;
var books;
var characters;
var houses;
setTimeout(
  function() 
  {
  	books = $(".books").offset().top -100;
    characters = $('.characters').offset().top - 100;
    houses = $('.houses').offset().top;
  }, 4000);


// on scroll, 
$(window).on('scroll',function(){

    // we round here to reduce a little workload
    stop = Math.round($(window).scrollTop());
        $('#nav-home').css("color", "rgb(209, 33, 33)");
         $('#nav-books').css("color", "grey");
          $('#nav-characters').css("color", "grey");
           $('#nav-houses').css("color", "grey");
    
    if (stop > books) {
    	  $('#nav-home').css("color", "black");
         $('#nav-books').css("color", "red");
          $('#nav-characters').css("color", "black");
           $('#nav-houses').css("color", "black");
    } 
     if (stop > characters) {
        $('#nav-home').css("color", "black");
         $('#nav-books').css("color", "black");
          $('#nav-characters').css("color", "red");
           $('#nav-houses').css("color", "black");
    } 
      if (stop > houses) {
      $('#nav-home').css("color", "black");
         $('#nav-books').css("color", "black");
          $('#nav-characters').css("color", "black");
           $('#nav-houses').css("color", "red");
    } 
});

   
      
});

