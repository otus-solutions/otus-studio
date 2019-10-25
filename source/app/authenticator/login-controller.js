(function() {
    'use strict';

    angular
        .module('studio.authenticator')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'DashboardStateService', 'AuthenticationService'];

    function LoginController($scope, DashboardStateService, AuthenticationService) {
        var self = this;
        self.authenticate = authenticate;
        self.visitAccess = visitAccess;

        function authenticate(user) {
            AuthenticationService.login(user);
        }

        function visitAccess() {
            DashboardStateService.goToFormTemplates();
        }
    }

}());
