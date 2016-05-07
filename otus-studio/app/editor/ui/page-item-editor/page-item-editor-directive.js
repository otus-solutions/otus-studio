(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusPageItemEditor', otusPageItemEditor);

    otusPageItemEditor.$inject = [
        'PageItemEditorWidgetFactory',
        'SheetContentService'
    ];

    function otusPageItemEditor(PageItemEditorWidgetFactory, SheetContentService) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/page-item-editor/page-item-editor.html',
            retrict: 'E',
            link: function linkFunc(scope, element, attrs, controller, transclude) {
                scope.widget = scope.$parent.widget;
                scope.widget = PageItemEditorWidgetFactory.create(SheetContentService.lastLoadedQuestion, element);
            }
        };

        return ddo;
    }

}());
