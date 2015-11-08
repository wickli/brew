(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {brewApp.mongooseError}
	 * @requires {brewApp.remoteUnique}
	 * @requires {brewApp.basket.service}
	 */

	angular
		.module('brewApp.basket.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'brewApp.mongooseError',
			'brewApp.remoteUnique',
			'brewApp.basket.service'
		])
		.config(configureBasketCreateRoutes);

	// inject configBasket.CreateRoutes dependencies
	configureBasketCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'basket.list.create' state. The onEnterBasketListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/baskets/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureBasketCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'basket.list.create',
			parent: 'basket.list',
			url: '/create',
			authenticate: true,
			role: 'admin',
			onEnter: onEnterBasketListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the basket.list.create state.
	 * Open the create dialog
	 */

	onEnterBasketListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterBasketListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'BasketCreateController',
			controllerAs: 'create',
			templateUrl: 'app/baskets/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('basket.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
