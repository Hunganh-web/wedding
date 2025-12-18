// Re-initialize parallax functionality
$(document).ready(function() {
    // Initialize pointparallax for couple section
    if ($('.pointparallax').length > 0) {
        try {
            $('.pointparallax').pointparallax({
                itemsSelector: '.point__item',
                point: 'center',
                path: 100,
                easing: 'linear'
            });
        } catch (e) {
            console.log('Parallax initialization error:', e);
        }
    }
    
    // Re-trigger parallax on window resize
    $(window).on('resize', function() {
        if ($('.pointparallax').length > 0) {
            try {
                $('.pointparallax').trigger('resize.pointparallax');
            } catch (e) {
                console.log('Parallax resize error:', e);
            }
        }
    });
    
    // Re-trigger parallax on scroll
    $(window).on('scroll', function() {
        if ($('.pointparallax').length > 0) {
            try {
                $('.pointparallax').trigger('scroll.pointparallax');
            } catch (e) {
                console.log('Parallax scroll error:', e);
            }
        }
    });
});