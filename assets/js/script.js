(function ($) {
    $(document).ready(function() {
       var header = document.querySelector('header');
       var headerHeight = header.offsetHeight;

        $(window).on('scroll', function () {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > (headerHeight)) {
                $(header).addClass('fixed-header');
            } else {
                $(header).removeClass('fixed-header');
            }
        });

        ///////// **mobile size** /////////
        $('.menu-bar').click(function () {
        $(this).toggleClass("nav_btn");
        $('.main-nav').toggleClass('open-nav');
        $('body').toggleClass('active-sidenav');
        });

        Fancybox.bind("[data-fancybox]" , {});
        
        // Smooth scroll to top on arrow click
        $('.arrow-up').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
        ///////// **main Slider** /////////
        var mainSlider = new Swiper('.main-slider .swiper', {
            loop: true,
            autoplay: true,
            slidesPerView: 1,
            preloadImages: false,
            updateOnWindowResize: true,
            speed: 1000,
            
            // If we need pagination
            pagination: {
                el: '.main-slider .swiper-pagination',
                clickable: true,
            },
            // Navigation arrows   
            navigation: {
                nextEl: '.main-slider .swiper-button-next',
                prevEl: '.main-slider .swiper-button-prev',
            },
            on: {
                init: function (swiper) {
                    lazyLoad();
                },
                },
        });

        $(".partners-row").marquee({
            duration: 10000,
            gap: 24,
            delayBeforeStart: 0,
            direction: "left",
            duplicated: true,
            startVisible: true,
          });
          

        $('.main-icons').click(function() {    	
            $(this).parent().toggleClass("active");
            // $('.text4').toggleClass("visible");
        });

        // lazy load
        lazyLoad();
    });


    $(window).scroll(function () {
        staticsScroll();
    });

    /*************************statistics *******************/

    var viewed = false;

    function isScrolledIntoView(elem) {
        if (!elem.length) return false; // Check if the element exists
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return elemBottom <= docViewBottom && elemTop >= docViewTop;
    }

    function staticsScroll() {
        var $statNum = $(".stat-num");
        if ($statNum.length && isScrolledIntoView($statNum) && !viewed) {
            viewed = true;
            $statNum.each(function() {
                var $this = $(this),
                    countTo = $this.attr("data-count");
                $({ countNum: $this.text() }).animate(
                    {
                        countNum: countTo
                    },
                    {
                        duration: 3000,
                        easing: "swing",
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    }
                );
            });
        }
    }

    
    /**********lazy load ***********/
    function lazyLoad() {
        const images = document.querySelectorAll(".lazy-img");
    
        const optionsLazyLoad = {
            //  rootMargin: '-50px',
            // threshold: 1
        };
    
        const imageObserver = new IntersectionObserver(function (enteries) {
            enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
            });
        }, optionsLazyLoad);
        
        images.forEach(function (image) {
            imageObserver.observe(image);
        });
        }
        
        function preloadImage(img) {
        img.src = img.getAttribute("data-src");
        img.onload = function () {
            img.parentElement.classList.remove("loading-img");
            img.parentElement.classList.add("loaded-img");
            // img.parentElement.parentElement.classList.add("lazy-head-img");
        };
        }
})(jQuery)