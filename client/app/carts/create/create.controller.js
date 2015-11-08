/**
 * @ngdoc controller
 * @name brewApp.cart.create.controller:CartCreateController
 * @description
 * Controller of the cart create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as CartCreateController
	 */

	angular
		.module('brewApp.cart.create')
		.controller('CartCreateController', CartCreateController);

	/**
	 * @ngdoc function
	 * @name brewApp.cart.create.provider:CartCreateController
	 * @description
	 * Provider of the {@link brewApp.cart.create.controller:CartCreateController CartCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Cart The Cart resource
	 * @param {Service} CartService The Cart service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link brewApp.cart.create.controller:CartCreateController CartCreateController}
	 */

	CartCreateController.$inject = ['$mdDialog', 'Cart', 'CartService', 'Toast'];

	function CartCreateController($mdDialog, Cart, CartService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name cart
		 * @propertyOf brewApp.cart.create.controller:CartCreateController
		 * @description
		 * The new cart data
		 *
		 * @returns {Object} The cart data
		 */
		vm.cart = new Cart();

		// view model bindings (documented below)
		vm.create = createCart;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createCart
		 * @methodOf brewApp.cart.create.controller:CartCreateController
		 * @description
		 * Create a new cart by using the CartService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createCart(form) {
			// refuse to work with invalid data
			if (vm.cart._id || (form && !form.$valid)) {
				return;
			}

			CartService.create(vm.cart)
				.then(createCartSuccess)
				.catch(createCartCatch);

			function createCartSuccess(newCart) {
				Toast.show({
					type: 'success',
					text: 'Cart ' + newCart.name + ' has been created',
					link: {state: 'cart.list.detail', params: {id: newCart._id}}
				});
				vm.close();
			}

			function createCartCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Cart'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf brewApp.cart.create.controller:CartCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf brewApp.cart.create.controller:CartCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
