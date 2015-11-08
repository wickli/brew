(function () {
	'use strict';

	// register the controller as CartController
	angular
		.module('brewApp.cart')
		.controller('CartController', CartController);

	// add CartController dependencies to inject
	// CartController.$inject = [];

	/**
	 * CartController constructor. Main controller for the brewApp.cart
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function CartController() {
		// var vm = this;
	}

})();
