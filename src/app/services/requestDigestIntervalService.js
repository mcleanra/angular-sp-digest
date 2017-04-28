(function (angular) {

	var app = angular.module('angular.sp.digest');

	app.service('RequestDigestIntervalService', ['$interval', 'RequestDigestService',
		function ($interval, RequestDigestService) {

			// 1440000 is every 24 minutes (the sp default)
			var _interval = 1440000;
			var _workers = {};

			function _setRefreshInterval(interval) {
				_interval = interval;
			}

			//starts a new interval for this site
			function _start(site) {
				if (!_workers[site]) {
					
					//get and cache one right now
					RequestDigestService.get(site);

					//start the interval
					_workers[site] = $interval(function () {
						RequestDigestService.get(site);
					}, _interval);
				}
			}

			//stops getting a digest for a site
			function _stop(site) {
				if( _workers[site] ) {
					$interval.cancel(_workers[site]);
				}
			}

			return {
				setRefreshInterval: _setRefreshInterval,
				start: _start,
				stop: _stop
			};
		}
	]);
})(angular);
