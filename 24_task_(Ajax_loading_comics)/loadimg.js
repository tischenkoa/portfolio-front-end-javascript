// http://forum.jscourse.com/t/24-zadanie-ajax/825
// http://explosm.net/

 'used strict'
$(document).ready(function() {
	var comicsImgs;
	var elementNewComicsImgs;
	var $img;
	var lastComicImg;
	var amountLoadingComics = 2;
	var indexComics = 0;
	var hrefPreviousComic = [];
	var srcImgComic = [];
	var notLoadingNewImg = false;


	hrefPreviousComic[0] = $('.previous-comic').attr('href');

	$(document).scroll(function(eventObject) {

		if (notLoadingNewImg === false) {
			comicsImgs = $('#main-comic, #featured-comic, .load-comic');
			lastComicImg = comicsImgs.last();
			elementNewComicsImgs = $('<div>');

			if (hrefPreviousComic.length > amountLoadingComics) {
				hrefPreviousComic = hrefPreviousComic.slice(amountLoadingComics);
			}

			if (window.pageYOffset + window.innerHeight > lastComicImg.offset().top + lastComicImg.height()) {
				loadingNewComics();
				console.dir('Закрузить комикс');
			}
		}
	});



	function loadingNewComics() {
		if (indexComics === amountLoadingComics) {
			return indexComics = 0;
		}
		notLoadingNewImg = true;
		$.ajax({
			dataType: 'html',
			url: hrefPreviousComic[indexComics],
			success: function(html) {
				hrefPreviousComic[indexComics + 1] = $(html).find('.previous-comic').attr('href');
				srcImgComic[indexComics] = $(html).find('#main-comic, #featured-comic').attr('src');
				console.dir(srcImgComic[indexComics] + 'Закрузить комикс' + hrefPreviousComic[indexComics]);
				// debugger
				$img = $('<img>');
				$img.attr({
					src: srcImgComic[indexComics],
					class: 'load-comic',
				});
				$img.css({
					display: 'none'
				});

				$img.on('load', function() {
					$img.fadeIn(1500, function() {
						$img.addClass('load-img');
						notLoadingNewImg = false;
					});
				});

				elementNewComicsImgs.append($img);
				indexComics += 1;

				if (indexComics === amountLoadingComics) {
					lastComicImg.parent().append(elementNewComicsImgs);

				} else {
					loadingNewComics();
				}

			}
		});
	}
});