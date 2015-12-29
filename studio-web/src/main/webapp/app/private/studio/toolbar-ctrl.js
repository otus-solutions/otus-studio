angular
    .module('StudioApp')
    .controller('ToolbarCtrl', ['$scope', '$location',
        function($scope, $location) {

            var USER_MANAGEMENT_STATE = 'user-management';
            var REPOSITORY_CONNECT_STATE = 'repository?actionType=CONNECT';
            var REPOSITORY_NEW_STATE = 'repository?actionType=NEW';
            var HOME = 'home';

            $scope.openHome = function (){
                $location.url(HOME);
            };

            $scope.openAdministrationUsers = function() {
                $location.url(USER_MANAGEMENT_STATE);
            };

            $scope.openConnectRepository = function() {
                $location.url(REPOSITORY_CONNECT_STATE);
                $scope.pageMessage = "Adição de Repositório existente";
            };

            $scope.openNewRepository = function() {
            	$location.url(REPOSITORY_NEW_STATE);
            };

            $scope.loadPageHeaderMessage = function (){
                var url = $location.url();

                if(angular.equals(url, "/home") || !url){
                    $scope.pageMessage = "Edição de Formulário";
                }

                if(angular.equals(url, "/repository?actionType=NEW")){
                    $scope.pageMessage = "Criação de novo Repositório";
                }

                if(angular.equals(url, "/repository?actionType=CONNECT")){
                    $scope.pageMessage = "Adição de Repositório existente";
                }

                if(angular.equals(url, "/user-management")){
                    $scope.pageMessage = "Administração de Usuários";
                }
            }

            $scope.loadPageHeaderMessage();

        }

    ]);
