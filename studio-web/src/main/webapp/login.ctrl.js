angular.module('Login', ['ngMaterial', 'ui.mask']).controller('LoginController', function($scope){
	
	$scope.logar = function (user) {
		console.log($scope.user);
	}
	
});