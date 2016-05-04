(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRuleEditor', otusRuleEditor);

    otusRuleEditor.$inject = ['RuleEditorWidgetFactory'];

    function otusRuleEditor(RuleEditorWidgetFactory) {
        var ddo = {
            scope: {
                leftIcon: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/rule/editor/rule-editor.html',
            link: function linkFunc(scope) {
                scope.widget = scope.$parent.rule;
            }
        };

        return ddo;
    }

}());
