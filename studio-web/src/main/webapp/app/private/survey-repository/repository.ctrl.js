(function() {


    angular
        .module('Repository')
        .controller('RepositoryCtrl', RepositoryCtrl);

    RepositoryCtrl.$inject = ['$scope', '$http', '$location', '$mdDialog', '$rootScope', 'RepositoryService'];

    function RepositoryCtrl($scope, $http, $location, $mdDialog, $rootScope, RepositoryService) {

        var NEW_REPOSITORY = window.location.origin + '/studio/session/rest/repository/create';
        var CONNECT_REPOSITORY = window.location.origin + '/studio/session/rest/repository/connect';
        var GET_REPOSITORY = window.location.origin + '/studio/session/rest/repository/get';
        var CHECK_CONNECTION_REPOSITORY = window.location.origin + '/studio/session/rest/repository/validate/connection';
        var CHECK_NAME_DATABASE = window.location.origin + '/studio/session/rest/repository/validate/database';
        var REPOSITORIES = window.location.origin + '/studio/session/rest/repository';
        var SUCCESS_MESSAGE = 'Repositório adicionado com sucesso.';
        var REPOSITORY_CONNECT_ACTION = 'CONNECT';
        var REPOSITORY_CREATE_ACTION = 'NEW';

        init();

        var self = this;

        $scope.pageMessage = angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION) ? "Criação de Repositório" : "Adição de Repositório";
        self.connected = connected;

        $scope.actionButton = function(repository) {
            if (angular.equals($scope.actionType, REPOSITORY_CONNECT_ACTION)) {
                connectRepository(repository);

            } else if (angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION)) {
                createRepository(repository);
            }
        }

        function connectRepository(repository) {
            $http.post(CONNECT_REPOSITORY, repository).then(function(response) {
                if (response.data.data) {
                    successMessage();
                }
            });
        }

        function createRepository(repository) {
            $http.post(NEW_REPOSITORY, repository).then(function(response) {
                if (response.data.data) {
                    getRepositories();
                    successMessage();
                }
            });
        }

        function connected() {
            return RepositoryService.connectedRepository;
        }

        $scope.setRepository = function(name) {
            RepositoryService.updateConnectedRepository(name);
        }

        $scope.validateDatabase = function validateDatabase(repository) {
            if ($scope.repository.database && $scope.repository.host && $scope.repository.port) {

                $http.post(CHECK_CONNECTION_REPOSITORY, repository).then(function(response) {
                    var validationConnection = response.data.data;
                    validateRepositoryConnection(validationConnection);

                    if (validationConnection) {
                        $http.post(CHECK_NAME_DATABASE, repository).then(function(response) {
                            validateExistDatabase(!response.data.data);
                        });
                    }
                });

            }
        }

        $scope.existRepository = function(repository) {
            $http.get(GET_REPOSITORY, {
                params: {
                    repositoryName: repository.name
                }
            }).then(function(response) {
                if (!response.data.data) {
                    validateExistRepository(true);

                } else {
                    validateExistRepository(false);
                }
            });
        }

        function init() {
            $scope.connectedRepository = RepositoryService.connectedRepository;
            getRepositories();

            $scope.actionType = $location.search().actionType;
        }

        function getRepositories() {
            $http.get(REPOSITORIES)
                .success(function(data) {
                    $rootScope.repositories = data;
                })
                .error(function(data) {
                    console.log('Erro + ', data)
                });
        }

        function validateExistRepository(valid) {
            $scope.repositoryForm.name.$setValidity('repositoryNameInUse', valid);
            $scope.repositoryForm.$setValidity('repositoryNameInUse', valid);
        }

        function validateRepositoryConnection(valid) {
            $scope.repositoryForm.host.$setValidity('connection', valid);
            $scope.repositoryForm.$setValidity('connection', valid);
        }

        function validateExistDatabase(valid) {
            $scope.repositoryForm.database.$setValidity('databaseAlreadyExist', valid);
            $scope.repositoryForm.$setValidity('databaseAlreadyExist', valid);
        }


        function successMessage() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content(SUCCESS_MESSAGE)
                .ok('ok');

            $mdDialog.show(alert)
                .finally(function() {
                    $scope.repository = null;
                    $scope.repositoryForm.$setUntouched();
                });
        }
    }

}());
