(function () {
	'use strict';

	/**
	 * Register the list controller as CartMainController
	 */

	angular
		.module('brewApp.cart.main')
		.controller('CartMainController', CartMainController);

	// add CartMainController dependencies to inject
	CartMainController.$inject = ['$state'];

	/**
	 * CartMainController constructor
	 */
	function CartMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the cart.list state
		 */
		function showList() {
			$state.go('cart.list');
		}
	}

})();
