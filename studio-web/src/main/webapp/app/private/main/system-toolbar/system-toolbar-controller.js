(function() {
    'use strict';

    angular
        .module('studio.main')
        .controller('SystemToolbarController', SystemToolbarController);

    SystemToolbarController.$inject = [
        'NewSurveyFormDialogService',
        'LogoutDialogService',
        'ApplicationStateService',
        'SurveyEditorService'
    ];

    function SystemToolbarController(NewSurveyFormDialogService, LogoutDialogService, ApplicationStateService, SurveyEditorService) {
        var self = this;

        /* Public interface */
        self.getSelectedSystemArea = getSelectedSystemArea;
        self.openHome = openHome;
        self.openEditor = openEditor;
        self.openCreateRepository = openCreateRepository;
        self.openConnectRepository = openConnectRepository;
        self.openUserManagement = openUserManagement;
        self.logout = logout;

        function getSelectedSystemArea() {
            return ApplicationStateService.currentState;
        }

        function openHome() {
            ApplicationStateService.goToHome();
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
