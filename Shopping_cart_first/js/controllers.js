var shoppingCart = angular.module('shoppingCart', []);

shoppingCart.controller('shoppingCartList', function ShoppingCart($scope) {
	$scope.sellerBucket = [{
		'id': 1,
		'title': 'Product 1',
		'price': '10',
		'img': './img/kids_shoes_001.jpg'
	}, {
		'id': 2,
		'title': 'Product 2',
		'price': '12',
		'img': './img/kids_shoes_001.jpg'
	}, {
		'id': 3,
		'title': 'Product 3',
		'price': '21',
		'img': './img/kids_shoes_001.jpg'
	}, {
		'id': 4,
		'title': 'Product 4',
		'price': '33.3',
		'img': './img/kids_shoes_001.jpg'
	}, {
		'id': 5,
		'title': 'Product 5',
		'price': '15',
		'img': './img/kids_shoes_001.jpg'
	}];

	$scope.remove = function(item){
		var index = $scope.sellerBucket.indexOf(item);
		$scope.sellerBucket.splice(index, 1); 
	};

	$scope.orderPrice = function(orderPrice, item){
        return orderPrice + Number(item.price);
	};

	$scope.sendOrder = function(formOrder) {
		$scope.order = angular.copy(formOrder);

	};
});