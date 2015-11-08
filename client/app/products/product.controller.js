(function () {
	'use strict';

	// register the controller as ProductController
	angular
		.module('brewApp.product')
		.controller('ProductController', ProductController);

	// add ProductController dependencies to inject
	// ProductController.$inject = [];

	/**
	 * ProductController constructor. Main controller for the brewApp.product
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function ProductController() {
		// var vm = this;
	}

})();
