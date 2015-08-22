$(document).ready(function() {
	var arrCostCupper = [];
	var allTotalCostCupper;

	var $tBody = $('tbody', '.table');
	var $tRowsTable = $('tr', '.table tbody');
	var $tHead = $('thead', '.table');

	var virtuatTable = [];

	$tRowsTable.each(function(indexRow) {
		var rowTable = [];
		rowTable.push(this);
		rowTable.push($('.name-product', this).text());

		virtuatTable.push(rowTable);
	});

	virtuatTable.forEach(recalcCost);

	$tBody.on('change', 'input', function(event) {
		var indexRow;
		virtuatTable.forEach(function(rowTable, index) {
			if (rowTable[0] === event.target.closest('tr')) {
				indexRow = index;
				return false;
			}
		});
		recalcCost(virtuatTable[indexRow]);
	});

	$tHead.on('click', 'span', function(event) {
		var indexCol = $('span', $tHead).index(event.target);
		var eventHeadCol = event.target.closest('th');
		var reversionSort;
		if ($(eventHeadCol).hasClass('sort'))
			if ($(eventHeadCol).hasClass('reversion-sort')) {
				$(eventHeadCol).removeClass('reversion-sort');
				reversionSort = false;
			} else {
				$(eventHeadCol).addClass('reversion-sort');
				reversionSort = true;
			} else {
			$('th', $tHead).removeClass('sort').removeClass('reversion-sort');
			$(eventHeadCol).addClass('sort');
			reversionSort = false;
		}

		sortTable(indexCol, reversionSort);
	});


	function recalcCost(rowTable) {
		var elemRow = rowTable[0];
		var costOfCupper;
		var quantityProduct = $(elemRow).find('.quantity').val();

		priceOfCupper = $(elemRow).find('.price-gold').val() * 10000 +
			$(elemRow).find('.price-silver').val() * 100 +
			$(elemRow).find('.price-copper').val() * 1;

		costOfCupper = quantityProduct * priceOfCupper;

		rowTable[2] = quantityProduct;
		rowTable[3] = priceOfCupper;
		rowTable[4] = costOfCupper;

		renderCoints(costOfCupper, elemRow, '.cost-gold', '.cost-silver', '.cost-copper');

		recalcTotalCost();
	}

	function recalcTotalCost() {
		allTotalCostCupper = virtuatTable.reduce(function(sum, current) {
			return sum + current[4];
		}, 0);

		renderCoints(allTotalCostCupper, '.table', '.total-cost-gold', '.total-cost-silver', '.total-cost-copper');
	}

	function renderCoints(allCupper, context, gold, silver, copper) {
		var costGold;
		var costSilver;
		var costCupper;

		if ($.isNumeric(allCupper)) {
			costGold = Math.floor(allCupper / 10000);
			costSilver = Math.floor((allCupper % 10000) / 100);
			costCupper = allCupper % 10000 % 100;
		} else {
			costGold = 0;
			costSilver = 0;
			costCupper = 0;

		}

		$(context).find(gold).text(costGold);
		$(context).find(silver).text(costSilver);
		$(context).find(copper).text(costCupper);
	}

	function sortTable(indexCol, reversionSort) {
		virtuatTable.sort(_sort);

		function _sort(a1, b1) {
			var a = a1[indexCol + 1];
			var b = b1[indexCol + 1];
			if (parseFloat(a) && parseFloat(b)) {
				return parseFloat(a) - parseFloat(b);
			} else {
				if (a.toLowerCase() < b.toLowerCase()) {
					return -1;
				} else if (a.toLowerCase() > b.toLowerCase()) {
					return 1;
				} else {
					return 0;
				}
			}
		}



		if (reversionSort) {
			virtuatTable.forEach(function(rowTable) {
				$(rowTable[0]).prependTo('.table tbody');
			});
		} else {
			virtuatTable.forEach(function(rowTable) {
				$(rowTable[0]).appendTo('.table tbody');
			});
		}

	}
});