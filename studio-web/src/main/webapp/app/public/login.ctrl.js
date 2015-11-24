angular.module('Login', ['ngMaterial', 'ngMessages', 'ui.mask']).controller('LoginController', function($scope, $http, $window) {

    var HTTP_POST_URL = window.location.origin + '/studio/session/rest/authentication/login';
    var HTTP_URL_LOGIN_SUCCESS = window.location.origin + '/studio/app/private/index.html';
    var HTTP_URL_REGISTER_PAGE = window.location.origin + '/studio/app/public/user/register/user/register-user.html';

    $scope.authenticate = function(user) {
        $scope.invalidLogin = false;

        $http.post(HTTP_POST_URL, user).then(function(response) {

            if (response.data) {
                $window.location.href = HTTP_URL_LOGIN_SUCCESS;
                $scope.invalidLogin = false;
            } else {
                $scope.invalidLogin = true;
            }

        }, function(response) {
            console.log(response);
        });
    }

    $scope.register = function() {
        $window.location.href = HTTP_URL_REGISTER_PAGE;
    }

});
