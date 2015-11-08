(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires brewApp.mainMenu
	 */

	angular
		.module('brewApp.cart.main', [
			'ui.router',
			'brewApp.mainMenu'
		])
		.config(configCartMainRoutes);

	// inject configCartMainRoutes dependencies
	configCartMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the cart.main state with the list template for the
	 * 'main' view paired with the CartMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configCartMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'cart.main',
			parent: 'cart',
			url: '/',
			authenticate: true,
			role: 'user',
			views: {
				'@cart': {
					templateUrl: 'app/carts/main/main.html',
					controller: 'CartMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Carts',
			state: mainState.name,
			role: 'user'
		});
	}

})();
