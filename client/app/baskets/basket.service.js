(function () {
	'use strict';

	/**
	 * Introduce the brewApp.basket.service module.
	 * Register the basket resource as Basket, register the
	 * service as BasketService.
	 *
	 * @requires {brewApp.resource}
	 */
	angular
		.module('brewApp.basket.service', ['brewApp.resource'])
		.factory('Basket', Basket)
		.service('BasketService', BasketService);

	// add Basket dependencies to inject
	Basket.$inject = ['Resource'];

	/**
	 * Basket resource constructor
	 */
	function Basket($resource) {
		// factory members
		var apiURL = '/api/baskets';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add BasketService dependencies to inject
	BasketService.$inject = ['Basket'];

	/**
	 * BasketService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Basket The resource provided by brewApp.basket.resource
	 * @returns {Object} The service definition for the BasketService service
	 */
	function BasketService(Basket) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new basket
		 *
		 * @param  {Object}   basket - basketData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(basket, callback) {
			var cb = callback || angular.noop;

			return Basket.create(basket,
				function (basket) {
					return cb(basket);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a basket
		 *
		 * @param  {Object}   basket - basketData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(basket, callback) {
			var cb = callback || angular.noop;

			return Basket.remove({id: basket._id},
				function (basket) {
					return cb(basket);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new basket
		 *
		 * @param  {Object}   basket - basketData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(basket, callback) {
			var cb = callback || angular.noop;

			return Basket.update(basket,
				function (basket) {
					return cb(basket);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
