angular
    .module('StudioApp')
    .controller('ToolbarCtrl', ['$scope', '$location',
        function($scope, $location) {

            var USER_MANAGEMENT_STATE = 'user-management';
            var REPOSITORY_ADD_STATE = 'repository?actionType=ADD';

            $scope.openAdministrationUsers = function() {
                $location.url(USER_MANAGEMENT_STATE);
            }

            $scope.openAddRepository = function() {
                $location.url(REPOSITORY_ADD_STATE);
            }
        }
    ]);
