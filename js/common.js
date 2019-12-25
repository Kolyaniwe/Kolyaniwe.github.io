$(function() {

	$("#my-menu").mmenu({
		"extensions": [
			"widescreen",
			"theme-black",
			"effect-menu-slide",
			"pagedim-black", //затемняет
			"position-right"
		],
		"navbar": {
			title: '<img class="img-svg"src="img/logo.svg" alt="Салон красоты">'
		},
	});

	// $('a[href$="#my-menu"]').click(function(){
	// 		$(this).toggleClass('is-active');
	// 	});

	var apiSideMenu = $("#my-menu").data('mmenu');

	apiSideMenu.bind('open:start', function() {
		$('.hamburger').addClass('is-active');
	}).bind('close:finish', function() {
		$('.hamburger').removeClass('is-active');
	});

//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};
//Replace all SVG images with inline SVG
 jQuery('img.img-svg').each(function(){
	var $img = jQuery(this);
	var imgID = $img.attr('id');
	var imgClass = $img.attr('class');
	var imgURL = $img.attr('src');

	jQuery.get(imgURL, function(data) {
		// Get the SVG tag, ignore the rest
		var $svg = jQuery(data).find('svg');

		// Add replaced image's ID to the new SVG
		if(typeof imgID !== 'undefined') {
			$svg = $svg.attr('id', imgID);
		}
		// Add replaced image's classes to the new SVG
		if(typeof imgClass !== 'undefined') {
			$svg = $svg.attr('class', imgClass+' replaced-svg');
		}

		// Remove any invalid XML tags as per http://validator.w3.org
		$svg = $svg.removeAttr('xmlns:a');

		// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
		if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
			$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
		}

		// Replace image with new SVG
		$img.replaceWith($svg);

	}, 'xml');

	$(window).scroll(function() {
		if($(this).scrollTop() > $(this).height()) {
			$(".top").addClass("active");
		}
		else
			$(".top").removeClass("active");
	});

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	})
});
	$('.carousel-services').on('initialized.owl.carousel', function() {
		setTimeout(function(){
			carouselService()
		}, 100);		
	});
	//Карусель в услугах
	$('.carousel-services').owlCarousel({
		loop: true,
		nav: true,
		smartSpeed: 700,
		dots: false,
		dotsEach: true,
		autoplay: true,
		navText: ['<i class="fa fa-angle-double-left"</i>' , '<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});
	//Карусель в отзывах
	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartSpeed: 700,
		nav: true,
		autoHeight: true,
		navText: ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>','<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
	});
	//Карусель с партнерами
	$('.partners').owlCarousel({
		loop: true,
		items: 4,
		smartSpeed: 700,
		nav: true,
		autoHeight: false,
		margin: 50,
		dots: false,
		navText: ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>','<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
		 responsive:{
		 0:{
			items:1,
		},
		768:{
			items:2,
		},
		992:{
			items:3,
		},
		1200:{
			items:4,
		}
	}
	});

function carouselService() {
	$('.carousel-services-item').each(function() {
		var ths = $(this),
			thsh = ths.find('.carousel-services-content').outerHeight;
			ths.find('.carousel-services-image').css('min-height', thsh);
	});
};

carouselService();

//Выполняется при изменении размера окна

function onResize() {
	$('.carousel-services-content, .carousel-services-image').height('auto').equalHeights();
}onResize();
window.onresize = function() {onResize()};


//Меняет высоту блоков

// function heightses() {
//  	$('.carousel-services-content, .carousel-services-image').height('auto').equalHeights();
// // 	$('.testimonials-head').height('auto').equalHeights();
// // 	$('.testimonials-item').height('auto').equalHeights();
// 	};

// heightses();

// Оборачиваем в <span> последнее слово заголовка в услугах
$('.carousel-services-composition .h3').each(function(){
	var ths = $(this);
	ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1<span>'));
});
// Оборачиваем в <span> значки гривны
$('.carousel-services-list li').each(function(){
	var ths = $(this);
	ths.html(ths.html().replace(/₴/, '<span class="fa">₴<span>'));
});
//Оборачиваем в <span> последнее слово заголовка в
$('section .h2').each(function(){
	var ths = $(this);
	ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1<span>'));
});

$('select').selectize({
	create: true,
	sortField: 'text'
});

//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

//Активация вспыльчевой формы "Отправить Заявку"
$('a[href="#callback"]').magnificPopup({
	mainClass: 'mfp-3d-unfold',
	removalDelay: 600,
	type: 'inline',
});

// всплывающая форма заказать callback
	$("a[href='#callback']").click(function(){
		var dataForm = $(this).data('form');
		var dataText= $(this).data('text');
		$('.form-callback .contact-form-head h4').text(dataText);
		$('.form-callback [name=admin-data]').val(dataForm);
	});

$(window).on('load', function() {
	$('.preloader').delay(100).fadeOut('slow');
});

var F = navigator.userAgent.search("Firefox");

if (F > -1) {
	$('.preloader').delay(800).fadeOut('slow');
};

//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display','flex').hide().fadeIn();
			setTimeout(function() {
				$(th).fund('success').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});
	
});

