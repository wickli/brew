(function () {
	'use strict';

	// register the controller as StartCtrl
	angular
		.module('brewApp')
		.controller('StartCtrl', StartCtrl);

	// add StartCtrl dependencies to inject
	// StartCtrl.$inject = ['$scope'];

	/**
	 * StartCtrl constructor
 	 */
	function StartCtrl() {
		var vm = this;

		// view model bindings
		vm.title = 'start';
		vm.doSomething = doSomething;

		// view model implementations
		function doSomething() {
			return [vm.title, 'a sublime controller'].join(' - ');
		}
	}

})();
