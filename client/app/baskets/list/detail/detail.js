(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('brewApp.basket.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureBasketListDetail);

	// inject configBasketRoutes dependencies
	configureBasketListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'basket.detail' state with the detail template
	 * paired with the BasketDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'basket' is resolved as the basket with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureBasketListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'basket.list.detail',
			parent: 'basket.list',
			url: '/:id',
			authenticate: true,
			role: 'admin',
			onEnter: onEnterBasketListDetail,
			views: {
				'detail@basket.list': {
					templateUrl: 'app/baskets/list/detail/detail.html',
					controller: 'BasketDetailController',
					controllerAs: 'detail',
					resolve: {basket: resolveBasketFromArray}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onBasketListDetailEnter dependencies
	onEnterBasketListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the basket.list.detail state. Open the component
	 * registered with the component id 'basket.detailView'.
	 *
 	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterBasketListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('basket.detailView').open();
		}
	}

	// inject resolveBasketFromArray dependencies
	resolveBasketFromArray.$inject = ['baskets', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the basket.detail state
	 *
	 * @params {Array} baskets - The array of baskets
	 * @params {Object} $stateParams - The $stateParams to read the basket id from
	 * @returns {Object|null} The basket whose value of the _id property equals $stateParams._id
	 */
	function resolveBasketFromArray(baskets, $stateParams, _) {
		return _.find(baskets, {'_id': $stateParams.id});
	}

})();
