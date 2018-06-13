$(document).ready( function(){
    var $animation_elements = $('.botton');
    var $window = $(window);

    function check_if_in_view() {
        console.log('e');
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $('#java').stop().animate({
                    width: '100%'
                },1500);
            } else {
                $('#java').stop().animate({
                    width: '0%'
                }, 0);
            }
        });
    }
    $(window).scroll(check_if_in_view);
});