/* ================================================
----------------- Sconto Main.js ------------- */
(function ($) {
	"use strict";
	var Sconto = {
		initialised: false,
		mobile: false,
		container : $('#portfolio-item-container'),
		blogContainer : $('#blog-item-container'),
		productsContainer: $('.products-container'),
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			// Call Sconto Functions
			this.checkMobile();
			this.menuHover();
			this.mobileMenuToggle();
			this.mobileMenu();
			this.stickyHeader();
			this.productHoverFix();
			this.productCountdown();
			this.searchDropdownFix();
			this.scrollToTop();
			this.scrollTo();
			this.fitVids();
			this.flickerFeed();
			this.progressBars();
			this.toggleSideMenu();
			this.sideMenuCollapse();
			this.sideMenuScrollbar();
			this.scrollAnimations();
			this.inputLabelFix();
			this.tooltip();
			this.shareGroup();

			/* Call function if Owl Carousel plugin is included */
			if ( typeof Swiper === 'function' ) {
				this.swiperCarousels();
			}

			/* Call function if noUiSlider plugin is included */
			if (typeof noUiSlider === "object") {
				this.filterSliders();	
			}

			/* Call function if Light Gallery plugin is included */
			if ( $.fn.lightGallery) {
				this.lightBox();
			}

			var self = this;
			/* Imagesloaded plugin included in isotope.pkgd.min.js */
			/* Portfolio isotope + Blog masonry with images loaded plugin */
			if ( typeof imagesLoaded === 'function' ) {
				imagesLoaded(self.container, function() {
					self.isotopeActivate();
					// recall for plugin support
					self.isotopeFilter();
				});

				// Blog Masonry
				imagesLoaded(self.blogContainer, function() {
					self.blogMasonry();
				});

				// Porudcts Masonry
				imagesLoaded(self.productsContainer, function() {
					self.productsMasonry();
				});
			}

		},
		checkMobile: function () {
			/* Mobile Detect*/
			if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
				this.mobile = true;
			} else {
				this.mobile = false;
			}
		},
		menuHover: function () {
			// Sub menu show/hide with hoverIntent plugin
			if ($.fn.hoverIntent) {
				$('ul.menu').hoverIntent({
					over: function() {
						$(this).addClass('open');

					},
					out: function() {
						$(this).removeClass('open');
					},
					selector: 'li',
					timeout: 145,
					interval: 55
				});
			}
		},
		mobileMenuToggle: function() {
			// Fix / Make Header Search form dropdown
			$('.navbar-toggle').on('click', function(e) {
				$(this)
				.toggleClass('open')
				.closest('.header')
				.find('.mobile-menu')
				.toggleClass('open');

				e.preventDefault();
			});
		},
		mobileMenu: function() {
			$('.mobile-menu').find('li').on('click', function(e) {
				if (!$(this).has('ul, .megamenu')) {
					return;
				}

				$(this).toggleClass('open');
				e.stopPropagation();
			})
		},
		stickyHeader: function () {
			// Stickymenu with waypoint and waypoint sticky plugins - call if sticky-menu class is added
			if ( $('.sticky-header').length && $(window).width() >= 992 ) {
				var sticky = new Waypoint.Sticky({
					element: $('.sticky-header')[0],
					stuckClass: 'fixed',
					offset: -200
				});
			}
		},
		productHoverFix: function() {
			// Product Buttons Fix related to the product
			if ($.fn.hoverIntent) {
				$('body').hoverIntent({
					over: function() {
						var productWidth = $(this).width(),
							target = $(this).find('.product-action'),
							maxWidth = 286;

						if ( $(this).hasClass('product4') ) {
							maxWidth = 275;
						}

						if ( !$(this).hasClass('product4') && $(window).width() >= 1600 ) {
							maxWidth = 295;
						}

						if ( productWidth <= maxWidth && !target.hasClass('smaller') ) {
							target.addClass('smaller');
						}

					},
					out: function() {
						$(this).find('.product-action').removeClass('smaller');
					},
					selector: '.product1, .product4, .product5',
					timeout: 0,
					interval: 0
				});
			}
		},
		productCountdown: function () {
			// Product Countdown - Should be called for every product separately
			if ($.fn.countdown) {
				$('.product-countdown').countdown({
					until: new Date(2016, 8, 9), // 7th month = August / Months 0 - 11 (January  - December)
					format: 'DHMS',
					padZeroes: true
				});

				// $('.product-countdown').countdown('pause'); Pause to countdown to view on firebug
			}
		},
		searchDropdownFix: function() {
			// Fix / Make Header Search form dropdown
			$('.search-dropdown-btn').on('click', function(e) {
				$(this)
				.closest('.search-dropdown-fix')
				.toggleClass('open');

				e.preventDefault();
				e.stopPropagation();
			});

			$('.search-dropdown-fix').on('click', function(e) {
				e.stopPropagation();
			});

			$('body').on('click', function() {
				$('.search-dropdown-fix').removeClass('open');
			});
		},
		swiperCarousels: function () {

			// Index From the blog carousel
		    new Swiper('.fromblog-smaller-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 2,
		        spaceBetween: 15,
		        breakpoints: {
		            768: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index - Partners Carousel Small
		    new Swiper('.partners-small-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 6,
		        spaceBetween: 10,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 5
		            },
		            1200: {
		                slidesPerView: 4
		            },
		            1024: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 3
		            },
		            540: {
		                slidesPerView: 2
		            },
		            320: {
		                slidesPerView: 1,
		        		spaceBetween: 0
		            }
		        }
		    });

		    // Index2 Deal of the day carousel
		    new Swiper('.dealoftheday-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 'auto',
		        spaceBetween: 0,
		        autoHeight: false,
	         	breakpoints: {
		            768: {
		                autoHeight: true
		            }
		        }
		    });

			// Index2 From the blog carousel
		    new Swiper('.testimonials-3col-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 3,
		        spaceBetween: 45,
		        breakpoints: {
		            1024: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            768: {
		                slidesPerView: 2
		            },
		            600: {
		                slidesPerView: 1
		            }
		        }
		    });

			// Index2 From the blog carousel
		    new Swiper('.fromblog-small-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 3,
		        spaceBetween: 15,
		        breakpoints: {
		            1199: {
		                slidesPerView: 2
		            },
		            768: {
		                slidesPerView: 1
		            }
		        }
		    });

			// Index2 Instagram Carousel
		    new Swiper('.instagram-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 5,
		        spaceBetween: 30,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 4
		            },
		            1024: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 2
		            },
		            480: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index3 Slider
			new Swiper('.footer-fav-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

		    // Index4 Latest Carousels
		    new Swiper('.product-tab-latest-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 32,
		        breakpoints: {
		            1600: {
		                slidesPerView: 3,
		                spaceBetween: 26
		            },
		            768: {
		                slidesPerView: 2
		            },
		            480: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index4 Bestsellers Carousels
		    new Swiper('.product-tab-bestsellers-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 32,
		        breakpoints: {
		            1600: {
		                slidesPerView: 3,
		                spaceBetween: 26
		            },
		            768: {
		                slidesPerView: 2
		            },
		            480: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index4 Featured Carousels
		    new Swiper('.product-tab-featured-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 32,
		        breakpoints: {
		            1600: {
		                slidesPerView: 3,
		                spaceBetween: 26
		            },
		            768: {
		                slidesPerView: 2
		            },
		            480: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index5 Widget area slider - Top Products
			new Swiper('.widget-top-products-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

			// Index5 Widget area slider - Onsale Products
		    new Swiper('.widget-onsale-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

		    // Index5 Widget area slider - Featured Products
		    new Swiper('.widget-featured-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

		    // Index6 Product-special carousel
		    new Swiper('.product-special-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next.outside',
		        prevButton: '.swiper-button-prev.outside',
		        slidesPerView: 4,
		        spaceBetween: 40,
		        loop: false,
		        breakpoints: {
		            1200: {
		                slidesPerView: 3,
		                spaceBetween: 30,
		            },
		            768: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            600: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Index6 Product slider
			new Swiper('.product-inside-slider', {
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 0,
		        speed: 600,
		        loop: true
		    });

			// Index6 Banner Tweets slider
			new Swiper('.banner-tweets-slider', {
				pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 0,
		        speed: 600,
		        loop: true,
		        preventClicks: false
		    });

		    // Index6 Blog Carousel
		    new Swiper('.fromtheblog-loop-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 3,
		        spaceBetween: 40,
		        loop: true,
		        breakpoints: {
		            1024: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            768: {
		                slidesPerView: 1,
		                spaceBetween: 0
		            }
		        }
		    });

		    // Index6 Instagram Carousel
		    new Swiper('.instagram-big-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 6,
		        spaceBetween: 0,
		        loop: true,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 5
		            },
		            1024: {
		                slidesPerView: 4
		            },
		            768: {
		                slidesPerView: 3
		            },
		            480: {
		                slidesPerView: 2
		            }
		        }
		    });

		    // Index6 Blog Carousel
		    new Swiper('.fromtheblog-4col-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 30,
		        loop: true,
		        breakpoints: {
		        	1600: {
		                slidesPerView: 3
		            },
		            1024: {
		                slidesPerView: 2
		            },
		            768: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Product.html Product-small arousel
		    new Swiper('.product-small-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 32,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 3
		            },
		            992: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 2
		            },
		            600: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Product.html Instagram small carousel
		    new Swiper('.instagram-small-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 40,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 3
		            },
		            992: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 2
		            },
		            480: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Product2.html Product-related carousel
		    new Swiper('.product-related-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 40,
		        loop: true,
		        breakpoints: {
		            1200: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 2
		            },
		            600: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Product3.html Product-larger carousel
		    new Swiper('.product-larger-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 5,
		        spaceBetween: 30,
		        loop: true,
		        breakpoints: {
		        	1600: {
		                slidesPerView: 4
		            },
		            1200: {
		                slidesPerView: 3
		            },
		            768: {
		                slidesPerView: 2
		            },
		            600: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // About Team Carousel
		    new Swiper('.team-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 30,
		        breakpoints: {
		        	1440: {
		                slidesPerView: 3,
		                spaceBetween: 32
		            },
		            1024: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            480: {
		                slidesPerView: 1,
		                spaceBetween: 0
		            }
		        }
		    });

		    // About Testimoails gallery
			var testiGallery = new Swiper('.testimonials-gallery', {
		        spaceBetween: 0
		    });

		    // About Testimoails gallery carousel
			var testiGalleryCarousel = new Swiper('.testimonials-gallery-carousel', {
		        slidesPerView: 3,
		        spaceBetween: 0,
       			slideToClickedSlide: true,
       			centeredSlides: true
		    });

			// Link carousel to slider
		    testiGallery.params.control = testiGalleryCarousel;
    		testiGalleryCarousel.params.control = testiGallery;

    		// Socials Slider
			var socialsSlider = new Swiper('.socials-twitter-slider', {
		        spaceBetween: 0,
		        slidesPerView: 1,
		    });


    		// About Blog Carousel
		    new Swiper('.fromtheblog-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 3,
		        spaceBetween: 40,
		        breakpoints: {
		            1024: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            768: {
		                slidesPerView: 1,
		                spaceBetween: 0
		            }
		        }
		    });

		    // Partners Carousel
		    new Swiper('.partners-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 8,
		        spaceBetween: 0,
		        loop: true,
		        breakpoints: {
		        	1720: {
		                slidesPerView: 7
		            },
		        	1440: {
		                slidesPerView: 6
		            },
		            1200: {
		                slidesPerView: 5
		            },
		             1024: {
		                slidesPerView: 4
		            },
		            768: {
		                slidesPerView: 3
		            },
		            540: {
		                slidesPerView: 2
		            },
		            320: {
		                slidesPerView: 1
		            }
		        }
		    });

		    // Sidebar Products bestsellers Slider
			new Swiper('.bestsellers-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

			 // Sidebar Product Deals Slider
			new Swiper('.product-deals-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

			// Sidebar Popular Posts Slider
			 new Swiper('.popular-posts-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

			// Sidebar Testimonials Slider
			new Swiper('.testimonials-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

			 // Sidebar Latest Comments Slider
			new Swiper('.latest-comments-slider', {
		        pagination: '.swiper-pagination',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        spaceBetween: 20,
		        loop: true
		    });

		    // Blog Related Carousel
		    new Swiper('.blog-related-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 2,
		        spaceBetween: 20,
		        breakpoints: {
		            768: {
		                slidesPerView: 1
		            }
		        }
		    });

			// Portfolio Related Carousel sinle-portfolio
		    new Swiper('.portfolio-related-carousel', {
		        pagination: '',
		        paginationClickable: true,
		        nextButton: '.swiper-button-next',
		        prevButton: '.swiper-button-prev',
		        slidesPerView: 4,
		        spaceBetween: 32,
		        breakpoints: {
		            992: {
		                slidesPerView: 3,
		                spaceBetween: 32
		            },
		            768: {
		                slidesPerView: 2,
		                spaceBetween: 30
		            },
		            480: {
		                slidesPerView: 1,
		                spaceBetween: 0
		            }
		        }
		    });

		},
		inputLabelFix: function () {
			// Fix placeholder label if input is not empty
			$('.label-overlay').find('.form-control').on('blur', function(e) {
				var input = $(this),
					label = input.next('label');
				if(input.val().length !== 0) {
			        label.addClass('not-empty');
			    } else {
			        label.removeClass('not-empty');
			    }
			});
		},
		tooltip: function () {
			// Bootstrap Tooltip
			if ( $.fn.tooltip ) {
				$('[data-toggle="tooltip"]').tooltip();
			}
		},
		scrollBtnAppear: function () {
	        if ( $(window).scrollTop() >= 400 ) {
	            $('.scroll-top').addClass('fixed');
	        } else {
	            $('.scroll-top').removeClass('fixed');
	        }
		},
		scrollToTop: function () {
			$('.scroll-top').on('click', function (e) {
		        $('html, body').animate({
			            'scrollTop': 0
		        }, 1200);
				e.preventDefault();
			});
		},
		scrollTo: function () {
			$('.scrollto').on('click', function (e) {
				var offset = $(this).data('offset'),
					targetId = $(this).attr('href'),
					target = $(targetId),
					targetPos = offset ? ( target.offset().top + offset ) : target.offset().top;

		        $('html, body').animate({
		            'scrollTop': targetPos
		        }, 1200);
		        e.preventDefault();
		    });
		},
		lightBox: function () {
			/* Lightbox for portfolio items and videso and etc.. */
			$('.popup-gallery').lightGallery({
				selector: '.zoom-btn',
				thumbnail:true,
				exThumbImage: 'data-thumb',
				thumbWidth: 60,
				thumbContHeight: 60
			});

			// Video Popup
			$('.video-gallery').lightGallery({
				selector: '.video-btn'
			});	
		},
		progressBars: function () {
			var self = this;
			// Calculate and Animate Progress 
			$('.progress-animate').waypoint( function (direction) {
				var $this =  $(this.element),
					progressVal = $this.data('width');

				$this.css({ 'width' : progressVal + '%'}, 400);

				setTimeout(function() {
					$this.removeClass('progress-animate');
					$this.find('.progress-text').fadeIn(400);
				}, 400);
			}, {
				offset: '80%',
				triggerOnce: true 
			});
		},
		scrollAnimations: function () {
			/* Wowy Plugin */
			if ( typeof WOW === 'function' ) {
				new WOW({
					boxClass:     'wow',      // default
					animateClass: 'animated', // default
					offset:       0          // default
				}).init();
			}
		},
		fitVids: function () {
			// Make iframe videos responsive
			if ( $.fn.fitVids ) {
				 $('body').fitVids();
			}
		},
		flickerFeed: function () {
			/* Flickr feed plugin  */
			// credits https://www.flickr.com/photos/smanography/
			if ( $.fn.jflickrfeed ) {
				$('.flickr-widget-list').jflickrfeed({
					limit: 6,
					qstrings: {
						id: '56502208@N00' // change with you flickr id
					},
					itemTemplate: '<li>' + '<a href="{{image}}" target="_blank" title="{{title}}">' + '<img src="{{image_s}}" alt="{{title}}" />' + '</a>' + '</li>'
				});
			}
		},
		filterSliders:function () {
			// Slider For category pages / filter price
			var priceSlider  = document.getElementById('price-slider');

			// Check if #price-slider elem is exists if not return
			// to prevent error logs
			if (priceSlider == null) return;

			noUiSlider.create(priceSlider, {
				start: [ 300, 800 ],
				connect: true,
				step: 50,
				range: {
					'min': 0,
					'max': 1000
				}
			});

			this.rangeInputTexts(priceSlider, '$');
		},
		toggleSideMenu: function () {
			// Index 7 Side menus Show/Hide
			var self = this;
			$('.menu-btn, .side-account').on('click', function (e) {
				var target = $(this).data('target'),
					elem = $(this).closest('.header').find(target);

				if ( $(this).hasClass('open') ) {
					return;
				}

				if ( elem.length ) {
					$(this).toggleClass('open');
					elem.toggleClass('open');
					console.log(elem);
				} else {
					console.log('there is no side menu');
				}

				e.preventDefault();
				e.stopPropagation();
			});

			$('.side-menu-container, side-account-menu').on('click', function (e) {
				e.stopPropagation();
			});

			$('body').on('click', function() {
				if($('.side-menu-container, .side-account-menu').hasClass('open')) {
					$('.menu-btn, .side-account').removeClass('open');
					$('.side-menu-container, .side-account-menu').removeClass('open');
				}
			});

			$('.side-close-btn').on('click', function (e) {
				if($('.side-menu-container, .side-account-menu').hasClass('open')) {
					$('.menu-btn, .side-account').removeClass('open');
					$('.side-menu-container, .side-account-menu').removeClass('open');
				}
				e.preventDefault();
			});
		},
		sideMenuCollapse: function () {
			$('.side-menu').find('a, .mmenu-title').on('click', function(e) {

				if ($(this).siblings('ul, div').length) {
					$(this).siblings('ul, div').slideToggle(400, function () {
						$(this).closest('li, div').toggleClass('open');
					});
					e.preventDefault();
				} else {
					return;
				}

			});
		},
		sideMenuScrollbar: function () {
			/* Side Menu Custom Scrollbar  with slimscroll plugin */
			if ($.fn.niceScroll) {
				$('.side-menu-wrapper').niceScroll({
					zindex: 9999,
					autohidemode: true,
					background: 'rgba(255,255, 255, 0.015)' ,
					cursorcolor: '#fff',
					cursorwidth: '5px',
					cursorborder: '1px solid transparent',
					cursorborderradius: '4px'
				});
			}
		},
		rangeInputTexts: function (slider, currency) {
			// add slider values as a text 
			// check for currency too
			var currencyVar = (currency) ? '$' : null,
				lowVal = document.getElementById('low-price-val'),
				highVal = document.getElementById('high-price-val'),
				lowInput = document.getElementById('price-range-low'),
				highInput = document.getElementById('price-range-high');

			// When the slider changes, write the value to the tooltips.
			slider.noUiSlider.on('update', function ( values, handle ) {
				if (handle) {
					highVal.innerHTML= currencyVar + values[handle];
				} else {
					lowVal.innerHTML= currencyVar + values[handle];
				}
			});

			lowInput.addEventListener('change', function(){
				slider.noUiSlider.set([this.value, null]);
			});

			highInput.addEventListener('change', function(){
				slider.noUiSlider.set([null, this.value]);
			});

			// clear input values after blur
			$(lowInput).on('blur', function() {
				$(this).val("");
			});

			$(highInput).on('blur', function() {
				$(this).val("");
			});
		},
		isotopeActivate: function() {
			// Trigger for isotope plugin
			if ( $.fn.isotope ) {
				var container = this.container,
					layoutMode = container.data('layoutmode');

				container.isotope({
                	itemSelector: '.portfolio-item',
                	layoutMode: (layoutMode) ? layoutMode : 'masonry',
                	percentPosition: true,
                	cellsByRow: {
						columnWidth: '.grid-sizer',
						rowHeight: '.grid-sizer'
					}
            	});
			}
		},
		isotopeFilter: function () {
			// Isotope plugin filter handle
			var self = this,
				filterContainer = $('#portfolio-filter');

			filterContainer.find('a').on('click', function(e) {
				var $this = $(this),
					selector = $this.attr('data-filter');

				filterContainer.find('.active').removeClass('active');

				// And filter now
				self.container.isotope({
					filter: selector,
					transitionDuration: '0.8s'
				});
				
				$this.closest('li').addClass('active');
				e.preventDefault();
			});
		},
		blogMasonry: function() {
			// Trigger for isotope plugin
			if ( $.fn.isotope ) {
				var blogContainer = this.blogContainer;

				blogContainer.isotope({
                	itemSelector: '.entry-grid',
                	layoutMode: 'masonry'
            	});
			}
		},
		productsMasonry: function() {
			// Trigger for isotope plugin
			if ( $.fn.isotope ) {
				var productsContainer = this.productsContainer,
					layoutMode = productsContainer.data('layoutmode');

				productsContainer.isotope({
                	itemSelector: '.product-column',
                	layoutMode: (layoutMode) ? layoutMode : 'masonry'
            	});
			}
		},
		isotopeReinit: function (container) {
			// Recall for isotope plugin
			if ( $.fn.isotope ) {
				this.productsContainer.isotope('destroy');
				this.productsMasonry();
			}
		},
		shareGroup: function () {
			// Product.html share group -- toggle class to show all social icons
			$('.social-icon.share').on('mouseover', function() {
				$(this).closest('.social-icons').addClass('opened');
			});

			$('.social-icons').on('mouseleave', function() {
				$(this).removeClass('opened');
			});
		}
	};

	// Ready Event
	$(document).ready(function () {
		// Init our app
		Sconto.init();

		// Reinit Product Masonry/Grid on Tab change
		$('.products-tab, .products-tab-container').find('a[data-toggle=tab]').on('shown.bs.tab', function () {
			Sconto.isotopeReinit();

			 // Index6 Product slider - Reinit
			if ( $('.product-inside-slider').length ) {
				new Swiper('.product-inside-slider', {
			        nextButton: '.swiper-button-next',
			        prevButton: '.swiper-button-prev',
			        spaceBetween: 0,
			        speed: 600,
			        loop: true
			    });
			}
			
		});
	});

	// Load Event
	$(window).on('load', function() {
		Sconto.scrollBtnAppear();
	});

	// Scroll Event
	$(window).on('scroll', function () {
		Sconto.scrollBtnAppear();
	});

})(jQuery);