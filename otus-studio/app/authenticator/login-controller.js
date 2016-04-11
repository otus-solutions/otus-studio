(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$window', 'DashboardStateService'];

    function LoginController($scope, $http, $window, DashboardStateService) {

        var HTTP_POST_URL = window.location.origin + '/otus-domain-rest/session/rest/authentication/login';
        var HTTP_GET_IS_LOGGED = window.location.origin + '/otus-domain-rest/session/rest/authentication/isLogged';

        $scope.authenticate = function(user) {
            $scope.invalidLogin = false;

            $http.post(HTTP_POST_URL, user).then(function(response) {
                if (!response.data.hasErrors) {
                    $window.sessionStorage.userUUID = response.data.data;
                    $scope.invalidLogin = false;
                    DashboardStateService.goToHome();
                } else {
                    $scope.invalidLogin = true;
                }

            }, function(response) {
                console.log(response);
            });
        };

        $scope.visitAccess = function() {
            DashboardStateService.goToHome();
        };

    }

}());
