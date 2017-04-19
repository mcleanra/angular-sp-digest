
(function (angular) {
    'use strict';

    angular.module('angular.sp.digest', []);
	
})(angular);

(function (angular) {
	
	var app = angular.module('angular.sp.digest');
	
	app.factory('RequestDigestIntervalService', ['$interval', 'RequestDigestService', function ($interval, RequestDigestService) {
				
				// 1440000 is every 24 minutes (the sp default)
				var _interval = _spFormDigestRefreshInterval || 1440000;
				
				function refresh() {
					RequestDigestService.getRequestDigest()
						.then(function(digest){
							$("#__REQUESTDIGEST").val(digest);
						});
				}

				//keeps the form digest refreshed across the app
				function _startInterval() {
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
				function _getRequestDigest() {

					return $http({
						url: _spPageContextInfo.siteAbsoluteUrl + '/_api/contextinfo',
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

				//updates the form digest synchronously using the built-in SP functions (only when needed, by checking against the interval).  requires init.js
				function _updateFormDigest() {
					UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
				}

				return {
					getRequestDigest: _getRequestDigest,
					updateFormDigest: _updateFormDigest
				};

			}
		]);

})(angular);
