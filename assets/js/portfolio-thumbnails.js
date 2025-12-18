(function($) {
    'use strict';
    
    $(document).ready(function() {
        // Initialize thumbnail navigation for portfolio carousel
        initPortfolioThumbnails();
        
        // Reinitialize on window resize
        $(window).on('resize', function() {
            initPortfolioThumbnails();
        });
    });
    
    function initPortfolioThumbnails() {
        var $portfolioCarousel = $('.portfolio-grids.portfolio-slide');
        
        // Check if carousel exists
        if ($portfolioCarousel.length === 0) {
            return;
        }
        
        // Check if we're in mobile view (bootstrap sm breakpoint is 576px)
        var isMobile = window.innerWidth <= 575;
        
        // Get the carousel instance
        var carouselInstance = $portfolioCarousel.data('owl.carousel');
        
        // If we're on mobile and thumbnails don't exist yet
        if (isMobile) {
            var $thumbnailNav = $('#portfolio-thumbnail-nav');
            
            // If thumbnails don't exist, create them
            if ($thumbnailNav.length === 0) {
                createThumbnailNavigation($portfolioCarousel);
            }
            
            // Attach click events to thumbnails
            attachThumbnailEvents($portfolioCarousel);
        } else {
            // On desktop, remove thumbnail navigation if it exists
            var $thumbnailNav = $('#portfolio-thumbnail-nav');
            if ($thumbnailNav.length > 0) {
                $thumbnailNav.remove();
            }
        }
    }
    
    function createThumbnailNavigation($carousel) {
        // Get all slides
        var $slides = $carousel.find('.grid');
        var thumbnailHTML = '<div class="owl-dots thumbnail-nav" id="portfolio-thumbnail-nav">';
        
        $slides.each(function(index) {
            var $slide = $(this);
            var imgSrc = $slide.find('img').attr('src');
            var altText = $slide.find('img').attr('alt') || 'Thumbnail ' + (index + 1);
            
            thumbnailHTML += '<button class="owl-dot" data-slide-index="' + index + '">' +
                             '<img src="' + imgSrc + '" alt="' + altText + '">' +
                             '</button>';
        });
        
        thumbnailHTML += '</div>';
        
        // Insert thumbnail navigation after the carousel
        $carousel.after(thumbnailHTML);
        
        // Update active thumbnail when carousel changes
        $carousel.on('changed.owl.carousel', function(event) {
            var currentIndex = event.item.index;
            $('#portfolio-thumbnail-nav .owl-dot').removeClass('active');
            $('#portfolio-thumbnail-nav .owl-dot[data-slide-index="' + currentIndex + '"]').addClass('active');
        });
    }
    
    function attachThumbnailEvents($carousel) {
        // Handle thumbnail clicks
        $(document).off('click', '#portfolio-thumbnail-nav .owl-dot').on('click', '#portfolio-thumbnail-nav .owl-dot', function() {
            var slideIndex = $(this).data('slide-index');
            $carousel.trigger('to.owl.carousel', [slideIndex, 300]);
            
            // Update active class
            $('#portfolio-thumbnail-nav .owl-dot').removeClass('active');
            $(this).addClass('active');
        });
        
        // Set initial active thumbnail
        setTimeout(function() {
            var activeIndex = $carousel.find('.active').index();
            if (activeIndex >= 0) {
                $('#portfolio-thumbnail-nav .owl-dot').removeClass('active');
                $('#portfolio-thumbnail-nav .owl-dot[data-slide-index="' + activeIndex + '"]').addClass('active');
            }
        }, 100);
    }
    
})(jQuery);