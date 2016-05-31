(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$window', 'DashboardStateService', 'RestResourceService', '$mdToast'];

    function LoginController($scope, $http, $window, DashboardStateService, RestResourceService, $mdToast) {

        $scope.authenticate = function(user) {
            RestResourceService.setHostname(user.domain);

            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                if (response.data) {
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Login Invalido!')
                    );
                }
            });
        };

        $scope.visitAccess = function() {
            DashboardStateService.goToHome();
        };
    }

}());
