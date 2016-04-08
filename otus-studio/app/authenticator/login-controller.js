(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$window'];

    function LoginController($scope, $http, $window) {

        var HTTP_POST_URL = window.location.origin + '/otus-domain-rest/session/rest/authentication/login';
        var HTTP_GET_IS_LOGGED = window.location.origin + '/otus-domain-rest/session/rest/authentication/isLogged';

        var HTTP_URL_LOGIN_SUCCESS = window.location.origin + '/otus-studio/app/index.html';
        var HTTP_URL_HOME_PAGE = window.location.origin + '/otus-studio/app/index.html';

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

        $scope.visitAccess = function() {
            console.log(HTTP_URL_HOME_PAGE);
            $window.location.href = HTTP_URL_HOME_PAGE;
        };

    }

}());
