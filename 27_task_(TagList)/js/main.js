'used strict'
function TagList (rootTagList, defaultTagList) {
	window.TagList = TagList;
	this.rootTagList = rootTagList;
	this.TagList = defaultTagList;
	this.createTagList();
	this._initialiseEventsTagList();
}
	
TagList.prototype.createTagList = function(){
	this.nodeTagList = $('<div>').addClass('tag-list-widget well').appendTo(this.rootTagList);
	$('<button class="btn next view-edit-tag-list">Редактирование Тег-лист</button>'+
        '<div class="tag-list-area"></div>'+
        '<div class="edit-tag-list btn-toolbar row hide">'+
            '<div class="col-xs-8">'+
                '<div class="input-group">'+
                    '<input class="form-control" type="text">'+
                    '<span class="input-group-btn"><button class="btn btn-success">Добавить</button></span>'+
                '</div>'+
            '</div>'+
            '<div class="col-xs-4">'+
                '<button class="btn btn-danger">Удалить все Теги</button>'+
            '</div>'+
        '</div>').appendTo(this.nodeTagList);
	for (var i = 0; i < this.TagList.length; i++) {
		this.addTagToList(this.TagList[i]);
	}
};

TagList.prototype._initialiseEventsTagList = function() {
	var CODE_KEY_ENTER = 13;
	var _this = this;
	this.nodeTagList.on('click', function(event) {
		if ($(event.target).hasClass('view-edit-tag-list')) {
			if ($('.edit-tag-list', _this.nodeTagList).hasClass('hide')) {
				$(event.target).text('Завершить редактирование Тег-лист');
			} else {
				$(event.target).text('Редактирование Тег-лист');
			}
			$('.edit-tag-list, .close-tag', _this.nodeTagList).toggleClass('hide');
		}

		if ($(event.target).hasClass('btn-success')) {
			_this._addTag();
		}

		if ($(event.target).hasClass('btn-danger')) {
			_this.removeAllTagList();
		}

		if ($(event.target).hasClass('close-tag')) {
			_this.removeTagWithList($(event.target));
		}
	});

	$('.form-control', _this.nodeTagList).keydown(function(event) {
		if (event.keyCode === CODE_KEY_ENTER) {
			_this._addTag();
		}
	});
};


TagList.prototype.removeAllTagList = function() {
	$('.tag-list-area', this.nodeTagList).children().remove();
	this.TagList = [];
};

TagList.prototype.removeTagWithList = function(target) {
	var nodeRemoveTag = target.parent();
	var removeTag = nodeRemoveTag.text();
	removeTag = removeTag.slice(0,-1);
	this.TagList.splice( $.inArray(removeTag, this.TagList), 1 );
	target.parent().remove();
};

TagList.prototype.addTagToList = function(newAddTag) {
	return $('<span class="label label-info">' + newAddTag +
		'<a class="close-tag hide">&#x2716</a></span>').appendTo($('.tag-list-area', this.nodeTagList));
};

TagList.prototype._addTag = function() {
	this.newTag = $('.form-control', this.nodeTagList).val();
	this.newTag = $.trim(this.newTag);
	if ($.inArray(this.newTag, this.TagList) === -1 && this.newTag !== '') {
		this.nodeNewTag = this.addTagToList(this.newTag);
		$('.close-tag', this.nodeTagList).removeClass('hide');
		this.TagList.push(this.newTag);
	}
	$('.form-control').val('');
};