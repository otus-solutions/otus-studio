(function() {
    'use strict';

    angular
        .module('preview')
        .service('EditionPreviewService', EditionPreviewService);

    EditionPreviewService.$inject = [
        '$stateParams',
        'AddSurveyItemEventFactory',
        '$timeout',
        '$q'
    ];

    function EditionPreviewService($stateParams, AddSurveyItemEventFactory, $timeout, $q) {
        var self = this;
        var _surveyToLoad;
        var _scope;

        self.isLoading = false;
        self.setScope = setScope;
        self.isLoadingMode = isLoadingMode;
        self.loadSurveyTemplate = loadSurveyTemplate;

        function loadSurveyTemplate() {
            _surveyToLoad = $stateParams.template;
            if (_surveyToLoad.itemContainer.length > 0) {
                self.isLoading = true;
                var promise = _renderSurveyTemplate();
                promise.then(function(value) {
                    self.isLoading = false;
                });
            }
        }

        function _renderSurveyTemplate() {
            var deferred = $q.defer();
            if (_scope.$$phase) {
                AddSurveyItemEventFactory.create().load(_surveyToLoad.itemContainer[0]);
                _surveyToLoad.itemContainer.splice(0, 1);
                if (_surveyToLoad.itemContainer.length > 0) {
                    $timeout(function() {
                        _surveyToLoad.itemContainer.forEach(function(item) {
                            AddSurveyItemEventFactory.create().load(item);
                            _scope.$digest();
                        });
                        deferred.resolve(true);
                    }, 1000);
                } else {
                    deferred.resolve(true);
                }
            }
            return deferred.promise;
        }

        function isLoadingMode() {
            return $stateParams.template;
        }

        function setScope(scope) {
            _scope = scope;
        }
    }

})();
