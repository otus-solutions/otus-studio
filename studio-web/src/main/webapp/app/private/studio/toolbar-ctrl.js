angular
    .module('StudioApp')
    .controller('ToolbarCtrl', ['$scope', '$location',
        function($scope, $location) {

            var USER_MANAGEMENT_STATE = 'user-management';
            var REPOSITORY_STATE = 'repository';

            $scope.openAdministrationUsers = function() {
                $location.url(USER_MANAGEMENT_STATE);
            }

            $scope.openRepository = function() {
                $location.url(REPOSITORY_STATE);
            }
        }
    ]);
