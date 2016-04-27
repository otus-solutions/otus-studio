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
            templateUrl: 'app/editor/ui/question/single-selection/group/single-selection-question.html'
        };

        return ddo;
    }

}());
