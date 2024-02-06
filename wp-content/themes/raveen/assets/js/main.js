(function($){

    'use strict';


    function isScrolledIntoViewport(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    // Site Preload & Fix transitions on load
    $(window).on('load', function() {
        $("body").addClass("site-loaded");
    });


    // Smooth Scroll
    if( typeof SmoothScroll == 'function' && $('body').hasClass('rivax-smooth-scroll') ) {
        SmoothScroll({ keyboardSupport: false });
    }


    // Post Reading Progress Indicator
    if($('.post-reading-progress-indicator').length) {
        $(window).on('scroll', function () {
            let docHeight = $("body").height();
            let winHeight = $(window).height();
            let viewport = docHeight - winHeight;
            let scrollPos = $(window).scrollTop();
            let scrollPercent = (scrollPos / viewport) * 100;
            $(".post-reading-progress-indicator span").css("width", scrollPercent + "%");

        });
    }


    // Offcanvas
    $('.offcanvas-container').on('click', function (e) {
        e.stopPropagation();
    });
    $('body').on('click', '.offcanvas-opener', function (e) {
        e.stopPropagation();
        $(this).closest('.rivax-offcanvas').find('.offcanvas-wrapper').addClass('open');
    });

    $('body, .offcanvas-closer').on('click', function (e) {
        $('.offcanvas-wrapper').removeClass('open');
    });

    // Popup Search
    $('body').on('click', '.popup-search-opener', function (e) {
        e.stopPropagation();
        $(this).closest('.popup-search-wrapper').find('.popup-search').addClass('open');
    });

    $('.popup-search-closer').on('click', function (e) {
        $('.popup-search').removeClass('open');
    });



    // Sticky offcanvas
    $(window).on('scroll', function () {

        if ( $('#site-sticky-offcanvas').length == 0 ) {
            return;
        }

        var stickyPos = $('#site-header').outerHeight() + 100;
        var scroll = $(window).scrollTop();

        if( scroll > stickyPos ) {
            $('#site-sticky-offcanvas').addClass('show');
        }
        else {
            $('#site-sticky-offcanvas').removeClass('show');
        }
    });


	// Header Nav prevent # jump
	$('.rivax-header-nav li > a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });


    // Header Vertical Nav
    $('.rivax-header-v-nav li.menu-item-has-children > a').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.sub-menu').slideToggle();
    });




    // Header Mega Menu
    $('.rivax-header-nav .sub-menu.mega-menu-content').css('display', 'block');
    $('.rivax-header-nav li.rivax-mega-menu-4-col > .sub-menu').css('display', 'flex');
    $('body').on('mouseenter', '.rivax-header-nav li.rivax-mega-menu-item, .rivax-header-nav li.rivax-mega-menu-4-col', function() {

        var con = $(this).closest('div[data-elementor-type="wp-post"] > .e-con, div[data-elementor-type="wp-page"] > .e-con');


        // $('body').hasClass('elementor-editor-active')
        if(con.length == 0) {
            con = $(this).closest('div[data-elementor-type="wp-post"] .elementor-section-wrap > .e-con, div[data-elementor-type="wp-page"] .elementor-section-wrap > .e-con');
        }


        if(con.length == 0) {
            return;
        }

        if( con.hasClass('e-con-boxed') ) {
            con = con.children('.e-con-inner');
        }

        var megaMenuWidth = con.width();

        var subMenu = $(this).children('.sub-menu');
        subMenu.css('width', megaMenuWidth);

        var menuPos = $(this).closest('.rivax-header-nav').offset().left;
        var paddingLeft = ( con.innerWidth() - con.width() ) / 2;
        var elementorContainerPos = con.offset().left + paddingLeft;

        if( $('body').hasClass('rtl') ) {
            var menuRightPos = menuPos + $(this).closest('.rivax-header-nav').width();
            var elementorContainerRightPos = elementorContainerPos + megaMenuWidth;

            subMenu.css('right', parseInt(menuRightPos - elementorContainerRightPos));

        }
        else {
            subMenu.css('left', parseInt(elementorContainerPos - menuPos));
        }


    });




    // Back to Top Button
    $(window).on('scroll', function (e) {

        var showPos = $('#site-header').outerHeight() + 200;
        var scroll = $(window).scrollTop();

        if( scroll > showPos ) {
            $('#back-to-top').addClass('show');
        }
        else {
            $('#back-to-top').removeClass('show');
        }

    });

    $('#back-to-top').on('click', function(e) {
        $('body,html').animate({scrollTop:0},800);
    });


    // Dark Mode (Fix page cache plugins)
    if ( navigator.cookieEnabled && $('.dark-mode-switcher').length ) {
        let cookies = document.cookie;
        if( cookies.search('raveenDarkMode') != -1 ) {
            $("body").addClass("dark-mode");
        }
        else {
            $("body").removeClass("dark-mode");
        }

    }

    // Dark Mode Switcher
    $('.dark-mode-switcher').on('click', function(e) {
        if( $('body').hasClass('dark-mode') ) {

            $('body').removeClass('dark-mode');

            if (navigator.cookieEnabled) {
                let date = new Date()
                date.setTime(date.getTime() + (-3*24*60*60*1000));
                document.cookie = 'raveenDarkMode=; path=/; expires=' + date.toUTCString() + ';';
            }

        }
        else {
            $('body').addClass('dark-mode');

            if (navigator.cookieEnabled) {
                let date = new Date()
                date.setTime(date.getTime() + (30*24*60*60*1000));
                document.cookie = 'raveenDarkMode=enabled; path=/; expires=' + date.toUTCString() + ';';

            }
        }

    });



    // Privacy Notice
    if( localStorage.getItem("raveenPrivacy") != "1" ) {
        $('.privacy-notice-wrap').addClass('show');
    }
    else {
        $('.privacy-notice-wrap').addClass('d-none');
    }

    $('#privacy-btn').on('click', function(e) {
        e.preventDefault();
        localStorage.setItem("raveenPrivacy", "1");
        $('.privacy-notice-wrap').removeClass('show');
    });


	// Table Of Content
    $('body').on('click', '.toc-header-collapse', function(){
        $(this).closest('.rivax-toc-wrap').find('.rivax-toc-items').slideToggle();
    });

    $('body').on('click', '.rivax-toc-anchor', function(e){

        var id = $(this).attr('href');

        if( id.substr(0,1) === '#' ) {
            e.preventDefault();
            var section = $(this).closest('.single-post-wrapper').find(id);
            var scrollPos = section.offset().top - 10;
            if($('#site-sticky-header').length) {
                scrollPos -= $('#site-sticky-header').outerHeight();
            }

            $('body,html').animate({scrollTop:scrollPos },800);
        }
    });


	// Autoload next post in single post
    $(window).on('scroll', function () {

        if($( "#autoload-next-post-loader:not(.loading)" ).length) {

            if( isScrolledIntoViewport("#autoload-next-post-loader") ) {

                var data = {
                    action: 'rivax_autoload_next_post',
                    postsLoaded: $( "#autoload-next-post-loader" ).data('loaded'),
                    nextID: $( "#autoload-next-post-loader" ).data('next'),
                };
                $.post({
                    url: rivax_ajax_object.AjaxUrl,
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                        $("#autoload-next-post-loader").addClass('loading');
                        $("#autoload-next-post-loader .rivax-post-load-more-loader").addClass('show');
                    },
                    success: function(response) {
                        if( response.success === false ) {
                            $("#autoload-next-post-loader").remove();
                        }
                        else {

                            if( response.data.content ) {
                                $(".main-wrapper").append(response.data.content);
                            }

                            if( response.data.nextID == 0 ) {
                                $("#autoload-next-post-loader").remove();
                            }
                            else {
                                $( "#autoload-next-post-loader" ).data('loaded', response.data.loaded).data('next', response.data.nextID);
                            }
                        }

                    },
                    error: function() {
                        $("#autoload-next-post-loader").remove();
                    },
                    complete: function() {
                        $("#autoload-next-post-loader").removeClass('loading');
                        $("#autoload-next-post-loader .rivax-post-load-more-loader").removeClass('show');
                    }
                });

            }
        }


        // Update some details
        if($( ".single-post-wrapper" ).length >= 2) {

            $( ".single-post-wrapper" ).each(function( index ) {
                var scroll = $(window).scrollTop();
                var article = $(this);
                var articleTopPos = article.offset().top;
                var articleBottomPos = articleTopPos + article.outerHeight(true);
                var articleInfo = article.find('.autoload-next-post-info');

                if ( scroll > (articleTopPos - 120) && scroll < (articleBottomPos + 20) && (location.href !== articleInfo.data('url')) ) {
                    document.title = articleInfo.data('title');
                    history.replaceState(null, null, articleInfo.data('url'));
                    $('.current-post-title .title-text').text(articleInfo.data('title'));
                }

            });
        }

    });



    // Infinite Scroll Load More
    $(window).on('scroll', function () {

        $( ".rivax-post-load-more.infinite-scroll" ).each(function( index ) {

            if( isScrolledIntoViewport($(this)) ) {
                $(this).trigger("click");
            }

        });

    });


    // Load more posts ajax
    $('.rivax-post-load-more').on('click', function (e) {
        e.preventDefault();
        if($(this).hasClass('hide')) return;

        var loadMoreBtn = $(this);
        var loadMoreLoader = loadMoreBtn.next('.rivax-post-load-more-loader');
        var scope = loadMoreBtn.closest('.rivax-posts-container').find('.rivax-posts-wrapper');

        var widgetId = $(this).data('widget-id');
        var postId = $(this).data('post-id');
        var pageNumber = $(this).data('current-page') + 1;



        var data = {
            action: 'rivax_get_load_more_posts',
            widgetId: widgetId,
            postId: postId,
            pageNumber: pageNumber,
            qVars: (typeof rivaxLoadMoreQVars !== 'undefined')? rivaxLoadMoreQVars : '',
        };
        $.post({
            url: rivax_ajax_object.AjaxUrl,
            data: data,
            dataType: 'json',
            beforeSend: function() {
                loadMoreBtn.addClass('hide');
                loadMoreLoader.addClass('show');
            },
            success: function(response) {
                if(response.data) {
                    var items = $(response.data);

                    scope.append(items);
                    if( scope.hasClass('layout-masonry') ) {
                        scope.masonry( 'appended', items );
                    }
                }


                if(response.no_more) {
                    loadMoreLoader.remove();
                    loadMoreBtn.remove();
                }
                else {
                    loadMoreBtn.data('current-page', pageNumber);
                }
            },
            error: function() {

            },
            complete: function() {
                loadMoreBtn.removeClass('hide');
                loadMoreLoader.removeClass('show');
            }
        });


    });




    var rivaxWidgetsHandler = function( $scope, $ ) {

        // Post Masonry Layout
        var masonryPosts = $scope.find('.rivax-posts-wrapper.layout-masonry');
        if ( masonryPosts.length ){
            masonryPosts.masonry({
                itemSelector: '.post-item',
                percentPosition: true,
            });
        }


        // Post Carousel Layout
        var carouselPosts = $scope.find('.rivax-posts-wrapper.layout-carousel .rivax-posts-carousel-wrapper');
        if ( carouselPosts.length ){
            var carouselSettings = carouselPosts.data('settings');
            var carouselContainer = carouselPosts.find('.swiper-container');


            if ( 'undefined' === typeof Swiper ) {
                const asyncSwiper = elementorFrontend.utils.swiper;

                new asyncSwiper( carouselContainer, carouselSettings ).then( ( newSwiperInstance ) => {
                    var swiper = newSwiperInstance;
                } );
            } else {
                var swiper = new Swiper(carouselContainer, carouselSettings);
            }

        }



        // Single Post Gallery Hero
        if ( $('.single-hero-gallery-container').length ){

            var gallerySettings = {
                slidesPerView: 1,
                slidesPerGroup: 1,
                centeredSlides: true,
                //loop: true,
                autoplay: true,
                spaceBetween: 30,
                a11y: {
                    enabled: false,
                },
                navigation: {
                    nextEl: ".single-hero-gallery-container .swiper-button-next",
                    prevEl: ".single-hero-gallery-container .swiper-button-prev",
                },
                breakpoints: {
                    576: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 2,
                    }
                }
            };

            var carouselContainer = $('.single-hero-gallery-container .swiper-container');

            if ( 'undefined' === typeof Swiper ) {
                const asyncSwiper = elementorFrontend.utils.swiper;

                new asyncSwiper( carouselContainer, gallerySettings ).then( ( newSwiperInstance ) => {
                    var swiper = newSwiperInstance;
                } );
            } else {
                var swiper = new Swiper(carouselContainer, gallerySettings);
            }

        }



        // Mailchimp
        if( $scope.find('.rivax-mailchimp-wrapper').length ) {

            var elForm = $scope.find('.rivax-mailchimp-form'),
                elMessage = $scope.find('.rivax-mailchimp-response-message');

            elForm.on('submit', function (e) {
                e.preventDefault();
                var data = {
                    action: 'rivax_mailchimp_subscribe',
                    subscriber_info: elForm.serialize(),
                    list_id: elForm.data('list-id'),
                };
                $.ajax({
                    type: 'post',
                    url: rivax_ajax_object.AjaxUrl,
                    data: data,
                    success: function success(response) {
                        elForm.trigger('reset');

                        if (response.status) {
                            elMessage.removeClass('error');
                            elMessage.addClass('success');
                            elMessage.text(response.msg);
                        } else {
                            elMessage.addClass('error');
                            elMessage.removeClass('success');
                            elMessage.text(response.msg);
                        }

                        var hideMsg = setTimeout(function () {
                            elMessage.removeClass('error');
                            elMessage.removeClass('success');
                            clearTimeout(hideMsg);
                        }, 5000);
                    },
                    error: function error() {

                    }
                });
            });

        }


    }



    // Elementor Widgets
    $( window ).on( 'elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', rivaxWidgetsHandler );

    });


})( jQuery );
