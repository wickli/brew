(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires brewApp.basket.main
	 * @requires brewApp.basket.list
	 * @requires brewApp.basket.create
	 */
	angular
		.module('brewApp.basket', [
			'ngResource',
			'ui.router',
			'brewApp.basket.main',
			'brewApp.basket.list',
			'brewApp.basket.create'
		])
		.config(configBasketRoutes);

	// inject configBasketRoutes dependencies
	configBasketRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract basket state with the basket template
	 * paired with the BasketController as 'index'.
	 * The injectable 'baskets' is resolved as a list of all baskets
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configBasketRoutes($urlRouterProvider, $stateProvider) {
		// The basket state configuration
		var basketState = {
			name: 'basket',
			url: '/baskets',
			abstract: true,
			templateUrl: 'app/baskets/basket.html',
			controller: 'BasketController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/basket', '/basket/');
		$stateProvider.state(basketState);
	}

})();
