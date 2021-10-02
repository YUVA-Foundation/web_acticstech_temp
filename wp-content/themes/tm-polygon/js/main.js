var snapper = new Snap( {
	element: document.getElementById( 'page' ),
	dragger: document.getElementsByClassName( 'page' ),
	slideIntent: 10,
} );

if ( jQuery( '#open-left' ).length > 0 ) {
	var addEvent = function addEvent( element, eventName, func ) {
		if ( element.addEventListener ) {
			return element.addEventListener( eventName, func, false );
		} else if ( element.attachEvent ) {
			return element.attachEvent( "on" + eventName, func );
		}
	};
	addEvent( document.getElementById( 'open-left' ), 'click', function() {
		snapper.open( 'left' );
	} );
	if ( jQuery( '#open-right' ).length > 0 ) {
		addEvent( document.getElementById( 'open-right' ), 'click', function() {
			snapper.open( 'right' );
		} );
		addEvent( document.getElementById( 'close-right' ), 'click', function() {
			if ( snapper.state().state == "right" ) {
				snapper.close( 'right' );
			}
		} );
	}
}

jQuery( document ).ready( function( $ ) {
	'use strict';

	// mini-cart
	var $mini_cart = $( '.mini-cart' );
	$mini_cart.on( 'click', function( e ) {
		$( this ).addClass( 'open' );
	} );

	$( document ).on( 'click', function( e ) {
		if ( $( e.target ).closest( $mini_cart ).length === 0 ) {
			$mini_cart.removeClass( 'open' );
		}
	} );

	// search in menu
	var $search_btn  = $( '.search-box > i' ),
	    $search_form = $( 'form.search-form' );

	$search_btn.on( 'click', function() {
		$search_form.toggleClass( 'open' );
	} );

	$( document ).on( 'click', function( e ) {
		if ( $( e.target ).closest( $search_btn ).length === 0 && $( e.target ).closest( 'input.search-field' ).length === 0 && $search_form.hasClass( 'open' ) ) {
			$search_form.removeClass( 'open' );
		}
	} );

	$( '.counter' ).counterUp( {
		delay: 10,
		time: 500
	} );

	window.sr = new scrollReveal();

	$( '.close-message-box' ).on( 'click', function() {
		$( this ).closest( '.vc_message_box' ).hide( 100 );
	} );

	$( '.countdown-clock' ).each( function( index ) {
		var endDay, year, month, day, hours, minutes, seconds, type, selectedType;
		year = $( this ).attr( 'data-year' );
		month = $( this ).attr( 'data-month' );
		day = $( this ).attr( 'data-day' );
		hours = $( this ).attr( 'data-hour' );
		minutes = $( this ).attr( 'data-minute' );
		seconds = $( this ).attr( 'data-second' );
		type = [];
		selectedType = $( this ).attr( 'data-type' );

		type[ 'type01' ] = '<h1>{dn} <sup><h5>{dl}</h5></sup></h1>' +
		                   '<h1>{hn} <sup><h5>{hl}</h5></sup></h1>' +
		                   '<h1>{mn} <sup><h5>{ml}</h5></sup></h1>' +
		                   '<h1>{sn} <sup><h5>{sl}</h5></sup></h1>';
		type[ 'type02' ] = '<div><h1>{dn}</h1><h5>{dl}</h5></div>' +
		                   '<h1>:</h1>' +
		                   '<div><h1>{hn}</h1><h5>{hl}</h5></div>' +
		                   '<h1>:</h1>' +
		                   '<div><h1>{mn}</h1><h5>{ml}</h5></div>' +
		                   '<h1>:</h1>' +
		                   '<div><h1>{sn}</h1><h5>{sl}</h5></div>';
		endDay = new Date( year, month, day, hours, minutes, seconds );
		$( this ).countdown( {
			until: endDay,
			padZeroes: true,
			layout: type[ selectedType ]
		} );
	} );

	$( ".carousel-partners .wpb_image_grid_ul" ).owlCarousel( {
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 3,
			},
			1199: {
				items: 5,
			},
		},

		nav: false,
		margin: 0,
		dots: false,
		autoplay: false,
		autoHeight: true,
		center: true,
		loop: true,
	} );

	// Partners Carousel.
	var owl = $( '.carousel-partners .wpb_image_grid_ul' );
	$( 'body' ).on( 'click', '.owl-next', function() {
		if ( owl.length > 0 ) {
			owl.data( 'owlCarousel' ).next();
		}
	} );

	$( 'body' ).on( 'click', '.owl-prev', function() {
		if ( owl.length > 0 ) {
			owl.data( 'owlCarousel' ).prev();
		}
	} );

	// Fitvids.
	$( ".container" ).fitVids();
	// post's gallery
	$( ".gt01 .post-gallery.slider" ).owlCarousel( {
		items: 1,
		nav: true,
		dots: false,
		loop: true,
		autoHeight: true,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn'
	} );

	// Scroll
	var $window = $( window );
	// Scroll up
	var $scrollup = $( '.scrollup' );

	$window.scroll( function() {
		if ( $window.scrollTop() > 100 ) {
			$scrollup.addClass( 'show' );
		} else {
			$scrollup.removeClass( 'show' );
		}
	} );

	$scrollup.on( 'click', function( evt ) {
		$( "html, body" ).animate( {
			scrollTop: 0
		}, 600 );
		evt.preventDefault();
	} );

	// Menu mobile
	var $menu = $( '.mobile-menu' );

	$menu.find( '.sub-menu-toggle' ).on( 'click', function( e ) {
		var subMenu = $( this ).next();

		if ( subMenu.css( 'display' ) == 'block' ) {
			subMenu.css( 'display', 'block' ).slideUp().parent().removeClass( 'expand' );
		} else {
			subMenu.css( 'display', 'none' ).slideDown().parent().addClass( 'expand' );
		}
		e.stopPropagation();
	} );

	if ( $.fn.masonry ) {
		$( document ).on( 'vc_js', function() {
			var $grid = $( '.postcontent-masonry' ).masonry( {
				itemSelector: '.postcontent-gird-item'
			} );
			$grid.imagesLoaded().progress( function() {
				$grid.masonry( 'layout' );
			} );

			$( ".postcontent-gird-item .post-gallery.slider" ).owlCarousel( {
				items: 1,
				nav: true,
				dots: false,
				loop: true,
				autoHeight: false,
				autoplay: false,
				//autoplayHoverPause: true,
				//autoplayTimeout: 3000,
				animateOut: 'fadeOut',
				animateIn: 'fadeIn'
			} );
		} );
	}

	// ScrollTo
	function goToByScroll( id ) {
		// Scroll
		$( 'html,body' ).animate( {
				scrollTop: $( id ).offset().top
			},
			'slow' );
	}

	$( "#site-navigation a, #mobile-menu a" ).click( function( e ) {
		var href = $( this ).attr( 'href' );
		var id = href.split( "#" );
		if ( typeof id[ 1 ] != "undefined" ) {
			if ( $( '#' + id[ 1 ] ).length > 0 ) {
				// Prevent a page reload when a link is pressed
				e.preventDefault();
				// Call the scroll function
				goToByScroll( '#' + id[ 1 ] );
			}
		}
	} );

	var stopScroll = false;

	function rowfullheight() {
		var wHeight = $( window ).height(),
		    hHeight = $( '.site-header' ).outerHeight(),
		    cHeight = $( '.copyright' ).outerHeight();
		if ( $( window ).width() <= 768 || wHeight <= 480 ) {
			stopScroll = false;
			$( '.rowfullheight, .rowfullheight .wpb_wrapper' ).height( 'auto' );
			$( ".gallery-container-wrap-scroll" ).removeClass( 'gallery-container-wrap' );
			$( ".gallery-container-wrap-scroll img" ).css( { height: 'auto' } );
		} else {
			stopScroll = true;
			var h_wpadminbar = 0;
			if ( $( '#wpadminbar' ).length > 0 ) {
				h_wpadminbar = $( '#wpadminbar' ).outerHeight();
			}

			var f_height = wHeight - hHeight - cHeight - h_wpadminbar;

			$( ".gallery-container-wrap-scroll" ).addClass( 'gallery-container-wrap' );
			$( ".gallery-container-wrap-scroll img" ).css( { height: f_height } );
			$( '.rowfullheight, .rowfullheight .wpb_wrapper' ).height( f_height );
		}
	}

	rowfullheight();
	$window.resize( function() {
		rowfullheight();
	} );

	$( ".gallery-container-wrap-scroll" ).mousewheel( function( event, delta ) {
		if ( stopScroll ) {
			this.scrollLeft -= (
				delta * 30
			);
			event.preventDefault();
		}
	} );
} );
