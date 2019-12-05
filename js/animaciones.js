

$(document).ready( function(){

    var $animation_elements = $('.botton');
    var $window = $(window);
    var $quemado = false;

    let data = [
        {
            id: 1,
            text: 'React Native',
            percent: '85%'
        },
        {
            id: "cpp",
            text: 'C++',
            percent: '30%'
        },
        {
            id: 4,
            text: 'C# Win.Forms',
            percent: '50%'
        },
        {
            id: 5,
            text: 'Java Spring',
            percent: '40%'
        },
        {
            id: 6,
            text: 'Android Studio',
            percent: '35%'
        },
        {
            id: 7,
            text: 'ElectronJS',
            percent: '20%'
        },
        {
            id: 8,
            text: 'Objective-C',
            percent: '15%'
        },
        {
            id: 9,
            text: 'Ionic 3',
            percent: '40%'
        },
        {
            id: 10,
            text: 'Unity',
            percent: '10%'
        },
        {
            id: 'rnac',
            text: 'React Navigation',
            percent: '70%'
        },

    ];
    data.sort((a,b) => (a.percent < b.percent) ? 1 : -1);
    let data2 = [
        {
            id: 11,
            text: 'HTML',
            percent: '80%'
        },
        {
            id: 'cssa',
            text: 'CSS',
            percent: '79%'
        },
        {
            id: 'sass',
            text: 'SASS',
            percent: '50%'
        },

        {
            id: 'js',
            text: 'JavaScript',
            percent: '66%'
        },
        {
            id: 'angu',
            text: 'Angular',
            percent: '60%'
        },
        {
            id: 'php',
            text: 'PHP / Yii / Laravel',
            percent: '30%'
        },
        {
            id: 'ror',
            text: 'Ruby On Rails',
            percent: '30%'
        },
        {
            id: 'node',
            text: 'NodeJS',
            percent: '40%'
        },
        {
            id: 'express',
            text: 'Express',
            percent: '30%'
        },
        {
            id: 'react',
            text: 'React',
            percent: '40%'
        },
    ];
    data2.sort((a, b) => (a.percent < b.percent) ? 1 : -1);

    let data3 = [
        {
            id: 3,
            text: 'MySQL',
            percent: '55%'
        },
        {
            id: "postg",
            text: 'PostgreSQL',
            percent: '45%'
        },
        {
            id: "MariaDB",
            text: 'MariaDB',
            percent: '55%'
        },
        {
            id: "sqlserver",
            text: 'SQL Server',
            percent: '25%'
        },
        {
            id: "Mongo",
            text: 'MongoDB',
            percent: '15%'
        },
        {
            id: "aws",
            text: 'AWS',
            percent: '25%'
        },
        {
            id: "azure",
            text: 'Azure',
            percent: '15%'
        },

    ];
    data3.sort((a, b) => (a.percent < b.percent) ? 1 : -1);

    let data4 = [
        {
            id: 'docker',
            text: 'Docker',
            percent: '30%'
        },
        {
            id: 'CircleCI',
            text: 'CircleCI',
            percent: '10%'
        },
        {
            id: 'git',
            text: 'GitHub',
            percent: '80%'
        },
        {
            id: 'Git',
            text: 'Git',
            percent: '90%'
        },
        {
            id: 'GitLab',
            text: 'GitLab',
            percent: '30%'
        },
        {
            id: 'bit',
            text: 'Bitbucket',
            percent: '40%'
        },
        {
            id: "ibm",
            text: 'IBM Cloud',
            percent: '10%'
        },
    ];
    data4.sort((a, b) => (a.percent < b.percent) ? 1 : -1);


    for (let i = 0; i < data.length; i++) {
        $("#dynamic").append(`
            <div>
                <h3>${data[i].text}</h3>
                <h3 class="percent" >${data[i].percent}</h3>
            </div>
            <div class="progress-bar" id="${data[i].id}">
                <div class="shadow"></div>
            </div>
        `);
    }
    for (let i = 0; i < data2.length; i++) {
        $("#dynamic2").append(`
            <div>
                <h3>${data2[i].text}</h3>
                <h3 class="percent" >${data2[i].percent}</h3>
            </div>
            <div class="progress-bar" id="${data2[i].id}">
                <div class="shadow"></div>
            </div>
        `);
    }
    for (let i = 0; i < data3.length; i++) {
        $("#dynamic3").append(`
            <div>
                <h3>${data3[i].text}</h3>
                <h3 class="percent" >${data3[i].percent}</h3>
            </div>
            <div class="progress-bar" id="${data3[i].id}">
                <div class="shadow"></div>
            </div>
        `);
    }
    for (let i = 0; i < data4.length; i++) {
        $("#dynamic4").append(`
            <div>
                <h3>${data4[i].text}</h3>
                <h3 class="percent" >${data4[i].percent}</h3>
            </div>
            <div class="progress-bar" id="${data4[i].id}">
                <div class="shadow"></div>
            </div>
        `);
    }
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
                for (let i = 0; i < data.length; i++) {
                
                    $(`#${data[i].id}`).stop().animate({
                        width: `${data[i].percent}`
                    },1500);
                } 
                for (let i = 0; i < data2.length; i++) {
                    $(`#${data2[i].id}`).stop().animate({
                        width: `${data2[i].percent}`
                    }, 1500);
                } 
                for (let i = 0; i < data3.length; i++) {
                    $(`#${data3[i].id}`).stop().animate({
                        width: `${data3[i].percent}`
                    }, 1500);
                } 
                for (let i = 0; i < data4.length; i++) {
                    $(`#${data4[i].id}`).stop().animate({
                        width: `${data4[i].percent}`
                    }, 1500);
                } 
            } 
        });
    }

    $(window).scroll(check_if_in_view);
    window.onload = function () {
        AOS.init();
        AOS.refresh();
        window.sr = ScrollReveal();
        $('.loading').fadeOut(100);
        sr.reveal('.iconos, #der .contenedor h1, #der .contenedor, h2', { duration: 600 }, 50);
     };
});