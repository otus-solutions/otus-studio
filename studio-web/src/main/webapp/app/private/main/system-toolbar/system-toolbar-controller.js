(function() {
    'use strict';

    angular
        .module('studio.main')
        .controller('SystemToolbarController', SystemToolbarController);

    SystemToolbarController.$inject = [
        'NewSurveyFormDialogService',
        'SystemToolbarService',
        'APP_STATE'
    ];

    function SystemToolbarController(NewSurveyFormDialogService, SystemToolbarService, APP_STATE) {
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
            return SystemToolbarService.getSelectedSystemArea();
        }

        function openHome() {
            SystemToolbarService.openHome();
        }

        function openEditor() {
            NewSurveyFormDialogService.showDialog()
                .onConfirm(SystemToolbarService.openEditor);
        }

        function openCreateRepository() {
            SystemToolbarService.openCreateRepository();
        }

        function openConnectRepository() {
            SystemToolbarService.openConnectRepository();
        }

        function openUserManagement() {
            SystemToolbarService.openUserManagement();
        }

        function logout() {
            var alert = $mdDialog.confirm()
                .title('Sair')
                .content('Você tem certeza que deseja sair do sistema?')
                .ok('Confirmar')
                .cancel('Cancelar');

            $mdDialog
                .show(alert)
                .then(SystemToolbarService.logout);
        }
    }

}());
