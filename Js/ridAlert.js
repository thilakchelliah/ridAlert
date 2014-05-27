
(function ($) {

    $.fn.ridAlert = function (options) {
        if (jQuery.type(options) == "object") {
            var settings = $.extend({
                AlertType: 'Alert',
                AlertIcon: 'css/Img/alert1.png',
                AlertTitle: 'Alert!',
                AlertInput: function (inputDiv) { },
                AlertMessage: '',
                DragEnable: false,
                buttons: [{
                    name: 'Ok',
                    BtnClick: function (btnElem, alertBoxElem) { $(btnElem).click(function () { $(alertBoxElem).hide(); }) }
                }]

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
                    debugger;
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
        debugger;
        switch (settings.AlertType) {
            case 'Alert':
                $.fn.AlertBasic(elem, settings);
                break;
            case 'AlertInput':
                $.fn.AlertInput(elem, settings);
                break;
            default:
                break;
        }

    };
    $.fn.AlertBasic = function (elem, settings) {

        var AlertHeader = "<span id='SpnAlertTitle'>" + settings.AlertTitle + "</span><a href='#' class='WndClose ridAlertClose'>x</a>";
        var ContentLeft = "<div  id='DivContentLeft'><img src='" + settings.AlertIcon + "' id='ImgAlertIcon'/></div>";
        var ContentRight = "<div  id='DivContentRight'><span id='SpnAlertMessage'>" + settings.AlertMessage;
        ContentRight += "</span></br></br><div id='BtnRidBlock'></div></div>";
        $("#DivRidAlertHeader")[0].innerHTML = AlertHeader;
        $("#DivRidAlertContent")[0].innerHTML = ContentLeft + ContentRight;
        $(".ridAlertClose").click(function () { $(elem).hide() });
        $.fn.AddButtons(elem, settings);
    };
  
    $.fn.AlertInput = function (elem, settings) {
        var AlertHeader = "<span id='SpnAlertTitle'>" + settings.AlertTitle + "</span><a href='#' class='WndClose ridAlertClose'>x</a>";
        var Content = "<div  id='DivAlertInputContent'></div>";
        Content += "<div id='BtnRidBlock'></div>";
        $("#DivRidAlertHeader")[0].innerHTML = AlertHeader;
        $("#DivRidAlertContent")[0].innerHTML = Content;
        settings.AlertInput.call(this, $("#DivAlertInputContent"));
        $.fn.AddButtons(elem, settings);
    }

    /*Code to Add buttons */
    $.fn.AddButtons = function (elem, settings) {
        var counter = 1;
        var btnClickArray = new Array();
        $(settings.buttons).each(function () {
            var button = "<a href='#' id='RidBtn" + counter + "' class='BtnRidAlert'>" + this.name + "</a>";
            $("#BtnRidBlock")[0].innerHTML += button;
            btnClickArray[counter] = this.BtnClick;
            counter++;
        });
        for (var i = 1; i < btnClickArray.length; i++) {
            btnClickArray[i].call(this, $('#RidBtn' + i), elem);
        }


    };

    /*Code to enable drag feature */
    $.fn.enableDrag = function (elem, settings) {

        if (settings.DragEnable == true) {
            $(elem).mousedown(function (e) {
                var posX = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX, posY = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;

                $(elem).addClass("ridDraggable");
                $(elem).on("mousemove", function (e) {
                    $(".ridDraggable").css({
                        "position": "absolute",
                        "left": e.pageX - posX,
                        "top": e.pageY - posY,
                        "z-index": "1000"
                    });
                }).on("mouseup", function () {
                    $(elem).removeClass("ridDraggable").css({
                        "z-index": "10"
                    });
                });

            });
        }

    };

} (jQuery));
