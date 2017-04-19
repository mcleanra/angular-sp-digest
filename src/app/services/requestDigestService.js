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
