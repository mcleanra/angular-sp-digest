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
