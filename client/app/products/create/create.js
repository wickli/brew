(function () {
	'use strict';

	/**
	 * Introduce the brewApp.product.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {brewApp.mongooseError}
	 * @requires {brewApp.remoteUnique}
	 * @requires {brewApp.product.service}
	 */

	angular
		.module('brewApp.product.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'brewApp.mongooseError',
			'brewApp.remoteUnique',
			'brewApp.product.service'
		])
		.config(configureProductCreateRoutes);

	// inject configProduct.CreateRoutes dependencies
	configureProductCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'product.list.create' state. The onEnterProductListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/products/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureProductCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'product.list.create',
			parent: 'product.list',
			url: '/create',
			onEnter: onEnterProductListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the product.list.create state.
	 * Open the create dialog
	 */

	onEnterProductListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterProductListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'ProductCreateController',
			controllerAs: 'create',
			templateUrl: 'app/products/create/create.html',
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
			return $state.transitionTo('product.list');
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
