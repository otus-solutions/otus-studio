(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('checkboxQuestion', checkboxQuestion);

    checkboxQuestion.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function checkboxQuestion(CheckboxQuestionWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/survey-item/question/checkbox/checkbox-question.html',
            link: function(scope, element) {
                scope.widget = CheckboxQuestionWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
