(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusQuestionController', OtusQuestionController);

    OtusQuestionController.$inject = [
        '$scope',
        '$element',
        'QuestionWidgetFactory',
        'SurveyPageContentService'
    ];

    function OtusQuestionController($scope, $element, QuestionWidgetFactory, SurveyPageContentService) {
        var self = this;

        $scope.$emit('otusWidgetPreLoad');
        $scope.question = SurveyPageContentService.lastLoadedQuestion;

        $scope.component = QuestionWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
