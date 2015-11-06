angular.module('Login', ['ngMaterial', 'ui.mask']).controller('LoginController', function($scope, $window){
    var HTTP_URL_REGISTER_PAGE = window.location.origin + '/studio/resources/otus-studio-app/administration/register/user/register-user.html';

	$scope.logar = function (user) {
		console.log($scope.user);
	}

    $scope.register = function (){
        $window.location.href = HTTP_URL_REGISTER_PAGE;
    }

});