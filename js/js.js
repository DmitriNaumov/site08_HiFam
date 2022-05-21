$(function () {

    'use strict';



    //nav click
    // Cache selectors
    let lastId,
        topMenu = $(".nav__list, .link_foot"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - 100
        }, 300);
        e.preventDefault();
    });


    //btn click to form join
    function buttonGo() {
        $('.btn_go-form').click(function (e) {
            e.preventDefault();
            var go = $('.contact').offset().top;
            $('html, body').animate({ scrollTop: go - 100 }, 350);
        });
    }
    buttonGo();

    //mobile menu
    $('.burger-menu').click(function () {
        $('.nav__list').toggleClass('active');
        $(this).addClass('active');
    });
    if ($('.nav__list').find('active')) {
        $(document).mouseup(function (e) {
            let container = $(".nav__list");
            if (container.has(e.target).length === 0) {
                container.removeClass('active');
                $('.burger-menu').removeClass('active');
            }
        });
    }


    //lang
    function lang() {
        $('.lang__click').click(function () {
            $('.lang').fadeIn();
            $(this).addClass('active');
        });
        $(document).mouseup(function (e) {
            let container = $(".lang");
            if (container.has(e.target).length === 0) {
                container.fadeOut();
                $('.lang__click').removeClass('active');
            }
        });
    }
    lang();


    //ackordion
    function settingsAckordion() {
        $('.accordion__item').on('click', function () {
            let timeAnim = 250;
            $(this).toggleClass('active');
            $(this).find('.accordion__title').next().slideToggle(timeAnim);
            $(this).css({ 'pointer-events': 'none' });
            setTimeout(function () {
                $(this).css({ 'pointer-events': 'auto' });
            }.bind(this), timeAnim);
        });
    }
    settingsAckordion();


    //slider
    function slider() {
        $('.insta__wrapp').slick({
            dots: false,
            arrows: false,
            slidesToShow: 2,
            infinite: false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: false
                }
            }, {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    dots: false
                }
            }]
        });

        $('.sl_prev').click(function () {
            $('.insta__wrapp').slick('slickPrev');
        });
        $('.sl_next').click(function () {
            $('.insta__wrapp').slick('slickNext');
        });
    }
    if ($(window).width() < 769) {
        slider();
    }


    //validate form
    $(".contact__form").validate({
        rules: {
            name: {
                required: true
            },
            tel: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Error explanation goes here"
            },
            tel: {
                required: "Error explanation goes here"
            }
        },
        submitHandler: function () {
            $('.popup-send').addClass('active');
            $('html,body').css('overflow', 'hidden');
        }
    });

    function closePopup() {
        $('.btn-close').click(function () {
            $('.popup-send').removeClass('active');
            $('html,body').css('overflow', 'visible');
        });
        $(document).mouseup(function (e) {
            let container = $(".popup-send");
            if (container.has(e.target).length === 0) {
                container.removeClass('active');
                $('html,body').css('overflow', 'visible');
            }
        });
    }
    closePopup();
});

$(document).ready(function () {
    $(".contact__form").submit(function () {
        let inpName = $('#name').val();
        let inpTel = $('#tel').val();

        if ((inpName.length >= 1) && (inpTel.length >= 1)) {
            $.ajax({
                type: "POST",
                url: "contact.php",
                data: $(this).serialize()
            }).done(function () {
                $(this).find("input,textarea").val("");
                $(".contact__form").trigger("reset");
            });
            return false;
        }
    });
});