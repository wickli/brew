(function () {
	'use strict';

	/**
	 * Register the list controller as CartItemsController
	 */

	angular
		.module('brewApp.cart.list.items')
		.controller('CartItemsController', CartItemsController);

	// add CartItemsController dependencies to inject
	CartItemsController.$inject = ['$state'];

	/**
	 * CartItemsController constructor
	 */
	function CartItemsController($state) {
		var vm = this;

		// the selected item id
		var curCartId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} cart - The object to check for selection
		 */
		function isSelected(cart) {
			return curCartId === cart._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} cart - The cart to edit
		 */
		function showInDetails(cart) {
			curCartId = cart._id;
			$state.go('cart.list.detail', {'id': curCartId});
		}
	}

})();
