(function () {
	'use strict';

	// register the controller as BasketController
	angular
		.module('brewApp.basket')
		.controller('BasketController', BasketController);

	// add BasketController dependencies to inject
	// BasketController.$inject = [];

	/**
	 * BasketController constructor. Main controller for the brewApp.basket
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function BasketController() {
		// var vm = this;
	}

})();
