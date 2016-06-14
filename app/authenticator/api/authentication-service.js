(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .service('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['LogoutDialogService',
        'DashboardStateService',
        'RestResourceService',
        '$mdToast',
        '$window'
    ];

    function AuthenticationService(LogoutDialogService, DashboardStateService, RestResourceService, $mdToast, $window) {
        var LOGIN_ERROR_MESSAGE = 'Login Inválido! Verifique os dados informados.';
        var self = this;
        self.logout = logout;
        self.login = login;

        function logout() {
            var authenticatorResource = RestResourceService.getAuthenticatorResource();
            LogoutDialogService.showDialog()
                .onConfirm(function() {
                    authenticatorResource.invalidate(function(response) {
                        $window.sessionStorage.clear();
                        DashboardStateService.logout();
                    });
                });
        }

        function login(user) {
            RestResourceService.setHostname(user.domain);
            var authenticatorResource = RestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                RestResourceService.setSecurityToken(response.data);

                if (!response.hasErrors) {
                    DashboardStateService.goToHome();
                } else {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(LOGIN_ERROR_MESSAGE)
                    );
                }
            });
        }
    }

}());
