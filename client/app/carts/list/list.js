(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires brewApp.socket
	 * @requires brewApp.mainMenu,
	 * @requires brewApp.toggleComponent,
	 * @requires brewApp.cart.list.detail
	 * @requires brewApp.cart.list.edit
	 * @requires brewApp.cart.list.items
	 */

	angular
		.module('brewApp.cart.list', [
			'ngMaterial',
			'ui.router',
			'brewApp.socket',
			'brewApp.mainMenu',
			'brewApp.toggleComponent',
			'brewApp.cart.list.detail',
			'brewApp.cart.list.edit',
			'brewApp.cart.list.items'
		])
		.config(configCartListRoutes);

	// inject configCartListRoutes dependencies
	configCartListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the cart.list state with the list template fpr the
	 * 'main' view paired with the CartListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configCartListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'cart.list',
			parent: 'cart',
			url: '/list',
			authenticate: true,
			role: 'user',
			resolve: {
				carts:  resolveCarts
			},
			views: {

				// target the unnamed view in the cart state
				'@cart': {
					templateUrl: 'app/carts/list/list.html',
					controller: 'CartListController',
					controllerAs: 'list'
				},

				// target the content view in the cart.list state
				'content@cart.list': {
					templateUrl: 'app/carts/list/items/items.html',
					controller: 'CartItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('cart.main', {
			name: 'Carts List',
			state: listState.name
		});
	}

	// inject resolveCarts dependencies
	resolveCarts.$inject = ['Cart'];

	/**
	 * Resolve dependencies for the cart.list state
	 *
	 * @params {Cart} Cart - The service to query carts
	 * @returns {Promise} A promise that, when fullfilled, returns an array of carts
	 */
	function resolveCarts(Cart) {
		return Cart.query().$promise;
	}

})();
