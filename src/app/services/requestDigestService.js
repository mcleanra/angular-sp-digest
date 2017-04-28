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
