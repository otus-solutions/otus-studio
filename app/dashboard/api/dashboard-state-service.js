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
        self.goToFormTemplates = goToFormTemplates;
        self.goToEditor = goToEditor;
        self.goToPreview = goToPreview;
        self.logout = logout;
        self.goToEditorWithSurveyTemplate = goToEditorWithSurveyTemplate;

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

        function goToFormTemplates() {
            self.currentState = 'SurveyTemplates';
            $state.go(APP_STATE.SURVEY_TEMPLATES);
        }

        function goToEditor() {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR);
        }

        function goToPreview() {
            self.currentState = 'Preview de Formulário';
            $state.go(APP_STATE.PREVIEW);
        }

        function goToEditorWithSurveyTemplate(surveyTemplate) {
            self.currentState = 'Edição de Formulário';
            $state.go(APP_STATE.EDITOR, {
                template: surveyTemplate
            });
        }

        function logout() {
            goToLogin();
        }
    }

}());
