(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('brewApp')
		.config(configStartRoute);

	// inject configStartRoute dependencies
	configStartRoute.$inject = ['$stateProvider'];

	// route config function configuring the passed $stateProvider
	function configStartRoute($stateProvider) {
		$stateProvider
			.state('start', {
				url: '/start',
				templateUrl: 'app/start/start.html',
				controller: 'StartCtrl',
				controllerAs: 'vm'
		});
	}

})();
