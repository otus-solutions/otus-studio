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

    function DashboardMenuController(LogoutDialogService, DashboardStateService, $mdSidenav) {
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
            return DashboardStateService.currentState;
        }

        function open() {
            $mdSidenav('left').toggle();
        }

        function close() {
            $mdSidenav('left').close();
        }

        function openHome() {
            DashboardStateService.goToHome();
            close();
        }

        function openSurveyForms() {
            DashboardStateService.goToSurveyForms();
            close();
        }

        function openCreateRepository() {
            DashboardStateService.goToCreateRepository();
            close();
        }

        function openConnectRepository() {
            DashboardStateService.goToConnectRepository();
            close();
        }

        function openUserManagement() {
            DashboardStateService.goToUserManagement();
            close();
        }

        function logout() {
            LogoutDialogService.showDialog()
                .onConfirm(DashboardStateService.logout);
        }
    }

}());
