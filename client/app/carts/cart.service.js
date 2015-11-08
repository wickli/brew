(function () {
	'use strict';

	/**
	 * Introduce the brewApp.cart.service module.
	 * Register the cart resource as Cart, register the
	 * service as CartService.
	 *
	 * @requires {brewApp.resource}
	 */
	angular
		.module('brewApp.cart.service', ['brewApp.resource'])
		.factory('Cart', Cart)
		.service('CartService', CartService);

	// add Cart dependencies to inject
	Cart.$inject = ['Resource'];

	/**
	 * Cart resource constructor
	 */
	function Cart($resource) {
		// factory members
		var apiURL = '/api/carts';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add CartService dependencies to inject
	CartService.$inject = ['Cart'];

	/**
	 * CartService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Cart The resource provided by brewApp.cart.resource
	 * @returns {Object} The service definition for the CartService service
	 */
	function CartService(Cart) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new cart
		 *
		 * @param  {Object}   cart - cartData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(cart, callback) {
			var cb = callback || angular.noop;

			return Cart.create(cart,
				function (cart) {
					return cb(cart);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a cart
		 *
		 * @param  {Object}   cart - cartData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(cart, callback) {
			var cb = callback || angular.noop;

			return Cart.remove({id: cart._id},
				function (cart) {
					return cb(cart);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new cart
		 *
		 * @param  {Object}   cart - cartData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(cart, callback) {
			var cb = callback || angular.noop;

			return Cart.update(cart,
				function (cart) {
					return cb(cart);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
