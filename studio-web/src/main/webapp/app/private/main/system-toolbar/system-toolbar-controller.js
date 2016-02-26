(function() {
    'use strict';

    angular
        .module('studio.main')
        .controller('SystemToolbarController', SystemToolbarController);

    SystemToolbarController.$inject = [
        'NewSurveyFormDialogService',
        'LogoutDialogService',
        'ApplicationStateService',
        'SurveyEditorService',
        '$mdSidenav'
    ];

    function SystemToolbarController(NewSurveyFormDialogService, LogoutDialogService, ApplicationStateService, SurveyEditorService, $mdSidenav) {
        var self = this;

        /* Public interface */
        self.getSelectedSystemArea = getSelectedSystemArea;
        self.open = open;
        self.close = close;
        self.openHome = openHome;
        self.openSurveyForms = openSurveyForms;
        self.openEditor = openEditor;
        self.openCreateRepository = openCreateRepository;
        self.openConnectRepository = openConnectRepository;
        self.openUserManagement = openUserManagement;
        self.logout = logout;

        function getSelectedSystemArea() {
            return ApplicationStateService.currentState;
        }

        function open() {
            $mdSidenav('left').toggle();
        }

        function close() {
            $mdSidenav('left').close();
        }

        function openHome() {
            ApplicationStateService.goToHome();
        }

        function openSurveyForms() {
            ApplicationStateService.goToSurveyForms();
        }

        function openEditor() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(function onConfirm() {
                    SurveyEditorService.startEditor();
                    ApplicationStateService.goToEditor();
                });
        }

        function openCreateRepository() {
            ApplicationStateService.goToCreateRepository();
        }

        function openConnectRepository() {
            ApplicationStateService.goToConnectRepository();
        }

        function openUserManagement() {
            ApplicationStateService.goToUserManagement();
        }

        function logout() {
            LogoutDialogService.showDialog()
                .onConfirm(ApplicationStateService.logout);
        }
    }

}());
