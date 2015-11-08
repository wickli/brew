(function () {
	'use strict';

	/**
	 * Register the list controller as BasketMainController
	 */

	angular
		.module('brewApp.basket.main')
		.controller('BasketMainController', BasketMainController);

	// add BasketMainController dependencies to inject
	BasketMainController.$inject = ['$state'];

	/**
	 * BasketMainController constructor
	 */
	function BasketMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the basket.list state
		 */
		function showList() {
			$state.go('basket.list');
		}
	}

})();
