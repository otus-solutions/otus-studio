(function() {
    'use strict';

    angular
        .module('user')
        .controller('UserController', ['$http', '$scope', '$filter', UserController]);

    function UserController($http, $scope, $filter) {

        $scope.users = [];
        $scope.users.disabledUsers = [];
        $scope.users.activedUsers = [];

        var URL_GET_USERS = window.location.origin + '/otus-domain-rest/session/rest/administration/users/fetch';
        var URL_DISABLE_USERS = window.location.origin + '/otus-domain-rest/session/rest/administration/users/disable';
        var URL_ENABLE_USERS = window.location.origin + '/otus-domain-rest/session/rest/administration/users/enable';

        $scope.loadUsers = fetchUsers();

        $scope.enableUsers = function() {
            var disabledUserForActivation = filterSelected($scope.users.disabledUsers);

            if (disabledUserForActivation.length > 0) {
                $http.post(URL_ENABLE_USERS, disabledUserForActivation).then(function(response) {
                    fetchUsers();
                });
            }
        };

        $scope.disableUsers = function() {
            var enableUserForDisable = filterSelected($scope.users.activedUsers);

            if (enableUserForDisable.length > 0) {
                $http.post(URL_DISABLE_USERS, enableUserForDisable).then(function(response) {
                    fetchUsers();
                });
            }
        };

        function filterSelected(users) {
            return ($filter('filter')(users, {
                selected: true
            }));
        }

        function fetchUsers() {
            $http.get(URL_GET_USERS).then(function(response) {
                $scope.users.disabledUsers = response.data.disabledUsers;
                $scope.users.activedUsers = response.data.activedUsers;
            });
        }
    }


}());
