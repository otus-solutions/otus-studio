(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusIntegerQuestion', directive);

    directive.$inject = ['IntegerQuestionWidgetFactory'];

    function directive(IntegerQuestionWidgetFactory) {
        var ddo = {
            scope: {
                ngModel: '=',
                ariaLabel: '@'
            },
            templateUrl: 'app/editor/ui/survey-item/question/integer/integer-question.html',
            restrict: 'E',
            link: function(scope, element) {
                scope.widget = IntegerQuestionWidgetFactory.create(scope, element);
            }
        };
        return ddo;
    }

}());
