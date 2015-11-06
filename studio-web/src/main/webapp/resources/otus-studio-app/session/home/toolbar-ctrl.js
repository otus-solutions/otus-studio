angular.module('Home', ['ngMaterial', 'ui.mask']).controller('ToolbarCtrl', function ($scope, $window){
    var HTTP_URL_ADMINISTRATION_USERS = window.location.origin + '/studio/resources/otus-studio-app/session/users/users.html';

    $scope.openAdministrationUsers = function (){
        $window.location.href = HTTP_URL_ADMINISTRATION_USERS;
    }
});
