(function () {
	'use strict';

	/**
	 * Register the list controller as BasketListController
	 */
	angular
		.module('brewApp.basket.list')
		.controller('BasketListController', BasketListController);

	// add BasketListController dependencies to inject
	BasketListController.$inject = ['$scope', 'socket', '$state', 'baskets', 'ToggleComponent'];

	/**
	 * BasketListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} baskets - The list of baskets resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function BasketListController($scope, socket, $state, baskets, ToggleComponent) {
		var vm = this;

		// the array of baskets
		vm.baskets = baskets;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('basket', vm.baskets);
			$scope.$on('$destroy', unsyncBasketUpdates);

			function unsyncBasketUpdates() {
				socket.unsyncUpdates('basket');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('basket.detailView').toggle();
		}
	}

})();
