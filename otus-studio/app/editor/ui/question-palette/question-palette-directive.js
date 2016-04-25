(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusQuestionPalette', otusInputText);

    function otusInputText() {
        var ddo = {
            scope: {
                label: '@',
                ariaLabel: '@',
                leftIcon: '@'
            },
            transclude: true,
            templateUrl: 'app/editor/ui/question-palette/question-palette.html',
            retrict: 'E'
        };

        return ddo;
    }

}());
