(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemSettings', directive);

    directive.$inject = [
        'SurveyItemSettingsWidgetFactory',
        'UUIDService'
    ];

    function directive(SurveyItemSettingsWidgetFactory, UUIDService) {
        var ddo = {
            scope: {},
            restrict: 'E',
            controller: 'SurveyItemSettingsController',
            templateUrl: 'app/editor/ui/survey-item-editor/survey-item-settings/survey-item-settings.html',
            link: function(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = SurveyItemSettingsWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
