(function() {
    var KEY_ESCAPE_CODE = 27;

    function topWalker(node, testFunc, lastParent) {
        while (node && node !== lastParent) {
            if (testFunc(node)) {
                return node;
            }
            node = node.parentNode;
        }
    }

    function ContextMenu(node, structMenu) {
        this.rootNode = node;
        this.menu = this._createListMenu(structMenu);
        document.body.appendChild(this.menu);
        this.rootNode.addEventListener('contextmenu', this.show.bind(this), false);
        document.documentElement.addEventListener('click', this._clickOutsideMenu.bind(this), false);
        document.documentElement.addEventListener('keyup', this._keyupGlobal.bind(this), false);
        if(!ContextMenu.menus){
        	ContextMenu.menus = [];
        }
        ContextMenu.menus.push(this);
    }

    ContextMenu.prototype._createListMenu = function(structure) {
        var res = document.createElement("ul");
        res.className = "context-menu";
        var itemNodeMenu;
        var markerSabMenu;
        for (var i = 0; i < structure.length; i++) {
            itemNodeMenu = document.createElement("li");
            if (structure[i].submenu) {
                itemNodeMenu.innerText = structure[i].title;
                markerSabMenu = document.createElement('span');
                markerSabMenu.innerText = '►';
                itemNodeMenu.appendChild(markerSabMenu);
                itemNodeMenu.classList.add("context-menu-submenu");
                itemNodeMenu.addEventListener('mouseenter', this._showSubMenu.bind(this), false);
                itemNodeMenu.addEventListener('mouseleave', this._hideSubMenu.bind(this), false);
                itemNodeMenu.appendChild(this._createListMenu(structure[i].submenu));
            } else {
                itemNodeMenu.innerText = structure[i].title;
                itemNodeMenu.addEventListener("click", structure[i].action, false);
            }
            res.appendChild(itemNodeMenu);
        }
        return res;
    };

    ContextMenu.prototype._showSubMenu = function(event) {
        event.target.querySelector('ul').style.display = "block";
    };

    ContextMenu.prototype._hideSubMenu = function(event) {
        event.target.querySelector('ul').style.display = "none";
    };

    ContextMenu.prototype.show = function(event) {
        event.preventDefault();
        ContextMenu.menus.forEach(function (InstanseMenu){
        	InstanseMenu.hide();
        });
        this.menu.style.display = "block";
        this.menu.style.left = event.pageX + "px";
        this.menu.style.top = event.pageY + "px";
    };

    ContextMenu.prototype._clickOutsideMenu = function(event){
    	var menu = this.menu;
    	if(!topWalker(event.target, function(node) {
    		return menu ===node;
    	})) {
    		this.hide();
    	}
    };

    ContextMenu.prototype._keyupGlobal = function(event){
    	if (event.keyCode === KEY_ESCAPE_CODE) {
    		this.menu.style.display = "none";
    	}
    };

    ContextMenu.prototype.hide = function() {
    	this.menu.style.display = "none";
    };

    window.ContextMenu = ContextMenu;
})();
