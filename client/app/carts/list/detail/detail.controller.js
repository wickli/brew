(function () {
	'use strict';

	/**
	 * Register the edit controller as CartDetailController
 	 */

	angular
		.module('brewApp.cart.list.detail')
		.controller('CartDetailController', CartDetailController);

	// add CartDetailController dependencies to inject
	CartDetailController.$inject = ['$state', 'cart'];

	/**
	 * CartDetailController constructor
	 */
	function CartDetailController($state, cart) {
		var vm = this;

		// the current cart to display
		vm.cart = cart;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current cart
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.cart._id});
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
