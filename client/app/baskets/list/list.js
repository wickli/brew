(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires brewApp.socket
	 * @requires brewApp.mainMenu,
	 * @requires brewApp.toggleComponent,
	 * @requires brewApp.basket.list.detail
	 * @requires brewApp.basket.list.edit
	 * @requires brewApp.basket.list.items
	 */

	angular
		.module('brewApp.basket.list', [
			'ngMaterial',
			'ui.router',
			'brewApp.socket',
			'brewApp.mainMenu',
			'brewApp.toggleComponent',
			'brewApp.basket.list.detail',
			'brewApp.basket.list.edit',
			'brewApp.basket.list.items'
		])
		.config(configBasketListRoutes);

	// inject configBasketListRoutes dependencies
	configBasketListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the basket.list state with the list template fpr the
	 * 'main' view paired with the BasketListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configBasketListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'basket.list',
			parent: 'basket',
			url: '/list',
			authenticate: true,
			role: 'admin',
			resolve: {
				baskets:  resolveBaskets
			},
			views: {

				// target the unnamed view in the basket state
				'@basket': {
					templateUrl: 'app/baskets/list/list.html',
					controller: 'BasketListController',
					controllerAs: 'list'
				},

				// target the content view in the basket.list state
				'content@basket.list': {
					templateUrl: 'app/baskets/list/items/items.html',
					controller: 'BasketItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('basket.main', {
			name: 'Baskets List',
			state: listState.name
		});
	}

	// inject resolveBaskets dependencies
	resolveBaskets.$inject = ['Basket'];

	/**
	 * Resolve dependencies for the basket.list state
	 *
	 * @params {Basket} Basket - The service to query baskets
	 * @returns {Promise} A promise that, when fullfilled, returns an array of baskets
	 */
	function resolveBaskets(Basket) {
		return Basket.query().$promise;
	}

})();
