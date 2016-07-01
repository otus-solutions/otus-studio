(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusValidationEditor', otusValidationEditor);

    otusValidationEditor.$inject = [
        'ValidationEditorWidgetFactory'
    ];

    function otusValidationEditor(ValidationEditorWidgetFactory) {
        var ddo = {
            scope: {},
            restrict: 'E',
            templateUrl: 'app/editor/ui/validation/editor/validation-editor.html',
            link: function linkFunc(scope, element) {
                scope.widget = ValidationEditorWidgetFactory.create(scope, element);

            }
        };

        return ddo;
    }

}());
