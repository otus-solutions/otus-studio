angular.module('Login', ['ngMaterial', 'ngMessages', 'ui.mask']).controller('LoginController', function($scope, $http, $window) {

    var HTTP_POST_URL = window.location.origin + '/otus-domain-rest/session/rest/authentication/login';
    var HTTP_GET_SYSTEM_CONFIG_STATUS = window.location.origin + '/otus-domain-rest/session/rest/system/config/ready';
    var HTTP_GET_IS_LOGGED = window.location.origin + '/otus-domain-rest/session/rest/authentication/isLogged';

    var HTTP_URL_LOGIN_SUCCESS = window.location.origin + '/otus-studio/private/index.html';
    var HTTP_URL_REGISTER_PAGE = window.location.origin + '/otus-studio/public/user/register/user/register-user.html';
    var HTTP_URL_CONFIG_PAGE = window.location.origin + '/otus-studio/public/setting/register-adm.html';
    var HTTP_URL_HOME_PAGE = window.location.origin + '/otus-studio/private/index.html';


    $http.get(HTTP_GET_SYSTEM_CONFIG_STATUS).then(function(response) {

        if(!response.data.data){
            $window.location.href = HTTP_URL_CONFIG_PAGE;
        }else{

            $http.get(HTTP_GET_IS_LOGGED).then(function (response) {
                if(response.data.data){
                    $window.location.href = HTTP_URL_HOME_PAGE;
                }
            });
        }
    });

    $scope.authenticate = function(user) {
        $scope.invalidLogin = false;

        $http.post(HTTP_POST_URL, user).then(function(response) {
            if (!response.data.hasErrors) {
                $window.sessionStorage.userUUID = response.data.data;
                $window.location.href = HTTP_URL_LOGIN_SUCCESS;
                $scope.invalidLogin = false;
            } else {
                $scope.invalidLogin = true;
            }

        }, function(response) {
            console.log(response);
        });
    };

    $scope.register = function() {
        $window.location.href = HTTP_URL_REGISTER_PAGE;
    };

}).config(['$mdThemingProvider', function($mdThemingProvider){

	$mdThemingProvider.theme('layoutTheme')
		.primaryPalette('blue', {
		'default' : 'A200',
		'hue-1' : '200'
	}).accentPalette('blue-grey', {
		'default' : '900'
	}).warnPalette('red');


	$mdThemingProvider.theme('layoutTheme');
}]);
