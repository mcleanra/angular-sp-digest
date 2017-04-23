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
