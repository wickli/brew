(function () {
	'use strict';

	// register the controller as CatalogCtrl
	angular
		.module('brewApp')
		.controller('CatalogCtrl', CatalogCtrl);

	// add CatalogCtrl dependencies to inject
	// CatalogCtrl.$inject = ['$scope'];

	/**
	 * CatalogCtrl constructor
 	 */
	function CatalogCtrl() {
		var vm = this;

		// view model bindings
		vm.title = 'catalog';
		vm.doSomething = doSomething;

		// view model implementations
		function doSomething() {
			return [vm.title, 'a sublime controller'].join(' - ');
		}
	}

})();
