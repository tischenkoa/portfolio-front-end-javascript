'used strict'

function makeZoomable($rootGallery) {
	$rootGallery.on('click', 'img', makingLargeImg);
	$('img', $rootGallery).addClass('small-img');

	function makingLargeImg(event) {
		var srcLargeImg = $(event.target).attr('src').replace('img/small/', 'img/large/');
		var $conteinerLargeImg;
		var $largeImg;

		if ($('div').is('.large-img')) {
			$largeImg = $('img', '.large-img').attr({
				src: srcLargeImg
			});
			$('.background-shading').attr('style', 'display: block');
		} else {
			$('<div>', {
				class: 'background-shading'
			}).appendTo($('body'));
			$('.background-shading').attr('style', 'display: block');
			$conteinerLargeImg = $('<div>');
			$('<div>&#215</div>').addClass('close-large-img').appendTo($conteinerLargeImg);
			$conteinerLargeImg.attr('style', 'display: none');
			$conteinerLargeImg.addClass('large-img');
			$largeImg = $('<img>').attr({
				src: srcLargeImg
			});
			$largeImg.appendTo($conteinerLargeImg);
			$conteinerLargeImg.appendTo($('body'));
		}

		showLargeImg($largeImg);
	}


	function showLargeImg($img) {
		$img.on('load', function() {
			$(window).on('resize', function() {
				resizeLargeImg($img);
			});
			resizeLargeImg($img);
			closeLargeImg();
		});
	}

	function positionLargeImg($img, widthLargeImg, heightLargeImg) {
		var largeImgLeftMargin = ($(window).width() - widthLargeImg) / 2;
		var largeImgTopMargin = ($(window).height() - heightLargeImg) / 2;

		$('.large-img').attr('style', 'height:' + heightLargeImg + 'px; width:' + widthLargeImg + 'px; left:' + largeImgLeftMargin + 
			'px; top:' + largeImgTopMargin + 'px; display: block');

	}

	function resizeLargeImg($img, resizeWidthLargeImg, resizeHeightLargeImg) {

		var naturalWidthLargeImg = resizeWidthLargeImg || $img.prop('naturalWidth');
		var naturalHeightLargeImg = resizeHeightLargeImg || $img.prop('naturalHeight');
		var widthWindow = $(window).width();
		var heightWindow = $(window).height();
		var resizeIndex;

		if (naturalWidthLargeImg * 1.2 > widthWindow) {
			resizeWidthLargeImg = widthWindow * 0.8;
			resizeIndex = resizeWidthLargeImg / naturalWidthLargeImg;
			resizeHeightLargeImg = naturalHeightLargeImg * resizeIndex;
			return resizeLargeImg($img, resizeWidthLargeImg, resizeHeightLargeImg);
		} else {
			resizeWidthLargeImg = naturalWidthLargeImg;
		}

		if (naturalHeightLargeImg * 1.2 > heightWindow) {
			resizeHeightLargeImg = heightWindow * 0.8;
			resizeIndex = resizeHeightLargeImg / naturalHeightLargeImg;
			resizeWidthLargeImg = naturalWidthLargeImg * resizeIndex;
			return resizeLargeImg($img, resizeWidthLargeImg, resizeHeightLargeImg);
		} else {
			resizeHeightLargeImg = naturalHeightLargeImg;
		}
		return positionLargeImg($img, resizeWidthLargeImg, resizeHeightLargeImg);
	}

	function closeLargeImg() {
		CODE_ESC = 27;
		$('.close-large-img').on('click', hideBlock);
		$(window).on('keyup', function () {
			if(event.which === CODE_ESC) {
				hideBlock();
			}
			console.log(event.which);
		});
			function hideBlock() {
			$('.background-shading').attr('style', 'display: none');
			$('.large-img').attr('style', 'display: none');
		}
	}
}