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
