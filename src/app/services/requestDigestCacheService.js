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
