(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {brewApp.mongooseError}
	 * @requires {brewApp.remoteUnique}
	 * @requires {brewApp.cart.service}
	 */

	angular
		.module('brewApp.cart.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'brewApp.mongooseError',
			'brewApp.remoteUnique',
			'brewApp.cart.service'
		])
		.config(configureCartCreateRoutes);

	// inject configCart.CreateRoutes dependencies
	configureCartCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'cart.list.create' state. The onEnterCartListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/carts/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCartCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'cart.list.create',
			parent: 'cart.list',
			url: '/create',
			authenticate: true,
			role: 'user',
			onEnter: onEnterCartListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the cart.list.create state.
	 * Open the create dialog
	 */

	onEnterCartListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterCartListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'CartCreateController',
			controllerAs: 'create',
			templateUrl: 'app/carts/create/create.html',
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
			return $state.transitionTo('cart.list');
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
