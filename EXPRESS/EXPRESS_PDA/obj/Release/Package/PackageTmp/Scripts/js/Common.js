$(document).on('click', '.pop', function () {
    $('body').addClass('layer_on');
})

$(document).on('click', '#wrap .hamburger', function () {
	$('#wrap').addClass('on');
    $(this).children('img').css('right', '0');
	$('.lnb').fadeIn(300);
});


$(document).on('click', '.hamburger_box.on', function () {
    $(this).removeClass('on');
    $('.container').css('margin-left', '40px');
    $('.slide_menu').fadeOut(300);
    $('.hide_title').fadeOut(300);
});


/* 레이어팝업 */
var layerPopup = function (obj) {
	var $laybtn = $(obj),
		$glayer_zone = $(".layer_zone");
	if ($glayer_zone.length === 0) { return; }
	//$glayer_zone.hide()
	$("body").addClass("layer_on");;
	$laybtn.fadeIn(200);

	$glayer_zone.on("click", ".close", function (e) {
		var $this = $(this),
			$t_layer = $this.parents(".layer_zone");
		$("body").removeClass("layer_on");
		$t_layer.fadeOut(300);
	});
};

/* 레이어팝업 닫기 */
var layerClose = function (obj) {
	var $laybtn = $(obj);
	$("body").removeClass("layer_on");
	$laybtn.hide();
};
