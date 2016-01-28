describe('Controller: home-ctrl', function() {

	var $http, $rootScope, $scope, $controller, $httpBackend;

	beforeEach(function() {

		module('Home');

		inject(function($rootScope, $httpBackend) {
			$rootScope = $rootScope;
			$scope = $rootScope.$new(); // create a new scope
			$controller = $controller;

			/*
			 * Mock into http
			 */
			 $httpBackend.expectGET("/studio/session/rest/register/loggedUser")
			 .respond({});
		});

	});

	it('verify is logged', function() {
		var $scope = {};

		/*
		 * $httpBackend.expectGET("/studio/session/rest/register/loggedUser")
		 * .sucess(function(data) { $scope.valid = true; $scope.response = data;
		 * }).error(function(data) { $scope.valid = false; })
		 */

	});
});