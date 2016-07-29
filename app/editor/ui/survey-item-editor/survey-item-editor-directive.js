(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusSurveyItemEditor', directive);

    directive.$inject = [
        'SurveyItemEditorWidgetFactory',
        'SheetContentService',
        'UUIDService',
        'PageAnchorService'
        ];

    function directive(SurveyItemEditorWidgetFactory, SheetContentService, UUIDService, PageAnchorService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item-editor/survey-item-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs) {
                scope.uuid = UUIDService.generateUUID();
                scope.widget = SurveyItemEditorWidgetFactory.create(scope, element, SheetContentService.lastLoadedQuestion);
            }
        };

        return ddo;
    }

}());
