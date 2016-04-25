(function() {
    'use strict';

    angular
        .module('editor.ui')
        .controller('OtusQuestionController', OtusQuestionController);

    OtusQuestionController.$inject = [
        '$scope',
        '$element',
        'QuestionWidgetFactory',
        'SheetContentService'
    ];

    function OtusQuestionController($scope, $element, QuestionWidgetFactory, SheetContentService) {
        var self = this;

        $scope.question = SheetContentService.lastLoadedQuestion;
        $scope.component = QuestionWidgetFactory.create({
            scope: $scope,
            element: $element
        });
    }

})();
