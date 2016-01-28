describe('Controller: home-ctrl', function() {

	var $http, $rootScope, $scope, $controller, $httpBackend;

	beforeEach(function() {

		module('main');

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

	/*it('verify user is Admin', function() {
		var $scope = {};

		/*
		 * $httpBackend.expectGET("/studio/session/rest/register/loggedUser")
		 * .sucess(function(data) { $scope.valid = true; $scope.response = data;
		 * }).error(function(data) { $scope.valid = false; })
		 */
		
		/*var controller = $controller('HomeController', {
			$scope: $scope
		});
		expect($scope.isAdmin).toBe(true);
	});
	*/
});