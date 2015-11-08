(function () {
	'use strict';

	/**
	 * Introduce the brewApp.product module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires brewApp.product.main
	 * @requires brewApp.product.list
	 * @requires brewApp.product.create
	 */
	angular
		.module('brewApp.product', [
			'ngResource',
			'ui.router',
			'brewApp.product.main',
			'brewApp.product.list',
			'brewApp.product.create'
		])
		.config(configProductRoutes);

	// inject configProductRoutes dependencies
	configProductRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract product state with the product template
	 * paired with the ProductController as 'index'.
	 * The injectable 'products' is resolved as a list of all products
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configProductRoutes($urlRouterProvider, $stateProvider) {
		// The product state configuration
		var productState = {
			name: 'product',
			url: '/products',
			abstract: true,
			templateUrl: 'app/products/product.html',
			controller: 'ProductController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/product', '/product/');
		$stateProvider.state(productState);
	}

})();
