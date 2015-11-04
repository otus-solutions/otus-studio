angular.module('Login', ['ngMaterial', 'ngMessages', 'ui.mask']).controller('LoginController', function ($scope, $http, $window) {
    var HTTP_POST_URL = window.location.origin + '/studio/session/rest/authentication/login';
    var HTTP_URL_LOGIN_SUCCESS = window.location.origin + '/studio/resources/otus-studio-app/session/home/home.html';

    $scope.authenticate = function (user) {
        $scope.invalidLogin = false;

        $http.post(HTTP_POST_URL, user).then(function (response) {

            if (response.data) {
                $window.location.href = HTTP_URL_LOGIN_SUCCESS;
                $scope.invalidLogin = false;
            }else{
                $scope.invalidLogin = true;
            }

        }, function (response) {
            console.log(response);
        });
    }
});