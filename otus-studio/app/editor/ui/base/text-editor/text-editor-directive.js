(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusTextEditor', otusTextEditor);

    function otusTextEditor() {
        var ddo = {
            scope: {
                placeholder: '@',
                label: '@',
                ariaLabel: '@',
                leftIcon: '@',
                ngModel: '='
            },
            transclude: true,
            templateUrl: 'app/editor/ui/base/text-editor/text-editor.html',
            controller: 'OtusTextEditorController',
            retrict: 'E'
        };

        return ddo;
    }

}());
