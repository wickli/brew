(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires brewApp.mainMenu
	 */

	angular
		.module('brewApp.basket.main', [
			'ui.router',
			'brewApp.mainMenu'
		])
		.config(configBasketMainRoutes);

	// inject configBasketMainRoutes dependencies
	configBasketMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the basket.main state with the list template for the
	 * 'main' view paired with the BasketMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configBasketMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'basket.main',
			parent: 'basket',
			url: '/',
			authenticate: true,
			role: 'admin',
			views: {
				'@basket': {
					templateUrl: 'app/baskets/main/main.html',
					controller: 'BasketMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Baskets',
			state: mainState.name,
			role: 'admin'
		});
	}

})();
