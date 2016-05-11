(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRuleEditor', otusRuleEditor);

    function otusRuleEditor() {
        var ddo = {
            scope: {
                leftIcon: '@',
                widget: '='
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/rule/editor/rule-editor.html'
        };

        return ddo;
    }

}());
