
(function (angular) {
    'use strict';

    angular.module('angular.sp.digest', []);
	
})(angular);

(function (angular) {
	
	var app = angular.module('angular.sp.digest');
	
	app.factory('RequestDigestIntervalService', ['$interval', 'RequestDigestService', function ($interval, RequestDigestService) {
				
				// 1440000 is every 24 minutes (the sp default)
				var _interval = _spFormDigestRefreshInterval || 1440000;
				
				var _site = "";

				function refresh() {

					window.__REQUESTDIGEST = window.__REQUESTDIGEST || {};

					RequestDigestService.getRequestDigest(_site)
						.then(function(digest){
							window.__REQUESTDIGEST[_site] = digest;
						});
				}

				//keeps the form digest refreshed across the app
				function _startInterval(site) {

					_site = site;

					$interval( function() {
						refresh();
					}, _interval);
				}
				
				refresh();

				return {
					startInterval: _startInterval
				};
			}
		]);
})(angular);

(function (angular) {
	
	var app = angular.module('angular.sp.digest');

	app.factory('RequestDigestService', ['$http', '$q', function ($http, $q) {

				//gets a new form digest asynchronously using REST
				function _getRequestDigest(site) {

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
						return response.data.d.GetContextWebInformation.FormDigestValue;
					});
				}

				return {
					getRequestDigest: _getRequestDigest
				};

			}
		]);

})(angular);
