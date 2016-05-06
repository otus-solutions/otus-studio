(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionSettings', otusQuestionSettings);

    otusQuestionSettings.$inject = ['QuestionSettingsWidgetFactory'];

    function otusQuestionSettings(QuestionSettingsWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'QuestionSettingsController',
            templateUrl: 'app/editor/ui/question-editor/question-settings/question-settings.html',
            link: function(scope, element, attrs) {
                scope.widget = QuestionSettingsWidgetFactory.create(attrs, element, scope.$parent.$parent.$parent.$parent.widget);
            }
        };

        return ddo;
    }

}());
