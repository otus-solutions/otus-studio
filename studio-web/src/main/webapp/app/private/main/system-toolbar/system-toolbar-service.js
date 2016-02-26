(function() {
    'use strict';

    angular
        .module('studio.main')
        .service('SystemToolbarService', SystemToolbarService);

    SystemToolbarService.$inject = [
        '$location',
        '$window',
        '$http',
        'WorkspaceService',
        'APP_STATE'
    ];

    function SystemToolbarService($location, $window, $http, WorkspaceService, APP_STATE) {
        var self = this,
            selectedSystemArea = null;

        /* Public interface */
        self.getSelectedSystemArea = getSelectedSystemArea;
        self.openHome = openHome;
        self.openEditor = openEditor;
        self.openCreateRepository = openCreateRepository;
        self.openConnectRepository = openConnectRepository;
        self.openUserManagement = openUserManagement;
        self.logout = logout;

        function getSelectedSystemArea() {
            return selectedSystemArea;
        }

        function openHome() {
            selectedSystemArea = 'Home';
            $location.url(APP_STATE.HOME);
        }

        function openEditor() {
            selectedSystemArea = 'Edição de Formulário';
            $location.url(APP_STATE.EDITOR);
            WorkspaceService.initializeWorkspace({
                owner: 'user'
            });
            WorkspaceService.startNewProject();
            console.log(WorkspaceService.workspace);
        }

        function openCreateRepository() {
            selectedSystemArea = 'Criação de novo Repositório';
            $location.url(APP_STATE.CREATE_REPOSITORY);
        }

        function openConnectRepository() {
            selectedSystemArea = 'Adição de Repositório existente';
            $location.url(APP_STATE.CONNECT_REPOSITORY);
        }

        function openUserManagement() {
            selectedSystemArea = 'Administração de Usuários';
            $location.url(APP_STATE.USER_MANAGEMENT);
        }

        function logout() {
            $http.post(APP_STATE.LOGOUT).then(function(response) {
                if (response.data.data) {
                    $window.location.href = window.location.origin + '/studio/';
                }
            });
        }
    }

}());
