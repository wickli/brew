(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires brewApp.mongooseError
	 * @requires brewApp.basket.service
	 */

	angular
		.module('brewApp.basket.list.edit', [
			'ui.router',
			'ngMaterial',
			'brewApp.mongooseError',
			'brewApp.basket.service'
		])
		.config(configureBasketListEdit);

	// inject configBasketListEdit dependencies
	configureBasketListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the basket.list.edit state with the edit template
	 * paired with the BasketEditController as 'edit' for the
	 * 'detail@basket.list' view.
	 * 'basket' is resolved as the basket with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureBasketListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'basket.list.edit',
			parent: 'basket.list',
			url: '/edit/:id',
			authenticate: true,
			role: 'admin',
			onEnter: onEnterBasketListEdit,
			views: {
				'detail@basket.list': {
					templateUrl: 'app/baskets/list/edit/edit.html',
					controller: 'BasketEditController',
					controllerAs: 'edit',
					resolve: {basket: resolveBasketFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onBasketListEditEnter dependencies
	onEnterBasketListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the basket.list.detail state. Open the component
	 * registered with the component id 'basket.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterBasketListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('basket.detailView').open();
		}
	}

	// inject resolveBasketDetailRoute dependencies
	resolveBasketFromArray.$inject = ['baskets', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the basket.list.edit state. Get the basket
	 * from the injected Array of baskets by using the '_id' property.
	 *
	 * @params {Array} baskets - The array of baskets
	 * @params {Object} $stateParams - The $stateParams to read the basket id from
	 * @params {Object} _ - The lodash service to find the requested basket
	 * @returns {Object|null} The basket whose value of the _id property equals $stateParams._id
	 */
	function resolveBasketFromArray(baskets, $stateParams, _) {
		//	return Basket.get({id: $stateParams.id}).$promise;
		return _.find(baskets, {'_id': $stateParams.id});
	}

})();
