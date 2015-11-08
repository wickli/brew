(function () {
	'use strict';

	/**
	 * Register the list controller as CartListController
	 */
	angular
		.module('brewApp.cart.list')
		.controller('CartListController', CartListController);

	// add CartListController dependencies to inject
	CartListController.$inject = ['$scope', 'socket', '$state', 'carts', 'ToggleComponent'];

	/**
	 * CartListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} carts - The list of carts resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function CartListController($scope, socket, $state, carts, ToggleComponent) {
		var vm = this;

		// the array of carts
		vm.carts = carts;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('cart', vm.carts);
			$scope.$on('$destroy', unsyncCartUpdates);

			function unsyncCartUpdates() {
				socket.unsyncUpdates('cart');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('cart.detailView').toggle();
		}
	}

})();
