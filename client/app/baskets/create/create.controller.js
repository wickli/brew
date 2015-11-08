/**
 * @ngdoc controller
 * @name brewApp.basket.create.controller:BasketCreateController
 * @description
 * Controller of the basket create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as BasketCreateController
	 */

	angular
		.module('brewApp.basket.create')
		.controller('BasketCreateController', BasketCreateController);

	/**
	 * @ngdoc function
	 * @name brewApp.basket.create.provider:BasketCreateController
	 * @description
	 * Provider of the {@link brewApp.basket.create.controller:BasketCreateController BasketCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Basket The Basket resource
	 * @param {Service} BasketService The Basket service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link brewApp.basket.create.controller:BasketCreateController BasketCreateController}
	 */

	BasketCreateController.$inject = ['$mdDialog', 'Basket', 'BasketService', 'Toast'];

	function BasketCreateController($mdDialog, Basket, BasketService, Toast) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name basket
		 * @propertyOf brewApp.basket.create.controller:BasketCreateController
		 * @description
		 * The new basket data
		 *
		 * @returns {Object} The basket data
		 */
		vm.basket = new Basket();

		// view model bindings (documented below)
		vm.create = createBasket;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name createBasket
		 * @methodOf brewApp.basket.create.controller:BasketCreateController
		 * @description
		 * Create a new basket by using the BasketService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createBasket(form) {
			// refuse to work with invalid data
			if (vm.basket._id || (form && !form.$valid)) {
				return;
			}

			BasketService.create(vm.basket)
				.then(createBasketSuccess)
				.catch(createBasketCatch);

			function createBasketSuccess(newBasket) {
				Toast.show({
					type: 'success',
					text: 'Basket ' + newBasket.name + ' has been created',
					link: {state: 'basket.list.detail', params: {id: newBasket._id}}
				});
				vm.close();
			}

			function createBasketCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating a new Basket'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf brewApp.basket.create.controller:BasketCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf brewApp.basket.create.controller:BasketCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
