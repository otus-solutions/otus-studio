(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionBottomMenu', directive);


    function directive() {
        var ddo = {
            scope: {

            },
            transclude: true,
            templateUrl: 'app/editor/ui/question-bottom-menu/question-bottom-menu.html',
            restrict: 'E',
            controller: controller
        };
        return ddo;

        //controller.inject = ['$scope', '$timeout', '$mdBottomSheet', '$mdToast'];

        function controller($scope, $timeout, $mdBottomSheet, $mdToast) {
            $scope.alert = '';

            $scope.showGridBottomSheet = function() {
                $scope.alert = '';
                $mdBottomSheet.show({
                    templateUrl: '/survey-item-palette/survey-item-palette.html',
                    //  controller: 'GridBottomSheetCtrl',
                    clickOutsideToClose: true
                });
            };
        }
    }
}());
