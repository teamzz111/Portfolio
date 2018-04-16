$(document).ready( function(){
    Check();

    var click = 0;

    $('#botton').click(function(){
        if(click == 0){
            $('.fors').animate({
                "marginLeft":"0"
            },500);
            click = 1;
            
        }
        else{
            $('.fors').animate({
                "marginLeft": "-100%"
            }, 500);
            click = 0;
        }
    });
    function Check(){
        if($(window).width() < 801){

        }
    }
});