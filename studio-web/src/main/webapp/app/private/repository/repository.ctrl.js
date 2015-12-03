angular.module('Repository').controller('RepositoryCtrl', function ($scope, $http, $location, $mdDialog) {
    var CREATE_REPOSITORY = window.location.origin + '/studio/session/rest/repository/create';
    var ADD_REPOSITORY = window.location.origin + '/studio/session/rest/repository/add';
    var GET_REPOSITORY = window.location.origin + '/studio/session/rest/repository/get';
    var CHECK_CONNECTION_REPOSITORY = window.location.origin + '/studio/session/rest/repository/connectionStatus';
    var SUCCESS_MESSAGE = 'Repositório adicionado com sucesso.';
    var REPOSITORY_ADD_ACTION = 'ADD';
    var REPOSITORY_CREATE_ACTION = 'CREATE';

    $scope.actionType = $location.search().actionType;

    buttonStateWaiting();

    $scope.actionButton = function (repository) {
        buttonStateValidation();

        $http.post(CHECK_CONNECTION_REPOSITORY, repository).then(function (response) {
            if (response.data.data) {
                if (angular.equals($scope.actionType, REPOSITORY_ADD_ACTION)) {
                    addRepository(repository);

                } else if (angular.equals($scope.actionType, REPOSITORY_CREATE_ACTION)) {
                    console.log('CRIANDO');
                }
            } else {
                $scope.repositoryForm.host.$setValidity('connection', false);
                $scope.repositoryForm.$setValidity('connection', false);
            }
        });

        buttonStateWaiting();
    };

    $scope.existRepository = function (repository) {
        $http.get(GET_REPOSITORY, {
            params: {
                repositoryName: repository.name
            }
        }).then(function (response) {
            if (!response.data.data) {
                validateExisRepository(true);

            } else {
                validateExisRepository(false);
            }
        });
    };

    function validateExisRepository(valid) {
        $scope.repositoryForm.name.$setValidity('nameInUse', valid);
        $scope.repositoryForm.$setValidity('nameInUse', valid);

    }

    function addRepository(repository) {
        buttonStateAdding();

        $http.post(CREATE_REPOSITORY, repository).then(function (response) {
            buttonStateWaiting();

            if (response.data.data) {
                successMessage();
            }
        });
    };

    function buttonStateWaiting() {
        $scope.connectButton = 'Adicionar';
        $scope.isLoading = false;
    };

    function buttonStateValidation() {
        $scope.connectButton = 'Validando ...';
        $scope.isLoading = true;
    };

    function buttonStateAdding() {
        $scope.connectButton = 'Conectando ...';
        $scope.isLoading = true;
    };

    function successMessage() {
        alert = $mdDialog.alert()
            .title('Informação')
            .content(SUCCESS_MESSAGE)
            .ok('ok');

        $mdDialog.show(alert)
            .finally(function () {
                $scope.repository = null;
                $scope.repositoryForm.$setUntouched();
            });
    }
});
