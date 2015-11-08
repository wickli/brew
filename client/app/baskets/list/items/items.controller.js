(function () {
	'use strict';

	/**
	 * Register the list controller as BasketItemsController
	 */

	angular
		.module('brewApp.basket.list.items')
		.controller('BasketItemsController', BasketItemsController);

	// add BasketItemsController dependencies to inject
	BasketItemsController.$inject = ['$state'];

	/**
	 * BasketItemsController constructor
	 */
	function BasketItemsController($state) {
		var vm = this;

		// the selected item id
		var curBasketId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} basket - The object to check for selection
		 */
		function isSelected(basket) {
			return curBasketId === basket._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} basket - The basket to edit
		 */
		function showInDetails(basket) {
			curBasketId = basket._id;
			$state.go('basket.list.detail', {'id': curBasketId});
		}
	}

})();
