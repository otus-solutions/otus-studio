(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusDecimalQuestion', directive);

    directive.$inject = ['DecimalQuestionWidgetFactory'];

    function directive(DecimalQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/decimal/decimal-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = DecimalQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());
