angular.module('Users').controller('UsersCtrl', function($http, $scope, $filter){

    $scope.users = [];
    $scope.users.disabledUsers = [] ;
    $scope.users.activedUsers = [] ;

    var URL_GET_USERS = window.location.origin + '/studio/session/rest/administration/users/fetch';
    var URL_DISABLE_USERS = window.location.origin + '/studio/session/rest/administration/users/disable';
    var URL_ACTIVATE_USERS = window.location.origin + '/studio/session/rest/administration/users/disable';

    $http.get(URL_GET_USERS).then(function (response){
        $scope.users.disabledUsers = response.data.disabledUsers;
        $scope.users.activedUsers = response.data.activedUsers;
    });

    $scope.enableUsers = function(){
        var disabledUserForActivation = filterSelected($scope.users.disabledUsers);

        if(!disabledUserForActivation.length){
            $http.post(URL_ACTIVATE_USERS, disabledUserForActivation).then(function (response){
            });
        }
    }

    $scope.disableUsers = function(){
        var enableUserForDisable = filterSelected($scope.users.activedUsers);

        if(!enableUserForDisable.length){
            $http.post(URL_DISABLE_USERS, enableUserForDisable).then(function (response){
            });
        }
    }

    function filterSelected(users){
        return ($filter('filter')(users, {selected : true}));
    }
});
