(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionSettings', otusQuestionSettings);

    otusQuestionSettings.$inject = [
        'QuestionSettingsWidgetFactory',
        'UUIDService'
    ];

    function otusQuestionSettings(QuestionSettingsWidgetFactory, UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'QuestionSettingsController',
            templateUrl: 'app/editor/ui/question-editor/question-settings/question-settings.html',
            link: function(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = QuestionSettingsWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
