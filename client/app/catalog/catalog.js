(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('brewApp')
		.config(configCatalogRoute);

	// inject configCatalogRoute dependencies
	configCatalogRoute.$inject = ['$stateProvider'];

	// route config function configuring the passed $stateProvider
	function configCatalogRoute($stateProvider) {
		$stateProvider
			.state('catalog', {
				url: '/catalog',
				templateUrl: 'app/catalog/catalog.html',
				controller: 'CatalogCtrl',
				controllerAs: 'vm'
		});
	}

})();
