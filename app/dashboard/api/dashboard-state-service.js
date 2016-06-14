(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$state',
        '$http',
        'APP_STATE'
    ];

    function DashboardStateService($state, $http, APP_STATE) {
        var self = this;

        /* Public interface */
        self.goToLogin = goToLogin;
        self.goToHome = goToHome;
        self.goToSurveyForms = goToSurveyForms;
        self.goToEditor = goToEditor;
        self.logout = logout;

        init();

        function init() {
            self.currentState = 'Home';
        }

        function goToLogin() {
            self.currentState = 'Login';
            $state.go(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $state.go(APP_STATE.HOME);
        }

        function goToSurveyForms() {
            self.currentState = 'SurveyForms';
            $state.go(APP_STATE.SURVEY_FORMS);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR);
        }

        function logout() {
            goToLogin();
        }
    }

}());
