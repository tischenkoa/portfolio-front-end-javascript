'used sctrict'
function SliderImg(rootSlider, srcImgs) {
	window.SliderImg = SliderImg;
	this.srcImgs = srcImgs;
	this.sliderStructurte = $('<div>', {
		class: 'slider'
	});

	$('<div>', {
		class: 'naviSlider'
	}).appendTo(this.sliderStructurte);

	$('<div>', {
		class: 'imgSlider'
	}).appendTo(this.sliderStructurte);

	for (var i = 0; i < 4; i++) {
		$('.naviSlider', this.sliderStructurte).append('<div>');
	}

	$('.naviSlider div:first', this.sliderStructurte).toggleClass('activ');

	$('.imgSlider', this.sliderStructurte).append('<div>');
	$('.imgSlider div', this.sliderStructurte).addClass('slideList');

	rootSlider.append(this.sliderStructurte);

	jQuery.each(this.srcImgs, function(index, srcImg) {
		$('.slideList', this.sliderStructurte).append('<div>');
		$('.slideList div:last', this.sliderStructurte).append('<img>');
		$('.slideList img:last', this.sliderStructurte).attr('src', srcImg);
	});

	$('.naviSlider', this.sliderStructurte).on('click', 'div', this.slidingImg.bind(this));

    this.intervalSlider = setInterval(this.slidingImgAuto, 2000);
}


SliderImg.prototype.slidingImg = function(event) {
	clearInterval(this.intervalSlider);
	clearInterval(this.timeoutSlider);
	console.dir(this.intervalSlider+' ' +this.timeoutSlider);
	var _this = this;
	$('.naviSlider div', this.sliderStructurte).removeClass('activ');
	$(event.target).addClass('activ');
	var indexClick = $(event.target).index();
	$('.slideList', this.sliderStructurte).stop().animate({
		right: '' + (indexClick * 910) + 'px'
	}, 500, function(){
		console.dir(_this);
		_this.timeoutSlider = setTimeout(function(){
			_this.intervalSlider = setInterval(_this.slidingImgAuto, 2000);
		}, 5000);
	});
};

SliderImg.prototype.slidingImgAuto = function() {
	var indexActiv = $('.activ').index();
	$('.naviSlider div', this.sliderStructurte).removeClass('activ');
	if (indexActiv === 3) {
		indexActiv = 0;
	} else {
		indexActiv += 1;
	}
	$('.naviSlider div').eq(indexActiv).addClass('activ');
	$('.slideList', this.sliderStructurte).stop().animate({
		right: '' + (indexActiv * 910) + 'px'
	}, 500);
};