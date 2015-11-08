(function () {
	'use strict';

	/**
	 * Introduce the brewApp.product.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires brewApp.mainMenu
	 */

	angular
		.module('brewApp.product.main', [
			'ui.router',
			'brewApp.mainMenu'
		])
		.config(configProductMainRoutes);

	// inject configProductMainRoutes dependencies
	configProductMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the product.main state with the list template for the
	 * 'main' view paired with the ProductMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configProductMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'product.main',
			parent: 'product',
			url: '/',
			views: {
				'@product': {
					templateUrl: 'app/products/main/main.html',
					controller: 'ProductMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Products',
			state: mainState.name
		});
	}

})();
