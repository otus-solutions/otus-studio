(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('SheetController', SheetController);

    SheetController.$inject = [
        '$scope',
        '$element',
        'SheetContentService',
        '$stateParams',
        'AddSurveyItemEventFactory',
        '$timeout',
        'WorkspaceService',
        '$window'
    ];

    function SheetController($scope, $element, SheetContentService, $stateParams, AddSurveyItemEventFactory, $timeout, WorkspaceService, $window) {
        var self = this;
        var surveyToLoad;
        SheetContentService.init($scope, $element);

        _load();

        $scope.$on('$destroy', function cleanWorkspaceService() {
            WorkspaceService.closeWork();
            $window.sessionStorage.removeItem('surveyTemplate_OID');
        });

        function _load() {
            if ($stateParams.template) {
                surveyToLoad = $stateParams.template;
                _render();
            }
        }

        function _render() {
            if ($scope.$$phase) {
                if (surveyToLoad.itemContainer.length > 0) {
                    AddSurveyItemEventFactory.create().load(surveyToLoad.itemContainer[0]);
                    surveyToLoad.itemContainer.splice(0, 1);
                    $timeout(function() {
                        surveyToLoad.itemContainer.forEach(function(item) {
                            AddSurveyItemEventFactory.create().load(item);
                            $scope.$digest();
                        });
                    }, 1000);
                }
            }
        }
    }

}());
