/* =================================================================
* Elements JS
* 
* Template:    Hektor - Creative Agency and Portfolio HTML Website Template
* Author:      Themetorium
* URL:         https://themetorium.net/
*
==================================================================== */


// Table of Content
// =================
// 
// Accordion
// Scrolling text
// tt-Clipper
// Moving images on scroll
// Sticky horizontal scroll
// tt-Sticker
// Testimonials list
// tt-Image
// tt-Gallery
// Content slider
// Content carousel
// Portfolio carousel
// tt-Buttons
// Forms



(function ($) {
	'use strict';



	// ================================================================
	// Accordion
	// ================================================================

	$(".tt-accordion").not(".tt-services-static").each(function() {
		let $ttAccordion = $(this);

		// If accordion content has class "is-open"
		$ttAccordion.find(".tt-accordion-item").each(function() {
			let $ttAccItem = $(this);

			if ($ttAccItem.find(".tt-accordion-content").hasClass("is-open")) {
				$ttAccItem.addClass("active");
			}
		});

		// Accordion item on click
		$ttAccordion.find(".tt-accordion-heading").on("click", function(e) {
			e.preventDefault();

			let $ttAccHeading = $(this);
			let $ttAccItem = $ttAccHeading.parents(".tt-accordion-item");
			let $ttAccContent = $ttAccHeading.next(".tt-accordion-content");
			let $ttAccDuration = 350;

			if ($ttAccItem.hasClass("active")) {
				$ttAccItem.removeClass("active");
				$ttAccContent.slideUp($ttAccDuration);
			} else {
				$ttAccordion.find(".tt-accordion-item.active").removeClass("active")
				.find(".tt-accordion-content").slideUp($ttAccDuration);
				$ttAccItem.addClass("active");
				$ttAccContent.slideDown($ttAccDuration);
			}

			setTimeout(function() {
				ScrollTrigger.refresh();
			}, $ttAccDuration);
		});
	});



	// ================================================================
	// Scrolling text
	// ================================================================

	$(".tt-scrolling-text").each(function() { 
		let $this = $(this);
		let $tt_scrtScrollerContent = $this.find(".tt-scrt-content");

		if ($this.find(".tt-scrt-separator").length) {
			$this.addClass("tt-scrt-separator-exist");
		}

		// Clone content.
		// ===============
		let $tt_scrtClone = 5; // How many times to clone an item 

		for (let i = 0; i < $tt_scrtClone; i++) {
		let $tt_scrtClonedItem = $tt_scrtScrollerContent.clone();
			$tt_scrtClonedItem.attr("aria-hidden", true);
			$tt_scrtClonedItem.insertAfter($tt_scrtScrollerContent);
		}

		// Scroll.
		// ========
		let $tt_scrtCurrentScroll = 0;
		let $tt_scrtIsScrollingDown = true;
		let $tt_scrtAtrSpeed = $this.data("scroll-speed");
		let $tt_scrtAtrOpDirection = $this.data("opposite-direction") == true;
		let $tt_scrtAtrChangeDirection = $this.data("change-direction") == true;

		let $tt_scrtSpeed;
		let $tt_scrtDirection;

		if ($tt_scrtAtrSpeed) {
			$tt_scrtSpeed = $tt_scrtAtrSpeed;
		} else {
			$tt_scrtSpeed = 10; // Default value
		}
	  
		if ($tt_scrtAtrOpDirection) {
			$tt_scrtDirection = 100;
		} else {
			$tt_scrtDirection = -100; // Default value
		}
	  
		let $tt_scrtTween = gsap.to($this.find(".tt-scrt-content"), { 
			duration: $tt_scrtSpeed, 
			xPercent: $tt_scrtDirection, 
			repeat: -1, 
			ease: "linear",
			paused: true // Let's start with a pause. ScrollTrigger controls it.
		}).totalProgress(0.5);

		ScrollTrigger.create({
			trigger: $this,
			start: "top 110%", // Triggered shortly before reaching the viewport (10% of the screen height).
			end: "bottom -10%", // Stops shortly after exiting the viewport.
			onEnter: () => $tt_scrtTween.play(),
			onLeave: () => $tt_scrtTween.pause(),
			onEnterBack: () => $tt_scrtTween.play(),
			onLeaveBack: () => $tt_scrtTween.pause(),
			// markers: true,
		});

		gsap.set($this.find(".tt-scrt-inner"), { xPercent: -50 });
	 
		if ($tt_scrtAtrChangeDirection) {
			window.addEventListener("scroll", function() {
				if (window.scrollY > $tt_scrtCurrentScroll) {
					$tt_scrtIsScrollingDown = true;
					$this.removeClass("scrolled-up");
				} else {
					$tt_scrtIsScrollingDown = false;
					$this.addClass("scrolled-up");
				}

				gsap.to($tt_scrtTween, { timeScale: $tt_scrtIsScrollingDown ? 1 : -1 });

				$tt_scrtCurrentScroll = window.scrollY;
			});
		} else {
			$tt_scrtCurrentScroll = window.scrollY;
		}

	});



	// ================================================================
	// tt-Clipper
	// ================================================================ 

	$(".tt-clipper").each(function () {
		const $this = $(this);
		const $ttClipperInner = $this.find(".tt-clipper-inner");
		const $isInWrap = $this.parents(".tt-wrap").length > 0;
		const $clipPathValue = $isInWrap ? "inset(0% round var(--_tt-clipper-radius))" : "inset(0% round 0px)";

		gsap.set($ttClipperInner, { willChange: "clip-path" });

		const tl_ttClipper = gsap.timeline({
			scrollTrigger: {
				trigger: $this,
				start: "top bottom",
				end: "bottom bottom",
				scrub: true,
				// markers: true,
				onEnter: () => tl_ttClipper.scrollTrigger.refresh(),
			}
		});

		tl_ttClipper.to($ttClipperInner, {
			clipPath: $clipPathValue,
			ease: "none"
		});
	});



	// ================================================================
	// Moving images on scroll
	// ================================================================ 

	function ttMovingImages() {
		$('.tt-moving-images').each(function(index) {
			let $this = $(this);
			let w = $this.find('.tt-moi-list');
			let x, xEnd;

	      // Calculate the initial and end positions based on index parity
			if (index % 2) {
				x = $this.width() - w.get(0).scrollWidth;
				xEnd = 0;
			} else {
				x = 0;
				xEnd = $this.width() - w.get(0).scrollWidth;
			}

			// Create a GSAP timeline with scroll trigger
			let tl_miSt = gsap.timeline({
				scrollTrigger: {
					trigger: $this,
					start: "top bottom",
					scrub: 0.5,
					// markers: true,
				},
			});

			// Animate the element from x to xEnd
			tl_miSt.fromTo(w, { x: x }, { x: xEnd });
		});
	}

	// Call function on first load
	ttMovingImages();

	// Call function on window resize or orientation change
	$(window).on('resize orientationchange', function() {
		ttMovingImages();
	});



	// =======================================================================================
	// Sticky horizontal scroll
	// =======================================================================================

	$(".tt-sticky-horizontal-scroll").each(function () {
		const $this = $(this);
		const $ttShsPinWrap = $this.find(".tt-shs-pin-wrap");
		const $ttShsAnimWrap = $ttShsPinWrap.find(".tt-shs-animation-wrap");

		// Retrieve the scroll speed from the data attribute (default to 3000px if not set)
		const speedVal = parseInt($this.data('speed'), 10);
		const $ttShsScrollDuration = !isNaN(speedVal) ? speedVal : 3000;

		// Retrieve the direction from the data attribute (default to "left" if not set)
		const $ttShsDirection = $this.data('direction') || 'left';

		// Calculate the total animation distance
		const ttShsAnimDistance = () => -($ttShsAnimWrap[0].scrollWidth - window.innerWidth);

		// Animate
		gsap.fromTo($ttShsAnimWrap[0], {
			x: () => $ttShsDirection === 'right' ? ttShsAnimDistance() : 0
		}, {
			x: () => $ttShsDirection === 'right' ? 0 : ttShsAnimDistance(),
			ease: "none",
			scrollTrigger: {
				trigger: $this[0],
				pin: $ttShsPinWrap[0],
				start: "50% 50%",
				end: `+=${$ttShsScrollDuration}`, // Use the value from the data attribute
				scrub: true,
				invalidateOnRefresh: true, // Recalculate on resize
				// markers: true,
				onToggle: self => {
					// Add class when pinned, remove when unpinned
					if (self.isActive) {
						$this.addClass("is-pinned");
					} else {
						$this.removeClass("is-pinned");
					}
				}
			}
		});
	}); 



	// =================================================================
	// tt-Sticker 
	// =================================================================

	let $ttStickerTriggers = [];
	let resizeObservers = [];

	function $ttStickerFunction() {
		if ($(window).outerWidth() > 991) {

			// Kill all previous triggers and observers first
			$ttStickerTriggers.forEach(trigger => trigger.kill());
			$ttStickerTriggers = [];

			resizeObservers.forEach(observer => observer.disconnect());
			resizeObservers = [];

			$(".tt-sticky-element").each(function () {
				const $ttPinElement = $(this);
				const $ttPinSection = $ttPinElement.closest(".tt-sticker");
				const $ttPinScroller = $ttPinSection.find(".tt-sticker-scroller").first();

				let $ttPinElementOffset;
				if ($("#tt-header").is(".tt-header-fixed, .tt-header-scroll")) {
					$ttPinElementOffset = $(".tt-header-inner").innerHeight() + 80;
				} else {
					$ttPinElementOffset = 80;
				}

				// Create ScrollTrigger
				const trigger = ScrollTrigger.create({
					trigger: $ttPinElement[0],
					start: "top " + $ttPinElementOffset,
					end: () => "+=" + ($ttPinScroller.outerHeight() - $ttPinElement.outerHeight()),
					pin: $ttPinElement[0],
					// markers: true,
				});

				$ttStickerTriggers.push(trigger);

				// Use shared ResizeObserver that refreshes all sticker triggers when any scroller resizes
				const observer = new ResizeObserver(() => {
					$ttStickerTriggers.forEach(trigger => trigger.refresh());
				});

				observer.observe($ttPinScroller[0]);
				resizeObservers.push(observer);
			});

		} else {

			// Clean up on small screens
			$ttStickerTriggers.forEach(trigger => trigger.kill());
			$ttStickerTriggers = [];

			resizeObservers.forEach(observer => observer.disconnect());
			resizeObservers = [];
		}
	}

	// Run on page load
	$ttStickerFunction();

	// Re-init on window resize/orientation
	$(window).on("resize orientationchange", function () {
		clearTimeout(window._ttResizeTimeout);
		window._ttResizeTimeout = setTimeout(() => {
			$ttStickerFunction();
		}, 300);
	});



	// ================================================================ 
	// Testimonials list
	// ================================================================ 

	$(".tt-testimonials-list").each(function () {
		const $this = $(this);
		const $items = $this.find(".tt-testimonials-list-item");

		if ($items.length < 2) return; // Skip if only one item

		$items.not(":last").each(function () {
			const $ttListItem = $(this); 

			gsap.timeline({
				scrollTrigger: {
					trigger: $ttListItem,
					start: "-80px top",
					end: "50% top",
					scrub: true,
					// markers: true,
				}
			})
			.to($ttListItem, {
				scale: 0.8,
				y: 120,
				autoAlpha: 0,
				ease: "none",
			});
		});
	});


	// ================================================================
	// Horizontal scroll carousels (testimonials + blog)
	// ================================================================

	function initScrollCarousel($carousel, scrollSel, itemSel, prevSel, nextSel) {
		const $scroll = $carousel.find(scrollSel);
		const $prev = $carousel.find(prevSel);
		const $next = $carousel.find(nextSel);
		const scrollEl = $scroll[0];

		if (!scrollEl || !$prev.length || !$next.length) return;

		function getItems() {
			return $carousel.find(itemSel).toArray();
		}

		function getItemScrollLeft(item) {
			return item.getBoundingClientRect().left
				- scrollEl.getBoundingClientRect().left
				+ scrollEl.scrollLeft;
		}

		function getCurrentIndex(items) {
			const scrollLeft = scrollEl.scrollLeft;
			let index = 0;
			let minDist = Infinity;
			items.forEach(function (item, i) {
				const dist = Math.abs(getItemScrollLeft(item) - scrollLeft);
				if (dist < minDist) {
					minDist = dist;
					index = i;
				}
			});
			return index;
		}

		function updateButtons() {
			$prev.prop("disabled", scrollEl.scrollLeft <= 0);
			$next.prop("disabled", scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 1);
		}

		function scrollToIndex(direction) {
			const items = getItems();
			if (!items.length) return;
			const nextIndex = Math.min(items.length - 1, Math.max(0, getCurrentIndex(items) + direction));
			const target = getItemScrollLeft(items[nextIndex]);
			const start = scrollEl.scrollLeft;
			scrollEl.scrollTo({ left: target, behavior: "smooth" });
			setTimeout(function () {
				if (Math.abs(scrollEl.scrollLeft - start) < 1) {
					scrollEl.scrollLeft = target;
				}
				updateButtons();
			}, 80);
		}

		$prev.on("click", function (e) {
			e.preventDefault();
			scrollToIndex(-1);
		});
		$next.on("click", function (e) {
			e.preventDefault();
			scrollToIndex(1);
		});
		$scroll.on("scroll", updateButtons);
		$(window).on("resize", updateButtons);
		updateButtons();
	}

	// Mobile card carousels (services + portfolio)
	function initMobileSwiperCarousel(selector) {
		document.querySelectorAll(selector).forEach(function (root) {
			const swiperEl = root.querySelector(".swiper");
			const paginationEl = root.querySelector(".tt-mobile-swiper-pagination");
			if (!swiperEl || !paginationEl) return;

			new Swiper(swiperEl, {
				slidesPerView: 1,
				spaceBetween: 16,
				loop: true,
				grabCursor: true,
				speed: 450,
				pagination: {
					el: paginationEl,
					clickable: true,
					bulletClass: "tt-mobile-swiper-bullet",
					bulletActiveClass: "tt-mobile-swiper-bullet-active",
				},
				breakpoints: {
					768: { enabled: false },
				},
			});
		});
	}

	initMobileSwiperCarousel(".tt-mobile-swiper");
	initMobileSwiperCarousel(".tt-portfolio-mobile-swiper");



	// ================================================================
	// tt-Image
	// ================================================================

	$(".tt-image").each(function() {
		const $this = $(this);
		const $ttImageLightboxIcon = $this.find(".tt-image-link");

		// Wrap the <img>
		if ($this.find(".tt-image-link").length) {
			$this.find("img").wrap('<div class="tt-image-img"><div class="tt-image-img-inner"><div class="tt-image-hover"></div></div></div>');
		} else {
			$this.find("img").wrap('<div class="tt-image-img"><div class="tt-image-img-inner"></div></div>');
		}

		// Check if the current element has the "data-fancybox" attribute
		if ($ttImageLightboxIcon.is("[data-fancybox]")) {
			$ttImageLightboxIcon.append('<div class="tt-lightbox-icon"></div>');
		}
	});



	// ================================================================
	// tt-Gallery
	// ================================================================

	// Play video on hover
	$(".tt-gallery-video-wrap").on("mouseenter touchstart", function() {
		$(this).find("video").each(function() {
			$(this).get(0).play();
		}); 
	}).on("mouseleave touchend", function() {
		$(this).find("video").each(function() {
			$(this).get(0).pause();
		});
	});



	// =======================================================================================
	// Content slider
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".tt-content-slider").length) { 
		$(".tt-content-slider").each(function() {
			var $ttContentSlider = $(this);

			// Data attributes
			// ================
			var $data_ttCsAutoplay = $ttContentSlider.data("autoplay") ? { delay: $ttContentSlider.data("autoplay"), disableOnInteraction: true, } : $ttContentSlider.data("autoplay");
			var $data_ttCsLoop = $ttContentSlider.data("loop");

			if ($ttContentSlider.is("[data-speed]")) {
				var $data_ttCsSpeed = $ttContentSlider.data("speed");
			} else {
				var $data_ttCsSpeed = 800; // by default
			}

			if ($ttContentSlider.is("[data-pagination-type]")) {
				var $data_ttCsPaginationType = $ttContentSlider.data("pagination-type");
			} else {
				var $data_ttCsPaginationType = "bullets"; // by default (bullets/fraction/progressbar)
			}

			var $tt_simulateTouch = $(".tt-cs-nav-prev").hasClass("cursor-arrow-left") || $(".tt-cs-nav-next").hasClass("cursor-arrow-right") ? false : true;

			// Init Swiper
			// ============
			var $ttContentSliderSwiper = new Swiper($ttContentSlider.find(".swiper")[0], {

				// Parameters
				direction: "horizontal",
				slidesPerView: 1,
				grabCursor: true,
				parallax: true,
				speed: $data_ttCsSpeed,
				autoplay: $data_ttCsAutoplay,
				loop: $data_ttCsLoop,
				simulateTouch: $tt_simulateTouch,

				// Navigation (arrows)
				navigation: {
					nextEl: $ttContentSlider.find(".tt-cs-nav-next")[0],
					prevEl: $ttContentSlider.find(".tt-cs-nav-prev")[0],
					disabledClass: "tt-cs-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $ttContentSlider.find(".tt-cs-pagination")[0],
					type: $data_ttCsPaginationType,
					modifierClass: "tt-cs-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},
			});

		});
	}



	// =======================================================================================
	// Content carousel
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".tt-content-carousel").length) { 
		$(".tt-content-carousel").each(function() {
			var $ttContentCarousel = $(this);

			// Data attributes
			// ================
			var $data_ttCcSimulateTouch = $ttContentCarousel.data("simulate-touch");
			var $data_ttCcAutoplay = $ttContentCarousel.data("autoplay") ? { delay: $ttContentCarousel.data("autoplay"), disableOnInteraction: true, } : $ttContentCarousel.data("autoplay");
			var $data_ttCcLoop = $ttContentCarousel.data("loop");

			if ($ttContentCarousel.is("[data-speed]")) {
				var $data_ttCcSpeed = $ttContentCarousel.data("speed");
			} else {
				var $data_ttCcSpeed = 900; // by default
			}

			if ($ttContentCarousel.is("[data-pagination-type]")) {
				var $data_ttCcPaginationType = $ttContentCarousel.data("pagination-type");
			} else {
				var $data_ttCcPaginationType = "bullets"; // by default (bullets/fraction/progressbar)
			}

			if ($ttContentCarousel.attr("data-size-small") == "true") {
				var $data_ttCcCentered = false;
				var $data_ttCcSize = 3;
			} else {
				var $data_ttCcCentered = true;
				var $data_ttCcSize = 2;
			}

			// Init Swiper
			// ============
			var $ttContentCarouselSwiper = new Swiper($ttContentCarousel.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				slidesPerView: 1,
				longSwipesRatio: 0.3,
				simulateTouch: $data_ttCcSimulateTouch,
				grabCursor: $data_ttCcSimulateTouch,
				speed: $data_ttCcSpeed,
				autoplay: $data_ttCcAutoplay,
				loop: $data_ttCcLoop,
				breakpoints: {
					991: {
						slidesPerView: $data_ttCcSize,
						centeredSlides: $data_ttCcCentered,
					}
				},

				// Navigation (arrows)
				navigation: {
					nextEl: $ttContentCarousel.find(".tt-cc-nav-next")[0],
					prevEl: $ttContentCarousel.find(".tt-cc-nav-prev")[0],
					disabledClass: "tt-cc-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $ttContentCarousel.find(".tt-cc-pagination")[0],
					type: $data_ttCcPaginationType,
					modifierClass: "tt-cc-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},
			});


			// Scale down animation on carousel click
			// =======================================
			if ($ttContentCarousel.attr("data-simulate-touch") == "true") {
				if ($ttContentCarousel.hasClass("tt-cc-scale-down")) {
					$ttContentCarousel.find(".swiper-wrapper").on("mousedown touchstart pointerdown", function(e) {
						if (e.which === 1) { // Affects the left mouse button only!
							gsap.to($ttContentCarousel.find(".tt-content-carousel-item"), { duration: 0.7, scale: 0.9 });
						}
					});
					$("body").on("mouseup touchend pointerup mouseleave", function() {	
						gsap.to($ttContentCarousel.find(".tt-content-carousel-item"), { duration: 0.7, scale: 1, clearProps: "scale" });
					});
				}
			}


			// Check if the current item has the data-fancybox attribute
			// =======================================
			$(".tt-content-carousel-item").each(function () {
				if ($(this).is("[data-fancybox]")) {
					// Check if the .tt-lightbox-icon already exists
					if (!$(this).find(".tt-lightbox-icon").length) {
						$(this).append('<div class="tt-lightbox-icon"></div>');
					}
				}
			});

		});
	}



	// =======================================================================================
	// Portfolio carousel
	// Source: https://swiperjs.com/
	// =======================================================================================

	if ($(".tt-portfolio-carousel").length) { 
		$(".tt-portfolio-carousel").each(function() {
			var $ttPortfolioCarousel = $(this);

			// Data attributes
			// ================
			var $data_ttPcSimulateTouch = $ttPortfolioCarousel.data("simulate-touch");
			var $data_ttPcAutoplay = $ttPortfolioCarousel.data("autoplay") ? { delay: $ttPortfolioCarousel.data("autoplay"), disableOnInteraction: true, } : $ttPortfolioCarousel.data("autoplay");
			var $data_ttPcLoop = $ttPortfolioCarousel.data("loop");
			var $data_ttPcMousewheel = $ttPortfolioCarousel.data("mousewheel");
			var $data_ttPcKeyboard = $ttPortfolioCarousel.data("keyboard");

			if ($ttPortfolioCarousel.is("[data-speed]")) {
				var $data_ttPcSpeed = $ttPortfolioCarousel.data("speed");
			} else {
				var $data_ttPcSpeed = 900; // by default
			}

			if ($ttPortfolioCarousel.is("[data-pagination-type]")) {
				var $data_ttPcPaginationType = $ttPortfolioCarousel.data("pagination-type");
			} else {
				var $data_ttPcPaginationType = "bullets"; // by default (bullets/fraction/progressbar)
			}

			if ($ttPortfolioCarousel.attr("data-size-small") == "true") {
				var $data_ttPcCentered = false;
				var $data_ttPcSize = 3; // Slides to show
			} else {
				var $data_ttPcCentered = true;
				var $data_ttPcSize = 2;

				// Coverflow effect
				var $data_ttPcEffect = "coverflow";
				var $data_ttPcCoverflowRotate = 50;
				var $data_ttPcCoverflowScale = 0.8;
				var $data_ttPcCoverflowModifier = 0.3;
				var $data_ttPcCoverflowShadows = false;
			}

			// Init Swiper
			// ============
			var $ttPortfolioCarouselSwiper = new Swiper($ttPortfolioCarousel.find(".swiper")[0], {
				// Parameters
				direction: "horizontal",
				effect: $data_ttPcEffect,
				coverflowEffect: {
					rotate: $data_ttPcCoverflowRotate,
					scale: $data_ttPcCoverflowScale,
					modifier: $data_ttPcCoverflowModifier,
					slideShadows: $data_ttPcCoverflowShadows,
				},
				slidesPerView: 1,
				longSwipesRatio: 0.3,
				mousewheel: $data_ttPcMousewheel,
				keyboard: $data_ttPcKeyboard,
				simulateTouch: $data_ttPcSimulateTouch,
				grabCursor: $data_ttPcSimulateTouch,
				speed: $data_ttPcSpeed,
				autoplay: $data_ttPcAutoplay,
				loop: $data_ttPcLoop,
				breakpoints: {
					991: {
						slidesPerView: $data_ttPcSize,
						centeredSlides: $data_ttPcCentered,
					}
				},

				// Navigation (arrows)
				navigation: {
					nextEl: $ttPortfolioCarousel.find(".tt-pci-nav-next")[0],
					prevEl: $ttPortfolioCarousel.find(".tt-pci-nav-prev")[0],
					disabledClass: "tt-cc-nav-arrow-disabled",
				},

				// Pagination
				pagination: {
					el: $ttPortfolioCarousel.find(".tt-pci-pagination")[0],
					type: $data_ttPcPaginationType,
					modifierClass: "tt-pci-pagination-",
					dynamicBullets: true,
					dynamicMainBullets: 1,
					clickable: true,
				},
			});


			// Play video on hover
			// ====================
			$(".tt-pci-video").on("mouseenter touchstart", function() {
				$(this).find("video").each(function() {
					$(this).get(0).play();
				}); 
			}).on("mouseleave touchend", function() {
				$(this).find("video").each(function() {
					$(this).get(0).pause();
				});
			});

		});
	}



	// ================================================================
	// tt-Buttons
	// ================================================================

	// Wrap all button content
	$(".tt-btn").each(function() {
		$(this).contents().wrapAll('<span class="tt-btn-inner"></span>');
	});

	// tt-Button disabled (prevent click)
	$(".tt-btn-disabled").on("click", function() {
		return false;
	});



	// ================================================================
	// Forms
	// ================================================================

	// Remove placeholder on focus
	$('input:not([type="checkbox"]):not([type="radio"]), textarea').focus(function () {
		$(this).data("placeholder", $(this).attr("placeholder")).attr("placeholder", "");
	}).blur(function () {
		$(this).attr("placeholder", $(this).data("placeholder"));
	}); 

	// If <form> has class "tt-form-creative"
	if ($("form").hasClass("tt-form-creative")) {
		// Add class "tt-fg-typing" if typing 
		$('input:not([type="checkbox"]):not([type="radio"]), textarea, select').on('input', function() {
			$(this).parents(".tt-form-group").toggleClass("tt-fg-typing", this.value.trim().length > 0);
		});
	}
	
	// Form "Browse File" button info
	$(document).on("change", ":file", function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
		input.trigger("fileselect", [numFiles, label]);
	});
	$(":file").on("fileselect", function(event, numFiles, label) {
		var input = $(this).parents(".tt-form-file").find(".tt-file-info"),
		log = numFiles > 1 ? numFiles + " files selected" : label;

		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
	});



	// ================================================================
	// Pricing plans
	// ================================================================

	// Pricing plans features tooltip 
	// ===============================
	$("[data-ppl-tooltip]").each(function () {
		const $el = $(this);

		// Make focusable
		if (!$el.attr("tabindex")) {
			$el.attr("tabindex", "0");
		}

		const tooltipText = $el.attr("data-ppl-tooltip");

		// Create tooltip if not exists
		if (!$el.find(".ppl-tooltip").length) {
			const $tooltip = $('<div class="ppl-tooltip"></div>').text(tooltipText);

			// Prevent closing when clicking tooltip
			$tooltip.on("click", function (e) {
				e.stopPropagation();
			});

			$el.append($tooltip);
		}

		// Hover (only if not locked)
		$el.on("mouseenter", function () {
			if (!$el.hasClass("tt-tooltip-locked")) {
				$el.addClass("tt-tooltip-active");
			}
		}).on("mouseleave", function () {
			if (!$el.hasClass("tt-tooltip-locked")) {
				$el.removeClass("tt-tooltip-active");
			}
		});

		// Focus (keyboard)
		$el.on("focus", function () {
			if (!$el.hasClass("tt-tooltip-locked")) {
				$el.addClass("tt-tooltip-active");
			}
		}).on("blur", function () {
			if (!$el.hasClass("tt-tooltip-locked")) {
				$el.removeClass("tt-tooltip-active");
			}
		});

		// Click = lock/unlock
		$el.on("click", function (e) {
			e.stopPropagation();

			const isLocked = $el.hasClass("tt-tooltip-locked");

			// Close all first
			$("[data-ppl-tooltip]").removeClass("tt-tooltip-locked tt-tooltip-active");

			// If it was not locked, open it
			if (!isLocked) {
				$el.addClass("tt-tooltip-locked tt-tooltip-active");
			}
		});
	});

	// Click outside closes all
	$(document).on("click", function (e) {
		// Ignore clicks inside tooltip or trigger
		if ($(e.target).closest("[data-ppl-tooltip]").length) return;

		$("[data-ppl-tooltip]").removeClass("tt-tooltip-locked tt-tooltip-active");
	});




})(jQuery); 
