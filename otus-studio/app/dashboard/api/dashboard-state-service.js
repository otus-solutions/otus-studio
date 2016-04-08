(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .service('DashboardStateService', DashboardStateService);

    DashboardStateService.$inject = [
        '$location',
        '$http',
        '$window',
        'APP_STATE'
    ];

    function DashboardStateService($location, $http, $window, APP_STATE) {
        var self = this;

        /* Public interface */
        self.goToHome = goToLogin;
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
            $location.url(APP_STATE.LOGIN);
        }

        function goToHome() {
            self.currentState = 'Home';
            $location.url(APP_STATE.HOME);
        }

        function goToSurveyForms() {
            self.currentState = 'SurveyForms';
            $location.url(APP_STATE.SURVEY_FORMS);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $location.url(APP_STATE.EDITOR);
        }

        function logout() {
            $http.post(APP_STATE.LOGOUT).then(function(response) {
                if (response.data.data) {
                    $window.location.href = window.location.origin + '/otus-studio/';
                }
            });
        }
    }

}());
