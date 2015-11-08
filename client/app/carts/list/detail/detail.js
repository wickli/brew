(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('brewApp.cart.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureCartListDetail);

	// inject configCartRoutes dependencies
	configureCartListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'cart.detail' state with the detail template
	 * paired with the CartDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'cart' is resolved as the cart with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCartListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'cart.list.detail',
			parent: 'cart.list',
			url: '/:id',
			authenticate: true,
			role: 'user',
			onEnter: onEnterCartListDetail,
			views: {
				'detail@cart.list': {
					templateUrl: 'app/carts/list/detail/detail.html',
					controller: 'CartDetailController',
					controllerAs: 'detail',
					resolve: {cart: resolveCartFromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onCartListDetailEnter dependencies
	onEnterCartListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the cart.list.detail state. Open the component
	 * registered with the component id 'cart.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterCartListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('cart.detailView').open();
		}
	}

	// inject resolveCartFromArray dependencies
	resolveCartFromArray.$inject = ['carts', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the cart.detail state
	 *
	 * @params {Array} carts - The array of carts
	 * @params {Object} $stateParams - The $stateParams to read the cart id from
	 * @returns {Object|null} The cart whose value of the _id property equals $stateParams._id
	 */
	function resolveCartFromArray(carts, $stateParams, _) {
		return _.find(carts, {'_id': $stateParams.id});
	}

})();
