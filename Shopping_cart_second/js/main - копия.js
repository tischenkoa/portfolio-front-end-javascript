$(document).ready(function() {
	var arrCostCupper = [];
	var allTotalCostCupper;

	var $tBody = $('tr', '.table tbody');

	var virtuatTable = [];

	$tBody.each(function(indexRow) {
		// $(this).children()
			var rowTable = [];
			rowTable.push($(this));
			rowTable.push($(this).children().text());
			console.log($('td', this).text());
			virtuatTable.push(rowTable);
	});



	$tBody.each(recalcCost);
	$tBody.on('change', 'input', function(event){
		$(event.target.closest('tr')).each(recalcCost);
	})

	function recalcCost(index) {
		arrCostCupper[index] = $(this).find('.quantity').val() *
			($(this).find('.price-gold').val() * 10000 +
				$(this).find('.price-silver').val() * 100 +
				$(this).find('.price-copper').val() * 1);

		renderCoints(arrCostCupper[index], this, '.cost-gold', '.cost-silver', '.cost-copper');

		recalcTotalCost();
	}

	function recalcTotalCost() {
		allTotalCostCupper = arrCostCupper.reduce(function(sum, current){
			return sum + current
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
});