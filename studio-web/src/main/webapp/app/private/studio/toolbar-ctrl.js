angular
    .module('StudioApp')
    .controller('ToolbarCtrl', ['$scope', '$location', 'StudioEditingService',
        function($scope, $location, StudioEditingService) {

    		var NEW_SURVEY = 'container';
            var USER_MANAGEMENT_STATE = 'user-management';
            var REPOSITORY_CONNECT_STATE = 'repository?actionType=CONNECT';
            var REPOSITORY_NEW_STATE = 'repository?actionType=NEW';

            $scope.openContainer  = function() {
            	$location.url(NEW_SURVEY);
StudioEditingService.createNewSurvey();
            }
            
            $scope.openAdministrationUsers = function() {
                $location.url(USER_MANAGEMENT_STATE);
            }

            $scope.openConnectRepository = function() {
                $location.url(REPOSITORY_CONNECT_STATE);
            }

            $scope.openNewRepository = function() {
            	$location.url(REPOSITORY_NEW_STATE);
            }
        }
    ]);
