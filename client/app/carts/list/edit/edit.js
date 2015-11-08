(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires brewApp.mongooseError
	 * @requires brewApp.cart.service
	 */

	angular
		.module('brewApp.cart.list.edit', [
			'ui.router',
			'ngMaterial',
			'brewApp.mongooseError',
			'brewApp.cart.service'
		])
		.config(configureCartListEdit);

	// inject configCartListEdit dependencies
	configureCartListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the cart.list.edit state with the edit template
	 * paired with the CartEditController as 'edit' for the
	 * 'detail@cart.list' view.
	 * 'cart' is resolved as the cart with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCartListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'cart.list.edit',
			parent: 'cart.list',
			url: '/edit/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterCartListEdit,
			views: {
				'detail@cart.list': {
					templateUrl: 'app/carts/list/edit/edit.html',
					controller: 'CartEditController',
					controllerAs: 'edit',
					resolve: {cart: resolveCartFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onCartListEditEnter dependencies
	onEnterCartListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the cart.list.detail state. Open the component
	 * registered with the component id 'cart.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterCartListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('cart.detailView').open();
		}
	}

	// inject resolveCartDetailRoute dependencies
	resolveCartFromArray.$inject = ['carts', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the cart.list.edit state. Get the cart
	 * from the injected Array of carts by using the '_id' property.
	 *
	 * @params {Array} carts - The array of carts
	 * @params {Object} $stateParams - The $stateParams to read the cart id from
	 * @params {Object} _ - The lodash service to find the requested cart
	 * @returns {Object|null} The cart whose value of the _id property equals $stateParams._id
	 */
	function resolveCartFromArray(carts, $stateParams, _) {
		//	return Cart.get({id: $stateParams.id}).$promise;
		return _.find(carts, {'_id': $stateParams.id});
	}

})();
