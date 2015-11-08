	/**
	 * @ngdoc overview
	 * @name brewApp.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `brewApp.admin.user.list.items` module which provides:
	 *
	 * - {@link brewApp.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('brewApp.admin.user.list.items', [
			'ui.router',
			'brewApp.listImage'
		]);

})();
