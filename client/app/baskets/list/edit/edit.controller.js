/**
 * @ngdoc controller
 * @name brewAppbasket.list.edit.controller:BasketEditController
 * @description
 * Controller of the basket edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as BasketEditController
	 */

	angular
		.module('brewApp.basket.list.edit')
		.controller('BasketEditController', BasketEditController);

	/**
	 * @ngdoc function
	 * @name brewAppbasket.list.edit.provider:BasketEditController
	 * @description
	 * Provider of the {@link brewAppbasket.list.edit.controller:BasketEditController BasketEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} $mdDialog The dialog service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} BasketService The BasketService to use
	 * @param {Resource} basket The basket data to use
	 */

	BasketEditController.$inject = ['$state', '$stateParams', '$mdDialog', 'Toast', 'BasketService', 'basket'];

	function BasketEditController($state, $stateParams, $mdDialog, Toast, BasketService, basket) {
		var vm = this;

		// defaults
		vm.basket = angular.copy(basket, vm.basket);
		vm.displayName = basket.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current basket
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.basket._id});
		}

		/**
		 * Open the basket list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a basket by using the BasketService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.basket._id || form && !form.$valid) {
				return;
			}

			BasketService.update(vm.basket)
				.then(updateBasketSuccess)
				.catch(updateBasketCatch);

			function updateBasketSuccess(updatedBasket) {
				// update the display name after successful save
				vm.displayName = updatedBasket.name;
				Toast.show({text: 'Basket ' + vm.displayName + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateBasketCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating Basket ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the basket if she wants to delete the current selected basket.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete basket ' + vm.displayName + '?')
				.content('Do you really want to delete basket ' + vm.displayName + '?')
				.ariaLabel('Delete basket')
				.ok('Delete basket')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a basket by using the BasketService remove method
			 * @api private
			 */
			function performRemove() {
				BasketService.remove(vm.basket)
					.then(deleteBasketSuccess)
					.catch(deleteBasketCatch);

				function deleteBasketSuccess() {
					Toast.show({type: 'success', text: 'Basket ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteBasketCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting basket ' + vm.displayName,
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
