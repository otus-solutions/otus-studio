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
        'SurveyEditorService',
        '$window',
        'CrossSessionDatabaseService'

    ];

    function SheetController($scope, $element, SheetContentService, $stateParams, AddSurveyItemEventFactory, $timeout, WorkspaceService, SurveyEditorService, $window, CrossSessionDatabaseService) {
        var self = this;
        var surveyToLoad;
        SheetContentService.init($scope, $element);

        _load();

        $scope.$on('$destroy', function cleanWorkspaceService() {
            WorkspaceService.closeWork();
        });

        function _load() {
            if ($stateParams.template) {
                surveyToLoad = $stateParams.template;
                _render();
            } else {
                _loadSessionStorage();
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

        function _loadSessionStorage() {
            var surveyTemplate_OID = $window.sessionStorage.getItem('surveyTemplate_OID');
            var promise = CrossSessionDatabaseService.findSurveyTemplateByOID(surveyTemplate_OID);
            promise.then(function(result) {
                console.log(result);
                surveyToLoad = result.template;
                _startEditor();
                _render();
            });

        }

        function _startEditor() {
            SurveyEditorService.startEditorWithSurveyTemplate({
                name: surveyToLoad.identity.name,
                acronym: surveyToLoad.identity.acronym,
                oid: surveyToLoad.oid
            });
        }
    }

}());
