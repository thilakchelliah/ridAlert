//4/24/2014-Test phase

( function($) {

		$.fn.ridAlert = function(options) {
			var settings = $.extend({
				AlertText : '',
				HeaderText : '',
				color : null,
				fontStyle : null
			}, options);

			return this.each(function() {
				$.fn.ridInit(this, settings);
				$.fn.ridText(this, settings);
				$.fn.enableDrag(this);
			});

		};

		$.fn.ridInit = function(elem, settings) { debugger;
			var headerDiv = "<div style='width:100%;height:20%;' id='ridAlertHeader'>" + settings.HeaderText + "<div>";
			var ContentDiv = "<div style='width:100%;height:80%;' id='ridAlertAlertText'>" + settings.AlertText + "<div>";
			$(elem).append(headerDiv + ContentDiv).addClass("ridDefaultStyle");
		};

		$.fn.ridText = function(elem, settings) {
			$(elem).append("<span>" + settings.text + "</span>");
		};

		$.fn.enableDrag = function(elem) {

			$(elem).mousedown(function(e) { debugger;
				var posX = e.offsetX === undefined ? e.originalEvent.layerX : e.offsetX, posY = e.offsetY === undefined ? e.originalEvent.layerY : e.offsetY;

				$(elem).addClass("ridDraggable");
				$(elem).on("mousemove", function(e) { debugger;
					$(".ridDraggable").css({
						"position" : "absolute",
						"left" : e.pageX - posX,
						"top" : e.pageY - posY,
						"z-index" : "1000"
					});
				}).on("mouseup", function() {
					$(elem).removeClass("ridDraggable").css({
						"z-index" : "10"
					});
				});

			});

		};

	}(jQuery));
