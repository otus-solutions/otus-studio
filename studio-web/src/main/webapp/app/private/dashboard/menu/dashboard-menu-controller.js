(function() {
    'use strict';

    angular
        .module('studio.dashboard')
        .controller('DashboardMenuController', DashboardMenuController);

    DashboardMenuController.$inject = [
        'LogoutDialogService',
        'DashboardStateService',
        '$mdSidenav'
    ];

    function DashboardMenuController(LogoutDialogService, ApplicationStateService, $mdSidenav) {
        var self = this;

        /* Public interface */
        self.getSelectedSystemArea = getSelectedSystemArea;
        self.open = open;
        self.close = close;
        self.openHome = openHome;
        self.openSurveyForms = openSurveyForms;
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
            close();
        }

        function openSurveyForms() {
            ApplicationStateService.goToSurveyForms();
            close();
        }

        function openCreateRepository() {
            ApplicationStateService.goToCreateRepository();
            close();
        }

        function openConnectRepository() {
            ApplicationStateService.goToConnectRepository();
            close();
        }

        function openUserManagement() {
            ApplicationStateService.goToUserManagement();
            close();
        }

        function logout() {
            LogoutDialogService.showDialog()
                .onConfirm(ApplicationStateService.logout);
        }
    }

}());
