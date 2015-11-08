/**
 * @ngdoc controller
 * @name brewAppcart.list.edit.controller:CartEditController
 * @description
 * Controller of the cart edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as CartEditController
	 */

	angular
		.module('brewApp.cart.list.edit')
		.controller('CartEditController', CartEditController);

	/**
	 * @ngdoc function
	 * @name brewAppcart.list.edit.provider:CartEditController
	 * @description
	 * Provider of the {@link brewAppcart.list.edit.controller:CartEditController CartEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} CartService The CartService to use
	 * @param {Resource} cart The cart data to use
	 */

	CartEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'CartService', 'cart'];

	function CartEditController($state, $stateParams, $mdDialog, Toast, CartService, cart) {
		var vm = this;

		// defaults
		vm.cart = angular.copy(cart, vm.cart);
		vm.displayName = cart.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current cart
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.cart._id});
		}

		/**
		 * Open the cart list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a cart by using the CartService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.cart._id || form && !form.$valid) {
				return;
			}

			CartService.update(vm.cart)
				.then(updateCartSuccess)
				.catch(updateCartCatch);

			function updateCartSuccess(updatedCart) {
				// update the display name after successful save
				vm.displayName = updatedCart.name;
				Toast.show({text: 'Cart ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateCartCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Cart ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the cart if she wants to delete the current selected cart.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete cart ' + vm.displayName + '?')
				.content('Do you really want to delete cart ' + vm.displayName + '?')
				.ariaLabel('Delete cart')
				.ok('Delete cart')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a cart by using the CartService remove method
			 * @api private
			 */
			function performRemove() {
				CartService.remove(vm.cart)
					.then(deleteCartSuccess)
					.catch(deleteCartCatch);

				function deleteCartSuccess() {
					Toast.show({type: 'success', text: 'Cart ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteCartCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting cart ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}
	}
})();
