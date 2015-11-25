angular.module('Repository').controller('RepositoryCtrl', function($scope, $http, $window) {

    /*
     * TO DEFINE
     */
    var END_POINT = '????';

    $scope.connect = function(repository) {
        console.log(repository);
        $scope.isLoading = true;

        $http.post(window.location.origin + END_POINT, repository).then(function(response) {
                alert("connectado");
                $scope.isLoading = false;
            },
            function(response) {
                alert("Erro: Entre em contato com a equipe de desenvolvimento.");
                $scope.isLoading = false;
            });
    };

});
