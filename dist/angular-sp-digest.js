
(function (angular) {
    'use strict';

    angular.module('angular.sp.digest', []);
	
})(angular);

(function (angular) {

	var app = angular.module('angular.sp.digest');

	app.service('RequestDigestCacheService', [
		function () {

			var _digest = {};

			function _get(site) {
				return _digest[site];
			}

			function _set(site, digest) {
				_digest[site] = digest;
			}

			return {
				get: _get,
				set: _set
			}
		}
	]);

})(angular);

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

					//start the interval
					_workers[site] = $interval(function () {
						RequestDigestService.get(site);
					}, _interval);
				}

				//get one right now and return the promise
				return RequestDigestService.get(site);
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

(function (angular) {

	var app = angular.module('angular.sp.digest');

	app.service('RequestDigestService', ['$http', 'RequestDigestCacheService',
		function ($http, RequestDigestCacheService) {

			//gets a new form digest asynchronously using REST
			function _get(site) {

				return $http({
					url: site + '/_api/contextinfo',
					method: 'POST',
					data: '',
					headers: {
						"Accept": "application/json; odata=verbose",
						"Content-Type": "application/json; odata=verbose"
					}
				})
					.then(function (response) {
						var digest = response.data.d.GetContextWebInformation.FormDigestValue;
						RequestDigestCacheService.set(site, digest);
						return digest;
					});
			}

			return {
				get: _get
			};
		}
	]);

})(angular);
