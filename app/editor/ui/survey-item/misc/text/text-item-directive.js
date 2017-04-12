(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('textItem', textItem);

    textItem.$inject = ['TextItemWidgetFactory'];

    function textItem(TextItemWidgetFactory) {
        var ddo = {
            scope: {},
            templateUrl: 'app/editor/ui/survey-item/misc/text/text-item.html',
            retrict: 'E',
            link: function(scope, element) {
                scope.widget = scope.$parent.widget;
            }
        };

        return ddo;
    }

}());
