//4/24/2014-Test phase

(function ($) {

    $.fn.ridAlert = function (options) {
        if (jQuery.type(options) == "object") {
            var settings = $.extend({
                AlertType: 'AlertSimple',
                AlertTitle: 'Alert!',
                AlertSimple: {
                    AlertIcon: 'css/Img/alert1.png',
                    AlertMessage: 'Dude,Please check ,I hope something is wrong',
                    OnclickExit: function () { },
                    buttons: [{
                        name: 'Ok',
                        BtnClick: function (btnElem, alertBoxElem) {
                            $(alertBoxElem).hide();
                        }
                    }]
                },
                AlertComplex: {
                    Content: function (inputDiv) { },
                    OnclickExit: function () { },
                    buttons: [{
                        name: 'Ok',
                        BtnClick: function (btnElem, alertBoxElem) {
                            $(alertBoxElem).hide();
                        }
                    }]
                },
                DragEnable: false

            }, options);
            return this.each(function () {
                $.fn.ridInit(this);
                $.fn.AlertFillContent(this, settings);
                $.fn.enableDrag(this, settings);
            });
        }
        else {
            switch (options) {
                case 'open':
                    $(this).show();
                    break;
                case 'close':
                    $(this).hide();
                    break;
                case 'toggle':
                    if ($(this).is(':visible')) {
                        $(this).hide();
                    }
                    else {
                        $(this).show();
                    }
                    break;
            }
        }



    };

    $.fn.ridInit = function (elem) {
        var headerDiv = "<div  id='DivRidAlertHeader'></div>";
        var ContentDiv = "<div  id='DivRidAlertContent'></div>";
        $(elem).append(headerDiv + ContentDiv).addClass("ridDefaultStyle");
        $(elem).hide();
    };

    $.fn.AlertFillContent = function (elem, settings) {
        switch (settings.AlertType) {
            case 'AlertSimple':
                $.fn.AlertBasic(elem, settings);
                break;
            case 'AlertComplex':
                $.fn.AlertComplex(elem, settings);
                break;
            default:
                $.fn.AlertBasic(elem, settings);
                break;
        }

    };
    $.fn.AlertBasic = function (elem, settings) {

        var AlertHeader = "<span id='SpnAlertTitle'>" + settings.AlertTitle + "</span><a href='#' class='WndClose ridAlertClose'>x</a>";
        var ContentLeft = "<div  id='DivContentLeft'><img src='" + settings.AlertSimple.AlertIcon + "' id='ImgAlertIcon'/></div>";
        var ContentRight = "<div  id='DivContentRight'><span id='SpnAlertMessage'>" + settings.AlertSimple.AlertMessage;
        ContentRight += "</span></br></br><div id='BtnRidBlock'></div></div>";
        $("#DivRidAlertHeader")[0].innerHTML = AlertHeader;
        $("#DivRidAlertContent")[0].innerHTML = ContentLeft + ContentRight;
        $(".ridAlertClose").click(function () {
            $(elem).hide();
            if ($.isFunction(settings.AlertSimple.OnclickExit))
                settings.AlertSimple.OnclickExit.call(this, elem);
        });
        $.fn.AddButtons(elem, settings);
    };

    $.fn.AlertComplex = function (elem, settings) {
        var AlertHeader = "<span id='SpnAlertTitle'>" + settings.AlertTitle + "</span><a href='#' class='WndClose ridAlertClose'>x</a>";
        var Content = "<div  id='DivAlertInputContent'></div>";
        Content += "<div id='BtnRidBlock'></div>";
        $("#DivRidAlertHeader")[0].innerHTML = AlertHeader;
        $("#DivRidAlertContent")[0].innerHTML = Content;
        $(".ridAlertClose").click(function () {
            $(elem).hide();
            if ($.isFunction(settings.AlertComplex.OnclickExit))
                settings.AlertComplex.OnclickExit.call(this, elem);
        });
        var isContentFunction = $.isFunction(settings.AlertComplex.Content);
        if (isContentFunction)
            settings.AlertComplex.Content.call(this, $("#DivAlertInputContent"));
        else
            $("#DivAlertInputContent").append(settings.AlertComplex.Content);
        $.fn.AddButtons(elem, settings);
    }

    /*Code to Add buttons */
    $.fn.AddButtons = function (elem, settings) {
        var counter = 1;
        var btnClickArray = new Array();
        if (settings.AlertType == "AlertSimple") {
            var buttonObjArray = settings.AlertSimple.buttons;
        }
        else {
            var buttonObjArray = settings.AlertComplex.buttons;
        }
        $(buttonObjArray).each(function () {
            var button = "<a href='#' id='RidBtn_" + counter + "' class='BtnRidAlert'>" + this.name + "</a>";
            $("#BtnRidBlock")[0].innerHTML += button;
            btnClickArray[counter] = this.BtnClick;
            counter++;
        });
        for (var i = 1; i < btnClickArray.length; i++) {
            $('#RidBtn_' + i).click(function () {
                var buttonNumber = (this.id).split('_')[1]
                btnClickArray[buttonNumber].call(this, this.id, elem);
            });

        }


    };

    //    /*Code to enable drag feature */
    //    /*---Drag code from http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/ -----*/
    $.fn.enableDrag = function (elem, settings) {

        if (settings.DragEnable == true) {
            $("#DivRidAlertHeader").mousedown(function (e) {
                var $drag = $(elem).addClass('draggable');
                var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 1000).parents().on("mousemove", function (e) {
                    $('.draggable').offset({
                        top: e.pageY + pos_y - drg_h,
                        left: e.pageX + pos_x - drg_w
                    }).on("mouseup", function () {
                        $(this).removeClass('draggable').css('z-index', z_idx);
                    });
                });
                e.preventDefault(); // disable selection

            }).on("mouseup", function () {

                $(this).removeClass('draggable');
            });

        }

    };

} (jQuery));
