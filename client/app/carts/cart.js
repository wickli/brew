(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires brewApp.cart.main
	 * @requires brewApp.cart.list
	 * @requires brewApp.cart.create
	 */
	angular
		.module('brewApp.cart', [
			'ngResource',
			'ui.router',
			'brewApp.cart.main',
			'brewApp.cart.list',
			'brewApp.cart.create'
		])
		.config(configCartRoutes);

	// inject configCartRoutes dependencies
	configCartRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract cart state with the cart template
	 * paired with the CartController as 'index'.
	 * The injectable 'carts' is resolved as a list of all carts
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configCartRoutes($urlRouterProvider, $stateProvider) {
		// The cart state configuration
		var cartState = {
			name: 'cart',
			url: '/carts',
			abstract: true,
			templateUrl: 'app/carts/cart.html',
			controller: 'CartController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/cart', '/cart/');
		$stateProvider.state(cartState);
	}

})();
