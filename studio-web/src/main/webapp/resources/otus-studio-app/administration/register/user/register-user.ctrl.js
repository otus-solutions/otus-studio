angular.module('RegisterUser', [ 'ngMaterial', 'ui.mask' ]).controller('RegisterUserCtrl', function($scope, $http, $window, $mdDialog) {
	
    $HTTP_POST_URL_VALIDATE = window.location.origin + '/session/rest/register/validade';
    $HTTP_POST_URL_CREATE = window.location.origin + '/session/rest/register/create';

    $scope.validateEmail = function(){
        $rootScope.$broadcast("clearMessagesEvent");

        $http.post($HTTP_POST_URL_VALIDATE, $scope.user).then(function (response){
            $scope.emailInUse = !response.data;
            $scope.register_form.email.$setValidity('emailInUse', response.data);
            $scope.register_form.$setValidity('emailInUse', response.data);
        });
    }
    
    $scope.register = function (user) {
    	$http.post($HTTP_POST_URL_CREATE, $scope.user).then(function (response){
    	    	confirmAlertToNavigate();
    	    })
     }

	$scope.matchPassword = function() {
		if ($scope.user.password && $scope.user.passwordConfirm) {
			if ($scope.user.password != $scope.user.passwordConfirm) {
				$scope.registerUserForm.password.$setValidity(
						'password', false);
				$scope.registerUserForm.$setValidity(
						'password', false);
			} else {
				$scope.registerUserForm.password.$setValidity(
						'password', true);
				$scope.registerUserForm.$setValidity(
						'password', true);
			}
		}
	}

	function confirmAlertRegister() {
		alert = $mdDialog.alert().title('Informação').content('Sua liberação esta pendente de aprovação').ok('ok');
	}

});
