(function () {
	'use strict';

	/**
	 * Register the edit controller as BasketDetailController
 	 */

	angular
		.module('brewApp.basket.list.detail')
		.controller('BasketDetailController', BasketDetailController);

	// add BasketDetailController dependencies to inject
	BasketDetailController.$inject = ['$state', 'basket'];

	/**
	 * BasketDetailController constructor
	 */
	function BasketDetailController($state, basket) {
		var vm = this;

		// the current basket to display
		vm.basket = basket;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current basket
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.basket._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
