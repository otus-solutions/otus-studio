(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        'APP_STATE'
    ];

    function DashboardStateService($location, $http, APP_STATE) {
        var self = this;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToFormTemplates = goToFormTemplates;
        self.goToEditor = goToEditor;
        self.logout = logout;

        init();

        function init() {
            self.currentState = 'Home';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $location.url(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $location.url(APP_STATE.HOME);
        }

        function goToFormTemplates() {
            self.currentState = 'FormTemplates';
            $location.url(APP_STATE.FORM_TEMPLATES);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $location.url(APP_STATE.EDITOR);
        }

        function logout() {
            $http.post(APP_STATE.LOGOUT).then(function(response) {
                if (response.data.data) {
                    goToLogin();
                }
            });
        }
    }

}());
