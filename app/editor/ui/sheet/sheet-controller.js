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
        '$window',
        '$q'
    ];

    function SheetController($scope, $element, SheetContentService, $stateParams, AddSurveyItemEventFactory, $timeout, WorkspaceService, $window, $q) {
        var self = this;
        self.isLoading = false;
        var surveyToLoad;
        SheetContentService.init($scope, $element);

        _init();

        $scope.$on('$destroy', function cleanWorkspaceService() {
            WorkspaceService.closeWork();
            $window.sessionStorage.removeItem('surveyTemplate_OID');
        });

        function _init() {
            if (_isLoadMode()) {
                self.isLoading = true;
                surveyToLoad = $stateParams.template;
                var promise = _renderSurveyTemplate();
                promise.then(function(value){
                    self.isLoading = false;
                });

            }
        }

        function _renderSurveyTemplate() {
            var deferred = $q.defer();
            if ($scope.$$phase) {
                if (surveyToLoad.itemContainer.length > 0) {
                    AddSurveyItemEventFactory.create().load(surveyToLoad.itemContainer[0]);
                    surveyToLoad.itemContainer.splice(0, 1);
                    $timeout(function() {
                        surveyToLoad.itemContainer.forEach(function(item) {
                            AddSurveyItemEventFactory.create().load(item);
                            $scope.$digest();
                        });
                        deferred.resolve(true);
                    }, 1000);
                }
            }
            return deferred.promise;
        }

        function _isLoadMode() {
            return $stateParams.template;
        }

    }

}());
