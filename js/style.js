/*
Theme Name:Lander
Theme URI: https://sharebootstrap.com
Author: codenpixel.com
Author URI: https://codenpixel.com/
Description: Lander theme is a free bootstrap theme.Download from sharebootstrap.com
Version: 1.0
License: MIT Free for personal and commercial use.
License URI: 
Text Domain: 
Tags: landing, hosting,business etc.
*/

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 56)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#mainNav'),
        distance = navbar.offset().top,
        $window = $(window);

    $window.scroll(function() {
        if ($window.scrollTop() >= distance) {
            navbar.removeClass('sticky-top').addClass('sticky-top');
            $("body").css("padding-top", "10px");
        } else {
            navbar.removeClass('sticky-top');
            $("body").css("padding-top", "0px");
        }
    });   
   
    
})(jQuery); // End of use strict

