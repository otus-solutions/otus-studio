(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusFillingRulesEditor', otusFillingRulesEditor);

    otusFillingRulesEditor.$inject = [
        'FillingRulesEditorWidgetFactory'
    ];

    function otusFillingRulesEditor(FillingRulesEditorWidgetFactory) {
        var ddo = {
            scope: {
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/editor/validation-editor.html',
            link: function linkFunc(scope, element) {
                scope.widget = FillingRulesEditorWidgetFactory.create(scope, element);

            }
        };

        return ddo;
    }

}());
