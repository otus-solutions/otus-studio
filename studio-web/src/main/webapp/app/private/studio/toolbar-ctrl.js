angular
    .module('StudioApp')
    .controller('ToolbarCtrl', ['$scope', '$location', 'StudioEditingService', '$mdDialog', '$window', '$http',
        function ($scope, $location, StudioEditingService, $mdDialog, $window, $http) {

            var NEW_SURVEY = 'container';
            var USER_MANAGEMENT_STATE = 'user-management';
            var REPOSITORY_CONNECT_STATE = 'repository?actionType=CONNECT';
            var REPOSITORY_NEW_STATE = 'repository?actionType=NEW';
            var HOME = 'home';
            var LOGOUT_RESOURCE_URL = '/studio/session/rest/authentication/logout';

            $scope.logout = function (){
                alert = $mdDialog.confirm()
                    .title('Sair')
                    .content('Você tem certeza que deseja sair do sistema? ')
                    .ok('ok')
                    .cancel('cancel');

                $mdDialog
                    .show(alert)
                    .then(function () {
                        $http.post(LOGOUT_RESOURCE_URL).then(function(response) {
                            if(response.data.data){
                                $window.location.href = window.location.origin + '/studio/'
                            }
                        });
                    });
            };

            $scope.openContainer = function () {
                $location.url(NEW_SURVEY);
                StudioEditingService.createNewSurvey();
            };

            $scope.openHome = function () {
                $location.url(HOME);
            };

            $scope.openAdministrationUsers = function () {
                $location.url(USER_MANAGEMENT_STATE);
            };

            $scope.openConnectRepository = function () {
                $location.url(REPOSITORY_CONNECT_STATE);
            };

            $scope.openNewRepository = function () {
                $location.url(REPOSITORY_NEW_STATE);
            };

            $scope.loadPageHeaderMessage = function () {
                var url = $location.url();

                if (angular.equals(url, "/home") || !url) {
                    $scope.pageMessage = "Edição de Formulário";
                }

                if (angular.equals(url, "/repository?actionType=NEW")) {
                    $scope.pageMessage = "Criação de novo Repositório";
                }

                if (angular.equals(url, "/repository?actionType=CONNECT")) {
                    $scope.pageMessage = "Adição de Repositório existente";
                }

                if (angular.equals(url, "/user-management")) {
                    $scope.pageMessage = "Administração de Usuários";
                }

                if (angular.equals(url, "/container")) {
                    $scope.pageMessage = "Edição de Formulário";
                }
            }

            $scope.loadPageHeaderMessage();
        }
    ]);
