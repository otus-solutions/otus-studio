(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusCheckboxQuestion', directive);

    directive.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function directive(CheckboxQuestionWidgetFactory) {

        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/checkbox/group/checkbox-question.html',
            link: function linkFunc(scope) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
