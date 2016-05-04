(function() {
    'use strict';

    angular
        .module('editor.ui')
        .directive('otusRuleCreator', otusRuleCreator);

    otusRuleCreator.$inject = ['RuleCreatorWidgetFactory'];

    function otusRuleCreator(RuleCreatorWidgetFactory) {
        var ddo = {
            scope: {
                leftIcon: '@'
            },
            restrict: 'E',
            templateUrl: 'app/editor/ui/navigation/rule/creator/rule-creator.html',
            link: function link(scope, element, attr, controller) {
                scope.widget = RuleCreatorWidgetFactory.create(scope, scope.$parent.widget);
            }
        };

        return ddo;
    }

}());
