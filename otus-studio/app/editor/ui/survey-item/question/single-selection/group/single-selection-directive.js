(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('singleSelectionQuestion', singleSelectionQuestion);

    singleSelectionQuestion.$inject = [
        'SingleSelectionQuestionWidgetFactory'
    ];

    function singleSelectionQuestion(SingleSelectionQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/single-selection/group/single-selection-question.html',
            link: function linkFunc(scope) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
