


$( () => {
	

    // Slider 
    const $window = $(window);
    const $body = $('body');
    
    class Slideshow {
      constructor(userOptions = {}) {
        const defaultOptions = {
          $el: $('.slideshow'),
          showArrows: false,
          showPagination: true,
          duration: 10000,
          autoplay: true };
    
    
        let options = Object.assign({}, defaultOptions, userOptions);
    
        this.$el = options.$el;
        this.maxSlide = this.$el.find($('.js-slider-home-slide')).length;
        this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
        this.showPagination = options.showPagination;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animationDuration = 1200;
        this.autoplaySpeed = options.duration;
        this.interval;
        this.$controls = this.$el.find('.js-slider-home-button');
        this.autoplay = this.maxSlide > 1 ? options.autoplay : false;
    
        this.$el.on('click', '.js-slider-home-next', event => this.nextSlide());
        this.$el.on('click', '.js-slider-home-prev', event => this.prevSlide());
        this.$el.on('click', '.js-pagination-item', event => {
          if (!this.isAnimating) {
            this.preventClick();
            this.goToSlide(event.target.dataset.slide);
          }
        });
    
        this.init();
      }
    
      init() {
        this.goToSlide(1);
        if (this.autoplay) {
          this.startAutoplay();
        }
    
        if (this.showPagination) {
          let paginationNumber = this.maxSlide;
          let pagination = '<div class="pagination"><div class="container">';
    
          for (let i = 0; i < this.maxSlide; i++) {
            let item = `<span class="pagination__item js-pagination-item ${i === 0 ? 'is-current' : ''}" data-slide=${i + 1}>${i + 1}</span>`;
            pagination = pagination + item;
          }
    
          pagination = pagination + '</div></div>';
    
          this.$el.append(pagination);
        }
      }
    
      preventClick() {
        this.isAnimating = true;
        this.$controls.prop('disabled', true);
        clearInterval(this.interval);
    
        setTimeout(() => {
          this.isAnimating = false;
          this.$controls.prop('disabled', false);
          if (this.autoplay) {
            this.startAutoplay();
          }
        }, this.animationDuration);
      }
    
      goToSlide(index) {
        this.currentSlide = parseInt(index);
    
        if (this.currentSlide > this.maxSlide) {
          this.currentSlide = 1;
        }
    
        if (this.currentSlide === 0) {
          this.currentSlide = this.maxSlide;
        }
    
        const newCurrent = this.$el.find('.js-slider-home-slide[data-slide="' + this.currentSlide + '"]');
        const newPrev = this.currentSlide === 1 ? this.$el.find('.js-slider-home-slide').last() : newCurrent.prev('.js-slider-home-slide');
        const newNext = this.currentSlide === this.maxSlide ? this.$el.find('.js-slider-home-slide').first() : newCurrent.next('.js-slider-home-slide');
    
        this.$el.find('.js-slider-home-slide').removeClass('is-prev is-next is-current');
        this.$el.find('.js-pagination-item').removeClass('is-current');
    
        if (this.maxSlide > 1) {
          newPrev.addClass('is-prev');
          newNext.addClass('is-next');
        }
    
        newCurrent.addClass('is-current');
        this.$el.find('.js-pagination-item[data-slide="' + this.currentSlide + '"]').addClass('is-current');
      }
    
      nextSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide + 1);
      }
    
      prevSlide() {
        this.preventClick();
        this.goToSlide(this.currentSlide - 1);
      }
    
      startAutoplay() {
        this.interval = setInterval(() => {
          if (!this.isAnimating) {
            this.nextSlide();
          }
        }, this.autoplaySpeed);
      }
    
      destroy() {
        this.$el.off();
      }}
    
    
    (function () {
      let loaded = false;
      let maxLoad = 3000;
    
      function load() {
        const options = {
          showPagination: true };
    
    
        let slideShow = new Slideshow(options);
      }
    
      function addLoadClass() {
        $body.addClass('is-loaded');
    
        setTimeout(function () {
          $body.addClass('is-animated');
        }, 600);
      }
    
      $window.on('load', function () {
        if (!loaded) {
          loaded = true;
          load();
        }
      });
    
      setTimeout(function () {
        if (!loaded) {
          loaded = true;
          load();
        }
      }, maxLoad);
    
      addLoadClass();


    })();
    var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});


	
});
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });
(function ($) {
	"use strict";
    
    var bootsnav = {
        initialize: function() {
            this.event();
            this.hoverDropdown();
            this.navbarSticky();
            this.navbarScrollspy();
        },
        event : function(){
            
            // ------------------------------------------------------------------------------ //
            // Variable
            // ------------------------------------------------------------------------------ //
            var getNav = $("nav.navbar.bootsnav");
            
            // ------------------------------------------------------------------------------ //
            // Navbar Sticky 
            // ------------------------------------------------------------------------------ //
            var navSticky = getNav.hasClass("navbar-sticky");
            if( navSticky ){
                // Wraped navigation
                getNav.wrap("<div class='wrap-sticky'></div>");
            }   
            
            // ------------------------------------------------------------------------------ //
            // Navbar Center 
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("brand-center")){                
                var postsArr = new Array(),
                    index = $("nav.brand-center"),
                    $postsList = index.find('ul.navbar-nav');
				
				index.prepend("<span class='storage-name' style='display:none;'></span>");
                
                //Create array of all posts in lists
                index.find('ul.navbar-nav > li').each(function(){
					if( $(this).hasClass("active") ){
						var getElement = $("a", this).eq(0).text();
						$(".storage-name").html(getElement);
					}
                    postsArr.push($(this).html());
                });
                
                //Split the array at this point. The original array is altered.
                var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
                    secondList = postsArr,
                    ListHTML = '';
                
                var createHTML = function(list){
                    ListHTML = '';
                    for (var i = 0; i < list.length; i++) {
                        ListHTML += '<li>' + list[i] + '</li>'
                    }
                }
                
                //Generate HTML for first list
                createHTML(firstList);
                $postsList.html(ListHTML);
                index.find("ul.nav").first().addClass("navbar-left");
                
                //Generate HTML for second list
                createHTML(secondList);
                //Create new list after original one
                $postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
                index.find("ul.nav").last().addClass("navbar-right");
                
                //Wrap navigation menu
                index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
                index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");
                
                //Selection Class
                index.find('ul.navbar-nav > li').each(function(){ 
                    var dropDown = $("ul.dropdown-menu", this),
                        megaMenu = $("ul.megamenu-content", this);
                    dropDown.closest("li").addClass("dropdown");
                    megaMenu.closest("li").addClass("megamenu-fw");
                });
				
				var getName = $(".storage-name").html();
				if( !getName == ""  ){
					$( "ul.navbar-nav > li:contains('" + getName + "')" ).addClass("active");
				}		
            } 
            
            
            // ------------------------------------------------------------------------------ //
            // Navbar Sidebar 
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("navbar-sidebar")){
                // Add Class to body
                $("body").addClass("wrap-nav-sidebar");
                getNav.wrapInner("<div class='scroller'></div>");
            }else{
                $(".bootsnav").addClass("on");
            }
            
            // ------------------------------------------------------------------------------ //
            // Menu Center 
            // ------------------------------------------------------------------------------ //
            if( getNav.find("ul.nav").hasClass("navbar-center")){
                getNav.addClass("menu-center");
            }
            
            // ------------------------------------------------------------------------------ //
            // Navbar Full
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("navbar-full")){
                // Add Class to body
                $("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
                $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
                $("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>");
            }else if( getNav.hasClass("navbar-mobile")){
                getNav.removeClass("no-full");
            }else{
                getNav.addClass("no-full");
            }
                
            // ------------------------------------------------------------------------------ //
            // Navbar Mobile
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("navbar-mobile")){
                // Add Class to body
                $('.navbar-collapse').on('shown.bs.collapse', function() {
                    $("body").addClass("side-right");
                });
                $('.navbar-collapse').on('hide.bs.collapse', function() {
                    $("body").removeClass("side-right");
                });
                
                $(window).on("resize", function(){
                    $("body").removeClass("side-right");
                });
            }
            
            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("no-background")){
                $(window).on("scroll", function(){
                    var scrollTop = $(window).scrollTop();
                    if(scrollTop >34){
                        $(".navbar-fixed").removeClass("no-background");
                    }else {
                        $(".navbar-fixed").addClass("no-background");
                    }
                });
            }
            
            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("navbar-transparent")){
                $(window).on("scroll", function(){
                    var scrollTop = $(window).scrollTop();
                    if(scrollTop >34){
                        $(".navbar-fixed").removeClass("navbar-transparent");
                    }else {
                        $(".navbar-fixed").addClass("navbar-transparent");
                    }
                });
            }
            
            // ------------------------------------------------------------------------------ //
            // Button Cart
            // ------------------------------------------------------------------------------ //
            $(".btn-cart").on("click", function(e){
                e.stopPropagation();
            });
            
            // ------------------------------------------------------------------------------ //
            // Toggle Search
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.bootsnav .attr-nav").each(function(){  
                $("li.search > a", this).on("click", function(e){
                    e.preventDefault();
                    $(".top-search").slideToggle();
                });
            });
            $(".input-group-addon.close-search").on("click", function(){
                $(".top-search").slideUp();
            });
            
            // ------------------------------------------------------------------------------ //
            // Toggle Side Menu
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.bootsnav .attr-nav").each(function(){  
                $("li.side-menu > a", this).on("click", function(e){
                    e.preventDefault();
                    $("nav.navbar.bootsnav > .side").toggleClass("on");
                    $("body").toggleClass("on-side");
                });
            });
            $(".side .close-side").on("click", function(e){
                e.preventDefault();
                $("nav.navbar.bootsnav > .side").removeClass("on");
                $("body").removeClass("on-side");
            });  
            
            
            
            // ------------------------------------------------------------------------------ //
            // Wrapper
            // ------------------------------------------------------------------------------ //
            $("body").wrapInner( "<div class='wrapper'></div>");
        }, 
        

        // ------------------------------------------------------------------------------ //
        // Change dropdown to hover on dekstop
        // ------------------------------------------------------------------------------ //
        hoverDropdown : function(){
            var getNav = $("nav.navbar.bootsnav"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.nav").data("in"),
                getOut = getNav.find("ul.nav").data("out");
            
            if( getWindow < 991 ){
                
                // Height of scroll navigation sidebar
                $(".scroller").css("height", "auto");
                
                // Disable mouseenter event
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
                $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");
                $("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter"); 
                $("nav.navbar.bootsnav ul.nav").off("mouseleave");    
                $(".navbar-collapse").removeClass("animated");
                
                // Enable click event
                $("nav.navbar.bootsnav ul.nav").each(function(){
                    $(".dropdown-menu", this).addClass("animated");
                    $(".dropdown-menu", this).removeClass(getOut);
                    
                    // Dropdown Fade Toggle
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
                        $(this).closest("li.dropdown").first().toggleClass("on");                        
                        return false;
                    });   
                    
                    // Hidden dropdown action
                    $('li.dropdown', this).each(function () {
                        $(this).find(".dropdown-menu").stop().fadeOut();
                        $(this).on('hidden.bs.dropdown', function () {
                            $(this).find(".dropdown-menu").stop().fadeOut();
                        });
                        return false;
                    });

                    // Megamenu style
                    $(".megamenu-fw", this).each(function(){
                        $(".col-menu", this).each(function(){
                            $(".content", this).addClass("animated");
                            $(".content", this).stop().fadeOut();
                            $(".title", this).off("click");
                            $(".title", this).on("click", function(){
                                $(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(getIn);
                                $(this).closest(".col-menu").toggleClass("on");
                                return false;
                            });

                            $(".content", this).on("click", function(e){
                                e.stopPropagation();
                            });
                        });
                    });  
                }); 
                
                // Hidden dropdown
                var cleanOpen = function(){
                    $('li.dropdown', this).removeClass("on");
                    $(".dropdown-menu", this).stop().fadeOut();
                    $(".dropdown-menu", this).removeClass(getIn);
                    $(".col-menu", this).removeClass("on");
                    $(".col-menu .content", this).stop().fadeOut();
                    $(".col-menu .content", this).removeClass(getIn);
                }
                
                // Hidden om mouse leave
                $("nav.navbar.bootsnav").on("mouseleave", function(){
                    cleanOpen();
                });
                
                // Enable click atribute navigation
                $("nav.navbar.bootsnav .attr-nav").each(function(){  
                    $(".dropdown-menu", this).removeClass("animated");
                    $("li.dropdown", this).off("mouseenter");
                    $("li.dropdown", this).off("mouseleave");                    
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle();
                        $(".navbar-toggle").each(function(){
                            $(".fa", this).removeClass("fa-times");
                            $(".fa", this).addClass("fa-bars");
                            $(".navbar-collapse").removeClass("in");
                            $(".navbar-collapse").removeClass("on");
                        });
                    });
                    
                    $(this).on("mouseleave", function(){
                        $(".dropdown-menu", this).stop().fadeOut();
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });
                
                // Toggle Bars
                $(".navbar-toggle").each(function(){
                    $(this).off("click");
                    $(this).on("click", function(){
                        $(".fa", this).toggleClass("fa-bars");
                        $(".fa", this).toggleClass("fa-times");
                        cleanOpen();
                    });
                });

            }else if( getWindow > 991 ){
                // Height of scroll navigation sidebar
                $(".scroller").css("height", getHeight + "px");
                
                // Navbar Sidebar
                if( getNav.hasClass("navbar-sidebar")){
                    // Hover effect Sidebar Menu
                    $("nav.navbar.bootsnav ul.nav").each(function(){  
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function (e) {
                            e.stopPropagation();
                        }); 

                        $(".dropdown-menu", this).addClass("animated");
                        $("li.dropdown", this).on("mouseenter", function(){
                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                            $(this).addClass("on");
                            return false;
                        });
                        
                        $(".col-menu").each(function(){
                            $(".content", this).addClass("animated");
                            $(".title", this).on("mouseenter", function(){
                                $(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(getIn);
                                $(this).closest(".col-menu").addClass("on");
                                return false;
                            });
                        });
                        
                        $(this).on("mouseleave", function(){
                            $(".dropdown-menu", this).stop().removeClass(getIn);
                            $(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
                            $(".col-menu", this).find(".content").stop().fadeOut().removeClass(getIn);
                            $(".col-menu", this).removeClass("on");
                            $("li.dropdown", this).removeClass("on");
                            return false;
                        });
                    }); 
                }else{
                    // Hover effect Default Menu
                    $("nav.navbar.bootsnav ul.nav").each(function(){  
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function (e) {
                            e.stopPropagation();
                        }); 

                        $(".megamenu-fw", this).each(function(){
                            $(".title", this).off("click");
                            $("a.dropdown-toggle", this).off("click");
                            $(".content").removeClass("animated");
                        });

                        $(".dropdown-menu", this).addClass("animated");
                        $("li.dropdown", this).on("mouseenter", function(){
                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                            $(this).addClass("on");
                            return false;
                        });

                        $("li.dropdown", this).on("mouseleave", function(){
                            $(".dropdown-menu", this).eq(0).removeClass(getIn);
                            $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                            $(this).removeClass("on");
                        });

                        $(this).on("mouseleave", function(){
                            $(".dropdown-menu", this).removeClass(getIn);
                            $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                            $("li.dropdown", this).removeClass("on");
                            return false;
                        });
                    });
                }
                
                // ------------------------------------------------------------------------------ //
                // Hover effect Atribute Navigation
                // ------------------------------------------------------------------------------ //
                $("nav.navbar.bootsnav .attr-nav").each(function(){                      
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function (e) {
                        e.stopPropagation();
                    }); 
                    
                    $(".dropdown-menu", this).addClass("animated");
                    $("li.dropdown", this).on("mouseenter", function(){
                        $(".dropdown-menu", this).eq(0).removeClass(getOut);
                        $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                        $(this).addClass("on");
                        return false;
                    });

                    $("li.dropdown", this).on("mouseleave", function(){
                        $(".dropdown-menu", this).eq(0).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                        $(this).removeClass("on");
                    });

                    $(this).on("mouseleave", function(){
                        $(".dropdown-menu", this).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });
            }
            
            // ------------------------------------------------------------------------------ //
            // Menu Fullscreen
            // ------------------------------------------------------------------------------ //
            if( getNav.hasClass("navbar-full")){
                var windowHeight = $(window).height(),
                    windowWidth =  $(window).width();

                $(".nav-full").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("width", windowWidth + "px");
                
                $(".navbar-collapse").addClass("animated");
                $(".navbar-toggle").each(function(){
                    var getId = $(this).data("target");
                    $(this).off("click");
                    $(this).on("click", function(e){
                        e.preventDefault();
                        $(getId).removeClass(getOut);
                        $(getId).addClass("in");
                        $(getId).addClass(getIn);
                        return false;
                    });
                    
                    $("li.close-full-menu").on("click", function(e){
                        e.preventDefault();
                        $(getId).addClass(getOut);
                        setTimeout(function(){
                            $(getId).removeClass("in");
                            $(getId).removeClass(getIn);
                        }, 500);
                        return false;
                    });
                });
            }
        },
        
        // ------------------------------------------------------------------------------ //
        // Navbar Sticky
        // ------------------------------------------------------------------------------ //
        navbarSticky : function(){  
            var getNav = $("nav.navbar.bootsnav"),
                navSticky = getNav.hasClass("navbar-sticky");
            
            if( navSticky ){
                
                // Set Height Navigation
                var getHeight = getNav.height();             
                $(".wrap-sticky").height(getHeight);
                
                // Windown on scroll
                var getOffset = $(".wrap-sticky").offset().top;
                $(window).on("scroll", function(){  
                    var scrollTop = $(window).scrollTop();
                    if(scrollTop > getOffset){
                        getNav.addClass("sticked");
                    }else {
                        getNav.removeClass("sticked");
                    }
                });
            }   
        },
        
        // ------------------------------------------------------------------------------ //
        // Navbar Scrollspy
        // ------------------------------------------------------------------------------ //
        navbarScrollspy : function(){ 
            var navScrollSpy = $(".navbar-scrollspy"),
                $body   = $('body'), 
                getNav = $('nav.navbar.bootsnav'),
                offset  = getNav.outerHeight();
            
            if( navScrollSpy.length ){
                $body.scrollspy({target: '.navbar', offset: offset });
                
                // Animation Scrollspy
                $('.scroll').on('click', function(event) {
                    event.preventDefault();

                    // Active link
                    $('.scroll').removeClass("active");
                    $(this).addClass("active");

                    // Remove navbar collapse
                    $(".navbar-collapse").removeClass("in");

                    // Toggle Bars
                    $(".navbar-toggle").each(function(){
                        $(".fa", this).removeClass("fa-times");
                        $(".fa", this).addClass("fa-bars");
                    });

                    // Scroll
                    var scrollTop = $(window).scrollTop(),
                        $anchor = $(this).find('a'),
                        $section = $($anchor.attr('href')).offset().top,
                        $window = $(window).width(),
                        $minusDesktop = getNav.data("minus-value-desktop"),
                        $minusMobile = getNav.data("minus-value-mobile"),
                        $speed = getNav.data("speed");
                    
                    if( $window > 992 ){
                        var $position = $section - $minusDesktop;
                    }else{
                        var $position = $section - $minusMobile;
                    }             
                        
                    $('html, body').stop().animate({
                        scrollTop: $position
                    }, $speed);
                });
                
                // Activate Navigation
                var fixSpy = function() {
                    var data = $body.data('bs.scrollspy');
                    if (data) {
                        offset = getNav.outerHeight();
                        data.options.offset = offset;
                        $body.data('bs.scrollspy', data);
                        $body.scrollspy('refresh');
                    }
                }
                
                // Activate Navigation on resize
                var resizeTimer;
                $(window).on('resize', function() {
                    clearTimeout(resizeTimer);
                    var resizeTimer = setTimeout(fixSpy, 200);
                });
            }
        }
    };
    
    // Initialize
    $(document).ready(function(){
        bootsnav.initialize();
    });
    
    // Reset on resize
    $(window).on("resize", function(){   
        bootsnav.hoverDropdown();
        setTimeout(function(){
            bootsnav.navbarSticky();
        }, 500);
        
        // Toggle Bars
        $(".navbar-toggle").each(function(){
            $(".fa", this).removeClass("fa-times");
            $(".fa", this).addClass("fa-bars");
            $(this).removeClass("fixed");
        });        
        $(".navbar-collapse").removeClass("in");
        $(".navbar-collapse").removeClass("on");
        $(".navbar-collapse").removeClass("bounceIn");      
    });
    
}(jQuery));
