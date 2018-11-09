$(document).ready( function(){

    var $animation_elements = $('.botton');
    var $window = $(window);
    var $quemado = false;

    function check_if_in_view() {
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
                (element_top_position <= window_bottom_position) && !$quemado) {
                    $quemado = true;
                    $('#java').stop().animate({
                    width: '62%'
                },1500);
                $('#pjava').text('62%');
                $('#javafx').stop().animate({
                    width: '43%'
                }, 1500);
                $('#pjavafx').text('43%');
                $('#javaee').stop().animate({
                    width: '30%'
                }, 1500);
                $('#pjavaee').text('30%');
                $('#c').stop().animate({
                    width: '60%'
                }, 1500);
                $('#pc').text('60%');
                $('#kotlin').stop().animate({
                    width: '10%'
                }, 1500);
                $('#pkotlin').text('10%');
                $('#android').stop().animate({
                    width: '20%'
                }, 1500);
                $('#pandroidstudio').text('20%');
                $('#mysql').stop().animate({
                    width: '52%'
                }, 1500);
                $('#pmysql').text('52%');
                $('#html').stop().animate({
                    width: '86%'
                }, 1500);
                $('#phtml').text('86%');
                $('#css').stop().animate({
                    width: '70%'
                }, 1500);
                $('#pcss').text('70%');
                $('#javascript').stop().animate({
                    width: '55%'
                }, 1500);
                $('#pjavascript').text('55%');
                $('#jquery').stop().animate({
                    width: '50%'
                }, 1500);
                $('#pjquery').text('50%');
                $('#angular').stop().animate({
                    width: '36%'
                }, 1500);
                $('#pangular').text('36%');
                $('#php').stop().animate({
                    width: '28%'
                }, 1500);
                $('#pphp').text('28%');
                $('#typescript').stop().animate({
                    width: '22%'
                }, 1500);
                $('#ptypescript').text('22%');

            } else {
            }
        });
    }
    $(window).scroll(check_if_in_view);
    window.onload = function () {
        AOS.init();
        AOS.refresh();
        window.sr = ScrollReveal();
        sr.reveal('.iconos, #der .contenedor h1, #der .contenedor, h2', { duration: 600 }, 50);
     };
});