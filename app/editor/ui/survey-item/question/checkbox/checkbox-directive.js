(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusCheckboxQuestion', otusCheckboxQuestion);

    otusCheckboxQuestion.$inject = [
        'CheckboxQuestionWidgetFactory'
    ];

    function otusCheckboxQuestion(CheckboxQuestionWidgetFactory) {
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
