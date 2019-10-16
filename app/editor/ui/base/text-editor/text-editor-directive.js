(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusTextEditor', directive);

    directive.$inject = ['OtusTextEditorWidgetFactory'];

    function directive(OtusTextEditorWidgetFactory) {
        var ddo = {
            scope: {
                placeHolder: '@',
                label: '=',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '='
            },
            templateUrl: 'app/editor/ui/base/text-editor/text-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element) {
                scope.widget = OtusTextEditorWidgetFactory.create(scope, element);
            }
        };

        return ddo;
    }

}());
