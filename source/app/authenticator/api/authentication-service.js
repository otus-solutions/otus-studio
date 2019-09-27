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
            LogoutDialogService.showDialog()
                .onConfirm(function() {
                    invalidateSession(RestResourceService);
                });
        }

        function invalidateSession(domainRestResourceService) {
            var authenticatorResource = domainRestResourceService.getAuthenticatorResource();

            if (!domainRestResourceService.isLogged()) {
                invalidateSessionVisitant();
            } else {
                invalidateSessionLoggedUser(authenticatorResource);
            }
        }

        function invalidateSessionLoggedUser(authenticatorResource) {
            authenticatorResource.invalidate(function(response) {
                DashboardStateService.logout();
                $window.sessionStorage.clear();
            });
        }

        function invalidateSessionVisitant() {
            $window.sessionStorage.clear();
            DashboardStateService.logout();
        }

        function login(user) {
            RestResourceService.setUrl(user.domain);
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
